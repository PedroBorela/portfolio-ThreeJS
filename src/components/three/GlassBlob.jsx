import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { SphereGeometry } from 'three';
import { gsap, useGSAP } from '../../lib/gsap';

const RADIUS = 1.25;

// Normais por face acumuladas nos vértices (mesmo resultado do computeVertexNormals),
// direto nos arrays: roda a cada frame, então evita a alocação/chamadas por vértice.
function updateNormals(pos, index, normal) {
  normal.fill(0);
  for (let i = 0; i < index.length; i += 3) {
    const a = index[i] * 3;
    const b = index[i + 1] * 3;
    const c = index[i + 2] * 3;
    const abx = pos[a] - pos[b], aby = pos[a + 1] - pos[b + 1], abz = pos[a + 2] - pos[b + 2];
    const cbx = pos[c] - pos[b], cby = pos[c + 1] - pos[b + 1], cbz = pos[c + 2] - pos[b + 2];
    const nx = cby * abz - cbz * aby;
    const ny = cbz * abx - cbx * abz;
    const nz = cbx * aby - cby * abx;
    normal[a] += nx; normal[a + 1] += ny; normal[a + 2] += nz;
    normal[b] += nx; normal[b + 1] += ny; normal[b + 2] += nz;
    normal[c] += nx; normal[c + 1] += ny; normal[c + 2] += nz;
  }
  for (let i = 0; i < normal.length; i += 3) {
    const len = Math.hypot(normal[i], normal[i + 1], normal[i + 2]) || 1;
    normal[i] /= len; normal[i + 1] /= len; normal[i + 2] /= len;
  }
}

