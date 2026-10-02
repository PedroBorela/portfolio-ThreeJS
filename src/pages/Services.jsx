import { useEffect, useRef, useState } from 'react';
import { FEATURED, PROCESS, SERVICES } from '../constants/portfolio';
import { gsap, useGSAP, batchFade, MOTION } from '../lib/gsap';
import GlassCard from '../components/ui/GlassCard';
import MagneticButton from '../components/ui/MagneticButton';
import Ping from '../components/ui/Ping';
import SectionTitle from '../components/ui/SectionTitle';
import Contact from '../sections/Contact';

const TITLE = ['Sites e sistemas', 'que trabalham', 'por você.'];
const byTitle = (title) => FEATURED.find((project) => project.title === title);
const CASES = [...new Set(SERVICES.flatMap((service) => service.cases))].map(byTitle).filter(Boolean);

const ServiceCard = ({ service, onChoose }) => (
  <GlassCard
    as="article"
    tilt={2}
    data-fade=""
    className={`flex flex-col p-card ${service.featured ? 'border-white/[0.16] bg-white/[0.06]' : ''}`}
  >
    <div className="relative flex items-center justify-between gap-4 text-sm text-pf-muted">
      <span className="tabular-nums">{service.n}</span>
      {service.featured && (
        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[13px] text-white">
          <Ping size={6} />
          Experiência completa
        </span>
      )}
    </div>
    <h3 className="relative mb-3 mt-6 text-[clamp(26px,2.4vw,34px)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
      {service.name}
    </h3>
    <p className="relative m-0 text-base leading-[1.6] text-pf-text [text-wrap:pretty]">{service.tagline}</p>

    <ul className="relative mb-0 mt-7 flex list-none flex-col gap-3 border-t border-pf-border p-0 pt-6">
      {service.includes.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-pf-text-strong">
          <img src="/assets/tick.svg" alt="" className="mt-[5px] h-3 w-3 flex-none" />
          {item}
        </li>
      ))}
    </ul>

    <p className="relative mb-0 mt-7 text-sm leading-[1.6] text-pf-muted">
      <span className="text-pf-text">Ideal para:</span> {service.idealFor}
    </p>

    {service.cases.length > 0 && (
      <p className="relative mb-0 mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-pf-muted">
        Exemplos:
        {service.cases.map(byTitle).filter(Boolean).map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="text-pf-text underline decoration-pf-muted-2 underline-offset-4 transition-colors hover:text-white"
          >
            {project.title}
          </a>
        ))}
      </p>
    )}

    <div className="relative mt-auto pt-8">
      <a
        href="#contact"
        onClick={() => onChoose(service.id)}
        className={`flex min-h-14 items-center justify-center gap-3 rounded-lg px-5 text-base text-white transition-colors ${
          service.featured ? 'bg-pf-muted-2 hover:bg-[#4A4A5C]' : 'border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
        }`}
      >
        Quero este serviço<span className="sr-only">: {service.name}</span>
        <img src="/assets/arrow-up.png" alt="" className="h-3 w-3" />
      </a>
    </div>
  </GlassCard>
);

