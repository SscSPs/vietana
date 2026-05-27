import React from 'react';
import { NAV_LINKS, WHATSAPP_DEFAULT } from '../config';
import { useTranslation } from '../contexts/LanguageContext';
import './Navbar.css';

interface NavbarProps {
  scrolled: boolean;
  navClass: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, navClass, mobileMenuOpen, setMobileMenuOpen, onOpenPlanner }) => {
  const { language, setLanguage, t } = useTranslation();

  const getNavLabel = (name: string) => {
    switch(name) {
      case 'Services': return t.nav.services;
      case 'Packages': return t.nav.packages;
      case 'AI Planner': return t.nav.aiPlanner;
      case 'Food': return t.nav.food;
      case 'Experiences': return t.nav.experiences;
      case 'About': return t.nav.about;
      case 'Contact': return t.nav.contact;
      default: return name;
    }
  };

  return (
    <>
      <nav id="nav" className={navClass}>
        <a href="#" className="nl" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/vietana_logo.png" style={{ height: '45px' }} alt="Vietana Logo" />
          VIETANA
        </a>
        <ul className="nlinks">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={(e) => {
                  if (link.isPlanner) {
                    e.preventDefault();
                    onOpenPlanner();
                  }
                }}
              >
                {getNavLabel(link.name)}
              </a>
            </li>
          ))}
          <li><a href={WHATSAPP_DEFAULT} className="ncta" target="_blank" rel="noreferrer">{t.nav.cta}</a></li>
        </ul>
        <div className="nav-right">
          <div className="lang-switcher">
            {(['EN', 'HI', 'VI'] as const).map((lang) => (
              <button 
                key={lang} 
                className={language === lang ? 'active' : ''} 
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className={`hbg ${mobileMenuOpen ? 'o' : ''}`} id="ham" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div id="mob" className={mobileMenuOpen ? 'o' : ''}>
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            onClick={() => {
              setMobileMenuOpen(false);
              if (link.isPlanner) onOpenPlanner();
            }}
          >
            {getNavLabel(link.name)}
          </a>
        ))}
        <div className="mdv"></div>
        <div className="mob-lang">
          {(['EN', 'HI', 'VI'] as const).map((lang) => (
            <button 
              key={lang} 
              className={language === lang ? 'active' : ''} 
              onClick={() => {
                setLanguage(lang);
                setMobileMenuOpen(false);
              }}
            >
              {lang === 'EN' ? 'English' : lang === 'HI' ? 'हिंदी' : 'Tiếng Việt'}
            </button>
          ))}
        </div>
        <a href="https://wa.me/919953294543" style={{ color: 'var(--gold)' }} target="_blank" rel="noreferrer">💬 +91 9953294543</a>
      </div>
    </>
  );
};

export default Navbar;
