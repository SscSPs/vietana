import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { PlannerStateMachine, Preferences, PlannerMode } from '../logic/plannerStateMachine';

export interface Message {
  text: string;
  type: 'bot' | 'user' | 'blueprint';
}

export const useAIPlanner = (initialDestination?: string, initialPrompt?: string) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [plannerMode, setPlannerMode] = useState<PlannerMode>('GATHERING_PREFS');
  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [preferences, setPreferences] = useState<Preferences>({
    focus: initialDestination || undefined
  });

  const enqueueBotMessages = (msgs: { text: string; options?: string[]; type?: 'bot' | 'blueprint'; delay?: number }[]) => {
    let delayAccumulator = 0;
    msgs.forEach((msg, index) => {
      const delay = msg.delay ?? 500;
      delayAccumulator += delay;
      
      if (delay > 0) {
        setTimeout(() => setIsTyping(true), delayAccumulator - delay);
      }
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { text: msg.text, type: msg.type || 'bot' }]);
        if (index === msgs.length - 1) {
          setOptions(msg.options || []);
        }
      }, delayAccumulator);
    });
  };

  // We actually need a robust way to handle state if we are simulating an initial prompt.
  // It's easier to just use the handleSend function after initialization.
  const handleSendRef = useRef<((text?: string, cp?: Preferences, cm?: PlannerMode, cqi?: number) => Promise<void>) | null>(null);
  handleSendRef.current = async (text: string = inputValue, currentPrefs = preferences, currentMode = plannerMode, currentQIdx = questionIndex) => {
    if (!text.trim() || currentMode === 'FINISHED') return;
    
    setMessages(prev => [...prev, { text, type: 'user' }]);
    setInputValue('');
    setOptions([]);

    const result = PlannerStateMachine.processInput(currentPrefs, currentMode, currentQIdx, text);
    
    setPreferences(result.updatedPreferences);
    setPlannerMode(result.mode);
    setQuestionIndex(result.questionIndex);
    
    enqueueBotMessages(result.nextBotMessages);
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (messages.length > 0) return;
    initialized.current = true;
    
    const initialState = PlannerStateMachine.getInitialState(t.planner.greeting, initialDestination);
    setPreferences(initialState.updatedPreferences);
    setPlannerMode(initialState.mode);
    setQuestionIndex(initialState.questionIndex);
    enqueueBotMessages(initialState.nextBotMessages);

    if (initialPrompt) {
      setTimeout(() => {
        handleSendRef.current(initialPrompt, initialState.updatedPreferences, initialState.mode, initialState.questionIndex);
      }, 1500); // Send the prompt automatically after the bot's greeting
    }
  }, [initialDestination, initialPrompt, t.planner.greeting]);

  const stableHandleSend = (text?: string) => handleSendRef.current?.(text);

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    options,
    isFinished: plannerMode === 'FINISHED',
    preferences,
    handleSend: stableHandleSend
  };
};
