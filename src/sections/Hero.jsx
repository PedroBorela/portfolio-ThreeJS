import { lazy, Suspense, useEffect, useRef } from 'react';
import { gsap, useGSAP, letterBounce, MOTION } from '../lib/gsap';
import MagneticButton from '../components/ui/MagneticButton';
import Ping from '../components/ui/Ping';

const GlassBlob = lazy(() => import('../components/three/GlassBlob'));

const NAME = [
  { line: '1', letters: 'Pedro', className: '' },
  { line: '2', letters: 'Borela', className: 'justify-end' },
];

const Hero = ({ revealed, reduceMotion }) => {
  const rootRef = useRef(null);
  const introRef = useRef(null);
  const waveRef = useRef(null);
  const scrollLineRef = useRef(null);

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
        <Suspense fallback={null}>
          <GlassBlob revealed={revealed} reduceMotion={reduceMotion} />
        </Suspense>
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
          <div data-hero-fade="" className="flex items-center gap-3">
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
