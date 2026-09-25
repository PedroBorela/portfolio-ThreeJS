import { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '../../lib/gsap';

// Fundo fixo: 3 orbs com blur flutuando em yoyo e a grade de 4 colunas.
// O orb A troca de cor conforme o projeto ativo (ver Projects).
const Background = ({ orbRef }) => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray('[data-orb]', rootRef.current).forEach((orb, i) => {
          gsap.to(orb, {
            xPercent: i % 2 ? -18 : 16,
            yPercent: i % 2 ? 14 : -12,
            duration: 14 + i * 4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={orbRef}
        data-orb=""
        className="absolute -left-[12vw] -top-[14vw] h-[44vw] w-[44vw] rounded-full bg-pf-indigo opacity-[0.12] blur-[120px]"
      />
      <div
        data-orb=""
        className="absolute -right-[12vw] top-[34vh] h-[36vw] w-[36vw] rounded-full bg-pf-emerald opacity-[0.07] blur-[120px]"
      />
      <div
        data-orb=""
        className="absolute -bottom-[22vw] left-[28vw] h-[40vw] w-[40vw] rounded-full bg-pf-muted-2 opacity-[0.45] blur-[140px]"
      />
      <div className="absolute inset-0 mx-auto box-content grid max-w-site grid-cols-4 px-gutter">
        <div className="border-l border-white/[0.025]" />
        <div className="border-l border-white/[0.025]" />
        <div className="border-l border-white/[0.025]" />
        <div className="border-x border-white/[0.025]" />
      </div>
    </div>
  );
};

export default Background;
