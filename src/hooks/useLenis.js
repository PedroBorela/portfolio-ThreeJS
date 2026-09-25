import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const LenisContext = createContext(null);
export const useLenisInstance = () => useContext(LenisContext);

// Cria o Lenis e o sincroniza com o ScrollTrigger pelo ticker do GSAP.
export function useLenis(enabled = true) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const instance = new Lenis({ lerp: 0.085 });
    instance.on('scroll', ScrollTrigger.update);
    const raf = (time) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      setLenis(null);
    };
  }, [enabled]);

  return lenis;
}

// Rola até um alvo (seletor, elemento ou número) com Lenis, ou nativo como fallback.
export function scrollToTarget(lenis, target, duration = 1.6) {
  if (lenis) {
    lenis.scrollTo(target, { duration });
    return;
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduce ? 'auto' : 'smooth';
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior });
}
