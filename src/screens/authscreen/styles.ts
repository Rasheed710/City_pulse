import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
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
    color: '#F9FAFB',
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  signinButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 18,
  },
  signinText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
  },
  biometricButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.9)',
  },
  biometricText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '500',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 26,
  },
  registerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  registerLink: {
    color: '#38BDF8',
    fontWeight: '600',
  },
});