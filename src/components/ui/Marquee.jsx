import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION } from '../../lib/gsap';

// Faixa infinita. A lista é duplicada e o loop anda 50%; a velocidade do scroll
// acelera a faixa (boost = 1 + min(|v|/300, 5)) e inverte a direção quando o scroll sobe.
const Marquee = ({ items, renderItem, speed = 40, direction = 1, className = '' }) => {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const loop = gsap.fromTo(
          trackRef.current,
          { xPercent: direction === 1 ? 0 : -50 },
          { xPercent: direction === 1 ? -50 : 0, duration: speed, ease: 'none', repeat: -1 },
        );
        let settle;
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const v = self.getVelocity();
            const sign = v < 0 ? -1 : 1;
            loop.timeScale((1 + Math.min(Math.abs(v) / 300, 5)) * sign);
            clearTimeout(settle);
            settle = setTimeout(() => gsap.to(loop, { timeScale: sign, duration: 0.8, ease: 'power2.out' }), 120);
          },
        });
        return () => clearTimeout(settle);
      });
      return () => mm.revert();
    },
    { scope: trackRef, dependencies: [speed, direction] },
  );

  return (
    <div ref={trackRef} className={`flex w-max ${className}`}>
      {items.map((item, i) => renderItem(item, i, false))}
      {items.map((item, i) => renderItem(item, i + items.length, true))}
    </div>
  );
};

export default Marquee;
