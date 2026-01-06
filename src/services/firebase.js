import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Use Vite environment variables when available. Fallback to the committed config for
// local convenience, but for production set the VITE_FIREBASE_* variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCYsA100brTV4dF8i3K6HSz5CeqXOQXwQE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ecommerce-defab.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ecommerce-defab",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ecommerce-defab.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "946999039668",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:946999039668:web:bc0a33119ae1a0e7c0a9e1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CDBW537Z8L",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;

// Warn in dev if environment variables are not set (helps catch placeholder .env)
try {
  const env = import.meta.env;
  const missing = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
  ].filter((k) => !env[k]);

  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `[services/firebase] Missing Vite env vars: ${missing.join(", ")} — using fallback config. For production set these in your environment or Vercel dashboard.`
    );
  }
} catch (e) {
  // ignore in non-module contexts
}
