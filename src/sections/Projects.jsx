import { useRef, useState } from 'react';
import { FEATURED } from '../constants/portfolio';
import { gsap, ScrollTrigger, useGSAP, batchFade, WIDE, NARROW, REDUCE } from '../lib/gsap';
import { useTilt } from '../hooks/useTilt';
import { useHoverBounce } from '../hooks/useHoverBounce';
import SectionTitle from '../components/ui/SectionTitle';

const pad = (n) => String(n).padStart(2, '0');

const ProjectCard = ({ project, index }) => {
  const tiltRef = useTilt(3);
  const bounce = useHoverBounce();

  return (
    <article data-card="" className="project-card relative flex-none">
      <div
        aria-hidden="true"
        data-glow=""
        className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[55%] opacity-20 blur-[90px]"
        style={{ background: project.accent }}
      />
      <a
        ref={tiltRef}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        data-cursor="Visitar"
        className="relative block rounded-lg border border-white/[0.09] bg-white/[0.04] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-[24px] backdrop-saturate-150"
      >
        <div className="flex items-center gap-2 px-1 pb-2.5 pt-0.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-pf-muted-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-pf-muted-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-pf-muted-2" />
          <span className="flex min-w-0 flex-1 justify-center">
            <span className="truncate rounded-full border border-white/[0.06] bg-white/5 px-3.5 py-[5px] text-xs text-pf-text">
              {project.domain}
            </span>
          </span>
          <img src="/assets/arrow-up.png" alt="" className="mr-1.5 h-2.5 w-2.5 opacity-60" />
        </div>
        <div className="relative aspect-[1600/949] overflow-hidden rounded-md bg-pf-surface">
          <img
            data-shot=""
            src={project.img}
            alt={`Página inicial do site ${project.title}`}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute -left-[6%] top-0 h-full w-[112%] max-w-none object-cover object-top"
          />
        </div>
      </a>

      <div className="mt-6 grid grid-cols-1 items-start gap-x-7 gap-y-5 wide:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <span className="mb-1.5 flex gap-3 text-[13px] text-pf-muted">
            <span className="text-pf-text tabular-nums">{project.n}</span>
            {project.kind}
          </span>
          <h3 className="mb-2 mt-0 text-[clamp(22px,2.1vw,30px)] font-semibold tracking-[-0.02em] text-white">{project.title}</h3>
          <p className="line-clamp-2 m-0 max-w-[560px] text-[15px] leading-[1.55] text-pf-text">{project.desc}</p>
        </div>
        <div className="flex flex-col items-start gap-3.5">
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.name}
                {...bounce}
                title={tag.name}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgba(245,245,245,0.08)] backdrop-blur-[16px]"
              >
                <img src={tag.path} alt={tag.name} className="h-5 w-5" loading="lazy" />
              </span>
            ))}
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[15px] text-pf-text transition-colors hover:text-white"
          >
            Ver projeto<span className="sr-only"> {project.title}</span>
            <img src="/assets/arrow-up.png" alt="" className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
};

const Projects = ({ orbRef }) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      const cards = gsap.utils.toArray('[data-card]', root);
      const mm = gsap.matchMedia();

      mm.add({ wide: WIDE, narrow: NARROW, reduce: REDUCE }, (ctx) => {
        const { wide, reduce } = ctx.conditions;
        if (!reduce) batchFade(root);
        if (!wide) {
          if (!reduce) {
            cards.forEach((card) =>
              gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }),
            );
          }
          return undefined;
        }

        // Desktop: pin + scroll horizontal da trilha
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const horizontal = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.fromTo(
          barRef.current,
          { scaleX: 0.02 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true } },
        );

        const tintOrb = (color) => orbRef.current && gsap.to(orbRef.current, { backgroundColor: color, duration: 1.2, ease: 'power2.out' });

        cards.forEach((card, i) => {
          if (!reduce) {
            gsap.fromTo(
              card.querySelector('[data-shot]'),
              { xPercent: -5 },
              { xPercent: 5, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left right', end: 'right left', scrub: true } },
            );
            if (i > 0) {
              gsap.fromTo(
                card,
                { scale: 0.9, opacity: 0.35 },
                { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left right', end: 'left 45%', scrub: true } },
              );
            }
          }
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: horizontal,
            start: 'left 55%',
            end: 'right 55%',
            onToggle: (self) => {
              if (!self.isActive) return;
              setActive(i);
              tintOrb(FEATURED[i].accent);
            },
          });
        });

        ScrollTrigger.create({
          trigger: root,
          start: 'top 60%',
          onEnter: () => tintOrb(FEATURED[0].accent),
          onLeaveBack: () => tintOrb('#6366F1'),
        });

        return () => {
          if (orbRef.current) gsap.set(orbRef.current, { clearProps: 'backgroundColor' });
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div>
      <section
        ref={rootRef}
        id="projects"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 wide:pb-8"
      >
        <div className="mx-auto flex w-full max-w-site flex-wrap items-end justify-between gap-6 px-gutter">
          <div>
            <span data-fade="" className="mb-4 block text-sm text-pf-muted">
              03 · Projetos
            </span>
            <SectionTitle lines={['Projetos no ar']} className="text-[clamp(40px,5.4vw,80px)] leading-none tracking-[-0.04em]" />
          </div>
          <div data-fade="" className="flex max-w-[400px] flex-col gap-5">
            <p className="m-0 text-base leading-[1.6] text-pf-text">
              Seleção de sistemas, sites e aplicações desenvolvidos para e-commerce, operações internas, pesquisa e patrimônio cultural.
            </p>
            <div className="hidden items-center gap-4 text-sm text-pf-muted tabular-nums wide:flex">
              <span>
                <span className="text-white">{pad(active + 1)}</span> / {pad(FEATURED.length)}
              </span>
              <span className="relative h-px flex-1 bg-pf-border">
                <span ref={barRef} className="absolute inset-0 origin-left scale-x-[0.02] bg-white" />
              </span>
            </div>
          </div>
        </div>

        <div ref={trackRef} className="project-track flex w-full flex-col gap-[clamp(28px,3.4vw,56px)] wide:w-max wide:flex-row">
          {FEATURED.map((project, i) => (
            <ProjectCard key={project.n} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
