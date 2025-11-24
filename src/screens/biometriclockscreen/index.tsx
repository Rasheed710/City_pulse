import { RootStackParamList } from '@/Navigation/RootNavigator';
import { useAuth } from '@/context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
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


