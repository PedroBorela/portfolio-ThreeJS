import { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '../../lib/gsap';

// Ponto verde "disponível" com a onda (ping) em loop.
const Ping = ({ size = 8, className = '' }) => {
  const pingRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.fromTo(
          pingRef.current,
          { scale: 1, opacity: 0.75 },
          { scale: 2.2, opacity: 0, duration: 1.2, ease: 'power1.out', repeat: -1 },
        );
      });
      return () => mm.revert();
    },
    { scope: pingRef },
  );

  return (
    <span className={`relative flex ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <span ref={pingRef} className="absolute inset-0 rounded-full bg-pf-ping" />
      <span className="relative rounded-full bg-pf-green" style={{ width: size, height: size }} />
    </span>
  );
};

export default Ping;
