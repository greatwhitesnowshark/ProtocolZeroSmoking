import React, { useState, useEffect } from 'react';
import { AppScreen, UserIdentity, DailyLog, ThemeMode } from './types';
import { StorageService } from './utils/storage';
import { IdentityLock } from './components/IdentityLock';
import { Dashboard } from './components/Dashboard';
import { SosFlow } from './components/SosFlow';
import { Rewire } from './components/Rewire';
import { Rules } from './components/Rules';
import { Manifesto } from './components/Manifesto';
import { Settings } from './components/Settings';
import { TriggerInoculation } from './components/TriggerInoculation';
import { getTheme } from './utils/theme';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.ONBOARDING);
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [themeMode, setThemeMode] = useState<ThemeMode>('PROTOCOL');

  useEffect(() => {
    // Load initial state
    const savedIdentity = StorageService.getIdentity();
    if (savedIdentity && savedIdentity.isOnboarded) {
      setIdentity(savedIdentity);
      setScreen(AppScreen.DASHBOARD);
    } else {
      setScreen(AppScreen.ONBOARDING);
    }
    setLogs(StorageService.getLogs());
    
    // Load theme preference if we had one (using a simple localstorage key for now)
    const savedTheme = localStorage.getItem('pz_theme') as ThemeMode;
    if (savedTheme) setThemeMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'PROTOCOL' ? 'SERENITY' : 'PROTOCOL';
    setThemeMode(newTheme);
    localStorage.setItem('pz_theme', newTheme);
  };

  const refreshData = () => {
    setLogs(StorageService.getLogs());
  };

  const refreshIdentity = () => {
    const savedIdentity = StorageService.getIdentity();
    if (savedIdentity) {
      setIdentity(savedIdentity);
    }
  }

  const handleOnboardingComplete = () => {
    const newId = StorageService.getIdentity();
    setIdentity(newId);
    setScreen(AppScreen.DASHBOARD);
  };

  const theme = getTheme(themeMode);

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.ONBOARDING:
        return <IdentityLock onComplete={handleOnboardingComplete} themeMode={themeMode} />;
      
      case AppScreen.SOS:
        return <SosFlow 
          themeMode={themeMode}
          onComplete={() => {
            refreshData();
            setScreen(AppScreen.DASHBOARD);
          }} 
        />;
      
      case AppScreen.REWIRE:
        return <Rewire 
          themeMode={themeMode}
          onBack={() => {
            refreshData();
            setScreen(AppScreen.DASHBOARD);
          }} 
        />;
      
      case AppScreen.TRIGGER_INOCULATION:
        return <TriggerInoculation themeMode={themeMode} onBack={() => setScreen(AppScreen.DASHBOARD)} />;

      case AppScreen.RULES:
        return <Rules themeMode={themeMode} onBack={() => setScreen(AppScreen.DASHBOARD)} />;

      case AppScreen.MANIFESTO:
        return <Manifesto themeMode={themeMode} onBack={() => setScreen(AppScreen.SETTINGS)} />;
      
      case AppScreen.SETTINGS:
        return <Settings 
          themeMode={themeMode}
          onBack={() => {
            refreshIdentity();
            setScreen(AppScreen.DASHBOARD);
          }}
          onOpenManifesto={() => setScreen(AppScreen.MANIFESTO)} 
        />;
      
      case AppScreen.DASHBOARD:
      default:
        if (!identity) return null;
        return (
          <Dashboard 
            identity={identity}
            themeMode={themeMode}
            onToggleTheme={toggleTheme}
            onSos={() => setScreen(AppScreen.SOS)}
            onRewire={() => setScreen(AppScreen.REWIRE)}
            onRules={() => setScreen(AppScreen.RULES)}
            onTriggerPlan={() => setScreen(AppScreen.TRIGGER_INOCULATION)}
            onSettings={() => setScreen(AppScreen.SETTINGS)}
            todayLog={StorageService.getTodayLog()}
          />
        );
    }
  };

  return (
    <div className={`antialiased min-h-screen transition-colors duration-500 ${theme.appBg}`}>
      {renderScreen()}
    </div>
  );
};

export default App;