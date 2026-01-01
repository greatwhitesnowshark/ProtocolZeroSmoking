import React, { useState, useEffect } from 'react';
import { StorageService } from '../utils/storage';
import { UserIdentity, ThemeMode } from '../types';
import { getTheme } from '../utils/theme';
import { X, Save, FileText } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenManifesto: () => void;
  themeMode: ThemeMode;
}

export const Settings: React.FC<Props> = ({ onBack, onOpenManifesto, themeMode }) => {
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [cost, setCost] = useState<string>('');
  const [count, setCount] = useState<string>('');
  const theme = getTheme(themeMode);
  const isSerenity = themeMode === 'SERENITY';

  useEffect(() => {
    const data = StorageService.getIdentity();
    if (data) {
      setIdentity(data);
      if (data.costPerPack) setCost(data.costPerPack.toString());
      if (data.cigsPerDay) setCount(data.cigsPerDay.toString());
    }
  }, []);

  const handleSave = () => {
    if (!identity) return;

    const updatedIdentity: UserIdentity = {
      ...identity,
      costPerPack: parseFloat(cost) || 0,
      cigsPerDay: parseInt(count) || 0,
    };

    StorageService.saveIdentity(updatedIdentity);
    onBack();
  };

  return (
    <div className="min-h-screen p-6">
      <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isSerenity ? 'border-white/10' : 'border-zinc-800'}`}>
        <h2 className={`text-xl font-bold uppercase ${theme.fontHead}`}>Configuration</h2>
        <button onClick={onBack}><X /></button>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className={`text-xs uppercase mb-4 ${theme.subtleColor} ${theme.fontBody}`}>Baseline Metrics</h3>
          <p className={`text-sm mb-6 ${theme.subtleColor} ${theme.fontBody}`}>
            Enter your past usage data. The system uses this to calculate reclaimed resources.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-bold uppercase mb-2 ${theme.fontBody}`}>Cost Per Pack</label>
              <div className={`flex items-center ${theme.cardSubtle}`}>
                <span className="pl-4 opacity-50 font-mono">$</span>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent p-4 focus:outline-none font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-2 ${theme.fontBody}`}>Cigarettes Per Day</label>
              <div className={`flex items-center ${theme.cardSubtle}`}>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent p-4 focus:outline-none font-mono text-white"
                />
              </div>
            </div>
          </div>
        </section>

        <button 
          onClick={handleSave}
          className={`w-full py-4 flex items-center justify-center gap-2 ${theme.btnPrimary}`}
        >
          <Save size={18} /> Update Protocol
        </button>

        <section className={`pt-8 border-t ${isSerenity ? 'border-white/10' : 'border-zinc-800'}`}>
           <button 
             onClick={onOpenManifesto}
             className={`flex items-center gap-4 w-full p-4 transition-colors ${theme.cardSubtle} hover:bg-white/10`}
           >
             <FileText size={20} className={theme.subtleColor} />
             <div className="text-left">
               <span className={`block uppercase font-bold text-sm ${theme.fontBody}`}>System Specs</span>
               <span className={`text-xs ${theme.subtleColor} ${theme.fontBody}`}>View behavioral architecture</span>
             </div>
           </button>
        </section>
      </div>
    </div>
  );
};