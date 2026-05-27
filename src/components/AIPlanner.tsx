import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import './AIPlanner.css';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

interface Preferences {
  vibe: string;
  style: string;
  food: string;
  group: string;
  nightlife: string;
  focus: string;
  extras: string;
}

const CORE_QUESTIONS = [
  { field: 'vibe', q: "First, what's your ultimate Vietnam dream?", opts: ['🏖️ Beautiful Beaches','🗺️ Hidden & Adventure','⚖️ A mix of both'] },
  { field: 'style', q: "What is your travel style and budget?", opts: ['✨ Premium & Luxury','🎒 Backpacking & Budget','🏨 Smart Comfortable Stays'] },
  { field: 'food', q: "Is food comfort important to you?", opts: ['🍛 Need Indian food mostly','🍜 Excited for local food','⚖️ Balance of both'] },
  { field: 'extras', q: "How do you like your travel pace?", opts: ['Chill & slow','Packed with adventure','Balanced'] },
  { field: 'nightlife', q: "Are you looking for vibrant nightlife or peaceful escapes?", opts: ['🌙 Vibrant Nightlife','🧘 Peaceful & Quiet','⚖️ A bit of both'] }
];

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose, initialDestination }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<{ text: string; type: 'bot' | 'user' }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [refinementMode, setRefinementMode] = useState(false);
  
  const [preferences, setPreferences] = useState<Preferences>({
    vibe: 'Not set',
    style: 'Not set',
    food: 'Not set',
    group: 'Not set',
    nightlife: 'Not set',
    focus: initialDestination || 'Not set',
    extras: 'Not set'
  });
  
  const pcMsgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialDestination) {
        const welcomeText = `I see you are interested in exploring <strong>${initialDestination}</strong>. Let's build your trip around this beautiful destination!`;
        setMessages([{ text: welcomeText, type: 'bot' }]);
        setPreferences(prev => ({ ...prev, focus: initialDestination }));
        const firstQ = CORE_QUESTIONS[0];
        addBotMsg(firstQ.q, firstQ.opts);
      } else {
        const firstQ = CORE_QUESTIONS[0];
        setMessages([{ text: t.planner.greeting, type: 'bot' }]);
        addBotMsg(firstQ.q, firstQ.opts);
      }
    } else {
        resetPlanner();
    }
  }, [isOpen, initialDestination, t]);

  const resetPlanner = () => {
    setMessages([]);
    setInputValue('');
    setOptions([]);
    setIsFinished(false);
    setRefinementMode(false);
    setPreferences({
      vibe: 'Not set',
      style: 'Not set',
      food: 'Not set',
      group: 'Not set',
      nightlife: 'Not set',
      focus: initialDestination || 'Not set',
      extras: 'Not set'
    });
  };

  const addBotMsg = (text: string, opts: string[] = [], delay = 500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text, type: 'bot' }]);
      setOptions(opts);
    }, delay);
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isFinished) return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setOptions([]);

    const lowerText = text.toLowerCase();

    // 1. GENERATE ITINERARY
    if (lowerText.includes("generate") || lowerText.includes("final")) {
      setIsFinished(true);
      addBotMsg("Beautiful! 🌿 Crafting your personalized Vietnam story based on your preferences...");
      setTimeout(() => {
        addBotMsg("Done! YOUR VIETANA™ MATCH is ready. You can now contact our team via WhatsApp or Email to finalize your bookings.");
      }, 1500);
      return;
    }

    // 2. NEGATIONS / REFINEMENT
    let negations = ["no", "wrong", "not this", "don't like", "change", "something else", "nope", "not good", "hmm", "maybe not"];
    if (negations.some(n => lowerText === n || lowerText.startsWith(n + " "))) {
      setRefinementMode(true);
      addBotMsg("😊 No worries. I may have missed something. Tell me what feels wrong and I’ll improve it.", ['🍛 Food','🌊 Beaches','🌃 Nightlife','💰 Budget','💕 Romance','👨‍👩‍👧 Family','🌴 Hidden places']);
      return;
    }

    // 3. SPECIAL HEURISTICS
    if (lowerText.includes("indian food") || lowerText.includes("indian")) {
      setPreferences(prev => ({ ...prev, food: "Indian" }));
      addBotMsg(`🍛 Got it. Updated your journey:<br><br>Indian food priority: HIGH<br><br>Refining recommendations... What should I improve next?`, ['No, generate itinerary', 'Change pace', 'Add luxury']);
      return;
    }
    
    if (lowerText.includes("parent") || lowerText.includes("elderly") || lowerText.includes("family")) {
      setPreferences(prev => ({ ...prev, group: "Family/Elderly" }));
      addBotMsg(`🏠 Got it. Updated your journey:<br><br>Family comfort mode: ON<br><br>Refining recommendations... What should I improve next?`, ['No, generate itinerary', 'Change food', 'Add luxury']);
      return;
    }

    // 4. SEQUENTIAL QUESTIONS
    const currentQ = CORE_QUESTIONS.find(q => preferences[q.field as keyof Preferences] === 'Not set');
    
    if (currentQ && !refinementMode) {
      const nextPrefs = { ...preferences, [currentQ.field]: text };
      setPreferences(nextPrefs);
      
      const nextQ = CORE_QUESTIONS.find(q => nextPrefs[q.field as keyof Preferences] === 'Not set');
      if (nextQ) {
        addBotMsg(nextQ.q, nextQ.opts);
      } else {
        addBotMsg("YOUR VIETANA™ MATCH is ready! I have high confidence in these recommendations based on your profile.<br><br>Does everything look good?", ['Generate Itinerary', 'Change something']);
      }
    } else {
      setRefinementMode(false);
      addBotMsg("Got it! I've updated your plan with those details. Should we generate your final match now?", ['Generate Itinerary', 'Wait, add one more thing']);
    }
  };

  useEffect(() => {
    if (pcMsgsRef.current) {
      pcMsgsRef.current.scrollTop = pcMsgsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className={`ai-modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ai-modal-container">
        <div className="ai-close" onClick={onClose}>×</div>
        <div className="planner-left">
          <div className="ai-modal-header">
            <h3>🌿 {t.planner.title}</h3>
            <p>{t.planner.tagline}</p>
          </div>
          <div className="planner-chat" id="pcMsgs" ref={pcMsgsRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg msg-${msg.type}`}>
                {msg.type === 'bot' && <div className="msg-avatar"></div>}
                <div className="msg-bubble">
                  <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="pc-typing">
                <span></span><span></span><span></span>
              </div>
            )}
          </div>
          <div className="pc-input-area">
            {options.length > 0 && (
              <div className="pc-options">
                {options.map((opt, i) => (
                  <div key={i} className="pc-chip" onClick={() => handleSend(opt)}>{opt}</div>
                ))}
              </div>
            )}
            <div className="pc-input-wrap">
              <div className="pc-input-inner">
                <button className="pc-mic">🎤</button>
                <input 
                  type="text" 
                  className="pc-input" 
                  placeholder={t.planner.where} 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="pc-send" onClick={() => handleSend()}>
                  <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="planner-right">
          <div className="live-dream-panel">
             <h4>{t.planner.live}</h4>
             <div className="ldp-items">
               <div className="ldp-item">
                 <div className="ldp-lbl">✨ {t.planner.labels.vibe}</div>
                 <div className="ldp-val highlight">{preferences.vibe}</div>
               </div>
               <div className="ldp-item">
                 <div className="ldp-lbl">🏰 {t.planner.labels.style}</div>
                 <div className="ldp-val highlight">{preferences.style}</div>
               </div>
               <div className="ldp-item">
                 <div className="ldp-lbl">🍲 {t.planner.labels.food}</div>
                 <div className="ldp-val highlight">{preferences.food}</div>
               </div>
               <div className="ldp-item">
                 <div className="ldp-lbl">👥 {t.planner.labels.group}</div>
                 <div className="ldp-val highlight">{preferences.group}</div>
               </div>
               <div className="ldp-item">
                 <div className="ldp-lbl">🌙 {t.planner.labels.nightlife}</div>
                 <div className="ldp-val highlight">{preferences.nightlife}</div>
               </div>
               <div className="ldp-item">
                 <div className="ldp-lbl">🎯 {t.planner.labels.focus}</div>
                 <div className="ldp-val highlight">{preferences.focus}</div>
               </div>
               <div className="ldp-item">
                 <div className="ldp-lbl">📍 {t.planner.labels.extras}</div>
                 <div className="ldp-val highlight">{preferences.extras}</div>
               </div>
             </div>
             <div className="ldp-actions show">
                <a 
                    href={`https://wa.me/919953294543?text=${encodeURIComponent(`Hi VIETANA! I just finished my planning session:\n\nVibe: ${preferences.vibe}\nStyle: ${preferences.style}\nFood: ${preferences.food}\nFocus: ${preferences.focus}\n\nI'd like to discuss this further!`)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="ldp-btn wa-in"
                >
                  💬 WhatsApp VIETANA™
                </a>
                <a href="mailto:info@vietana.com" className="ldp-btn email">
                  ✉ Email VIETANA™
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
