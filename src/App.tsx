import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import AIPlanner from './components/AIPlanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Food from './components/Food';
import ComboSection from './components/ComboSection';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import CustomTripBuilder from './components/CustomTripBuilder';
import Footer from './components/Footer';
import MagicMode from './components/MagicMode';
import { useTranslation } from './contexts/LanguageContext';

export default function App() {
  const { t } = useTranslation();
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [initialDestination, setInitialDestination] = useState<string | undefined>(undefined);
  const [isMagicModeOpen, setIsMagicModeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navClass, setNavClass] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      const wh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      
      // Scroll Progress
      const progress = (st / (dh - wh)) * 100;
      setScrollProgress(progress);

      setScrolled(st > 80);
      setShowBackToTop(st > 700);

      // Nav Classes (Glassy vs Light)
      const sections = ['services', 'packages', 'food', 'about', 'contact'];
      let currentNavClass = st > 80 ? 'glassy' : '';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            if (id === 'services' || id === 'packages' || id === 'food' || id === 'about') {
              currentNavClass = 'light';
            }
          }
        }
      }
      setNavClass(currentNavClass);
    };

    // Intersection Observer for Reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.r').forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const openPlanner = (destination?: string) => {
    setInitialDestination(destination);
    setIsPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--cr)]">
      {/* PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 z-[9999] h-0.5 bg-gradient-to-r from-[var(--g2)] via-[var(--gold)] to-[var(--gold3)] shadow-[0_0_12px_rgba(201,168,76,0.55)] transition-[width] duration-75 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* BACK TO TOP */}
      <button 
        className={`fixed bottom-9 right-30 z-[300] w-11.5 h-11.5 rounded-full border border-[var(--gold)]/35 cursor-pointer bg-[var(--g)] shadow-[var(--sh2)] flex items-center justify-center transition-all duration-500 ease-[var(--e2)] hover:bg-[var(--g2)] hover:-translate-y-1 hover:scale-105 hover:shadow-[var(--sh3)] md:right-30 sm:right-24
          ${showBackToTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-90 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        aria-label="Back to top"
      >
        <svg className="w-3.5 h-3.5 stroke-white fill-none stroke-[2.2] stroke-round" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* FLOATING AI ORB */}
      <div 
        className="fixed bottom-8 right-8 z-[310] w-17 h-17 cursor-pointer flex items-center justify-center transition-transform duration-500 ease-[var(--e3)] hover:scale-110 hover:rotate-5 md:bottom-8 md:right-8 sm:bottom-6 sm:right-6 group"
        onClick={() => openPlanner()}
      >
        <div className="absolute top-[-30px] text-[0.6rem] font-bold text-[var(--gold)] tracking-[0.15em] uppercase whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {t.nav.aiPlanner}
        </div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--gold),var(--g))] shadow-[0_0_30px_rgba(201,168,76,0.4),inset_0_0_15px_rgba(255,255,255,0.3)]"></div>
        <div className="absolute inset-[-10px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)] animate-[orbGlow_3s_infinite_alternate]"></div>
        <div className="absolute text-xl drop-shadow-[0_0_5px_var(--gold)] animate-[orbSpin_8s_linear_infinite]">✨</div>
      </div>

      <Navbar 
        scrolled={scrolled}
        navClass={navClass}
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onOpenPlanner={() => openPlanner()} 
      />

      <main>
        <Hero onOpenMagic={() => setIsMagicModeOpen(true)} />
        <Services onOpenPlanner={(dest) => openPlanner(dest)} />
        <div className="h-px mx-[7%] bg-gradient-to-r from-transparent via-[var(--g)]/10 to-transparent"></div>
        <Packages onOpenBuilder={() => setIsBuilderOpen(true)} />
        <div className="h-px mx-[7%] bg-gradient-to-r from-transparent via-[var(--gold)]/15 to-transparent"></div>
        <Food />
        <ComboSection onOpenPlanner={(dest) => openPlanner(dest)} />
        <FAQ />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {isPlannerOpen && (
          <AIPlanner 
            isOpen={isPlannerOpen} 
            onClose={() => { setIsPlannerOpen(false); setInitialDestination(undefined); }} 
            initialDestination={initialDestination}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMagicModeOpen && (
          <MagicMode 
            isOpen={isMagicModeOpen} 
            onClose={() => setIsMagicModeOpen(false)} 
            onOpenPlanner={(dest) => openPlanner(dest)}
          />
        )}
      </AnimatePresence>

      <CustomTripBuilder 
        isOpen={isBuilderOpen} 
        onClose={() => setIsBuilderOpen(false)} 
      />

      <Footer />

      <style>{`
        @keyframes orbGlow { from { transform: scale(1); opacity: .5; } to { transform: scale(1.3); opacity: .8; } }
        @keyframes orbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .stroke-round { stroke-linecap: round; stroke-linejoin: round; }
      `}</style>
    </div>
  );
}
