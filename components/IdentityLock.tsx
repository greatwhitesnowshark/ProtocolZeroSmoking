import React, { useState } from 'react';
import { UserIdentity, ThemeMode } from '../types';
import { StorageService } from '../utils/storage';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { getTheme } from '../utils/theme';

interface Props {
  onComplete: () => void;
  themeMode?: ThemeMode; // Optional since this runs before theme might be set, but good for uniformity
}

export const IdentityLock: React.FC<Props> = ({ onComplete, themeMode = 'PROTOCOL' }) => {
  const [statement, setStatement] = useState("I do not smoke. Period.");
  const [reason1, setReason1] = useState("");
  const [reason2, setReason2] = useState("");
  const [reason3, setReason3] = useState("");
  
  const theme = getTheme(themeMode as ThemeMode);

  const handleCommit = () => {
    if (!statement || !reason1) return;
    const protocolStart = new Date().toISOString();

    const identity: UserIdentity = {
      statement,
      reasons: [reason1, reason2, reason3].filter(Boolean),
      startDate: protocolStart,
      isOnboarded: true,
    };
    
    StorageService.saveIdentity(identity);
    onComplete();
  };

  return (
    <div className={`min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto ${theme.appBg}`}>
      <div className="mb-8">
        <ShieldCheck className="w-12 h-12 mb-4 text-white" />
        <h1 className={`text-3xl font-bold uppercase tracking-tighter mb-2 ${theme.fontHead}`}>
          Identity Lock
        </h1>
        <p className={`text-sm ${theme.subtleColor} ${theme.fontBody}`}>
          Protocol Zero requires a hard identity shift. This is not a "try". This is a definition.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={`block text-xs uppercase mb-2 ${theme.subtleColor} ${theme.fontBody}`}>
            Your Absolute Statement
          </label>
          <input
            type="text"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            className={`w-full p-4 text-lg font-bold focus:outline-none transition-colors ${theme.cardSubtle}`}
          />
        </div>

        <div>
          <label className={`block text-xs uppercase mb-2 ${theme.subtleColor} ${theme.fontBody}`}>
            Why (The Leverage)
          </label>
          <div className="space-y-3">
            {[setReason1, setReason2, setReason3].map((setter, i) => (
                <input
                key={i}
                type="text"
                placeholder={`Reason ${i+1}`}
                onChange={(e) => setter(e.target.value)}
                className={`w-full p-3 focus:outline-none ${theme.cardSubtle}`}
                />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleCommit}
        disabled={!statement || !reason1}
        className={`mt-12 w-full py-4 tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${theme.btnPrimary}`}
      >
        Sign Contract <ArrowRight size={20} />
      </button>
    </div>
  );
};