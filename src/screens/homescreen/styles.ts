import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#9CA3AF',
  },
  langToggle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
    backgroundColor: 'rgba(15,23,42,0.9)',
  },
  langToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E5E7EB',
    letterSpacing: 0.5,
  },
  searchCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F9FAFB',
  },
  searchHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  input: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#F9FAFB',
    backgroundColor: '#020617',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  primaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F9FAFB',
  },
  secondaryButton: {
    marginLeft: 10,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4B5563',
    borderWidth: 1,
    backgroundColor: 'rgba(15,23,42,0.9)',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 12
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: '#9CA3AF',
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
  },
});
