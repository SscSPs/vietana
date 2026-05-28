import React, { useRef } from 'react';
import { PACKAGES } from '../config';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';

const PackageCard: React.FC<{ p: any, onClick: () => void }> = ({ p, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-10px)`;
    cardRef.current.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    cardRef.current.style.boxShadow = '';
  };

  return (
    <div 
      ref={cardRef}
      className="group relative h-[500px] rounded-[var(--r)] overflow-hidden cursor-pointer bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 ease-[var(--e2)] r" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-[-4%] bg-cover bg-center transition-transform duration-900 ease-[var(--e2)] group-hover:scale-[1.09] group-hover:-translate-y-[2%] will-change-transform" style={{ backgroundImage: `url('${p.img}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,15,8,0.97)] via-[rgba(6,26,14,0.65)] to-[rgba(0,0,0,0.1)] transition-all duration-600 ease-[var(--e1)] group-hover:from-[rgba(4,15,8,1)] group-hover:via-[rgba(6,26,14,0.75)] group-hover:to-[rgba(0,0,0,0.15)]"></div>
      <div className="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.09),transparent_65%)] transition-opacity duration-700 group-hover:opacity-100"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-9">
        <span className="inline-block bg-[var(--gold)] text-[var(--gd)] text-[0.63rem] font-bold tracking-[0.18em] uppercase px-3.5 py-1 rounded-full mb-4 shadow-[0_2px_18px_rgba(201,168,76,0.5)]">
          {p.b}
        </span>
        <h3 className="text-white text-2xl mb-1.5">{p.t}</h3>
        <p className="text-white/70 text-[0.92rem] font-light italic mb-1">{p.d}</p>
        
        <div className="mt-5 opacity-0 translate-y-3.5 transition-all duration-450 delay-50 group-hover:opacity-100 group-hover:translate-y-0 ease-[var(--e2)]">
          <Button 
            variant="secondary" 
            size="sm" 
            className="group/btn px-5 py-2.5 text-[0.77rem] tracking-wider"
          >
            Customize Trip <span className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-2">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface PackagesProps {
    onOpenBuilder: () => void;
}

const Packages: React.FC<PackagesProps> = ({ onOpenBuilder }) => {
  return (
    <section id="packages" className="bg-[var(--cr)] py-32 px-[6%]">
      <SectionHeader 
        label="Our Packages"
        title="Inspiration, Not Fixed Products"
        description="Every package is a starting point. We customize everything around your travel style."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PACKAGES.map((p, i) => (
          <PackageCard key={i} p={p} onClick={onOpenBuilder} />
        ))}

        {/* CUSTOM BUILDER CARD */}
        <div 
          className="col-span-full flex flex-col md:flex-row items-center gap-8 p-12 md:p-16 rounded-[24px] border border-[var(--gold)] cursor-pointer bg-cover bg-center relative overflow-hidden group r d1" 
          style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url("https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80")` }}
          onClick={onOpenBuilder}
        >
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-[var(--gold)] text-[var(--gd)] text-[0.63rem] font-bold tracking-[0.18em] uppercase px-3.5 py-1 rounded-full mb-4 shadow-[0_2px_18px_rgba(201,168,76,0.5)]">
              Fully Custom
            </span>
            <h3 className="text-[var(--gold)] text-3xl md:text-5xl font-serif font-normal mt-2 mb-4">Build Your Own Story</h3>
            <p className="text-white/80 text-base md:text-xl font-light">Select your cities, travel style, and let us do the rest.</p>
          </div>
          
          <Button 
            variant="secondary"
            className="w-full md:w-auto px-10 py-5 backdrop-blur-md bg-[rgba(201,168,76,0.15)] border border-[var(--gold)] text-white group/btn"
          >
            Open Trip Builder <span className="transition-transform duration-300 group-hover/btn:translate-x-1 ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
