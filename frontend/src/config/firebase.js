import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB15ESlHVtorDE2773oRnQ73L-Ip9si6ns",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "audit-project-ac284.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "audit-project-ac284",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "audit-project-ac284.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "585344532444",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:585344532444:web:a8563a769b8ae108b01919",
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