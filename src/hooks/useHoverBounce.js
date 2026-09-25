import { useMemo } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

// Handlers de hover para chips e ícones: scale 1.08 e y −5 com elastic.
export function useHoverBounce() {
  const { contextSafe } = useGSAP();
  return useMemo(
    () => ({
      onMouseEnter: contextSafe((e) =>
        gsap.to(e.currentTarget, { scale: 1.08, y: -5, duration: 0.9, ease: 'elastic.out(1.1,0.35)', overwrite: 'auto' }),
      ),
      onMouseLeave: contextSafe((e) =>
        gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)', overwrite: 'auto' }),
      ),
    }),
    [contextSafe],
  );
}
