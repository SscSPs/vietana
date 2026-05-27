import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';
import './Experiences.css';

const EXPERIENCES = [
  { id: 1, t: 'Hidden Temple of Hue', d: 'A 12th-century pagoda hidden in the pine forests.', lat: 16.4677, lng: 107.5905 },
  { id: 2, t: 'Midnight Food Train', d: 'Dine on a moving train through Hanoi\'s narrow streets.', lat: 21.0285, lng: 105.8542 },
  { id: 3, t: 'Secret Lagoon of Ninh Binh', d: 'A crystal clear lagoon accessible only by a small cave.', lat: 20.2178, lng: 105.9382 },
  { id: 4, t: 'The Last Weaver of Sapa', d: 'Meet the only remaining practitioner of an ancient indigo technique.', lat: 22.3364, lng: 103.8438 },
  { id: 5, t: 'Lantern Maker\'s Garden', d: 'Create your own lantern in a private 200-year-old courtyard.', lat: 15.8801, lng: 108.3384 },
  { id: 6, t: 'Coffee in the Clouds', d: 'A floating cafe at the edge of Da Lat\'s highest peak.', lat: 11.9404, lng: 108.4583 },
  { id: 7, t: 'Jazz in the Alleyway', d: 'Speakeasy jazz club hidden behind a noodle shop in HCMC.', lat: 10.7769, lng: 106.7009 },
  { id: 8, t: 'Waterfall Meditation', d: 'Private sunrise meditation at the base of Ban Gioc.', lat: 22.8550, lng: 106.7228 },
  { id: 9, t: 'The Salt Fields of Mui Ne', d: 'Watch the sunrise reflect off the pristine salt crystals.', lat: 10.9333, lng: 108.2833 },
  { id: 10, t: 'Fisherman\'s Secret Cove', d: 'A hidden beach in Quy Nhon only known to locals.', lat: 13.7767, lng: 109.2242 },
  { id: 11, t: 'Ancient Cham Ruins Night Walk', d: 'Explore the ruins of My Son Sanctuary under moonlight.', lat: 15.7767, lng: 108.1242 },
  { id: 12, t: 'Mekong Delta Homestay', d: 'Live with a family in a stilt house in Ben Tre.', lat: 10.2435, lng: 106.3756 },
  { id: 13, t: 'Ha Long Bay by Seaplane', d: 'The most spectacular way to see the bay from above.', lat: 20.9500, lng: 107.0733 },
  { id: 14, t: 'Cat Ba Island Trek', d: 'A rugged trek through the jungle to a hidden military outpost.', lat: 20.8000, lng: 106.9833 },
  { id: 15, t: 'Tây Ninh Peak Sunrise', d: 'Hike to the top of Ba Den Mountain for the ultimate view.', lat: 11.3653, lng: 106.1264 }
];

const Experiences: React.FC = () => {
  const { t } = useTranslation();
  const [shattered, setShattered] = useState(false);
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <section id="hidden" className="exp-section">
      <div className="sh r">
        <span className="lbl">{t.exp.title}</span>
        <h2>{t.exp.heading}</h2>
        <p>{t.exp.sub}</p>
      </div>

      <div className="exp-container">
        {!shattered ? (
          <div className="exp-orb-container">
            <div className="exp-orb" onClick={() => setShattered(true)}>
              <div className="orb-inner"></div>
              <div className="orb-text">{t.exp.orb}</div>
            </div>
          </div>
        ) : (
          <div className="exp-scattered">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 600, 
                  y: (Math.random() - 0.5) * 400, 
                  opacity: 1, 
                  scale: 1 
                }}
                transition={{ type: 'spring', damping: 12, stiffness: 100, delay: idx * 0.05 }}
                className="exp-item"
                onClick={() => setSelectedExp(exp)}
              >
                <div className="exp-dot"></div>
                <span className="exp-label">{exp.t}</span>
              </motion.div>
            ))}
            <button className="exp-reset" onClick={() => setShattered(false)}>{t.exp.reset}</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedExp && (
          <div className="exp-modal-overlay" onClick={() => setSelectedExp(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="exp-modal"
              onClick={e => e.stopPropagation()}
            >
              <button className="close-exp" onClick={() => setSelectedExp(null)}>&times;</button>
              <div className="exp-modal-body">
                <span className="lbl">Hidden Experience #{selectedExp.id}</span>
                <h2>{selectedExp.t}</h2>
                <p>{selectedExp.d}</p>
                <div className="exp-links">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${selectedExp.lat},${selectedExp.lng}`} target="_blank" rel="noreferrer" className="exp-map-btn">
                    📍 View on Map
                  </a>
                  <button className="exp-add-btn">Add to My Plan</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experiences;
