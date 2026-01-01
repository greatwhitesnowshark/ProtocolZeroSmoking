import React, { useState, useEffect } from 'react';
import { UserIdentity, DailyLog, ThemeMode } from '../types';
import { getTheme } from '../utils/theme';
import { AlertTriangle, Shield, Settings, Target, Eye, EyeOff, Zap, Flower2, Activity } from 'lucide-react';

interface Props {
  identity: UserIdentity;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onSos: () => void;
  onRewire: () => void;
  onRules: () => void;
  onSettings: () => void;
  onTriggerPlan: () => void;
  todayLog?: DailyLog;
}

export const Dashboard: React.FC<Props> = ({ 
  identity, themeMode, onToggleTheme, onSos, onRewire, onRules, onSettings, onTriggerPlan, todayLog 
}) => {
  const [now, setNow] = useState(new Date());
  const [focusMode, setFocusMode] = useState(false);
  const theme = getTheme(themeMode);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startDate = new Date(identity.startDate);
  const diff = now.getTime() - startDate.getTime();
  const isPreLaunch = diff < 0;
  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((absDiff / 1000) % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const hasStats = identity.cigsPerDay && identity.costPerPack;
  let moneySaved = "---";
  let lifeReclaimed = "---";

  if (hasStats && identity.cigsPerDay && identity.costPerPack && !isPreLaunch) {
    const packsPerDay = identity.cigsPerDay / 20;
    const exactDays = absDiff / (1000 * 60 * 60 * 24);
    const dollars = (exactDays * packsPerDay * identity.costPerPack);
    moneySaved = `$${dollars.toFixed(2)}`;

    const totalCigsNotSmoked = exactDays * identity.cigsPerDay;
    const hoursReclaimed = Math.floor((totalCigsNotSmoked * 11) / 60);
    lifeReclaimed = `${hoursReclaimed}h`;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col max-w-md mx-auto relative overflow-hidden transition-all duration-500">
      
      {/* Top Controls */}
      <div className="absolute top-6 right-4 z-20 flex gap-2">
        <button 
            onClick={onToggleTheme}
            className={`p-2 transition-all hover:scale-110 ${theme.subtleColor}`}
        >
            {themeMode === 'SERENITY' ? <Shield size={20} /> : <Flower2 size={20} />}
        </button>
        <button 
            onClick={() => setFocusMode(!focusMode)}
            className={`p-2 transition-all hover:scale-110 ${focusMode ? theme.accentColor : theme.subtleColor}`}
        >
            {focusMode ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        <button 
            onClick={onSettings} 
            className={`p-2 transition-all hover:scale-110 ${theme.subtleColor}`}
        >
            <Settings size={20} />
        </button>
      </div>

      {/* Identity Header */}
      <div className={`mt-8 mb-6 transition-all duration-500 ${focusMode ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
        <p className={`text-[10px] uppercase tracking-widest mb-1 ${theme.subtleColor} ${theme.fontBody}`}>
          {themeMode === 'SERENITY' ? 'Present Moment Awareness' : 'Protocol Active'}
        </p>
        <h1 className={`text-2xl leading-tight ${theme.fontHead}`}>
          {identity.statement}
        </h1>
      </div>

      {/* FOCUS MODE: Active View */}
      {focusMode ? (
          <div className="flex-1 flex flex-col justify-center gap-8 animate-in fade-in zoom-in-95 duration-500">
             
             <div className="text-center">
                <span className={`text-xs uppercase mb-3 block ${theme.subtleColor} ${theme.fontBody}`}>Current Objective</span>
                <div className={`p-8 border-l-4 ${todayLog?.rewireCompleted ? theme.successBorder : `${theme.card} border-l-white`}`}>
                    <p className={`text-2xl tracking-wide leading-tight ${theme.fontHead}`}>
                        {todayLog?.rewireCompleted 
                            ? (themeMode === 'SERENITY' ? "Balance Restored." : "Protocol Maintained.") 
                            : (themeMode === 'SERENITY' ? "Perform Daily Alignment." : "Execute Daily Rewire.")}
                    </p>
                </div>
             </div>

             <button 
                onClick={onSos}
                className={`group relative h-56 w-full flex flex-col items-center justify-center gap-4 transition-all duration-500 ${theme.btnAlert}`}
            >
                {themeMode === 'PROTOCOL' && (
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                )}
                {themeMode === 'SERENITY' ? <Flower2 size={56} className="animate-float" strokeWidth={1} /> : <Zap size={48} className="animate-pulse-fast" />}
                <span className={`relative z-10 text-2xl ${theme.fontHead}`}>
                    {themeMode === 'SERENITY' ? 'Find Calm' : 'SOS Protocol'}
                </span>
                <span className={`text-xs opacity-70 tracking-[0.3em] ${theme.fontBody}`}>
                    {themeMode === 'SERENITY' ? 'Breathe & Release' : 'Immediate Intervention'}
                </span>
            </button>

            <div className="text-center">
                <p className={`text-[10px] uppercase tracking-widest ${theme.subtleColor} ${theme.fontBody}`}>
                    {themeMode === 'SERENITY' ? 'Focus Mode' : 'Stealth Mode Active'}
                </p>
            </div>
          </div>
      ) : (
        /* STANDARD DASHBOARD VIEW */
        <>
            {/* Live Timer Engine */}
            <div className="flex flex-col items-center justify-center py-6 mb-4">
                <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                        <div className={`text-[5.5rem] leading-none font-bold tracking-tighter tabular-nums ${theme.fontHead}`}>
                            {days}
                        </div>
                    </div>
                    
                    <p className={`text-[10px] uppercase tracking-[0.4em] mb-8 font-bold ${theme.subtleColor} ${theme.fontBody}`}>
                        {isPreLaunch ? 'Days Until' : (themeMode === 'SERENITY' ? 'Days of Freedom' : 'Days Free')}
                    </p>

                    <div className="grid grid-cols-3 gap-3 w-full max-w-[300px]">
                        <div className={`flex flex-col items-center p-3 ${theme.cardSubtle}`}>
                           <span className={`text-3xl font-medium tabular-nums ${theme.fontHead}`}>{pad(hours)}</span>
                           <span className={`text-[9px] uppercase font-bold mt-1 tracking-wider ${theme.subtleColor} ${theme.fontBody}`}>Hrs</span>
                        </div>
                        <div className={`flex flex-col items-center p-3 ${theme.cardSubtle}`}>
                           <span className={`text-3xl font-medium tabular-nums ${theme.fontHead}`}>{pad(minutes)}</span>
                           <span className={`text-[9px] uppercase font-bold mt-1 tracking-wider ${theme.subtleColor} ${theme.fontBody}`}>Min</span>
                        </div>
                        <div className={`flex flex-col items-center p-3 ${theme.cardSubtle} relative overflow-hidden`}>
                           <div className={`absolute inset-0 opacity-10 ${themeMode === 'SERENITY' ? 'bg-teal-400' : 'bg-white animate-pulse-fast'}`}></div>
                           <span className={`text-3xl font-bold tabular-nums relative z-10 ${theme.fontHead}`}>{pad(seconds)}</span>
                           <span className={`text-[9px] uppercase font-bold mt-1 tracking-wider relative z-10 ${theme.accentColor} ${theme.fontBody}`}>Sec</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resource Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`p-4 text-center ${theme.cardSubtle}`}>
                    <span className={`block text-[10px] uppercase mb-1 ${theme.subtleColor} ${theme.fontBody}`}>Money Saved</span>
                    <span className={`text-xl font-bold tracking-tight ${theme.fontHead}`}>{moneySaved}</span>
                </div>
                <div className={`p-4 text-center ${theme.cardSubtle}`}>
                    <span className={`block text-[10px] uppercase mb-1 ${theme.subtleColor} ${theme.fontBody}`}>Life Reclaimed</span>
                    <span className={`text-xl font-bold tracking-tight ${theme.fontHead}`}>{lifeReclaimed}</span>
                </div>
            </div>

            {/* Mission Status */}
            <div className="mb-6 flex-1">
                <div className="flex justify-between items-center mb-2">
                <span className={`text-xs uppercase ${theme.subtleColor} ${theme.fontBody}`}>Today's Path</span>
                {todayLog?.rewireCompleted && <span className="text-xs font-bold text-green-500 uppercase">Accomplished</span>}
                </div>
                <div className={`p-5 border-l-2 transition-all ${todayLog?.rewireCompleted ? theme.successBorder : `${theme.card} border-l-white/20`}`}>
                <p className={`text-sm font-bold uppercase tracking-wide ${theme.fontHead}`}>
                    {todayLog?.rewireCompleted 
                        ? (themeMode === 'SERENITY' ? "Inner Work Complete." : "Protocol Maintained.") 
                        : (themeMode === 'SERENITY' ? "Practice Daily Rewiring." : "Execute Daily Rewire Drill.")}
                </p>
                </div>
            </div>

            {/* Control Deck */}
            <div className="flex flex-col gap-3 justify-end pb-4">
                <button 
                onClick={onSos}
                className={`p-5 uppercase flex items-center justify-between transition-all ${theme.btnAlert} ${theme.fontHead}`}
                >
                <span>{themeMode === 'SERENITY' ? 'I Need Calm' : 'SOS Protocol'}</span>
                {themeMode === 'SERENITY' ? <Flower2 size={24} strokeWidth={1.5} /> : <AlertTriangle size={24} />}
                </button>

                <div className="grid grid-cols-3 gap-3">
                <button 
                    onClick={onRewire}
                    disabled={todayLog?.rewireCompleted}
                    className={`p-4 flex flex-col items-center justify-center gap-2 transition-all ${todayLog?.rewireCompleted ? 'opacity-50 cursor-not-allowed' : ''} ${theme.btnPrimary}`}
                >
                    <Activity size={20} strokeWidth={theme.iconStroke} />
                    <span className="uppercase text-[10px] tracking-wider">Rewire</span>
                </button>

                <button 
                    onClick={onTriggerPlan}
                    className={`p-4 flex flex-col items-center justify-center gap-2 ${theme.btnSecondary}`}
                >
                    <Target size={20} strokeWidth={theme.iconStroke} />
                    <span className="uppercase text-[10px] tracking-wider">Plan</span>
                </button>

                <button 
                    onClick={onRules}
                    className={`p-4 flex flex-col items-center justify-center gap-2 ${theme.btnSecondary}`}
                >
                    <Shield size={20} strokeWidth={theme.iconStroke} />
                    <span className="uppercase text-[10px] tracking-wider">Rules</span>
                </button>
                </div>
            </div>
        </>
      )}
    </div>
  );
};