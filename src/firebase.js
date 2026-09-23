import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Fill these in from Firebase Console → Project Settings → General → Your apps → SDK config.
// Values are read from environment variables (see .env.example). Never commit real keys to git.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Creating a new Firebase Auth user with createUserWithEmailAndPassword()
 * automatically signs the app in AS that new user, which would kick the
 * currently logged-in admin out of their own session. To let an admin
 * create teacher/student accounts without losing their session, we spin
 * up a throwaway secondary Firebase App instance, create the user there,
 * then immediately tear that instance down. The admin's session on the
 * primary `auth` instance is never touched.
 */
export function getScratchAuth() {
  const name = `scratch-${Date.now()}`;
  const scratchApp = initializeApp(firebaseConfig, name);
  const scratchAuth = getAuth(scratchApp);
  return {
    auth: scratchAuth,
    cleanup: () => deleteApp(scratchApp),
  };
}

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}
