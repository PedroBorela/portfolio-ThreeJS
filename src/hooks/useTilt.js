import { useRef } from 'react';
import { gsap, useGSAP, matches, FINE, REDUCE } from '../lib/gsap';

// Tilt 3D (graus) e variáveis --mx/--my para o brilho interno do card.
export function useTilt(amount = 5) {
  const ref = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !amount || !matches(FINE) || matches(REDUCE)) return undefined;
      gsap.set(el, { transformPerspective: 1000 });

      const onMove = contextSafe((e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        gsap.to(el, {
          rotationY: (px - 0.5) * amount,
          rotationX: -(py - 0.5) * amount,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
      const onLeave = contextSafe(() => {
        gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1.2, ease: 'elastic.out(1,0.4)', overwrite: 'auto' });
      });

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref, dependencies: [amount] },
  );

  return ref;
}
