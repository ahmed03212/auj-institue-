import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import { idToEmail } from '../lib/auth-helpers.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // firebase auth user
  const [profile, setProfile] = useState(null); // Firestore users/{uid} doc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setError('');
      if (!fbUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }
      setUser(fbUser);
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid));
        if (snap.exists()) {
          setProfile({ uid: fbUser.uid, ...snap.data() });
        } else {
          // Authenticated but no profile doc — treat as a config problem,
          // not silently let them into a role they don't have.
          setProfile(null);
          setError('This account has no profile on file. Contact your administrator.');
        }
      } catch (e) {
        setError(e.message || 'Failed to load your profile.');
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  // Student/teacher login: they type their assigned ID + password.
  const loginWithId = useCallback(async (loginId, password, role) => {
    const email = idToEmail(loginId, role);
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  // Admin login: plain email + password (never shown on the public login page).
  const loginWithEmail = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    window.location.hash = '/';
  }, []);

  const updateOwnProfile = useCallback(
    async (patch) => {
      if (!user) return;
      await updateDoc(doc(db, 'users', user.uid), { ...patch, updatedAt: serverTimestamp() });
      setProfile((p) => ({ ...p, ...patch }));
    },
    [user]
  );

  const value = {
    user,
    profile,
    role: profile?.role || null,
    loading,
    error,
    loginWithId,
    loginWithEmail,
    logout,
    updateOwnProfile,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

// Helper for the admin bootstrap doc — exported so ManageTeachers/ManageStudents
// can create the matching users/{uid} record right after creating the auth account.
export async function createUserProfileDoc(uid, data) {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