// Página /servicos: oferta, processo, projetos de exemplo e formulário com o serviço pré-selecionado.
const Services = ({ revealed }) => {
  const rootRef = useRef(null);
  const introRef = useRef(null);
  const [service, setService] = useState('');

  useGSAP(
    () => {
      const root = rootRef.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        batchFade(root);
        // Intro do topo: pausado até o loader liberar, como no Hero
        introRef.current = gsap
          .timeline({ paused: true })
          .fromTo('[data-svc-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.07 })
          .fromTo('[data-svc-fade]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08 }, '-=0.9');
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

  return (
    <div ref={rootRef}>
      <section className="relative px-gutter pb-[clamp(72px,9vw,120px)] pt-[clamp(140px,16vw,200px)]">
        <div className="mx-auto max-w-site">
          <div data-svc-fade="" className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm text-pf-muted">
            <span>Serviços</span>
            <span className="flex items-center gap-2.5">
              <Ping size={8} />
              Agenda aberta para novos projetos
            </span>
          </div>
          <h1 className="m-0 text-[clamp(52px,9.6vw,148px)] font-semibold leading-[0.92] tracking-[-0.05em]">
            {TITLE.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-svc-line="" className="text-silver block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="mt-10 grid grid-cols-1 items-end gap-8 wide:grid-cols-[minmax(0,1fr)_auto]">
            <p data-svc-fade="" className="m-0 max-w-[560px] text-lg leading-[1.6] text-pf-text [text-wrap:pretty]">
              Do primeiro site da sua marca ao sistema que organiza a operação inteira. Desenvolvimento sob medida, com o
              mesmo cuidado dos projetos que já estão no ar.
            </p>
            <div data-svc-fade="" className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#contact"
                strength={0.3}
                className="blur-glass-sat flex items-center gap-3.5 rounded-md border border-white/[0.12] bg-white/[0.06] px-6 py-4 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <Ping size={10} />
                Pedir orçamento
              </MagneticButton>
              <MagneticButton
                href="/#projects"
                strength={0.3}
                className="flex items-center gap-2.5 px-4 py-4 text-base text-pf-text transition-colors hover:text-white"
              >
                Ver projetos
                <img src="/assets/arrow-up.png" alt="" className="h-3 w-3" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section id="planos" aria-labelledby="planos-title" className="px-gutter pb-section">
        <div className="mx-auto max-w-site">
          <div data-fade="" className="mb-6 flex justify-between gap-4 text-sm text-pf-muted">
            <h2 id="planos-title" className="m-0 text-sm font-normal">
              01 · O que eu faço
            </h2>
            <span>Orçamento sob medida para cada projeto</span>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 wide:grid-cols-3">
            {SERVICES.map((item) => (
              <ServiceCard key={item.id} service={item} onChoose={setService} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-gutter pb-section">
        <div className="mx-auto max-w-site">
          <span data-fade="" className="mb-4 block text-sm text-pf-muted">
            02 · Como funciona
          </span>
          <SectionTitle lines={['Do primeiro contato', 'ao site no ar']} className="text-[clamp(40px,5.4vw,80px)] leading-none tracking-[-0.04em]" />
          <ol className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none grid-cols-1 gap-x-7 gap-y-10 p-0 wide:grid-cols-4">
            {PROCESS.map((step) => (
              <li key={step.n} data-fade="" className="border-t border-pf-border pt-6">
                <span className="text-sm text-pf-muted tabular-nums">{step.n}</span>
                <h3 className="mb-2 mt-3 text-[22px] font-semibold text-white">{step.title}</h3>
                <p className="m-0 text-base leading-[1.6] text-pf-text [text-wrap:pretty]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {CASES.length > 0 && (
        <section aria-labelledby="casos-title" className="px-gutter">
          <div className="mx-auto max-w-site">
            <div data-fade="" className="mb-6 flex justify-between gap-4 text-sm text-pf-muted">
              <h2 id="casos-title" className="m-0 text-sm font-normal">
                03 · Projetos de exemplo
              </h2>
              <a href="/#projects" className="text-pf-text transition-colors hover:text-white">
                Ver todos
              </a>
            </div>
            <div className="grid grid-cols-1 gap-5 wide:grid-cols-3">
              {CASES.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  data-fade=""
                  data-cursor="Visitar"
                  className="group block rounded-lg border border-white/[0.09] bg-white/[0.04] p-2.5 transition-colors hover:border-white/20"
                >
                  <div className="relative aspect-[1600/949] overflow-hidden rounded-md bg-pf-surface">
                    <img
                      src={project.img}
                      alt={`Página inicial do site ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-4 px-1.5 pb-1 pt-4">
                    <div className="min-w-0">
                      <span className="block truncate text-[13px] text-pf-muted">{project.kind}</span>
                      <span className="mt-1 block text-lg font-semibold text-white">{project.title}</span>
                    </div>
                    <img src="/assets/arrow-up.png" alt="" className="mb-1.5 h-3 w-3 flex-none opacity-70" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact
        label="04 · Contato"
        titleLines={['Vamos tirar', 'a ideia do papel?']}
        intro="Escolha o serviço, conte um pouco sobre o projeto e eu respondo com os próximos passos. Se preferir, chame por e-mail."
        service={service}
        onServiceChange={setService}
        servicesLink={false}
      />
    </div>
  );
};

export default Services;
