import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#050816', 
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
    backgroundColor: '#0B1220',
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
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },

  email: {
    marginTop: 6,
    color: '#94A3B8',
    fontSize: 14,
  },

  card: {
    marginTop: 8,
    backgroundColor: 'rgba(15,23,42,0.7)',
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
    color: '#E6EEF8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },

  rowLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },

  rowValue: {
    color: '#F8FAFC',
    fontSize: 14,
    maxWidth: '60%',
    textAlign: 'right',
  },

  rowDescription: {
    color: '#6B7280',
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
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});