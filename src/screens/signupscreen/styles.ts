import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050816', 
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(15,23,42,0.95)', 
    borderRadius: 18,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 6,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#F9FAFB',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 22,
  },
  inputWrapper: {
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#2563EB',
    borderRadius: 999,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
    fontSize: 14,
  },
  linkInner: {
    color: '#38BDF8',
    fontWeight: '600',
  },
});