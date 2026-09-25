import { useRef } from 'react';
import { NAV } from '../constants/portfolio';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useBrasiliaClock } from '../hooks/useBrasiliaClock';
import MagneticButton from '../components/ui/MagneticButton';
import Ping from '../components/ui/Ping';

const Navbar = () => {
  const navRef = useRef(null);
  const bgRef = useRef(null);
  const time = useBrasiliaClock('hm');

  const { contextSafe } = useGSAP(
    () => {
      // Esconde ao rolar para baixo depois de 500px; ganha fundo a partir de 40px
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          gsap.to(navRef.current, { yPercent: self.direction === 1 && y > 500 ? -140 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
          gsap.to(bgRef.current, { opacity: y > 40 ? 1 : 0, duration: 0.4, overwrite: 'auto' });
        },
      });
    },
    { scope: navRef },
  );

  // Hover dos links: o texto rola para cima e revela a cópia branca
  const roll = contextSafe((e, yPercent) => {
    gsap.to(e.currentTarget.querySelectorAll('[data-roll]'), { yPercent, duration: 0.45, ease: 'power3.out' });
  });

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50 px-gutter py-4">
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 top-0 bg-gradient-to-b from-[rgba(1,1,3,0.92)] to-[rgba(1,1,3,0)] opacity-0"
      />
      <div className="relative mx-auto grid max-w-site grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
        <MagneticButton
          href="#home"
          strength={0.25}
          className="flex items-center gap-2.5 justify-self-start text-xl font-bold text-[#A3A3A3] transition-colors hover:text-white"
        >
          Pedro Borela
        </MagneticButton>

        <nav
          aria-label="Principal"
          className="blur-glass-sat hidden items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] wide:flex"
        >
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={(e) => roll(e, -100)}
              onMouseLeave={(e) => roll(e, 0)}
              className="block rounded-full px-4 py-2 text-[15px] text-[#A3A3A3] transition-colors hover:bg-white/[0.06]"
            >
              <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
                <span data-roll="" className="block">
                  {link.name}
                </span>
                <span data-roll="" aria-hidden="true" className="absolute left-0 top-full block text-white">
                  {link.name}
                </span>
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 justify-self-end">
          <span className="hidden gap-1.5 text-sm text-pf-muted tabular-nums wide:flex">
            Manhuaçu <span className="text-pf-text">{time}</span>
          </span>
          <MagneticButton
            href="#contact"
            strength={0.3}
            className="blur-glass flex items-center gap-2.5 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] text-white"
          >
            <Ping size={8} />
            Vamos conversar
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
