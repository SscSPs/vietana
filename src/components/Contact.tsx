import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { buildWhatsAppLink, WHATSAPP_NUMBERS } from '../utils/whatsapp';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Section from './ui/layout/Section';
import Container from './ui/layout/Container';
import { Heading, Text } from './ui/Typography';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openContactPanel = () => {
    setIsModalOpen(true);
  };

  return (
    <Section id="contact" variant="dark" spacing="lg" className="text-center">
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 z-0 bg-brand-blue -top-24 -left-24" />
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-20 z-0 bg-brand-gold -bottom-24 -right-24" />
      
      <Container className="relative z-10">
        <Heading 
          as="h4"
          size="xs"
          font="sans"
          variant="accent"
          className="inline-block mb-5 tracking-[0.28em] uppercase reveal"
        >
          {t.contact.title}
        </Heading>

        <Heading as="h2" variant="white" className="leading-tight mb-6 reveal">
          {t.contact.heading.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Heading>
        <Text variant="white" size="lg" weight="light" className="opacity-70 reveal">
          {t.contact.sub}
        </Text>
        
        <div className="mt-12 flex justify-center reveal delay-100">
          <Button 
            onClick={openContactPanel} 
            variant="glass"
            className="px-12 py-4 font-bold tracking-widest border-brand-blue text-brand-blue-light hover:bg-brand-blue/10"
          >
            {t.contact.cta}
          </Button>
        </div>
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8 text-center">
          <Heading as="h3" size="lg" variant="white" className="mb-8 font-serif">Get In Touch</Heading>
          <div className="flex flex-col gap-5">
            <a href="mailto:hello@vietana.com" className="bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-light py-5 rounded-xl font-bold tracking-widest hover:bg-brand-blue/20 transition-all hover:scale-105 flex items-center justify-center gap-3">
              <span className="text-2xl">📧</span> EMAIL US
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] py-5 rounded-xl font-bold tracking-widest hover:bg-[#25D366]/20 transition-all hover:scale-105 flex items-center justify-center gap-3">
              <span className="text-2xl">💬</span> WHATSAPP (INDIA)
            </a>
            <a href="https://wa.me/84987654321" target="_blank" rel="noreferrer" className="bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] py-5 rounded-xl font-bold tracking-widest hover:bg-[#25D366]/20 transition-all hover:scale-105 flex items-center justify-center gap-3">
              <span className="text-2xl">💬</span> WHATSAPP (VIETNAM)
            </a>
          </div>
        </div>
      </Modal>
    </Section>
  );
};

export default Contact;
