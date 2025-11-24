import { Colors } from "@/constants/colors";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  card: {
    width: '100%',
    backgroundColor: Colors.surfaceStrong,
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
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 22,
  },

  inputWrapper: {
    width: '100%',
  },

  button: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    alignItems: 'center',
    marginVertical: 16,
  },

  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },

  link: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    fontSize: 14,
  },

  linkInner: {
    color: Colors.link,
    fontWeight: '600',
  },
});
