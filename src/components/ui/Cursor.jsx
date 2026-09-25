import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

const INTERACTIVE = 'a,button,input,textarea,[data-letter],[data-foot-letter],[data-exp]';

// Cursor customizado: ponto (difference) + anel com label para [data-cursor].
// Só é montado com (pointer: fine) e sem prefers-reduced-motion (ver App).
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useGSAP((_, contextSafe) => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const html = document.documentElement;
    html.classList.add('pb-cursor');

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { scale: 0.45 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    let placed = false;
    let visible = false;
    let labelTarget = null;

    const onMove = contextSafe((e) => {
      if (!placed) {
        placed = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
      }
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    });

    const onOver = contextSafe((e) => {
      const el = e.target instanceof Element ? e.target : null;
      const withLabel = el?.closest('[data-cursor]');
      const interactive = el?.closest(INTERACTIVE);
      labelTarget = withLabel ?? null;

      if (withLabel) {
        label.textContent = withLabel.getAttribute('data-cursor');
        gsap.to(ring, { scale: 1, backgroundColor: 'rgba(255,255,255,0.92)', borderColor: 'rgba(255,255,255,0)', duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.08, overwrite: 'auto' });
        gsap.to(dot, { scale: 0, duration: 0.3, overwrite: 'auto' });
      } else if (interactive) {
        gsap.to(ring, { scale: 0.72, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.6)', duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(label, { opacity: 0, duration: 0.2, overwrite: 'auto' });
        gsap.to(dot, { scale: 1, duration: 0.3, overwrite: 'auto' });
      } else {
        gsap.to(ring, { scale: 0.45, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0.35)', duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(label, { opacity: 0, duration: 0.2, overwrite: 'auto' });
        gsap.to(dot, { scale: 1, duration: 0.3, overwrite: 'auto' });
      }
    });

    const onLeave = contextSafe(() => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    });

    // Mantém a label em dia quando o data-cursor muda sob o mouse (ex.: Copiar → Copiado)
    const observer = new MutationObserver(() => {
      if (labelTarget) label.textContent = labelTarget.getAttribute('data-cursor');
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['data-cursor'] });

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    html.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      html.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
      html.classList.remove('pb-cursor');
    };
  });

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[92] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[91] box-content flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/35 opacity-0 backdrop-blur-[6px]"
      >
        <span ref={labelRef} className="whitespace-nowrap text-sm font-semibold text-pf-black opacity-0" />
      </div>
    </>
  );
};

export default Cursor;