function Scene({ pop, pointer, animate, segments, onCompiled }) {
  const group = useRef(null);
  const blob = useRef(null);
  const ring = useRef(null);
  const ring2 = useRef(null);
  const beam = useRef(null);
  const moon = useRef(null);
  const amp = useRef(0.1);
  const width = useThree((s) => s.size.width);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const invalidate = useThree((s) => s.invalidate);
  const fit = width < 700 ? 0.62 : width < 1100 ? 0.85 : 1;

  const geometry = useMemo(() => new SphereGeometry(RADIUS, segments, segments), [segments]);
  const base = useMemo(() => geometry.attributes.position.array.slice(), [geometry]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Compila os shaders em paralelo (KHR_parallel_shader_compile) antes do primeiro frame,
  // para a compilação do material de transmissão não travar a thread principal.
  useEffect(() => {
    let alive = true;
    gl.compileAsync(scene, camera)
      .catch(() => {})
      .then(() => {
        if (!alive) return;
        onCompiled();
        invalidate();
      });
    return () => {
      alive = false;
    };
  }, [gl, scene, camera, invalidate, onCompiled]);

  useFrame((state) => {
    const t = animate ? state.clock.getElapsedTime() : 0;
    const nx = pointer.current.x;
    const ny = pointer.current.y;

    // Amplitude da deformação sobe quando o mouse se aproxima do centro
    const target = 0.09 + Math.max(0, 0.7 - Math.hypot(nx, ny)) * 0.22;
    amp.current += (target - amp.current) * 0.04;
    if (!Number.isFinite(amp.current)) amp.current = 0.1;
    const a = amp.current;

    const pos = geometry.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < pos.count; i++) {
      const k3 = i * 3;
      const x = base[k3];
      const y = base[k3 + 1];
      const z = base[k3 + 2];
      const k = 1 + a * (Math.sin(x * 1.6 + t * 1.1) * Math.sin(y * 1.9 + t * 0.8) + 0.6 * Math.sin(z * 2.3 + t * 1.4 + x));
      arr[k3] = x * k;
      arr[k3 + 1] = y * k;
      arr[k3 + 2] = z * k;
    }
    pos.needsUpdate = true;
    updateNormals(arr, geometry.index.array, geometry.attributes.normal.array);
    geometry.attributes.normal.needsUpdate = true;

    // No scroll a bolha sobe até 1.6 e diminui 25%
    const sp = Math.min((window.scrollY || 0) / (window.innerHeight || 1), 1.5) || 0;
    const g = group.current;
    g.scale.setScalar(Math.max(0.0001, pop.v * fit * (1 - sp * 0.25)));
    blob.current.rotation.y = t * 0.15;
    g.rotation.y += (nx * 0.6 - g.rotation.y) * 0.04;
    g.rotation.x += (-ny * 0.4 - g.rotation.x) * 0.04;
    g.position.x += (nx * 0.35 - g.position.x) * 0.03;
    g.position.y += (ny * 0.22 + sp * 1.6 - g.position.y) * 0.06;

    beam.current.position.set(Math.cos(t * 0.7) * 2.3 * fit, Math.sin(t * 0.7) * 0.6, Math.sin(t * 0.7) * -1.6);
    moon.current.position.set(Math.cos(t * 0.45 + 2) * -2.8 * fit, Math.sin(t * 0.5) * 1.1 + 0.4, Math.sin(t * 0.45 + 2) * 1.4);
    ring.current.rotation.z = t * 0.1;
    ring2.current.rotation.z = -t * 0.07;
    ring.current.scale.setScalar(fit);
    ring2.current.scale.setScalar(fit);
  });

  return (
    <>
      <Environment preset="city" />
      <directionalLight color="#ffffff" intensity={2} position={[3, 4, 5]} />
      <pointLight color="#6366F1" intensity={30} distance={20} position={[-3, -1, 2]} />
      <pointLight color="#22C55E" intensity={16} distance={20} position={[3, -2, 1]} />

      <group ref={group} scale={0.0001}>
        <mesh ref={blob} geometry={geometry}>
          {/* transmissionSampler usa o passe de transmissão do three (como o MeshPhysicalMaterial do
              protótipo), então o FBO próprio do drei fica ocioso e pode ser mínimo. O shader do drei
              força transmissionAlpha = 1; transparent + opacity devolvem a translucidez do protótipo,
              com o nome aparecendo através da bolha. */}
          <MeshTransmissionMaterial
            transmissionSampler
            transparent
            opacity={0.72}
            samples={6}
            resolution={64}
            transmission={1}
            thickness={1.8}
            ior={1.5}
            roughness={0.06}
            chromaticAberration={0.04}
            anisotropicBlur={0.1}
            iridescence={1}
            iridescenceIOR={1.35}
            iridescenceThicknessRange={[120, 700]}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.6}
            attenuationColor="#D5D8EA"
            attenuationDistance={3}
          />
        </mesh>
      </group>

      <mesh ref={ring} position={[0, 0, -1.2]} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 240]} />
        <meshBasicMaterial color="#AFB0B6" />
      </mesh>
      <mesh ref={ring2} position={[0, 0, -1.6]} rotation={[1.4, 0.5, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 240]} />
        <meshBasicMaterial color="#3A3A49" />
      </mesh>
      <mesh ref={beam}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshBasicMaterial color="#22C55E" />
      </mesh>
      <mesh ref={moon}>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial color="#1C1C21" roughness={0.3} metalness={0.9} />
      </mesh>
    </>
  );
}

// Bolha de vidro do hero. `revealed` dispara a entrada elástica junto com o intro.
const GlassBlob = ({ revealed, reduceMotion = false }) => {
  const hostRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pop = useMemo(() => ({ v: reduceMotion ? 1 : 0 }), [reduceMotion]);
  const [inView, setInView] = useState(true);
  const [compiled, setCompiled] = useState(false);
  const onCompiled = useCallback(() => setCompiled(true), []);
  // Telas pequenas: malha 64×64 (4× menos vértices para deformar por frame) e DPR menor
  const [small] = useState(() => window.innerWidth < 700);

  // Posição do mouse normalizada (-1..1); o canvas não recebe eventos.
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
      pointer.current.y = -((e.clientY / (window.innerHeight || 1)) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Pausa o render fora da viewport
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(hostRef.current);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (revealed && !reduceMotion) gsap.to(pop, { v: 1, duration: 2.2, ease: 'elastic.out(1,0.45)' });
    },
    { dependencies: [revealed, reduceMotion, pop] },
  );

  const frameloop = !compiled ? 'never' : reduceMotion ? 'demand' : inView ? 'always' : 'never';

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={small ? [1, 1.5] : [1, 2]}
        camera={{ fov: 32, position: [0, 0, 9], near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.1;
        }}
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <Scene pop={pop} pointer={pointer} animate={!reduceMotion} segments={small ? 64 : 128} onCompiled={onCompiled} />
      </Canvas>
    </div>
  );
};

export default GlassBlob;
