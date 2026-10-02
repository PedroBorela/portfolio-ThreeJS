import { useRef } from 'react';
import { OTHERS } from '../constants/portfolio';
import { gsap, useGSAP, batchFade, matches, FINE, MOTION } from '../lib/gsap';

const OtherProjects = () => {
  const rootRef = useRef(null);
  const previewRef = useRef(null);
  const previewImgRef = useRef(null);
  const followRef = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => batchFade(rootRef.current));

      // Preview de 380px que segue o mouse (quickTo 0.7s)
      const preview = previewRef.current;
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6 });
      followRef.current = {
        x: gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3' }),
        y: gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3' }),
      };
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const follow = contextSafe((e) => {
    followRef.current?.x(e.clientX);
    followRef.current?.y(e.clientY);
  });

  const enter = contextSafe((e, img) => {
    const row = e.currentTarget;
    previewImgRef.current.src = img;
    follow(e);
    if (matches(FINE)) {
      gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    }
    gsap.to(row.querySelector('[data-row-title]'), { x: 18, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(row.querySelector('[data-row-arrow]'), {
      rotate: 45,
      scale: 1.12,
      backgroundColor: 'rgba(255,255,255,0.12)',
      duration: 0.9,
      ease: 'elastic.out(1,0.4)',
      overwrite: 'auto',
    });
    gsap.to(row.querySelector('[data-row-fill]'), { scaleY: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
  });

  const leave = contextSafe((e) => {
    const row = e.currentTarget;
    gsap.to(previewRef.current, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(row.querySelector('[data-row-title]'), { x: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(row.querySelector('[data-row-arrow]'), {
      rotate: 0,
      scale: 1,
      backgroundColor: 'rgba(255,255,255,0.03)',
      duration: 0.9,
      ease: 'elastic.out(1,0.4)',
      overwrite: 'auto',
    });
    gsap.to(row.querySelector('[data-row-fill]'), { scaleY: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
  });

  return (
    <section ref={rootRef} aria-labelledby="others-title" className="px-gutter pt-[clamp(96px,12vw,160px)]">
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] box-content w-[380px] rounded-lg border border-white/10 bg-white/[0.06] p-1.5 opacity-0 backdrop-blur-[16px]"
      >
        <img
          ref={previewImgRef}
          src={OTHERS[0].img}
          alt=""
          loading="lazy"
          className="block aspect-[1600/949] w-full rounded-md object-cover object-top"
        />
      </div>

      <div className="mx-auto max-w-site">
        <div data-fade="" className="mb-6 flex justify-between gap-4 text-sm text-pf-muted">
          <h2 id="others-title" className="m-0 text-sm font-normal">
            Outros projetos
          </h2>
          <span>Pesquisa, estudos e aplicações</span>
        </div>
        <div className="border-b border-pf-border" onMouseMove={follow}>
          {OTHERS.map((project) => (
            <a
              key={project.n}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              data-fade=""
              onMouseEnter={(e) => enter(e, project.img)}
              onMouseLeave={leave}
              className="relative grid grid-cols-[32px_minmax(0,1fr)_48px] items-center gap-6 overflow-hidden border-t border-pf-border py-[clamp(22px,2.6vw,32px)] text-white wide:grid-cols-[56px_minmax(0,1fr)_260px_140px_48px]"
            >
              <span data-row-fill="" className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white/[0.025]" />
              <span className="relative text-sm text-pf-muted tabular-nums">{project.n}</span>
              <span data-row-title="" className="relative block text-[clamp(24px,3.4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em]">
                {project.title}
              </span>
              <span className="relative hidden text-[15px] text-pf-text wide:flex">{project.kind}</span>
              <span className="relative hidden gap-2 wide:flex">
                {project.tags.map((tag) => (
                  <img key={tag.name} src={tag.path} alt={tag.name} title={tag.name} loading="lazy" className="h-5 w-5 opacity-85" />
                ))}
              </span>
              <span
                data-row-arrow=""
                aria-hidden="true"
                className="relative box-content flex h-12 w-12 items-center justify-center justify-self-end rounded-full border border-white/[0.12] bg-white/[0.03]"
              >
                <img src="/assets/arrow-up.png" alt="" className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;
