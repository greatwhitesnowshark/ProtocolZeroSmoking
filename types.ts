export interface UserIdentity {
  statement: string;
  reasons: string[];
  startDate: string; // ISO Date string
  isOnboarded: boolean;
  costPerPack?: number;
  cigsPerDay?: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  rewireCompleted: boolean;
  sosCount: number;
}

export interface Trigger {
  id: string;
  name: string;
  replacement: string;
  strategy: string;
}

export interface TriggerPlan {
  id: string;
  date: string;
  situation: string;
  context: string; // Who/Where
  plan: {
    disrupt: string;
    replace: string;
    affirm: string;
  }
}

export enum AppScreen {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  SOS = 'SOS',
  REWIRE = 'REWIRE',
  RULES = 'RULES',
  TRIGGERS = 'TRIGGERS',
  TRIGGER_INOCULATION = 'TRIGGER_INOCULATION',
  SETTINGS = 'SETTINGS',
  MANIFESTO = 'MANIFESTO' // Technical/Behavioral specs
}

export type SosStep = 'BREATHE' | 'LABEL' | 'ACTION' | 'DISTRACT' | 'INTENT' | 'COMPLETE';

export type ThemeMode = 'PROTOCOL' | 'SERENITY';

export interface RewireModule {
  id: string;
  title: string;
  description: string;
  type: 'VISUALIZATION' | 'REFRAMING' | 'URGE_SURFING' | 'IDENTITY' | 'INTERACTIVE' | 'NEURO_SIMULATION';
  content: string[];
}