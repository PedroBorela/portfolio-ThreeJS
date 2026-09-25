import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

const LINES = ['Desenvolvimento full-stack,', 'dados e interfaces'];

// Tela de abertura: contador 000→100, barra de progresso e saída em clip-path.
// `onReveal` dispara o intro do hero durante a saída; `onDone` desmonta o loader.
const Loader = ({ onReveal, onDone }) => {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray('[data-loader-line]', rootRef.current);
      const counter = counterRef.current;
      const bar = barRef.current;
      const progress = { v: 0 };

      gsap.set(lines, { yPercent: 110 });
      gsap
        .timeline({ onComplete: onDone })
        .to(lines, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.08 })
        .to(
          progress,
          {
            v: 100,
            duration: 2,
            ease: 'power3.inOut',
            onUpdate: () => {
              counter.textContent = String(Math.round(progress.v)).padStart(3, '0');
              bar.style.transform = `scaleX(${progress.v / 100})`;
            },
          },
          0.1,
        )
        .to(lines, { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: 0.05 })
        .to(counter, { yPercent: -40, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<')
        .to(rootRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
        .add(onReveal, '-=0.6');
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-pf-black p-gutter [clip-path:inset(0%_0%_0%_0%)]"
    >
      <div className="flex justify-between gap-4 text-base">
        <span className="font-semibold text-white">Pedro Borela</span>
        <span className="text-pf-muted">Portfólio · 2026</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="text-[clamp(28px,4vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em]">
          {LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span data-loader-line="" className="text-silver block">
                {line}
              </span>
            </span>
          ))}
        </div>
        <span
          ref={counterRef}
          className="block text-[clamp(72px,14vw,200px)] font-semibold leading-[0.8] tracking-[-0.05em] text-white tabular-nums"
        >
          000
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-pf-border">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-white" />
      </div>
    </div>
  );
};

export default Loader;
