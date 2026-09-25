import { useCallback, useEffect, useRef, useState } from 'react';
import { queueRefresh, FINE, REDUCE } from './lib/gsap';
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
import Stack from './sections/Stack';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App = () => {
  const reduceMotion = useMediaQuery(REDUCE);
  const finePointer = useMediaQuery(FINE);
  const rootRef = useRef(null);
  const orbRef = useRef(null);

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

  // Âncoras internas rolam com Lenis
  const onAnchorClick = (e) => {
    const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = rootRef.current.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(lenis, target, 1.6);
  };

  return (
    <LenisContext.Provider value={lenis}>
      <div ref={rootRef} onClick={onAnchorClick} className="relative min-h-screen overflow-x-clip bg-pf-black text-pf-text">
        {loading && <Loader onReveal={reveal} onDone={finishLoading} />}
        {finePointer && !reduceMotion && <Cursor />}
        <Background orbRef={orbRef} />
        <Navbar />
        <main className="relative z-[1]">
          <Hero revealed={revealed} reduceMotion={reduceMotion} />
          <MarqueeBand />
          <About />
          <Projects orbRef={orbRef} />
          <OtherProjects />
          <Stack />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </LenisContext.Provider>
  );
};

export default App;
