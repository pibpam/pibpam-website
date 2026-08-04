import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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

// Dispara com o idToken atual sempre que o Firebase restaura a sessão
// persistida (no carregamento da página) ou renova o token automaticamente
// (a cada ~1h, usando o refresh token guardado por ele). É esse hook que
// mantém o accessToken do backend sempre atualizado sem exigir novo login.
export const observeFirebaseIdToken = (
  onChange: (idToken: string | null) => void
): (() => void) => {
  const firebaseApp = getFirebaseApp();
  return onIdTokenChanged(getAuth(firebaseApp), async (firebaseUser) => {
    if (!firebaseUser) {
      onChange(null);
      return;
    }
    onChange(await firebaseUser.getIdToken());
  });
};

export const signOutFirebase = (): Promise<void> => {
  const firebaseApp = getFirebaseApp();
  return signOut(getAuth(firebaseApp));
};
