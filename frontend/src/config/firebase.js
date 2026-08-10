import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let authObj;
let providerObj;

try {
  // Only initialize if we have an API key, otherwise it will crash the entire app on deploy
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    authObj = getAuth(app);
    providerObj = new GoogleAuthProvider();
  } else {
    console.warn("Firebase API key missing. Running in fallback mode.");
    // Mock objects so imports don't crash
    authObj = {};
    providerObj = {};
  }
} catch (error) {
  console.warn("Firebase initialization failed:", error);
  authObj = {};
  providerObj = {};
}

export const auth = authObj;
export const googleProvider = providerObj;