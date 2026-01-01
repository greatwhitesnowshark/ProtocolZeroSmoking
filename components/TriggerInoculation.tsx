import React, { useState } from 'react';
import { Target, ArrowRight, Save, ShieldAlert, Loader2, Flower2 } from 'lucide-react';
import { AiService } from '../utils/ai';
import { StorageService } from '../utils/storage';
import { TriggerPlan, ThemeMode } from '../types';
import { getTheme } from '../utils/theme';

interface Props {
  onBack: () => void;
  themeMode: ThemeMode;
}

export const TriggerInoculation: React.FC<Props> = ({ onBack, themeMode }) => {
  const [step, setStep] = useState<'INPUT' | 'PROCESSING' | 'RESULT'>('INPUT');
  const [situation, setSituation] = useState('');
  const [context, setContext] = useState('');
  const [plan, setPlan] = useState<TriggerPlan['plan'] | null>(null);
  const theme = getTheme(themeMode);
  const isSerenity = themeMode === 'SERENITY';

  const handleGenerate = async () => {
    if (!situation || !context) return;
    setStep('PROCESSING');
    const result = await AiService.generateMicroPlan(situation, context);
    if (result) {
      setPlan(result);
      setStep('RESULT');
      const fullPlan: TriggerPlan = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        situation,
        context,
        plan: result
      };
      StorageService.saveTriggerPlan(fullPlan);
    } else {
        setPlan({
            disrupt: "Stand up and walk away immediately.",
            replace: "Drink a full glass of cold water.",
            affirm: "I do not negotiate with poison."
        });
        setStep('RESULT');
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className={`mb-6 border-b pb-4 ${isSerenity ? 'border-white/10' : 'border-zinc-800'}`}>
         <div className={`flex items-center gap-2 mb-2 ${theme.accentColor}`}>
            {isSerenity ? <Flower2 size={24} /> : <ShieldAlert size={24} />}
            <span className={`text-xs uppercase tracking-widest ${theme.fontBody}`}>
                {isSerenity ? 'Mindfulness Prep' : 'Threat Neutralization'}
            </span>
         </div>
         <h1 className={`text-2xl font-bold uppercase ${theme.fontHead}`}>
             {isSerenity ? 'Daily Intent' : 'Trigger Inoculation'}
         </h1>
      </div>

      {step === 'INPUT' && (
        <div className="space-y-6 flex-1">
          <p className={`text-sm ${theme.subtleColor} ${theme.fontBody}`}>
              {isSerenity ? 'Where might you feel challenged today? Let us prepare.' : "Identify today's highest risk. We will build a counter-measure."}
          </p>
          
          <div>
            <label className={`block text-xs uppercase mb-2 ${theme.subtleColor} ${theme.fontBody}`}>The Situation</label>
            <input 
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="e.g., Drinking beer with Bob"
              className={`w-full p-4 focus:outline-none ${theme.cardSubtle}`}
            />
          </div>

          <div>
            <label className={`block text-xs uppercase mb-2 ${theme.subtleColor} ${theme.fontBody}`}>The Context</label>
            <input 
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., 6PM at the pub"
              className={`w-full p-4 focus:outline-none ${theme.cardSubtle}`}
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!situation || !context}
            className={`w-full py-4 mt-8 flex items-center justify-center gap-2 disabled:opacity-50 ${theme.btnPrimary}`}
          >
            Generate Protocol <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === 'PROCESSING' && (
        <div className="flex-1 flex flex-col items-center justify-center">
            <Loader2 className={`animate-spin mb-4 ${theme.accentColor}`} size={48} />
            <p className={`text-xs uppercase animate-pulse ${theme.fontHead}`}>Analyzing vector...</p>
        </div>
      )}

      {step === 'RESULT' && plan && (
        <div className="flex-1 flex flex-col">
            <div className="space-y-6 mb-8">
                <div className={`p-4 border-l-4 ${isSerenity ? 'bg-white/5 border-teal-400' : 'bg-zinc-900 border-zero-red'}`}>
                    <span className={`text-xs uppercase block mb-1 ${theme.subtleColor} ${theme.fontBody}`}>Phase 1: Disrupt</span>
                    <p className={`text-xl font-bold ${theme.fontHead}`}>{plan.disrupt}</p>
                </div>
                <div className={`p-4 border-l-4 ${isSerenity ? 'bg-white/5 border-white' : 'bg-zinc-900 border-white'}`}>
                    <span className={`text-xs uppercase block mb-1 ${theme.subtleColor} ${theme.fontBody}`}>Phase 2: Replace</span>
                    <p className={`text-xl font-bold ${theme.fontHead}`}>{plan.replace}</p>
                </div>
                <div className={`p-4 border-l-4 ${isSerenity ? 'bg-white/5 border-teal-700' : 'bg-zinc-900 border-zinc-500'}`}>
                    <span className={`text-xs uppercase block mb-1 ${theme.subtleColor} ${theme.fontBody}`}>Phase 3: Affirm</span>
                    <p className={`text-xl italic ${theme.fontHead}`}>"{plan.affirm}"</p>
                </div>
            </div>

            <button 
                onClick={onBack}
                className={`w-full py-4 flex items-center justify-center gap-2 ${theme.btnSecondary}`}
            >
                <Save size={18} /> Protocol Accept
            </button>
        </div>
      )}
    </div>
  );
};