import React, { useState, useEffect } from 'react';
import { SosStep, ThemeMode } from '../types';
import { StorageService } from '../utils/storage';
import { getTheme } from '../utils/theme';
import { Wind, Activity, Brain, Lock, Flower2, Waves } from 'lucide-react';

interface Props {
  onComplete: () => void;
  themeMode: ThemeMode;
}

export const SosFlow: React.FC<Props> = ({ onComplete, themeMode }) => {
  const [step, setStep] = useState<SosStep>('BREATHE');
  const [timer, setTimer] = useState(45); 
  const [distractCount, setDistractCount] = useState(0);
  const theme = getTheme(themeMode);
  const isSerenity = themeMode === 'SERENITY';

  // Prevent back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href);
      alert(isSerenity ? "Stay with the feeling. It will pass." : "Finish the protocol. Cravings do not negotiate.");
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isSerenity]);

  useEffect(() => {
    if (step === 'BREATHE' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (step === 'BREATHE' && timer === 0) {
      setStep('LABEL');
    }
  }, [step, timer]);

  const handleFinish = () => {
    StorageService.logSos(new Date().toISOString().split('T')[0]);
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 'BREATHE':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
            {isSerenity ? <Flower2 className="w-16 h-16 mb-8 text-teal-200 animate-float" strokeWidth={1} /> : <Wind className="w-16 h-16 mb-8 text-zero-subtle" />}
            
            <h2 className={`text-2xl font-bold uppercase mb-12 ${theme.fontHead}`}>
              {isSerenity ? 'Center Yourself' : 'Physiological Interrupt'}
            </h2>
            
            <div className="relative flex items-center justify-center mb-12">
               {/* Breathing Animation */}
               <div className={`absolute w-40 h-40 rounded-full animate-breathe ${isSerenity ? 'bg-teal-500/20 blur-xl' : 'bg-zinc-800'}`}></div>
               <div className={`w-32 h-32 rounded-full flex items-center justify-center z-10 border-2 ${isSerenity ? 'border-teal-200/30 bg-white/5 backdrop-blur-md' : 'border-white'}`}>
                 <span className={`text-4xl font-bold ${theme.fontBody}`}>{timer}</span>
               </div>
            </div>
            
            <p className={`text-lg ${theme.subtleColor} ${theme.fontBody}`}>
               {isSerenity ? "Inhale calm... Exhale tension..." : "Box Breathe. In 4. Hold 4. Out 4. Hold 4."}
            </p>
          </div>
        );

      case 'LABEL':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
            <Brain className={`w-16 h-16 mb-8 ${theme.accentColor}`} strokeWidth={isSerenity ? 1 : 2} />
            <h2 className={`text-xl font-bold uppercase mb-8 ${theme.fontHead}`}>
                {isSerenity ? 'Observe the Wave' : 'Label & Defuse'}
            </h2>
            <div className={`border-l-4 pl-6 py-4 text-left mb-12 ${isSerenity ? 'border-teal-400' : 'border-zero-red'}`}>
              <p className={`text-2xl font-bold leading-relaxed ${theme.fontHead}`}>
                {isSerenity 
                  ? "I notice a sensation.\nIt is just a feeling.\nI am safe.\nI choose health." 
                  : "This is a craving.\nIt is a chemical glitch.\nIt peaks and passes.\nI do not smoke."}
              </p>
            </div>
            <button 
              onClick={() => setStep('ACTION')}
              className={`w-full py-4 uppercase font-bold tracking-wider ${theme.btnPrimary}`}
            >
              {isSerenity ? 'I Accept' : 'Acknowledged'}
            </button>
          </div>
        );

      case 'ACTION':
        return (
          <div className="flex flex-col h-full p-6 animate-fade-in">
            <h2 className={`text-xl font-bold uppercase mb-2 text-center ${theme.fontHead}`}>
                {isSerenity ? 'Nourish Your Senses' : 'Competing Response'}
            </h2>
            <p className={`text-center mb-8 text-sm ${theme.subtleColor} ${theme.fontBody}`}>
                {isSerenity ? 'Choose one kindness for yourself.' : 'Choose one. Do it now. No debate.'}
            </p>
            
            <div className="space-y-4 flex-1">
              {[
                  { title: isSerenity ? 'Cool Down' : 'OPTION A', desc: 'Drink cold water + Hold ice cube' },
                  { title: isSerenity ? 'Move Energy' : 'OPTION B', desc: '10 Wall Push-ups / Brisk Walk' },
                  { title: isSerenity ? 'Cleanse' : 'OPTION C', desc: 'Brush Teeth / Mint Gum' }
              ].map((opt, idx) => (
                  <button key={idx} onClick={() => setStep('DISTRACT')} className={`w-full p-6 text-left transition-all ${theme.cardSubtle} hover:bg-white/10`}>
                    <span className={`block font-bold text-lg mb-1 ${theme.fontHead}`}>{opt.title}</span>
                    <span className={theme.subtleColor}>{opt.desc}</span>
                  </button>
              ))}
            </div>
          </div>
        );

      case 'DISTRACT':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in">
            {isSerenity ? <Waves className="w-16 h-16 mb-6 text-white" /> : <Activity className="w-16 h-16 mb-6 text-white" />}
            <h2 className={`text-xl font-bold uppercase mb-4 ${theme.fontHead}`}>
                {isSerenity ? 'Flow State' : 'Attention Hijack'}
            </h2>
            <p className={`mb-8 text-center ${theme.subtleColor} ${theme.fontBody}`}>
                {isSerenity ? 'Tap the ripple to release thoughts.' : 'Tap the button rapidly 15 times to reset motor focus.'}
            </p>
            
            <button 
              onClick={() => {
                const newCount = distractCount + 1;
                setDistractCount(newCount);
                if (newCount >= 15) setStep('INTENT');
              }}
              className={`w-32 h-32 rounded-full font-bold text-2xl active:scale-95 transition-all flex items-center justify-center border-4 
                ${isSerenity 
                    ? 'bg-teal-500/20 border-teal-200/50 text-teal-100 shadow-[0_0_40px_rgba(45,212,191,0.3)]' 
                    : 'bg-zero-red text-white border-zinc-900'}`}
            >
              {15 - distractCount}
            </button>
          </div>
        );

      case 'INTENT':
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
            <Lock className="w-16 h-16 mb-6 text-white" strokeWidth={isSerenity ? 1 : 2} />
            <h2 className={`text-xl font-bold uppercase mb-8 ${theme.fontHead}`}>
                {isSerenity ? 'My Promise' : 'Implementation Intention'}
            </h2>
            <div className={`text-xl mb-12 ${theme.fontBody}`}>
              {isSerenity ? (
                  <>
                    "I breathe.<br/>I move.<br/>I am free."
                  </>
              ) : (
                  <>
                   "If I crave, then I:<br/>Breathe.<br/>Move.<br/>Redirect.<br/>Always."
                  </>
              )}
            </div>
            <button 
              onClick={handleFinish}
              className={`w-full py-4 uppercase tracking-widest ${theme.btnPrimary}`}
            >
              {isSerenity ? 'Return to Day' : 'Mission Complete'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${isSerenity ? 'bg-serenity-gradient text-slate-100' : 'bg-zero-black text-white'}`}>
      <div className={`h-2 w-full ${isSerenity ? 'bg-white/10' : 'bg-zinc-900'}`}>
        <div 
          className={`h-full transition-all duration-300 ${isSerenity ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'bg-zero-red'}`} 
          style={{ width: `${(['BREATHE', 'LABEL', 'ACTION', 'DISTRACT', 'INTENT'].indexOf(step) + 1) * 20}%` }}
        />
      </div>
      <div className="flex-1 overflow-hidden relative">
        {renderStep()}
      </div>
    </div>
  );
};