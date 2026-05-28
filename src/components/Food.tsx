import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { WHATSAPP_INDIA } from '../config';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Modal from './ui/Modal';

const VEG_ITEMS = [
  'Phở Chay (Veg Pho)', 'Bánh Mì Chay', 'Gỏi Cuốn Chay', 'Cơm Tấm Chay', 'Bún Chay',
  'Đậu Hũ Sốt Cà Chua', 'Nộm Hoa Chuối', 'Chè & Xôi (Desserts)', 'Rau Muống Xào Tỏi', 'North & South Indian Veg'
];

const NON_VEG_ITEMS = [
  'Phở Gà (Chicken Pho)', 'Bún Chả (Grilled Pork)', 'Bánh Xèo (Crispy Pancake)', 'Cao Lầu (Hoi An Noodles)', 'Bún Gà (Chicken Noodle Soup)',
  'Cơm Tấm Sườn Nướng', 'Bánh Mì Thịt Nướng', 'Nem Rán (Spring Rolls)', 'Chả Cá Lã Vọng', 'Gà Nướng Mật Ong'
];

const CAFES = [
  '☕ The Note Coffee', '☕ Cộng Cà Phê', '☕ Cafe Giảng (Egg Coffee)', '☕ Ru Nam Bistro', '☕ L\'Usine'
];

const Food: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [foodPref, setFoodPref] = useState('');

  const openFoodModal = (name: string) => setSelectedFood(name);
  const closeFoodModal = () => setSelectedFood(null);

  const getFoodImg = (name: string) => {
      let keyword = name.split('(')[0].trim().replace(/\s+/g, ',');
      return `https://image.pollinations.ai/prompt/delicious%20authentic%20Vietnamese%20food%20${keyword}?width=600&height=400&nologo=true`;
  };

  return (
    <section id="food" className="bg-[var(--wm)] py-32 px-[7%] relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
        
        {/* LEFT SIDE: Food Lists */}
        <div className="flex-[1.2] min-w-[320px] w-full">
          <SectionHeader 
            label={t.food.title}
            title={t.food.heading}
            centered={false}
            className="mb-14"
          />
          
          <div className="mb-14">
            <h3 className="font-serif text-3xl text-[var(--gold)] mb-5 border-b border-[var(--gold)]/20 pb-2.5">Vegetarian (Vietnamese & Indian)</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
              {VEG_ITEMS.map((item, i) => (
                <li key={i} className="text-[0.92rem] text-[var(--tm)] font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 hover:text-[var(--gold2)] hover:translate-x-1.5" onClick={() => openFoodModal(item)}>
                  <span className="text-[var(--gold)] text-[1.1rem]">⭐</span> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-14">
            <h3 className="font-serif text-3xl text-[var(--gold)] mb-5 border-b border-[var(--gold)]/20 pb-2.5">Non-Vegetarian Favorites</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
              {NON_VEG_ITEMS.map((item, i) => (
                <li key={i} className="text-[0.92rem] text-[var(--tm)] font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 hover:text-[var(--gold2)] hover:translate-x-1.5" onClick={() => openFoodModal(item)}>
                  <span className="text-[var(--gold)] text-[1.1rem]">⭐</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-3xl text-[var(--gold)] mb-5 border-b border-[var(--gold)]/20 pb-2.5">Famous Cafes</h3>
            <div className="flex flex-wrap gap-3">
              {CAFES.map((cafe, i) => (
                <div key={i} className="bg-[var(--gold)]/8 px-5 py-2.5 rounded-full border border-[var(--gold)]/15 text-[0.88rem] font-semibold text-[var(--tm)]">
                  {cafe}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Brands */}
        <div className="flex-[0.8] min-w-[320px] w-full bg-white p-16 rounded-[32px] shadow-[var(--sh2)] border border-black/5 flex flex-col items-center justify-center gap-16">
          <div className="flex flex-col items-center text-center w-full">
            <img src="/spicy_spoon_new.png" alt="The Spicy Spoon" className="max-w-[220px] h-auto mb-6 mix-multiply" />
            <div className="inline-block px-7 py-2.5 bg-gradient-to-br from-[var(--gold)] to-[var(--gold3)] text-black rounded-full font-bold text-[0.8rem] tracking-[0.15em] uppercase shadow-[0_8px_20px_rgba(201,168,76,0.3)]">
              Coming Soon
            </div>
          </div>
          <div className="flex flex-col items-center text-center w-full">
            <a href="https://www.google.com/maps/search/Mì+Quảng+Cô+Viên" target="_blank" rel="noreferrer" className="group no-underline">
              <img src="/mi_quang_new.png" alt="Mì Quảng Cô Viên" className="max-w-[220px] h-auto mb-6 mix-multiply" />
              <div className="inline-block px-7 py-2.5 bg-white border-2 border-[var(--gold)] text-[var(--gold)] rounded-full font-bold text-[0.8rem] tracking-[0.1em] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:text-white group-hover:-translate-y-1">
                View on Map 📍
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24 flex flex-col md:flex-row justify-between items-end gap-12 border-t border-black/5 pt-16">
        <div className="flex-1 min-w-[300px] text-[var(--g)] text-2xl font-semibold leading-relaxed font-serif">
          We own, partner, and connect with restaurants across Vietnam.<br />
          So you never have to worry about where to eat.
        </div>
        <div className="flex-1 min-w-[300px] w-full flex justify-end">
          <div className="w-full max-w-[400px] bg-white/90 p-8 rounded-2xl border border-black/5 shadow-[var(--sh1)]">
            <p className="text-[0.95rem] text-[var(--td)] font-bold mb-4">Share your food preferences</p>
            <textarea 
              value={foodPref} 
              onChange={(e) => setFoodPref(e.target.value)}
              placeholder="E.g., I need pure veg options, no garlic/onion..." 
              className="w-full h-24 p-4 border border-gray-100 rounded-xl mb-6 font-inherit text-[0.9rem] resize-none bg-gray-50 focus:outline-none focus:border-[var(--gold)]/30 transition-colors"
            />
            <Button 
              className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90 border-none shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)]"
              onClick={() => window.open(`${WHATSAPP_INDIA}&text=${encodeURIComponent(`Hi VIETANA, my food preferences: ${foodPref}`)}`, '_blank')}
              icon={<span>💬</span>}
            >
              Send to WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={!!selectedFood} 
        onClose={closeFoodModal}
        maxWidth="max-w-[500px]"
        className="p-10 text-center"
      >
        {selectedFood && (
          <>
            <img src={getFoodImg(selectedFood)} alt={selectedFood} className="w-full h-72 object-cover rounded-2xl mb-8 shadow-lg" />
            <h3 className="font-serif text-4xl text-[var(--g)] mb-2.5">{selectedFood}</h3>
            <p className="text-[var(--ts)] text-base">A classic Vietnamese delicacy you must try.</p>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Food;
