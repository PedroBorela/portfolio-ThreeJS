import { useEffect, useRef, useState } from 'react';
import { NAV } from '../constants/portfolio';
import { gsap, ScrollTrigger, useGSAP, matches, REDUCE, WIDE } from '../lib/gsap';
import { useBrasiliaClock } from '../hooks/useBrasiliaClock';
import { useLenisInstance } from '../hooks/useLenis';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MagneticButton from '../components/ui/MagneticButton';
import Ping from '../components/ui/Ping';

const EMAIL = 'pborela2014@gmail.com';

const Navbar = ({ path }) => {
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const bgRef = useRef(null);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const menuTl = useRef(null);
  const [open, setOpen] = useState(false);
  const time = useBrasiliaClock('hm');
  const lenis = useLenisInstance();
  const wide = useMediaQuery(WIDE);

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

      // Menu mobile: cortina em clip-path, links sobem da máscara e o sanduíche vira X
      const menu = menuRef.current;
      menuTl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          menu,
          { clipPath: 'inset(0% 0% 100% 0%)', visibility: 'hidden' },
          { clipPath: 'inset(0% 0% 0% 0%)', visibility: 'visible', duration: 0.8, ease: 'expo.inOut' },
        )
        .fromTo('[data-burger="top"]', { y: -3, rotate: 0 }, { y: 0, rotate: 45, duration: 0.5, ease: 'power3.inOut' }, 0)
        .fromTo('[data-burger="bottom"]', { y: 3, rotate: 0 }, { y: 0, rotate: -45, duration: 0.5, ease: 'power3.inOut' }, 0)
        .fromTo(
          gsap.utils.toArray('[data-menu-line]', menu),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 },
          '-=0.35',
        )
        .fromTo(menu.querySelector('[data-menu-foot]'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.7');
    },
    { scope: rootRef },
  );

  // Abre/fecha: anima, trava o scroll e cuida do foco
  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return undefined;
    if (matches(REDUCE)) tl.progress(open ? 1 : 0).pause();
    else if (open) tl.timeScale(1).play();
    else tl.timeScale(1.4).reverse();

    if (!open) return undefined;
    gsap.to(navRef.current, { yPercent: 0, duration: 0.4, overwrite: 'auto' });
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => menuRef.current?.querySelector('a')?.focus({ preventScroll: true }), 300);
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      if (lenis) lenis.start();
      else document.documentElement.style.overflow = '';
    };
  }, [open, lenis]);

  // Ao passar para o layout de desktop o menu mobile fecha
  useEffect(() => {
    if (wide) setOpen(false);
  }, [wide]);

  // Fecha antes da rolagem da âncora (tratada no App): o Lenis precisa voltar a rolar já
  const closeMenu = () => {
    if (!open) return;
    lenis?.start();
    document.documentElement.style.overflow = '';
    setOpen(false);
  };

  // Hover dos links: o texto rola para cima e revela a cópia branca
  const roll = contextSafe((e, yPercent) => {
    gsap.to(e.currentTarget.querySelectorAll('[data-roll]'), { yPercent, duration: 0.45, ease: 'power3.out' });
  });

  return (
    <div ref={rootRef}>
      <header ref={navRef} className="fixed inset-x-0 top-0 z-50 px-gutter py-4">
        <div
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-6 top-0 bg-gradient-to-b from-[rgba(1,1,3,0.92)] to-[rgba(1,1,3,0)] opacity-0"
        />
        <div className="relative mx-auto grid max-w-site grid-cols-[minmax(0,1fr)_auto] items-center gap-4 wide:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <MagneticButton
            href="/#home"
            strength={0.25}
            onClick={closeMenu}
            className="flex items-center gap-2.5 justify-self-start whitespace-nowrap text-xl font-bold text-[#A3A3A3] transition-colors hover:text-white"
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
                aria-current={link.href === path ? 'page' : undefined}
                onMouseEnter={(e) => roll(e, -100)}
                onMouseLeave={(e) => roll(e, 0)}
                className="block rounded-full px-4 py-2 text-[15px] text-[#A3A3A3] transition-colors hover:bg-white/[0.06] aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-white"
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
              className="blur-glass hidden items-center gap-2.5 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] text-white wide:flex"
            >
              <Ping size={8} />
              Vamos conversar
            </MagneticButton>
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="blur-glass relative flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 wide:hidden"
            >
              <span data-burger="top" aria-hidden="true" className="absolute h-[1.5px] w-[18px] bg-white" />
              <span data-burger="bottom" aria-hidden="true" className="absolute h-[1.5px] w-[18px] bg-white" />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        inert={!open}
        className="invisible fixed inset-0 z-[49] flex flex-col justify-between overflow-y-auto bg-pf-black/95 px-gutter pb-8 pt-28 backdrop-blur-[20px] [clip-path:inset(0%_0%_100%_0%)] wide:hidden"
      >
        <nav aria-label="Menu">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {NAV.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-pf-border">
                <a href={link.href} onClick={closeMenu} aria-current={link.href === path ? 'page' : undefined} className="block py-3">
                  <span data-menu-line="" className="flex items-baseline gap-4">
                    <span className="w-6 shrink-0 text-sm text-pf-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-silver text-[clamp(40px,11vw,64px)] font-semibold leading-[1.05] tracking-[-0.04em]">
                      {link.name}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div data-menu-foot="" className="mt-10 flex flex-col gap-6">
          <div className="flex flex-wrap justify-between gap-3 text-[15px] text-pf-muted">
            <span>
              Manhuaçu, MG · <span className="text-pf-text tabular-nums">{time}</span>
            </span>
            <a href={`mailto:${EMAIL}`} className="text-pf-text transition-colors hover:text-white">
              {EMAIL}
            </a>
          </div>
          <a
            href="#contact"
            onClick={closeMenu}
            className="blur-glass-sat flex items-center justify-center gap-3 rounded-md border border-white/[0.12] bg-white/[0.06] px-6 py-4 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Ping size={10} />
            Vamos conversar
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
