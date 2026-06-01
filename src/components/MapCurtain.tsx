import React, { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MAP_DESTINATIONS } from '../data/destinations';
import { Heading, Text } from './ui/Typography';
import Icon from './ui/Icon';

const LeafletMap = React.lazy(() => import('./map/LeafletMap'));

interface MapCurtainProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: (destination?: string) => void;
}

const MapCurtain: React.FC<MapCurtainProps> = ({ isOpen, onClose, onOpenPlanner }) => {
  const [selectedCityIdx, setSelectedCityIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 106.0]);

  const handleCityClick = (idx: number) => {
    setSelectedCityIdx(idx);
    setMapCenter([MAP_DESTINATIONS[idx].lat, MAP_DESTINATIONS[idx].lng]);
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[3000] bg-brand-green-extra-dark flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 lg:px-12 bg-black/20 backdrop-blur-md absolute top-0 left-0 right-0 z-[3010] border-b border-white/10">
            <div>
              <Text className="text-editorial-meta text-brand-gold mb-1">Cartography</Text>
              <Heading as="h2" className="text-2xl font-serif text-surface-cream tracking-wider">
                Explore Vietnam
              </Heading>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-3 px-4 py-2 rounded-full glass-dark hover:bg-white/10 transition-colors border border-white/20"
            >
              <Text className="text-xs tracking-[0.2em] uppercase text-white/70 group-hover:text-white hidden sm:block">Close Map</Text>
              <Icon name="X" size={18} className="text-white" />
            </button>
          </div>

          {/* Map Area */}
          <div className="flex-1 w-full h-full relative">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-brand-gold font-serif text-xl animate-pulse bg-brand-green-extra-dark">Charting course...</div>}>
              <LeafletMap 
                  destinations={MAP_DESTINATIONS as any}
                  selectedCityIdx={selectedCityIdx}
                  mapCenter={mapCenter}
                  onCityClick={handleCityClick}
                  onOpenPlanner={(dest) => {
                    onClose();
                    onOpenPlanner(dest);
                  }}
                  onDeselect={() => setSelectedCityIdx(null)}
              />
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapCurtain;
