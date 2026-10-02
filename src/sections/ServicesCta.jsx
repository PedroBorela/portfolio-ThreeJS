import { useRef } from 'react';
import { SERVICES } from '../constants/portfolio';
import { gsap, useGSAP, batchFade, MOTION } from '../lib/gsap';
import GlassCard from '../components/ui/GlassCard';
import MagneticButton from '../components/ui/MagneticButton';
import Ping from '../components/ui/Ping';
import SectionTitle from '../components/ui/SectionTitle';

// Chamada para a página /servicos, logo depois dos projetos: quem acabou de ver o trabalho já sabe o que contratar.
const ServicesCta = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => batchFade(rootRef.current));
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} aria-label="Serviços" className="px-gutter pt-[clamp(96px,12vw,160px)]">
      <GlassCard
        tilt={1.5}
        glowSize={620}
        data-fade=""
        className="mx-auto grid max-w-site grid-cols-1 items-end gap-10 p-[clamp(28px,4vw,56px)] wide:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
      >
        <div className="relative">
          <span className="mb-4 flex items-center gap-2.5 text-sm text-pf-muted">
            <Ping size={8} />
            Agenda aberta para novos projetos
          </span>
          <SectionTitle
            lines={['Quer um projeto', 'como esses?']}
            className="text-[clamp(36px,4.6vw,68px)] leading-none tracking-[-0.04em]"
          />
          <p className="mb-0 mt-6 max-w-[460px] text-base leading-[1.6] text-pf-text [text-wrap:pretty]">
            Desenvolvo landing pages e sistemas sob medida para marcas, negócios locais e operações de e-commerce.
          </p>
        </div>

        <div className="relative flex flex-col gap-6">
          <ul className="m-0 flex list-none flex-col p-0">
            {SERVICES.map((service) => (
              <li key={service.id} className="border-t border-pf-border last:border-b">
                <a
                  href="/servicos"
                  className="group flex items-center justify-between gap-4 py-4 text-lg text-pf-text-strong transition-colors hover:text-white"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 shrink-0 text-sm text-pf-muted tabular-nums">{service.n}</span>
                    {service.name}
                  </span>
                  <img
                    src="/assets/arrow-up.png"
                    alt=""
                    className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:rotate-45 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <MagneticButton
            href="/servicos"
            strength={0.2}
            className="flex min-h-14 items-center justify-center gap-3 rounded-md bg-pf-silver px-6 text-base font-medium text-pf-black transition-colors hover:bg-white"
          >
            Conheça os serviços
            <img src="/assets/arrow-up.png" alt="" className="h-3 w-3 brightness-0" />
          </MagneticButton>
        </div>
      </GlassCard>
    </section>
  );
};

export default ServicesCta;
