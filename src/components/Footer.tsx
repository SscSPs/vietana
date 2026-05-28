import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--gx)] text-white/45 py-16 px-[7%] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/22 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto flex flex-wrap items-start justify-between gap-12">
        <div className="flex flex-col">
          <span className="font-serif text-[2.2rem] font-medium text-[var(--blue)] tracking-wider mb-1">VIETANA</span>
          <span className="text-[0.8rem] text-[var(--gold)] mb-1">Premium India-Vietnam Travel</span>
          <span className="text-[0.72rem] text-white/30">© 2026 Vietana Travel. Built for Indian Travelers.</span>
        </div>
        
        <ul className="flex flex-wrap gap-x-8 gap-y-4 list-none p-0 pt-1">
          {['Services', 'Packages', 'Food', 'About'].map((link) => (
            <li key={link}>
              <a 
                href={`#${link.toLowerCase()}`} 
                className="text-[0.82rem] text-white/40 transition-colors duration-300 no-underline hover:text-[var(--gold)]"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
