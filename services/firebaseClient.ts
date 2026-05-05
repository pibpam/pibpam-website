import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

let app: FirebaseApp | null = null;

const getFirebaseConfig = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
};

export const getFirebaseApp = () => {
  if (typeof window === "undefined") {
    throw new Error("Firebase auth is only available in the browser");
  }

  if (app) {
    return app;
  }

  const config = getFirebaseConfig();

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    throw new Error("Firebase environment variables are not configured");
  }

  app = getApps().length ? getApp() : initializeApp(config);
  return app;
};

export const loginWithFirebaseEmail = (email: string, password: string): Promise<UserCredential> => {
  const firebaseApp = getFirebaseApp();
  return signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
};

export const loginWithGooglePopup = (): Promise<UserCredential> => {
  const firebaseApp = getFirebaseApp();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(firebaseApp), provider);
};

export const sendFirebasePasswordReset = (email: string): Promise<void> => {
  const firebaseApp = getFirebaseApp();
  return sendPasswordResetEmail(getAuth(firebaseApp), email);
};
