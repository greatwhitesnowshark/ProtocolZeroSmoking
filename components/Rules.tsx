import React from 'react';
import { RULES_CONTRACT } from '../constants';
import { ThemeMode } from '../types';
import { getTheme } from '../utils/theme';
import { X } from 'lucide-react';

interface Props {
  onBack: () => void;
  themeMode: ThemeMode;
}

export const Rules: React.FC<Props> = ({ onBack, themeMode }) => {
  const theme = getTheme(themeMode);
  const isSerenity = themeMode === 'SERENITY';

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <h2 className={`text-3xl font-bold uppercase ${theme.fontHead}`}>The Contract</h2>
        <button onClick={onBack}><X /></button>
      </div>

      <div className="space-y-6">
        {RULES_CONTRACT.map((rule, idx) => (
          <div key={idx} className={`p-6 border-l-4 ${isSerenity ? 'bg-white/5 border-teal-200/50 rounded-r-xl' : 'bg-zinc-900 border-white'}`}>
            <p className={`font-bold text-lg uppercase leading-tight ${theme.fontHead}`}>{rule}</p>
          </div>
        ))}
      </div>

      <div className={`mt-12 p-6 text-center border ${isSerenity ? 'border-white/10 rounded-xl bg-white/5' : 'border-zinc-700'}`}>
        <p className={`text-xs uppercase tracking-widest mb-2 ${theme.subtleColor}`}>Signed</p>
        <p className="font-script text-xl italic opacity-80">User of Protocol Zero</p>
      </div>
    </div>
  );
};