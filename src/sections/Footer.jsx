import { useRef } from 'react';
import { gsap, useGSAP, letterBounce, MOTION } from '../lib/gsap';
import { useBrasiliaClock } from '../hooks/useBrasiliaClock';
import { useLenisInstance, scrollToTarget } from '../hooks/useLenis';
import MagneticButton from '../components/ui/MagneticButton';

const EMAIL = 'pborela2014@gmail.com';
const WORDS = ['Pedro', 'Borela'];

const Footer = () => {
  const rootRef = useRef(null);
  const nameRef = useRef(null);
  const time = useBrasiliaClock('hm');
  const lenis = useLenisInstance();

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(gsap.utils.toArray('[data-foot-letter]', nameRef.current), {
          yPercent: 100,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.04,
          scrollTrigger: { trigger: nameRef.current, start: 'top 98%' },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Hover: a letra preenche e esvazia, com o pulo elástico
  const fillLetter = contextSafe((e) => {
    const letter = e.currentTarget;
    letterBounce(letter);
    gsap.fromTo(letter, { color: '#D6D9E9' }, { color: 'rgba(214,217,233,0)', duration: 1.4, ease: 'power2.out', overwrite: 'auto' });
  });

  return (
    <footer ref={rootRef} className="relative border-t border-pf-border px-gutter pb-6 pt-10">
      <div className="mx-auto max-w-site">
        <div className="flex flex-wrap items-center justify-between gap-5 text-[15px] text-pf-muted">
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${EMAIL}`} className="text-pf-muted transition-colors hover:text-white">
              {EMAIL}
            </a>
            <span aria-hidden="true">|</span>
            <span>
              Manhuaçu, MG · <span className="tabular-nums">{time}</span>
            </span>
          </div>
          <MagneticButton
            as="button"
            type="button"
            strength={0.3}
            onClick={() => scrollToTarget(lenis, 0, 2)}
            className="flex items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[15px] text-pf-text transition-colors hover:text-white"
          >
            Voltar ao topo <img src="/assets/arrow-up.png" alt="" className="h-2.5 w-2.5 -rotate-45" />
          </MagneticButton>
        </div>

        <div
          ref={nameRef}
          aria-hidden="true"
          className="mb-5 mt-[clamp(40px,6vw,72px)] flex select-none justify-between overflow-hidden pb-[0.04em] text-[clamp(56px,15.6vw,236px)] font-semibold leading-[0.86] tracking-[-0.05em]"
        >
          {WORDS.map((word, w) => (
            <span key={word} className="contents">
              {w > 0 && <span className="inline-block w-[0.2em]" />}
              {word.split('').map((letter, i) => (
                <span
                  key={i}
                  data-foot-letter=""
                  onMouseEnter={fillLetter}
                  className="inline-block text-transparent [-webkit-text-stroke:1px_#3A3A49]"
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-4 text-sm text-pf-muted">
          <span>© 2026 Pedro Borela. Todos os direitos reservados</span>
          <span>React · GSAP · Three.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
