
import { Colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signinButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 18,
  },
  signinText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  biometricButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    backgroundColor: Colors.surfaceMuted,
  },
  biometricText: {
    color: Colors.textOnMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 26,
  },
  registerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  registerLink: {
    color: Colors.link,
    fontWeight: '600',
  },
});
