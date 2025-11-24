import FloatingLabelInput from '@/components/FloatingLabelInput';
import { useAuth } from '@/context/AuthContext';
import { RootStackParamList } from '@/Navigation/RootNavigator';
import { isValidEmail, isValidName, isValidPassword } from '@/utils/validators';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './styles';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export default function SignupScreen({ navigation }: SignupProps) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '', phone: '' };

    if (!isValidName(name)) {
      newErrors.name = 'Name must be at least 2 characters long';
      valid = false;
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 6 characters and contain a number';
      valid = false;
    }
    // if (password !== confirmPassword) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  const onRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await signUp(email, password, { name, bio: '' });
      console.log(res, 'response');
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CityPulse and discover events around you</Text>

          <View style={styles.inputWrapper}>
            <FloatingLabelInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              error={errors.name}
            />

            <FloatingLabelInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />

            <FloatingLabelInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            {/* <FloatingLabelInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
            /> */}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#F9FAFB" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>
              Already have an account?{' '}
              <Text style={styles.linkInner}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


