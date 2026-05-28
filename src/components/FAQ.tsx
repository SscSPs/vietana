import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';

const FAQS = [
  { 
    q: 'Do Indian travelers need a visa for Vietnam?', 
    a: 'Yes. Most Indian travelers require a Vietnam visa. VIETANA helps simplify the process and provides fast support, often within 24 hours depending on requirements.' 
  },
  { 
    q: 'Can VIETANA customize my entire trip?', 
    a: 'Absolutely. We do not believe in rigid fixed tours. Every trip can be tailored around your budget, travel style, food preferences and interests.' 
  },
  { 
    q: 'Is Indian food available in Vietnam?', 
    a: 'Yes. From North Indian and South Indian meals to vegetarian, Jain and vegan options, we help travelers feel comfortable while still experiencing authentic Vietnam. Your food comfort matters to us.' 
  },
  { 
    q: 'Will someone help us while we are in Vietnam?', 
    a: 'Yes. Our support team is available in India and Vietnam. We provide local assistance and help when needed before and during your journey.' 
  },
  { 
    q: 'Do you only offer luxury travel?', 
    a: 'No. We create experiences ranging from budget-friendly adventures to premium luxury journeys.' 
  },
  { 
    q: 'Can you arrange airport pickup and local transport?', 
    a: 'Yes. Airport pickup, local transport, private cars and travel coordination can all be arranged for a smoother experience.' 
  },
  { 
    q: 'What if I want hidden places and not tourist spots?', 
    a: 'That is one of our strengths. We focus on experiences discovered through local knowledge — hidden cafés, food streets, lesser-known destinations and unique experiences.' 
  },
  { 
    q: 'Can I talk in Hindi or English?', 
    a: 'Yes. We support travelers in Hindi and English so communication always feels easy and familiar.' 
  }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const formatText = (text: string) => {
    if (!text.includes('VIETANA')) return text;
    const parts = text.split('VIETANA');
    return (
      <>
        {parts[0]}
        <img src="/vietana_logo.png" className="h-[1.2em] inline-block align-middle mx-1 brightness-110" alt="" />
        VIETANA
        {parts[1]}
      </>
    );
  };

  return (
    <section id="faq" className="py-32 px-[6%] bg-[var(--cr)]">
      <SectionHeader 
        label="Common Questions"
        title="Frequently Asked Questions"
      />

      <div className="max-w-[900px] mx-auto flex flex-col gap-5">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div 
              key={i} 
              className={`bg-white border rounded-[22px] overflow-hidden cursor-pointer transition-all duration-400 ease-[var(--e2)] relative 
                ${isOpen ? 'border-[var(--gold)]/30 shadow-[var(--sh2)] bg-[var(--gold)]/[0.01]' : 'border-[var(--g)]/8 shadow-none hover:border-[var(--gold)] hover:-translate-y-0.5 hover:shadow-[var(--sh1)]'}`} 
              onClick={() => setOpenIdx(isOpen ? null : i)}
            >
              <div className="p-8 md:p-10 flex items-center justify-between gap-6">
                <h4 className="flex-1 font-sans text-lg md:text-xl font-medium text-[var(--gd)] leading-tight m-0">
                  {formatText(faq.q)}
                </h4>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-400 ease-[var(--e1)] shrink-0 text-2xl font-light 
                  ${isOpen ? 'bg-[var(--gold)] text-white rotate-180' : 'bg-[var(--gold)]/10 text-[var(--gold)]'}`}>
                  {isOpen ? '−' : '+'}
                </div>
              </div>
              <div 
                className={`transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
              >
                <p className="px-8 md:px-10 pb-9 text-[var(--ts)] text-[0.95rem] md:text-[1.02rem] leading-relaxed m-0 font-light">
                  {formatText(faq.a)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
