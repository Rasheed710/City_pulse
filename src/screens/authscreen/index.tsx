import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import { useAuth } from '../../context/AuthContext';
import { showErrorToast } from '../../utils/toast';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type AuthProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export default function AuthScreen({ navigation }:AuthProps) {
  const { signIn, signInWithBiometrics, biometricEnabled } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = useCallback(() => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must contain 6 characters and one number');
      valid = false;
    }

    return valid;
}, [email, password]);

  const onSignIn = useCallback(async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const u = await signIn(email, password);
      console.log('[AuthScreen] manual sign-in user', u);
      navigation.replace('Home');
    } catch (err: any) {
      console.error('[AuthScreen] signIn error', err);
      showErrorToast(err.message || 'Failed to sign in', 'Login Failed');
    } finally {
      setLoading(false);
    }
}, [validate, email, password]);

  const onBiometricSignIn = useCallback(async () => {
    try {
      setLoading(true);
      const u = await signInWithBiometrics();
      navigation.replace('Home'); 
    } catch (e: any) {
      showErrorToast(e.message || 'Biometric sign-in failed', 'Login Failed');
    } finally {
      setLoading(false);
    }
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Text style={styles.appTitle}>CityPulse</Text>
          <Text style={styles.welcomeText}>Sign in to continue</Text>
        </View>
        <FloatingLabelInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={emailError}
        />
        <FloatingLabelInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
        <TouchableOpacity
          style={styles.signinButton}
          onPress={onSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#F9FAFB" />
          ) : (
            <Text style={styles.signinText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {biometricEnabled && (
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={onBiometricSignIn}
            disabled={loading}
          >
            <Text style={styles.biometricText}>Sign in with Biometrics</Text>
          </TouchableOpacity>
        )}

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don’t have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.registerLink}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


