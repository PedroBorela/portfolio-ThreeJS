import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger, queueRefresh, FINE, REDUCE } from './lib/gsap';
import { ROUTES, navigate, resolveRoute, usePath } from './lib/router';
import { useMediaQuery } from './hooks/useMediaQuery';
import { LenisContext, useLenis, scrollToTarget } from './hooks/useLenis';
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import Background from './components/ui/Background';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import MarqueeBand from './sections/MarqueeBand';
import About from './sections/About';
import Projects from './sections/Projects';
import OtherProjects from './sections/OtherProjects';
import ServicesCta from './sections/ServicesCta';
import Stack from './sections/Stack';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Services from './pages/Services';

const App = () => {
  const reduceMotion = useMediaQuery(REDUCE);
  const finePointer = useMediaQuery(FINE);
  const rootRef = useRef(null);
  const orbRef = useRef(null);
  const pendingHash = useRef(null);
  const path = resolveRoute(usePath());

  // Com prefers-reduced-motion não há loader, Lenis nem cursor customizado
  const [loading, setLoading] = useState(!reduceMotion);
  const [revealed, setRevealed] = useState(reduceMotion);
  const lenis = useLenis(!reduceMotion);

  const reveal = useCallback(() => setRevealed(true), []);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (!lenis) return;
    if (loading) lenis.stop();
    else lenis.start();
  }, [lenis, loading]);

  // Recalcula o ScrollTrigger depois de fontes e imagens
  useEffect(() => {
    const root = rootRef.current;
    const onLoad = (e) => {
      if (e.target instanceof HTMLImageElement) queueRefresh();
    };
    root.addEventListener('load', onLoad, true);
    window.addEventListener('load', onLoad);
    document.fonts?.ready.then(() => queueRefresh());
    const timer = setTimeout(() => queueRefresh(), 800);
    return () => {
      root.removeEventListener('load', onLoad, true);
      window.removeEventListener('load', onLoad);
      clearTimeout(timer);
    };
  }, []);

  // Troca de página: volta ao topo e, se o link tinha âncora (ex.: /#projects), rola até ela
  // depois que as seções novas criaram os ScrollTriggers.
  const prevPath = useRef(path);
  useEffect(() => {
    if (prevPath.current === path) return undefined;
    prevPath.current = path;
    const hash = pendingHash.current;
    pendingHash.current = null;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    if (!hash) return undefined;
    const raf = requestAnimationFrame(() => {
      const target = rootRef.current.querySelector(hash);
      if (target) scrollToTarget(lenis, target, 1.4);
    });
    return () => cancelAnimationFrame(raf);
  }, [path, lenis]);

  // Links internos: âncoras rolam com Lenis e caminhos (/servicos, /#about) trocam de página sem recarregar
  const onLinkClick = (e) => {
    const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!link || link.target === '_blank' || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    const linkPath = resolveRoute(url.pathname.replace(/\/+$/, '') || ROUTES.home);

    if (linkPath !== path) {
      e.preventDefault();
      pendingHash.current = url.hash.length > 1 ? url.hash : null;
      navigate(linkPath + url.hash);
      return;
    }
    if (url.hash.length < 2) return;
    const target = rootRef.current.querySelector(url.hash);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(lenis, target, 1.6);
  };

  return (
    <LenisContext.Provider value={lenis}>
      <div ref={rootRef} onClick={onLinkClick} className="relative min-h-screen overflow-x-clip bg-pf-black text-pf-text">
        {loading && <Loader onReveal={reveal} onDone={finishLoading} />}
        {finePointer && !reduceMotion && <Cursor />}
        <Background orbRef={orbRef} />
        <Navbar path={path} />
        <main className="relative z-[1]">
          {path === ROUTES.services ? (
            <Services revealed={revealed} />
          ) : (
            <>
              <Hero revealed={revealed} reduceMotion={reduceMotion} />
              <MarqueeBand />
              <About />
              <Projects orbRef={orbRef} />
              <OtherProjects />
              <ServicesCta />
              <Stack />
              <Experience />
              <Contact />
            </>
          )}
          <Footer />
        </main>
      </div>
    </LenisContext.Provider>
  );
};

export default App;
