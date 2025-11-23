// src/hooks/useFirebaseAuth.ts
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

export type AuthUser = FirebaseAuthTypes.User | null;

export default function useFirebaseAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing]);

  const signIn = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email.trim(), password);
  };

  const signUp = (email: string, password: string) => {
    return auth().createUserWithEmailAndPassword(email.trim(), password);
  };

  const signOut = () => {
    return auth().signOut();
  };

  return {
    user,
    initializing,
    signIn,
    signUp,
    signOut,
  };
}
