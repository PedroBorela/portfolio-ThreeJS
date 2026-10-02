import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Breakpoints e preferências usados com gsap.matchMedia()
export const WIDE = '(min-width: 861px) and (min-height: 720px)';
export const NARROW = '(max-width: 860px), (max-height: 719px)';
export const REDUCE = '(prefers-reduced-motion: reduce)';
export const MOTION = '(prefers-reduced-motion: no-preference)';
export const FINE = '(pointer: fine)';

export const matches = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

// Reveal dos [data-fade] de um escopo: y 40→0 em lote, com stagger
export function batchFade(scope) {
  const items = gsap.utils.toArray('[data-fade]', scope);
  if (!items.length) return;
  gsap.set(items, { y: 40, opacity: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 92%',
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
}

// Pulo elástico das letras (hero e footer)
export function letterBounce(el) {
  if (el._bounce) return;
  el._bounce = gsap
    .timeline({ onComplete: () => { el._bounce = null; } })
    .to(el, { yPercent: -16, scaleY: 1.06, duration: 0.2, ease: 'power2.out' })
    .to(el, { yPercent: 0, scaleY: 1, duration: 1.1, ease: 'elastic.out(1,0.28)' });
}

// Debounce do ScrollTrigger.refresh() (imagens, fontes, acordeão)
let refreshTimer;
export function queueRefresh(delay = 200) {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), delay);
}

export { gsap, ScrollTrigger, useGSAP };
