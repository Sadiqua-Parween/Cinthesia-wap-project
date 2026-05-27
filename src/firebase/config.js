import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

function hasRealValue(value) {
  return Boolean(value && !/^(your_|YOUR_|placeholder|please-pass|valid-api-key)/i.test(value));
}

export const isFirebaseConfigured = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId
].every(hasRealValue);

const dbUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;
if (isFirebaseConfigured && dbUrl && dbUrl.startsWith("https://")) {
  firebaseConfig.databaseURL = dbUrl;
}

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const firestore = app ? getFirestore(app) : null;
export const rtdb = app && firebaseConfig.databaseURL ? getDatabase(app) : null;

export default app;
