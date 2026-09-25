import { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '../../lib/gsap';

// H2 com gradiente prata; cada linha sobe de dentro da máscara ao entrar na tela.
const SectionTitle = ({ lines, className = '' }) => {
  const titleRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray('[data-line]', titleRef.current).forEach((line) => {
          gsap.from(line, {
            yPercent: 110,
            rotate: 2,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: line, start: 'top 92%' },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: titleRef },
  );

  return (
    <h2 ref={titleRef} className={`m-0 font-semibold ${className}`}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <span data-line="" className="text-silver block">
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
};

export default SectionTitle;
