import { ThemeMode } from '../types';

export const getTheme = (mode: ThemeMode) => {
  const isSerenity = mode === 'SERENITY';

  return {
    appBg: isSerenity ? 'serenity-gradient text-serenity-text' : 'bg-zero-black text-zero-white',
    
    // Typography
    fontHead: isSerenity ? 'font-sans tracking-tight' : 'font-mono uppercase tracking-tighter',
    fontBody: isSerenity ? 'font-sans' : 'font-mono',
    
    // Containers
    card: isSerenity 
      ? 'glass rounded-3xl shadow-2xl shadow-teal-900/20' 
      : 'bg-zinc-900 border border-zinc-800 rounded-none',
      
    cardSubtle: isSerenity
      ? 'bg-white/5 rounded-2xl border border-white/5'
      : 'bg-zinc-900/50 border border-zinc-800 rounded-none',

    // Buttons
    btnPrimary: isSerenity
      ? 'bg-serenity-accent text-slate-900 font-bold rounded-2xl shadow-lg shadow-teal-500/20 hover:bg-teal-300 transition-all'
      : 'bg-zero-white text-black font-bold uppercase tracking-widest rounded-none hover:bg-zinc-200',
      
    btnSecondary: isSerenity
      ? 'bg-white/5 text-white border border-white/10 rounded-2xl hover:bg-white/10 transition-all'
      : 'bg-zinc-900 text-zinc-300 border border-zinc-700 uppercase tracking-wider rounded-none hover:text-white hover:border-zinc-500',
      
    btnAlert: isSerenity
      ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.1)]'
      : 'bg-zero-red text-white uppercase font-bold tracking-widest rounded-none shadow-[0_0_15px_rgba(220,38,38,0.2)]',

    // Colors/Accents
    accentColor: isSerenity ? 'text-serenity-accent' : 'text-zero-red',
    subtleColor: isSerenity ? 'text-teal-200/50' : 'text-zero-subtle',
    successBorder: isSerenity ? 'border-teal-500/50 bg-teal-500/10' : 'border-green-500 bg-green-900/20',
    
    // Icons
    iconStroke: isSerenity ? 1.5 : 2,
  };
};