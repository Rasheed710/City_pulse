// screens/BiometricLockScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
type BioProps = NativeStackScreenProps<RootStackParamList, 'BiometricLock'>;
export default function BiometricLockScreen({ navigation }: BioProps) {
  const { signInWithBiometrics } = useAuth();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await signInWithBiometrics(); 
        if (mounted) {
          navigation.replace('Home'); 
        }
      } catch (e) {
        if (mounted) {
          navigation.replace('Auth');
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Unlocking with biometrics…</Text>
    </View>
  );
}


