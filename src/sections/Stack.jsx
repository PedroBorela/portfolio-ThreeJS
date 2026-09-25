import { useRef } from 'react';
import { GROUPS, T } from '../constants/portfolio';
import { gsap, useGSAP, batchFade, MOTION } from '../lib/gsap';
import { useHoverBounce } from '../hooks/useHoverBounce';
import Marquee from '../components/ui/Marquee';
import SectionTitle from '../components/ui/SectionTitle';

const ROW_1 = [T.react, T.next, T.ts, T.js, T.tailwind, T.gsap, T.three, T.shadcn, T.node];
const ROW_2 = [T.express, T.postgres, T.supabase, T.python, T.vite, T.vercel, T.cloudflare, T.actions, T.figma];

const StackPill = ({ tech, clone, bounce }) => (
  <span className="flex pr-4" aria-hidden={clone || undefined}>
    <span
      {...bounce}
      className="blur-glass flex items-center gap-3.5 rounded-full border border-white/[0.08] bg-white/[0.04] py-4 pl-[18px] pr-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      <span className="box-content flex h-10 w-10 items-center justify-center rounded-full border border-pf-border bg-pf-surface">
        <img src={tech.path} alt="" loading="lazy" className="h-5 w-5" />
      </span>
      <span className="whitespace-nowrap text-[clamp(18px,1.8vw,24px)] font-medium text-pf-text-strong">{tech.name}</span>
    </span>
  </span>
);

const Stack = () => {
  const rootRef = useRef(null);
  const bounce = useHoverBounce();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => batchFade(rootRef.current));
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const renderPill = (tech, i, clone) => <StackPill key={i} tech={tech} clone={clone} bounce={bounce} />;

  return (
    <section ref={rootRef} id="stack" className="pb-section-end pt-section">
      <div className="mx-auto box-content max-w-site px-gutter">
        <span data-fade="" className="mb-4 block text-sm text-pf-muted">
          04 · Stack
        </span>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle lines={['Stack e ferramentas']} className="text-[clamp(40px,5.4vw,80px)] leading-none tracking-[-0.04em]" />
          <p data-fade="" className="m-0 max-w-[400px] text-base leading-[1.6] text-pf-text">
            Tecnologias que utilizo no desenvolvimento de interfaces, APIs, bancos de dados e deploys.
          </p>
        </div>
      </div>

      <div className="mt-[clamp(48px,6vw,72px)] flex flex-col gap-4 overflow-hidden py-3">
        <Marquee items={ROW_1} speed={44} direction={1} renderItem={renderPill} />
        <Marquee items={ROW_2} speed={50} direction={-1} renderItem={renderPill} />
      </div>

      <div className="mx-auto mt-[clamp(48px,6vw,72px)] box-content grid max-w-site grid-cols-1 gap-5 px-gutter wide:grid-cols-3">
        {GROUPS.map((group) => (
          <div key={group.n} data-fade="" className="border-t border-pf-border pt-6">
            <span className="text-sm text-pf-muted">{group.n}</span>
            <h3 className="mb-2 mt-3 text-[22px] font-semibold text-white">{group.title}</h3>
            <p className="mb-3 mt-0 text-base leading-[1.6] text-pf-text">{group.description}</p>
            <p className="m-0 text-sm leading-[1.6] text-pf-muted">{group.items.map((item) => item.name).join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
