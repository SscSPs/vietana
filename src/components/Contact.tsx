import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const openContactPanel = () => {
    window.open('https://wa.me/919953294543', '_blank');
  };

  return (
    <section id="contact" className="relative py-40 px-[6%] bg-[var(--gx)] text-center overflow-hidden text-white">
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 z-0 bg-[var(--blue)] -top-24 -left-24"></div>
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-20 z-0 bg-[var(--gold)] -bottom-24 -right-24"></div>
      
      <div className="relative z-10">
        <span className="inline-block text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-[var(--gold)] mb-5 r">
          {t.contact.title}
        </span>
        <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] leading-tight mb-6 text-white r">
          {t.contact.heading.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h2>
        <p className="text-lg md:text-xl text-white/70 font-light r">
          {t.contact.sub}
        </p>
        
        <div className="mt-12 flex justify-center r d1">
          <Button 
            onClick={openContactPanel} 
            className="bg-[var(--blue)] text-white hover:brightness-110 shadow-[0_10px_30px_rgba(126,200,227,0.3)] hover:shadow-[0_15px_45px_rgba(126,200,227,0.4)] px-14 py-5 font-bold tracking-[2px] border-none"
          >
            {t.contact.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
