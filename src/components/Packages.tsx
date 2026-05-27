import React, { useRef } from 'react';
import { PACKAGES } from '../config';
import './Packages.css';

const PackageCard: React.FC<{ p: any }> = ({ p }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    cardRef.current.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-5px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <div 
      ref={cardRef}
      className="pc r" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="pc-img" style={{ backgroundImage: `url('${p.img}')` }}></div>
      <div className="pc-fog"></div>
      <div className="pc-flare"></div>
      <div className="pc-body">
        <span className="pc-badge">{p.b}</span>
        <h3>{p.t}</h3>
        <p className="pc-price" style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>{p.d}</p>
        <button className="pc-cta">Customize Trip <span className="pca-arr">→</span></button>
      </div>
    </div>
  );
};

const Packages: React.FC = () => {
  return (
    <section id="packages">
      <div className="sh r">
        <span className="lbl">Our Packages</span>
        <h2>Inspiration, Not Fixed Products</h2>
        <p>Every package is a starting point. We customize everything around your travel style.</p>
      </div>
      <div className="pkg-g">
        {PACKAGES.map((p, i) => (
          <PackageCard key={i} p={p} />
        ))}
      </div>
    </section>
  );
};

export default Packages;
