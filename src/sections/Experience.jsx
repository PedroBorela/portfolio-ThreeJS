import { useRef, useState } from 'react';
import { EXPS } from '../constants/portfolio';
import { gsap, useGSAP, batchFade, queueRefresh, MOTION } from '../lib/gsap';
import SectionTitle from '../components/ui/SectionTitle';

// Acordeão: abre no hover e no clique; o primeiro item começa aberto.
const Experience = () => {
  const rootRef = useRef(null);
  const firstRun = useRef(true);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => batchFade(rootRef.current));
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const items = gsap.utils.toArray('[data-exp]', rootRef.current);
      items.forEach((item, i) => {
        const on = i === open;
        const body = item.querySelector('[data-exp-body]');
        const plus = item.querySelector('[data-exp-plus]');
        const fill = item.querySelector('[data-exp-fill]');

        if (firstRun.current) {
          gsap.set(body, { height: on ? 'auto' : 0 });
          gsap.set(plus, { rotate: on ? 45 : 0 });
          gsap.set(fill, { scaleY: on ? 1 : 0 });
          return;
        }
        gsap.to(body, { height: on ? 'auto' : 0, duration: 0.8, ease: 'expo.out', overwrite: 'auto', onComplete: () => queueRefresh(150) });
        gsap.to(plus, { rotate: on ? 45 : 0, duration: 0.9, ease: 'elastic.out(1,0.45)', overwrite: 'auto' });
        gsap.to(fill, { scaleY: on ? 1 : 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
        if (on) {
          gsap.fromTo(item.querySelector('[data-exp-logo]'), { rotate: -12, scale: 0.85 }, { rotate: 0, scale: 1, duration: 1.1, ease: 'elastic.out(1,0.35)' });
        }
      });
      firstRun.current = false;
      return () => {
        firstRun.current = true;
      };
    },
    { scope: rootRef, dependencies: [open] },
  );

  return (
    <section ref={rootRef} id="work" className="px-gutter py-section-end">
      <div className="mx-auto max-w-site">
        <span data-fade="" className="mb-4 block text-sm text-pf-muted">
          05 · Experiência
        </span>
        <SectionTitle
          lines={['Experiência e formação']}
          className="mb-[clamp(40px,5vw,64px)] text-[clamp(40px,5.4vw,80px)] leading-none tracking-[-0.04em]"
        />
        <div className="border-b border-pf-border">
          {EXPS.map((exp, i) => (
            <div
              key={exp.name}
              data-exp=""
              data-fade=""
              onMouseEnter={() => setOpen(i)}
              className="relative cursor-pointer border-t border-pf-border"
            >
              <span data-exp-fill="" className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03]" />
              <h3 className="relative m-0 font-normal">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={open === i}
                  aria-controls={`exp-body-${i}`}
                  className="grid w-full grid-cols-[64px_minmax(0,1fr)_40px] items-center gap-6 px-[clamp(0px,1.2vw,16px)] py-[clamp(20px,2.4vw,28px)] text-left wide:grid-cols-[64px_minmax(0,1fr)_auto_40px]"
                >
                  <span data-exp-logo="" className={`flex h-16 w-16 rounded-3xl p-2.5 ${exp.logoBg ?? 'bg-pf-logo'}`}>
                    <img src={exp.icon} alt={`Logo de ${exp.name}`} loading="lazy" className="h-full w-full object-contain" />
                  </span>
                  <span className="block">
                    <span className="block text-[clamp(20px,2.4vw,32px)] font-semibold tracking-[-0.02em] text-pf-text-strong">
                      {exp.name}
                    </span>
                    <span className="mt-1 block text-[15px] text-pf-muted">{exp.pos}</span>
                  </span>
                  <span className="hidden whitespace-nowrap text-[15px] text-pf-text wide:flex">{exp.duration}</span>
                  <span
                    data-exp-plus=""
                    aria-hidden="true"
                    className="relative box-content flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-white/[0.12]"
                  >
                    <span className="absolute h-[1.5px] w-3.5 bg-white" />
                    <span className="absolute h-3.5 w-[1.5px] bg-white" />
                  </span>
                </button>
              </h3>
              <div id={`exp-body-${i}`} data-exp-body="" className="relative h-0 overflow-hidden">
                <p className="m-0 max-w-[780px] pb-6 text-[17px] leading-[1.65] text-pf-text [text-wrap:pretty] wide:pb-8 wide:pl-[104px] wide:pr-4">
                  {exp.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
