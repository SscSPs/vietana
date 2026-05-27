import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import './Food.css';

const FOOD_ITEMS = [
  { 
    id: 1, 
    t: 'Mì Quảng', 
    type: 'Non-Veg', 
    d: 'Central Vietnamese noodle dish with turmeric noodles, shrimp, pork, and fresh herbs.', 
    img: '/mi_quang_new.png' 
  },
  { 
    id: 2, 
    t: 'Spicy Spoon Special', 
    type: 'Veg', 
    d: 'Authentic Indian flavors in the heart of Vietnam. Perfect for those missing home.', 
    img: '/spicy_spoon_new.png' 
  },
  { 
    id: 3, 
    t: 'Phở Chay', 
    type: 'Veg', 
    d: 'A delicious vegetarian version of the classic Vietnamese beef noodle soup.', 
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80' 
  },
  { 
    id: 4, 
    t: 'Bánh Mì', 
    type: 'Mix', 
    d: 'The iconic Vietnamese sandwich, available with various vegetarian and non-vegetarian fillings.', 
    img: 'https://images.unsplash.com/photo-1600454021970-351feb4a5034?w=800&q=80' 
  }
];

const Food: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All');

  const filteredItems = filter === 'All' ? FOOD_ITEMS : FOOD_ITEMS.filter(i => i.type === filter || i.type === 'Mix');

  return (
    <section id="food" className="food-section">
      <div className="sh r">
        <span className="lbl">{t.food.title}</span>
        <h2>{t.food.heading}</h2>
        <p>{t.food.sub}</p>
      </div>

      <div className="food-filters r">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>{t.food.filters.all}</button>
        <button className={filter === 'Veg' ? 'active' : ''} onClick={() => setFilter('Veg')}>{t.food.filters.veg}</button>
        <button className={filter === 'Non-Veg' ? 'active' : ''} onClick={() => setFilter('Non-Veg')}>{t.food.filters.nonVeg}</button>
      </div>

      <div className="food-grid">
        {filteredItems.map((item, idx) => (
          <div key={item.id} className={`food-card r d${(idx % 4) + 1}`}>
            <div className="fc-img" style={{ backgroundImage: `url(${item.img})` }}></div>
            <div className="fc-body">
              <span className={`fc-type ${item.type.toLowerCase()}`}>{item.type}</span>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Food;
