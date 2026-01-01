import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { UserIdentity, DailyLog, TriggerPlan } from '../types';

// Placeholder config - User must replace this for Sync to work
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

let db: any = null;

// Safe Initialization
try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } else {
    console.warn("Firebase config missing. App running in Offline-Only mode.");
  }
} catch (e) {
  console.warn("Firebase initialization failed (Network or Config). App running Offline.", e);
}

export const FirebaseService = {
  syncIdentity: async (identity: UserIdentity) => {
    if (!db) return;
    try {
      await setDoc(doc(db, "users", "primary_user"), identity);
    } catch (e) { console.error("Sync error", e); }
  },

  syncLog: async (log: DailyLog) => {
    if (!db) return;
    try {
      await setDoc(doc(db, "users", "primary_user", "logs", log.date), log);
    } catch (e) { console.error("Sync error", e); }
  },

  saveTriggerPlan: async (plan: TriggerPlan) => {
    if (!db) return;
    try {
      await addDoc(collection(db, "users", "primary_user", "plans"), plan);
    } catch (e) { console.error("Sync error", e); }
  }
};