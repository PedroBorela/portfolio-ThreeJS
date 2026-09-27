import { useRef, useState } from 'react';
import { MANIFESTO } from '../constants/portfolio';
import { gsap, useGSAP, batchFade, MOTION } from '../lib/gsap';
import { useBrasiliaClock } from '../hooks/useBrasiliaClock';
import { useHoverBounce } from '../hooks/useHoverBounce';
import GlassCard from '../components/ui/GlassCard';
import Ping from '../components/ui/Ping';

const EMAIL = 'pborela2014@gmail.com';
const FLOW = ['Webhook', 'API', 'Postgres', 'Painel'];
const CHIPS = ['Iniciação científica', 'OBI · nível sênior', '3º lugar em Extensão · V ENEPE'];

const Label = ({ children }) => <span className="text-sm text-pf-muted">{children}</span>;
const CardTitle = ({ children }) => <p className="mb-2 mt-0 text-[22px] font-semibold text-white">{children}</p>;
const CardBody = ({ children, className = '' }) => (
  <p className={`m-0 text-base leading-[1.6] text-pf-text [text-wrap:pretty] ${className}`}>{children}</p>
);

const About = () => {
  const rootRef = useRef(null);
  const manifestoRef = useRef(null);
  const flowRef = useRef(null);
  const flowDotRef = useRef(null);
  const copyIconRef = useRef(null);
  const copyTimer = useRef(null);
  const [copied, setCopied] = useState(false);
  const time = useBrasiliaClock('hms');
  const bounce = useHoverBounce();

  const { contextSafe } = useGSAP(
    () => {
      const root = rootRef.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        batchFade(root);

        // Manifesto palavra por palavra
        gsap.to(gsap.utils.toArray('[data-word]', root), {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
        });

        // Fluxo Webhook → API → Postgres → Painel: o ponto vai de etapa em etapa e acende a etapa em que chega.
        // Um timeline só, com o centro real de cada etapa (offsetLeft ignora o tilt), refeito quando o layout muda.
        const track = flowRef.current;
        const dot = flowDotRef.current;
        const nodes = gsap.utils.toArray('[data-flow-node]', track);
        let flow;
        let raf;
        const buildFlow = () => {
          flow?.revert();
          const xs = nodes.map((n) => n.offsetLeft + n.offsetWidth / 2);
          const on = { borderColor: 'rgba(255,255,255,0.35)', color: '#FFFFFF', duration: 0.25 };
          const off = { borderColor: '#1C1C21', color: '#AFB0B6', duration: 0.5 };
          flow = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
          flow.set(dot, { x: xs[0], autoAlpha: 0 }).to(nodes[0], on).to(dot, { autoAlpha: 1, duration: 0.2 }, '<');
          for (let i = 1; i < nodes.length; i++) {
            flow
              .to(dot, { x: xs[i], duration: 0.8, ease: 'power1.inOut' }, '+=0.35')
              .to(nodes[i - 1], off, '<')
              .to(nodes[i], on, '>-0.1');
          }
          flow.to(dot, { autoAlpha: 0, duration: 0.3 }, '+=0.6').to(nodes[nodes.length - 1], off, '<');
        };
        const ro = new ResizeObserver(() => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(buildFlow);
        });
        [track, ...nodes].forEach((el) => ro.observe(el));
        return () => {
          ro.disconnect();
          cancelAnimationFrame(raf);
          flow?.revert();
        };
      });
      // Sem movimento: o manifesto aparece inteiro
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(gsap.utils.toArray('[data-word]', root), { opacity: 1 });
      });
      return () => {
        mm.revert();
        clearTimeout(copyTimer.current);
      };
    },
    { scope: rootRef },
  );

  const copyEmail = contextSafe(() => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    gsap.fromTo(copyIconRef.current, { scale: 0.4, rotate: -30 }, { scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1,0.35)' });
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  });

  return (
    <section ref={rootRef} id="about" className="px-gutter pb-section-end pt-section">
      <div className="mx-auto max-w-site">
        <div data-fade="" className="flex justify-between gap-4 text-sm text-pf-muted">
          <span>02 · Sobre</span>
          <span>Quem sou</span>
        </div>
        <p
          ref={manifestoRef}
          className="mb-0 mt-10 max-w-[1120px] text-[clamp(28px,4.2vw,60px)] font-medium leading-[1.12] tracking-[-0.025em] text-white"
        >
          {MANIFESTO.map((word, i) => (
            <span key={i} data-word="" className="mr-[0.24em] inline-block opacity-[0.14]">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-[clamp(64px,8vw,104px)] grid grid-cols-1 gap-5 wide:grid-cols-3">
          {/* Origenow */}
          <div data-fade="" className="wide:col-span-2">
            <GlassCard tilt={4} className="flex h-full flex-col gap-10 p-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pf-logo p-2">
                  <img src="/assets/logos/origenow.webp" alt="Logo da Origenow" className="h-full w-full object-contain" />
                </div>
                <Label>Origenow · 2026 até hoje</Label>
              </div>
              <div ref={flowRef} className="relative flex items-center justify-between gap-2">
                <div className="absolute inset-x-0 top-1/2 h-px bg-pf-border" />
                <span
                  ref={flowDotRef}
                  aria-hidden="true"
                  className="invisible absolute left-0 top-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full bg-pf-green shadow-[0_0_16px_#22C55E]"
                />
                {FLOW.map((node) => (
                  <span
                    key={node}
                    data-flow-node=""
                    className="relative whitespace-nowrap rounded-full border border-pf-border bg-pf-surface px-2.5 py-1.5 text-xs text-pf-text sm:px-3.5 sm:py-2 sm:text-sm"
                  >
                    {node}
                  </span>
                ))}
              </div>
              <div>
                <CardTitle>Do webhook ao painel</CardTitle>
                <CardBody className="max-w-[640px]">
                  Como desenvolvedor full-stack, crio os sistemas internos que conectam as ferramentas de operação, comunicação e
                  mídia da empresa: os dados chegam por webhook, passam pelas APIs, ficam no PostgreSQL e viram painéis para o time.
                  Também desenvolvo sites e landing pages para clientes de e-commerce e marketplaces.
                </CardBody>
              </div>
            </GlassCard>
          </div>

          {/* Relógio */}
          <div data-fade="">
            <GlassCard tilt={6} className="flex h-full flex-col justify-between gap-8 p-card">
              <div className="relative h-32 w-32 self-end" aria-hidden="true">
                <span className="absolute inset-0 rounded-full border border-white/5" />
                <span className="absolute inset-[22px] rounded-full border border-white/[0.08]" />
                <span className="absolute inset-[44px] rounded-full border border-white/[0.12]" />
                <Ping size={12} className="absolute left-[58px] top-[58px]" />
              </div>
              <div>
                <p className="m-0 text-[clamp(40px,4.4vw,60px)] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums">
                  {time}
                </p>
                <p className="mb-5 mt-2 text-sm text-pf-muted">Horário de Brasília · 20°15′S 42°01′W</p>
                <CardTitle>Manhuaçu, Minas Gerais</CardTitle>
                <CardBody>Atuo presencialmente em Manhuaçu e de forma remota em outros projetos.</CardBody>
              </div>
            </GlassCard>
          </div>

          {/* Formação */}
          <div data-fade="">
            <GlassCard tilt={6} className="flex h-full flex-col gap-8 p-card">
              <div className="h-14 w-14 rounded-2xl bg-white p-2">
                <img src="/assets/logos/if-sudeste-mg-vertical.svg" alt="Logo do IF Sudeste MG" className="h-full w-full object-contain" />
              </div>
              <div>
                <CardTitle>Formação e atuação técnica</CardTitle>
                <CardBody>
                  Sou técnico em Redes e graduando em Sistemas de Informação no IF Sudeste MG. Trabalho principalmente com React,
                  Next.js, Node.js, Three.js e GSAP.
                </CardBody>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {CHIPS.map((chip) => (
                  <span
                    key={chip}
                    {...bounce}
                    className="rounded-full border border-pf-border bg-pf-surface px-3 py-1.5 text-[13px] text-pf-text"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Pesquisa */}
          <div data-fade="" className="wide:col-span-2">
            <GlassCard tilt={3} className="flex h-full flex-col justify-between gap-10 p-card">
              <Label>Pesquisa · IF Sudeste MG</Label>
              <div>
                <CardTitle>Trabalho e pesquisa</CardTitle>
                <CardBody className="max-w-[720px]">
                  Durante o curso de Sistemas de Informação, participei de pesquisas sobre jogos digitais aplicados ao ensino de inglês
                  e do desenvolvimento de uma plataforma de realidade virtual, apresentada em Salvador. Na disciplina de Engenharia de
                  Software III, desenvolvi um projeto sobre o uso de modelos de linguagem na geração de cenários Gherkin.
                </CardBody>
              </div>
            </GlassCard>
          </div>

          {/* E-mail (copiar) */}
          <div data-fade="" className="wide:col-span-3">
            <GlassCard
              as="button"
              type="button"
              tilt={2}
              glowSize={520}
              glowAlpha={0.08}
              onClick={copyEmail}
              data-cursor={copied ? 'Copiado' : 'Copiar'}
              aria-label={`Copiar o e-mail ${EMAIL}`}
              className="flex w-full cursor-pointer flex-col items-center gap-4 px-card py-[clamp(28px,4vw,56px)] text-center"
            >
              <span className="text-base text-pf-text" aria-live="polite">
                {copied ? 'E-mail copiado!' : 'Contato direto · clique para copiar'}
              </span>
              <span className="flex max-w-full items-center gap-[clamp(12px,1.6vw,20px)]">
                <span ref={copyIconRef} className="relative h-[clamp(24px,2.6vw,36px)] w-[clamp(24px,2.6vw,36px)] flex-none">
                  <img
                    src="/assets/copy.svg"
                    alt=""
                    className={`absolute inset-0 h-full w-full ${copied ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <img
                    src="/assets/tick.svg"
                    alt=""
                    className={`absolute inset-0 h-full w-full ${copied ? 'opacity-100' : 'opacity-0'}`}
                  />
                </span>
                <span className="text-silver text-[clamp(24px,5.2vw,76px)] font-semibold leading-none tracking-[-0.04em] [overflow-wrap:anywhere]">
                  {EMAIL}
                </span>
              </span>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
