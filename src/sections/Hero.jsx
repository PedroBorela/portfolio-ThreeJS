import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, letterBounce, MOTION } from '../lib/gsap';
import { supportsWebGL2 } from '../lib/webgl';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import MagneticButton from '../components/ui/MagneticButton';
import Ping from '../components/ui/Ping';

const GlassBlob = lazy(() => import('../components/three/GlassBlob'));

// Bolha estática em CSS: entra quando não há WebGL2, o chunk 3D falha ou o contexto cai
const BlobFallback = () => (
  <div
    aria-hidden="true"
    className="absolute left-1/2 top-1/2 aspect-square h-[clamp(160px,min(40svh,62vw),440px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] opacity-80 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] [background:radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_70%_78%,rgba(99,102,241,0.32),transparent_46%),radial-gradient(circle_at_24%_80%,rgba(34,197,94,0.16),transparent_40%),rgba(214,216,234,0.05)]"
  />
);

const NAME = [
  { line: '1', letters: 'Pedro', className: '' },
  { line: '2', letters: 'Borela', className: 'justify-end' },
];

const Hero = ({ revealed, reduceMotion }) => {
  const rootRef = useRef(null);
  const introRef = useRef(null);
  const waveRef = useRef(null);
  const scrollLineRef = useRef(null);
  // ?sem3d desliga a bolha 3D: isola o WebGL ao investigar travamentos em um aparelho específico
  const [blob3d, setBlob3d] = useState(() => supportsWebGL2() && !new URLSearchParams(window.location.search).has('sem3d'));
  const onContextLost = useCallback(() => setBlob3d(false), []);

  const { contextSafe } = useGSAP(
    () => {
      const root = rootRef.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const letters = gsap.utils.toArray('[data-letter]', root);
        const fades = gsap.utils.toArray('[data-hero-fade]', root);

        // Intro: pausado até o loader liberar (ver efeito abaixo)
        introRef.current = gsap
          .timeline({ paused: true })
          .fromTo(letters, { yPercent: 115 }, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.045 })
          .fromTo(fades, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08 }, '-=1');

        gsap.set(waveRef.current, { transformOrigin: '70% 70%' });
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.4, delay: 3, defaults: { duration: 0.18, ease: 'sine.inOut' } })
          .to(waveRef.current, { rotate: 14 })
          .to(waveRef.current, { rotate: -8 })
          .to(waveRef.current, { rotate: 14 })
          .to(waveRef.current, { rotate: -4 })
          .to(waveRef.current, { rotate: 10 })
          .to(waveRef.current, { rotate: 0 });

        gsap.fromTo(scrollLineRef.current, { yPercent: -100 }, { yPercent: 100, duration: 1.4, ease: 'power2.inOut', repeat: -1 });

        // Parallax horizontal das duas linhas do nome
        const scrub = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('[data-name-line="1"]', { xPercent: -8, ease: 'none', scrollTrigger: scrub });
        gsap.to('[data-name-line="2"]', { xPercent: 8, ease: 'none', scrollTrigger: { ...scrub } });

        return () => {
          introRef.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useEffect(() => {
    if (revealed) introRef.current?.play();
  }, [revealed]);

  const bounce = contextSafe((e) => letterBounce(e.currentTarget));

  return (
    <section ref={rootRef} id="home" className="relative flex min-h-[100svh] px-gutter pb-8 pt-[112px]">
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {blob3d ? (
          <ErrorBoundary name="GlassBlob" fallback={<BlobFallback />}>
            <Suspense fallback={null}>
              <GlassBlob revealed={revealed} reduceMotion={reduceMotion} onContextLost={onContextLost} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <BlobFallback />
        )}
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-144px)] w-full max-w-site flex-col justify-between gap-10">
        <div className="relative z-[2] flex flex-wrap items-start justify-between gap-4">
          <p data-hero-fade="" className="m-0 text-[clamp(20px,2.2vw,30px)] font-medium text-white">
            Olá, eu sou o Pedro{' '}
            <span ref={waveRef} className="inline-block">
              🤘
            </span>
          </p>
          <p data-hero-fade="" className="m-0 text-right text-[15px] leading-normal text-pf-muted">
            Desenvolvedor full-stack
            <br />
            Manhuaçu, MG · Brasil
          </p>
        </div>

        <h1 className="relative z-0 m-0 flex select-none flex-col text-[clamp(72px,18.5vw,286px)] font-semibold leading-[0.82] tracking-[-0.055em] text-pf-silver">
          <span className="sr-only">Pedro Borela</span>
          {NAME.map(({ line, letters, className }) => (
            <span
              key={line}
              data-name-line={line}
              aria-hidden="true"
              className={`flex overflow-hidden pb-[0.06em] pr-[0.04em] pt-[0.02em] ${className}`}
            >
              {letters.split('').map((letter, i) => (
                <span key={i} data-letter="" onMouseEnter={bounce} className="inline-block">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="relative z-[2] grid grid-cols-1 items-end gap-7 wide:grid-cols-[minmax(0,1fr)_auto]">
          <p data-hero-fade="" className="m-0 max-w-[520px] text-lg leading-[1.6] text-pf-text [text-wrap:pretty]">
            Desenvolvimento full-stack, dados e interfaces. Na <span className="text-white">Origenow</span>, construo sistemas
            internos, integrações de APIs e sites para e-commerce e marketplaces.
          </p>
          <div data-hero-fade="" className="flex flex-wrap items-center gap-3">
            <MagneticButton
              href="/servicos"
              strength={0.3}
              className="flex items-center gap-3 rounded-md bg-pf-silver px-6 py-4 text-base font-medium text-pf-black transition-colors hover:bg-white"
            >
              Conheça os serviços
              <img src="/assets/arrow-up.png" alt="" className="h-3 w-3 brightness-0" />
            </MagneticButton>
            <MagneticButton
              href="#projects"
              strength={0.3}
              className="blur-glass-sat flex items-center gap-3.5 rounded-md border border-white/[0.12] bg-white/[0.06] px-6 py-4 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <Ping size={12} />
              Ver projetos
            </MagneticButton>
            <MagneticButton
              href="#about"
              strength={0.4}
              aria-label="Rolar para baixo"
              className="blur-glass relative box-content flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.03]"
            >
              <span className="relative block h-[22px] w-px overflow-hidden bg-white/[0.12]">
                <span ref={scrollLineRef} className="absolute inset-0 bg-white" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
