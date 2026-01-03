/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(cred.user, { displayName: name });

    setUser({
      ...cred.user,
      displayName: name,
    });
  };

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const value = { user, loading, registerUser, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
