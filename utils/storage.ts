import { UserIdentity, DailyLog, Trigger, TriggerPlan } from '../types';
import { FirebaseService } from './firebase';

const KEYS = {
  IDENTITY: 'pz_identity',
  LOGS: 'pz_logs',
  TRIGGERS: 'pz_triggers',
  PLANS: 'pz_plans'
};

export const StorageService = {
  getIdentity: (): UserIdentity | null => {
    const data = localStorage.getItem(KEYS.IDENTITY);
    return data ? JSON.parse(data) : null;
  },

  saveIdentity: (identity: UserIdentity) => {
    localStorage.setItem(KEYS.IDENTITY, JSON.stringify(identity));
    FirebaseService.syncIdentity(identity);
  },

  getLogs: (): DailyLog[] => {
    const data = localStorage.getItem(KEYS.LOGS);
    return data ? JSON.parse(data) : [];
  },

  logRewire: (date: string) => {
    const logs = StorageService.getLogs();
    const existing = logs.find(l => l.date === date);
    if (existing) {
      existing.rewireCompleted = true;
    } else {
      logs.push({ date, rewireCompleted: true, sosCount: 0 });
    }
    localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
    
    // Sync the specific log
    const updatedLog = logs.find(l => l.date === date);
    if (updatedLog) FirebaseService.syncLog(updatedLog);
  },

  logSos: (date: string) => {
    const logs = StorageService.getLogs();
    const existing = logs.find(l => l.date === date);
    if (existing) {
      existing.sosCount += 1;
    } else {
      logs.push({ date, rewireCompleted: false, sosCount: 1 });
    }
    localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));

    const updatedLog = logs.find(l => l.date === date);
    if (updatedLog) FirebaseService.syncLog(updatedLog);
  },

  getTodayLog: (): DailyLog | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return StorageService.getLogs().find(l => l.date === today);
  },

  getTriggers: (): Trigger[] => {
    const data = localStorage.getItem(KEYS.TRIGGERS);
    return data ? JSON.parse(data) : [];
  },

  saveTriggers: (triggers: Trigger[]) => {
    localStorage.setItem(KEYS.TRIGGERS, JSON.stringify(triggers));
  },

  // New method for Trigger Plans (Offline First + Sync)
  saveTriggerPlan: (plan: TriggerPlan) => {
    const data = localStorage.getItem(KEYS.PLANS);
    const plans: TriggerPlan[] = data ? JSON.parse(data) : [];
    plans.push(plan);
    localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
    
    FirebaseService.saveTriggerPlan(plan);
  }
};