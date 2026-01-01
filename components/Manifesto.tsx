import React from 'react';
import { X, Cpu, BookOpen } from 'lucide-react';
import { ThemeMode } from '../types';
import { getTheme } from '../utils/theme';

interface Props {
  onBack: () => void;
  themeMode: ThemeMode;
}

export const Manifesto: React.FC<Props> = ({ onBack, themeMode }) => {
  const theme = getTheme(themeMode);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`uppercase font-bold ${theme.fontHead}`}>System Specs</h2>
        <button onClick={onBack}><X /></button>
      </div>

      <div className={`space-y-8 ${theme.fontBody} text-sm ${theme.subtleColor}`}>
        <section>
          <div className={`flex items-center gap-2 mb-2 ${theme.accentColor}`}>
            <BookOpen size={16} />
            <h3 className="uppercase font-bold">Behavioral Architecture</h3>
          </div>
          <p className="mb-2">This system utilizes <strong className="text-white">Stimulus Control</strong> and <strong className="text-white">Response Prevention</strong>.</p>
          <ul className="list-disc pl-4 space-y-1">
             <li><strong>SOS Protocol:</strong> Leverages the 90-second rule of emotion. Physiological interrupts (breathing) downregulate the nervous system.</li>
             <li><strong>Identity Lock:</strong> Moves the user from "Behavioral Goal" (I want to quit) to "Identity Goal" (I am a non-smoker).</li>
             <li><strong>No Relapse UI:</strong> Removes the affordance of failure. If the option doesn't exist in the interface, it reduces the option in the mind.</li>
          </ul>
        </section>

        <section>
          <div className={`flex items-center gap-2 mb-2 ${theme.accentColor}`}>
            <Cpu size={16} />
            <h3 className="uppercase font-bold">Technical Design</h3>
          </div>
           <ul className="list-disc pl-4 space-y-1">
             <li><strong>Offline First:</strong> Data persists via LocalStorage. No cloud dependency ensures privacy and reliability in dead zones.</li>
             <li><strong>State Management:</strong> Lifted state in App.tsx acts as the Single Source of Truth.</li>
             <li><strong>Anti-Exit Logic:</strong> Route manipulation in SOS component prevents accidental or impulsive closing of the protocol.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};