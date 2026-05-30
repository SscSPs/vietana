import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';
import BrandName from './ui/BrandName';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-3xl" 
      variant="light"
      className="overflow-hidden !bg-white/90 backdrop-blur-[20px] !rounded-[24px] shadow-2xl border border-white/40"
    >
      <div className="p-6 md:p-8 text-left max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-blue/30">
        <div className="mb-6 text-center animate-fade-in scale-100 bg-brand-blue/5 py-6 px-4 rounded-2xl border border-brand-blue/10">
          <span className="text-white bg-brand-blue px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-bold mb-4 inline-flex items-center gap-2 shadow-sm">
            <Icon name="Leaf" size={14} className="text-brand-gold-light" /> Talk to Us
          </span>
          <Heading as="h2" size="xl" variant="dark" className="mb-3 text-brand-blue-dark">Talk to Someone Who Understands Your Travel Style</Heading>
          <Text variant="dark" size="sm" className="opacity-80 max-w-xl mx-auto leading-relaxed">
            No confusion. No stress. Just local support from people who understand both India and Vietnam. Message us on WhatsApp — we reply quickly in Hindi & English.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* INDIA */}
          <div className="space-y-4 bg-brand-gold/10 p-5 rounded-2xl border border-brand-gold/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform group-hover:scale-150" />
            <Text size="xs" variant="accent" weight="bold" className="tracking-widest border-b border-brand-gold/30 pb-2 inline-block text-brand-gold-muted relative z-10">🇮🇳 INDIA — NEW DELHI</Text>
            <Heading as="h3" size="md" variant="dark" className="text-brand-green-dark relative z-10">Vikram Sonker</Heading>
            <div className="space-y-3 text-text-dark font-medium text-sm relative z-10">
              <p className="flex items-center gap-3"><Icon name="Phone" size={16} className="text-brand-gold" /> <a href="https://wa.me/919953294543" target="_blank" rel="noreferrer" className="hover:text-brand-gold hover:underline">+91 9953294543</a></p>
              <p className="flex items-center gap-3"><Icon name="Mail" size={16} className="text-brand-gold" /> <a href="mailto:vikram@vietana.com" className="hover:text-brand-gold hover:underline">vikram@vietana.com</a></p>
              <p className="flex items-start gap-3"><Icon name="MapPin" size={16} className="text-brand-gold mt-0.5 shrink-0" /> <span>RZ 35/36, Indra Park Ext.<br/>Uttam Nagar, East Delhi</span></p>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-white/50 text-brand-green-dark border-brand-gold/30 hover:bg-brand-gold hover:border-brand-gold hover:text-white flex items-center justify-center gap-2 text-xs py-2 relative z-10" onClick={() => window.open('https://maps.google.com/?q=RZ+35/36,+Indra+Park+Extension+Uttam+Nagar,+East+Delhi+110059', '_blank')}>
              <Icon name="MapPin" size={14} /> View on Maps
            </Button>
          </div>

          {/* VIETNAM */}
          <div className="space-y-4 bg-brand-blue/10 p-5 rounded-2xl border border-brand-blue/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform group-hover:scale-150" />
            <Text size="xs" variant="accent" weight="bold" className="tracking-widest border-b border-brand-blue/30 pb-2 inline-block text-brand-blue-dark relative z-10">🇻🇳 VIETNAM — HCM CITY</Text>
            <Heading as="h3" size="md" variant="dark" className="text-brand-blue-dark relative z-10">Chayan Soni</Heading>
            <div className="space-y-3 text-text-dark font-medium text-sm relative z-10">
              <p className="flex items-center gap-3"><Icon name="Phone" size={16} className="text-brand-blue" /> <a href="https://wa.me/84902434006" target="_blank" rel="noreferrer" className="hover:text-brand-blue hover:underline">+84 902434006</a></p>
              <p className="flex items-center gap-3"><Icon name="Mail" size={16} className="text-brand-blue" /> <a href="mailto:chayan@vietana.com" className="hover:text-brand-blue hover:underline">chayan@vietana.com</a></p>
              <p className="flex items-start gap-3"><Icon name="MapPin" size={16} className="text-brand-blue mt-0.5 shrink-0" /> <span>45 Nguyễn Quý Đức<br/>An Phú, Ho Chi Minh City</span></p>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-white/50 text-brand-blue-dark border-brand-blue/30 hover:bg-brand-blue hover:border-brand-blue hover:text-white flex items-center justify-center gap-2 text-xs py-2 relative z-10" onClick={() => window.open('https://maps.google.com/?q=45+Nguyễn+Quý+Đức+An+Phú+Ho+Chi+Minh+City+Vietnam', '_blank')}>
              <Icon name="MapPin" size={14} /> View on Maps
            </Button>
          </div>
        </div>

        {/* ONLINE */}
        <div className="mb-6 bg-surface-warm p-5 rounded-2xl border border-black/5">
          <Text size="xs" variant="accent" weight="bold" className="tracking-widest mb-4 text-center border-b border-black/10 pb-2 inline-flex items-center justify-center gap-2 w-full text-brand-green-dark"><Icon name="Globe" size={14} /> ONLINE SUPPORT</Text>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-text-dark font-medium text-sm">
            <div className="text-center md:text-left space-y-2">
              <p className="flex items-center justify-center md:justify-start gap-2"><Icon name="Leaf" size={14} className="text-brand-green" /> <a href="https://www.vietana.com" className="hover:underline hover:text-brand-green">www.vietana.com</a></p>
              <p className="flex items-center justify-center md:justify-start gap-2"><Icon name="Mail" size={14} className="text-brand-blue" /> <a href="mailto:info@vietana.com" className="hover:underline hover:text-brand-blue">info@vietana.com</a></p>
            </div>
            <div className="h-10 w-px bg-black/10 hidden md:block"></div>
            <div className="space-y-1.5 text-center md:text-left text-xs">
              <p className="flex items-center justify-center md:justify-start gap-1.5"><Icon name="Check" size={14} className="text-[#25D366]" /> Fast Response</p>
              <p className="flex items-center justify-center md:justify-start gap-1.5"><Icon name="Check" size={14} className="text-[#25D366]" /> Hindi & English</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Text variant="accent" size="xs" className="italic mb-4 font-bold text-brand-gold-muted">Travel Gets Better with <BrandName /></Text>
          <div className="flex flex-col md:flex-row justify-center gap-3">
            <a href="mailto:info@vietana.com" className="flex-1 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-dark py-3 px-3 rounded-xl font-bold tracking-widest hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2 text-[10px]">
              <Icon name="Mail" size={14} /> Email Us
            </a>
            <a href="https://wa.me/919953294543" target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366]/15 border border-[#25D366]/50 text-[#1EAA52] py-3 px-3 rounded-xl font-bold tracking-widest hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2 text-[10px]">
              <Icon name="MessageCircle" size={14} /> WhatsApp India
            </a>
            <a href="https://wa.me/84902434006" target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366]/15 border border-[#25D366]/50 text-[#1EAA52] py-3 px-3 rounded-xl font-bold tracking-widest hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2 text-[10px]">
              <Icon name="MessageCircle" size={14} /> WhatsApp Vietnam
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
