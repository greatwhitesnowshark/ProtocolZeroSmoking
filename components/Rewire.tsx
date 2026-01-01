import React, { useState } from 'react';
import { REWIRE_MODULES } from '../constants';
import { StorageService } from '../utils/storage';
import { AiService } from '../utils/ai';
import { RewireModule, ThemeMode } from '../types';
import { getTheme } from '../utils/theme';
import { CheckSquare, MessageSquare, Loader2 } from 'lucide-react';

interface Props {
  onBack: () => void;
  themeMode: ThemeMode;
}

export const Rewire: React.FC<Props> = ({ onBack, themeMode }) => {
  const dayIndex = new Date().getDate() % (REWIRE_MODULES.length + 1); 
  const isInteractiveDay = dayIndex === REWIRE_MODULES.length;
  
  const [completed, setCompleted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [simIndex, setSimIndex] = useState(0);
  
  const theme = getTheme(themeMode);
  const isSerenity = themeMode === 'SERENITY';

  const handleComplete = () => {
    setCompleted(true);
    const logDate = new Date().toISOString().split('T')[0];
    StorageService.logRewire(logDate);
    setTimeout(onBack, 1500);
  };

  const handleInterrogate = async () => {
      if (!userInput) return;
      setIsProcessing(true);
      const response = await AiService.challengeBelief(userInput);
      setAiResponse(response || "Error");
      setIsProcessing(false);
  };

  const handleSimAdvance = (module: RewireModule) => {
    if (navigator.vibrate) navigator.vibrate(10);
    if (simIndex < module.content.length - 1) {
      setSimIndex(simIndex + 1);
    } else {
      handleComplete();
    }
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-pulse">
        <CheckSquare className="w-20 h-20 text-white mb-4" />
        <h2 className={`text-2xl font-bold uppercase ${theme.fontHead}`}>Drill Complete</h2>
        <p className={`mt-2 ${theme.subtleColor} ${theme.fontBody}`}>Neural pathway reinforced.</p>
      </div>
    );
  }

  // INTERACTIVE
  if (isInteractiveDay) {
      return (
        <div className="p-6 h-full flex flex-col">
            <div className="mb-6">
                <span className={`text-xs uppercase px-2 py-1 ${isSerenity ? 'bg-teal-500/20 text-teal-200 rounded' : 'bg-red-900/20 text-zero-red'} ${theme.fontBody}`}>
                    Deep Work
                </span>
                <h2 className={`text-2xl font-bold uppercase mt-2 ${theme.fontHead}`}>Cognitive Interrogation</h2>
                <p className={`mt-1 ${theme.subtleColor} ${theme.fontBody}`}>Expose the lie you are telling yourself today.</p>
            </div>

            <div className="flex-1 flex flex-col gap-6">
                 {!aiResponse ? (
                     <div className="space-y-4">
                         <label className={`text-sm font-bold uppercase ${theme.subtleColor} ${theme.fontBody}`}>What is the "Just One" thought?</label>
                         <textarea 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className={`w-full h-32 p-4 text-white focus:outline-none resize-none ${theme.cardSubtle}`}
                            placeholder="e.g., I need it to deal with this stress..."
                         />
                         <button 
                            onClick={handleInterrogate}
                            disabled={isProcessing || !userInput}
                            className={`w-full py-4 flex items-center justify-center gap-2 ${theme.btnPrimary}`}
                         >
                            {isProcessing ? <Loader2 className="animate-spin"/> : <MessageSquare size={18} />} 
                            Dismantle Lie
                         </button>
                     </div>
                 ) : (
                     <div className={`p-6 border-l-4 animate-in fade-in slide-in-from-bottom-4 ${isSerenity ? 'bg-white/5 border-teal-400' : 'bg-zinc-900 border-zero-red'}`}>
                         <h3 className={`text-xs uppercase mb-2 ${theme.accentColor} ${theme.fontBody}`}>Truth Output</h3>
                         <p className={`text-lg font-bold leading-relaxed ${theme.fontHead}`}>{aiResponse}</p>
                     </div>
                 )}
            </div>

            {aiResponse && (
                <div className="mt-8">
                    <label className={`flex items-center gap-4 p-4 border cursor-pointer active:opacity-80 transition-colors ${theme.cardSubtle}`}>
                    <input 
                        type="checkbox" 
                        className="w-6 h-6 accent-white"
                        onChange={handleComplete}
                    />
                    <span className={`uppercase font-bold text-sm tracking-wider ${theme.fontBody}`}>
                        I accept this truth.
                    </span>
                    </label>
                </div>
            )}
             <button onClick={onBack} className={`mt-4 text-center w-full text-xs uppercase py-4 ${theme.subtleColor}`}>Cancel</button>
        </div>
      );
  }

  const module: RewireModule = REWIRE_MODULES[dayIndex];

  // NEURO SIMULATION
  if (module.type === 'NEURO_SIMULATION') {
    return (
      <div 
        className="h-full flex flex-col cursor-pointer" 
        onClick={() => handleSimAdvance(module)}
      >
        <div className={`p-6 border-b flex justify-between items-center ${isSerenity ? 'border-white/10' : 'border-zinc-800'}`}>
             <div>
                <span className={`text-xs uppercase ${isSerenity ? 'text-teal-300' : 'text-blue-400'} ${theme.fontBody}`}>Neuro-Simulation</span>
                <p className={`text-xs ${theme.subtleColor}`}>Tap screen to advance</p>
             </div>
             <div className={`text-xs ${theme.subtleColor}`}>
               {simIndex + 1} / {module.content.length}
             </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 key={simIndex}">
           <p className={`text-2xl md:text-3xl font-bold leading-relaxed tracking-tight ${theme.fontHead}`}>
             {module.content[simIndex]}
           </p>
        </div>

        <div className={`h-1 w-full ${isSerenity ? 'bg-white/10' : 'bg-zinc-900'}`}>
            <div 
              className={`h-full transition-all duration-300 ${isSerenity ? 'bg-teal-400' : 'bg-blue-500'}`}
              style={{ width: `${((simIndex + 1) / module.content.length) * 100}%` }}
            />
        </div>
      </div>
    )
  }

  // STANDARD VISUALIZATION
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <span className={`text-xs uppercase px-2 py-1 rounded ${isSerenity ? 'bg-white/10' : 'bg-zinc-900'} ${theme.subtleColor}`}>Daily Training</span>
        <h2 className={`text-2xl font-bold uppercase mt-2 ${theme.fontHead}`}>{module.title}</h2>
        <p className={`mt-1 ${theme.subtleColor} ${theme.fontBody}`}>{module.description}</p>
      </div>

      <div className={`flex-1 space-y-6 p-6 ${theme.cardSubtle}`}>
        {module.content.map((line, idx) => (
          <div key={idx} className="flex gap-4">
            <span className={theme.subtleColor}>{idx + 1}.</span>
            <p className={`text-lg leading-relaxed ${theme.fontBody}`}>{line}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <label className={`flex items-center gap-4 p-4 border cursor-pointer active:opacity-80 transition-colors ${theme.cardSubtle}`}>
          <input 
            type="checkbox" 
            className="w-6 h-6 accent-white"
            onChange={handleComplete}
          />
          <span className={`uppercase font-bold text-sm tracking-wider ${theme.fontBody}`}>
            I have completed the drill.
          </span>
        </label>
      </div>
      
      <button onClick={onBack} className={`mt-4 text-center w-full text-xs uppercase py-4 ${theme.subtleColor}`}>
        Cancel (No Credit)
      </button>
    </div>
  );
};