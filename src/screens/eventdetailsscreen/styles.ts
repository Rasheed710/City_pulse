import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#050509',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  heroContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 230,
  },
  heroFallback: {
    backgroundColor: '#15151f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroFallbackText: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '600',
  },

  heroOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlayRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  } as any,

  chipRow: {
    flexDirection: 'row',
    gap: 8,
  } as any,
  chip: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: {
    color: '#f5f5f5',
    fontSize: 12,
    fontWeight: '500',
  },

  favButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  favIcon: {
    fontSize: 20,
    color: '#ff3366',
  },

  titleBlock: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#c4c4cf',
    fontSize: 14,
    marginTop: 4,
  },
  locationText: {
    color: '#8b8b99',
    fontSize: 13,
    marginTop: 2,
  },

  card: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#11111a',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1e1e2b',
  },
  cardTitle: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardBody: {
    color: '#c4c4cf',
    fontSize: 13,
    lineHeight: 19,
  },

  mapContainer: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
  },
  map: {
    flex: 1,
  },
});