import { useRef } from 'react';
import { gsap, useGSAP, matches, FINE, REDUCE } from '../lib/gsap';

// O elemento segue o mouse (offset × força) e volta com elastic.
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !matches(FINE) || matches(REDUCE)) return undefined;

      const onMove = contextSafe((e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
      const onLeave = contextSafe(() => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1,0.35)', overwrite: 'auto' });
      });

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return ref;
}
