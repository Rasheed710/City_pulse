import { Colors } from "@/constants/colors";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },

  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: Colors.avatarBg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
    }),
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  info: {
    marginLeft: 14,
    flex: 1,
  },

  name: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },

  email: {
    marginTop: 6,
    color: Colors.textTertiary,
    fontSize: 14,
  },

  card: {
    marginTop: 8,
    backgroundColor: Colors.surfaceMuted,
    borderRadius: 14,
    padding: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.14,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 3,
      },
    }),
  },

  sectionTitle: {
    color: Colors.sectionTitle,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rowDivider,
  },

  rowLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  rowValue: {
    color: Colors.textPrimary,
    fontSize: 14,
    maxWidth: '60%',
    textAlign: 'right',
  },

  rowDescription: {
    color: Colors.textDim,
    fontSize: 12,
    marginTop: 2,
  },

  footer: {
    marginTop: 'auto',
    paddingVertical: 16,
  },

  logoutBtn: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
