import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // dark glass
    padding: 10,
    borderRadius: 14,
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

  image: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#1E293B',
  },

  content: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F8FAFC',
    lineHeight: 20,
  },

  date: {
    marginTop: 6,
    fontSize: 13,
    color: '#94A3B8',
  },
});