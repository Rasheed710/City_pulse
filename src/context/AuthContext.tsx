import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

import {
  checkBiometricSupport,
  enableBioMetric,
} from 'react-native-biometric-check';
import { showErrorToast } from '../utils/toast';

const AUTH_KEY = 'citypulse:auth_local';
const BIOMETRIC_FLAG = 'citypulse:biometric_enabled';
const BIOMETRIC_KEYCHAIN_SERVICE = 'citypulse_biometric_token';

type AuthContextType = {
  user: any;
  loading: boolean;
  biometricEnabled: boolean;
  locked: boolean; 
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, profile?: any) => Promise<any>;
  signOut: () => Promise<void>;
  enableBiometrics: () => Promise<boolean>;
  disableBiometrics: () => Promise<void>;
  signInWithBiometrics: () => Promise<any>;
  unlockWithBiometrics: () => Promise<any>; 
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [locked, setLocked] = useState(false);
  const [pendingUser, setPendingUser] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const bio = await AsyncStorage.getItem(BIOMETRIC_FLAG);
        setBiometricEnabled(!!bio);

        const raw = await AsyncStorage.getItem(AUTH_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          if (bio) {
            setPendingUser(cached);
            setUser(null); 
            setLocked(true);
            setLoading(false);
            const unsub = auth().onAuthStateChanged((u) => {
              if (u) {
                AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ uid: u.uid, email: u.email }));
              }
            });
            return () => unsub();
          } else {
            setUser(cached);
            setLocked(false);
          }
        }
      } catch (e) {
      }

      const unsub = auth().onAuthStateChanged(async (u) => {
        try {
          if (u) {
            const userObj = { uid: u.uid, email: u.email };
            setUser(userObj);
            await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userObj));
          } else {
            const raw = await AsyncStorage.getItem(AUTH_KEY);
            setUser(raw ? JSON.parse(raw) : null);
          }
        } finally {
          setLoading(false);
        }
      });

      return unsub;
    })();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const cred = await auth().signInWithEmailAndPassword(email.trim(), password);
      const userObj = { uid: cred.user.uid, email: cred.user.email };
      setUser(userObj);
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userObj));
      setPendingUser(null);
      setLocked(false);
      return userObj;
    } catch (err: any) {
      showErrorToast(err.message, 'Login Failed');
      throw err;
    }
  }

  async function signUp(email: string, password: string, profile?: any) {
    try {
      const cred = await auth().createUserWithEmailAndPassword(email.trim(), password);
      const userObj = { uid: cred.user.uid, email: cred.user.email };

      if (profile?.name) {
        try {
          await cred.user.updateProfile({ displayName: profile.name });
        } catch (e) {
          console.warn('updateProfile failed', e);
        }
      }

      if (profile) {
        await firestore()
          .collection('profiles')
          .doc(userObj.uid)
          .set({
            ...profile,
            email: userObj.email,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
      }

      const localUser = { ...userObj, name: profile?.name || cred.user.displayName || null };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(localUser));
      setUser(localUser);
      setLocked(false);
      setPendingUser(null);

      return userObj;
    } catch (err: any) {
      showErrorToast(err.message || 'Registration Failed', 'Registration Failed');
      throw err;
    }
  }
  async function signOutUser() {
    try {
      await auth().signOut();
    } catch {
    }
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
    setLocked(false);
    setPendingUser(null);
  }

  function promptBiometric(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      enableBioMetric('Use Face ID', 'Confirm your identity', (res: any) => {
        if (res === 5) resolve();
        else reject(new Error(String(res)));
      });
    } else {
      checkBiometricSupport((support: string) => {
        if (support !== 'SUCCESS') {
          reject(new Error(support));
          return;
        }

        enableBioMetric('Biometric Login', 'Confirm your identity', (res: any) => {
          if (res === 'SUCCESS' || res === 5) resolve();
          else reject(new Error(String(res)));
        });
      });
    }
  });
}
async function saveBiometricTokenAfterSuccess() {
  const token = 'bio-' + Math.random().toString(36).slice(2);

  await Keychain.setGenericPassword('citypulse', token, {
    service: BIOMETRIC_KEYCHAIN_SERVICE,
  });

  await AsyncStorage.setItem(BIOMETRIC_FLAG, '1');
  setBiometricEnabled(true);
}


  async function enableBiometrics() {
  await promptBiometric();

  await saveBiometricTokenAfterSuccess();

  return true;
}


async function disableBiometrics() {
  await Keychain.resetGenericPassword({ service: BIOMETRIC_KEYCHAIN_SERVICE });
  await AsyncStorage.removeItem(BIOMETRIC_FLAG);
  setBiometricEnabled(false);
}
  async function signInWithBiometrics() {
  await promptBiometric();

  const creds = await Keychain.getGenericPassword({
    service: BIOMETRIC_KEYCHAIN_SERVICE,
  });
  if (!creds || !creds.password) {
    throw new Error('No biometric token stored');
  }

  const raw = await AsyncStorage.getItem(AUTH_KEY);
  if (!raw) {
    await Keychain.resetGenericPassword({ service: BIOMETRIC_KEYCHAIN_SERVICE });
    await AsyncStorage.removeItem(BIOMETRIC_FLAG);
    setBiometricEnabled(false);
    throw new Error('Session expired. Please login manually.');
  }

  const userObj = JSON.parse(raw);
  setUser(userObj);

  return userObj;
}

  async function unlockWithBiometrics() {
    if (!locked || !pendingUser) {
      return user;
    }
    const u = await signInWithBiometrics();
    return u;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        biometricEnabled,
        locked,
        signIn,
        signUp,
        signOut: signOutUser,
        enableBiometrics,
        disableBiometrics,
        signInWithBiometrics,
        unlockWithBiometrics,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
