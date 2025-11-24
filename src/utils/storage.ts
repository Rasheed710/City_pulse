import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const FAV_KEY = 'citypulse:favs';
const PROFILE_KEY = 'citypulse:profile';

async function readLocalFavs(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

async function writeLocalFavs(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
  } catch (e) {
  }
}

export async function getFavourites(uid?: string): Promise<string[]> {
  const local = await readLocalFavs();

  if (!uid) {
    return local;
  }
  try {
    const snap = await firestore().collection('favourites').doc(uid).get();
    const remote = (snap.exists ? (snap.data() as { ids?: string[] })?.ids || [] : []) as string[];
    const mergedMap = new Map<string, true>();
    for (const id of local) mergedMap.set(id, true);
    for (const id of remote) mergedMap.set(id, true);
    const merged = Array.from(mergedMap.keys());

    await writeLocalFavs(merged);

    return merged;
  } catch (e) {
    return local;
  }
}

export async function syncFavouritesToFirestore(uid: string): Promise<boolean> {
  try {
    const local = await readLocalFavs();
    await firestore().collection('favourites').doc(uid).set({ ids: local }, { merge: true });
    return true;
  } catch (e) {
    return false;
  }
}


export async function setFavouritesLocal(ids: string[]) {
  await writeLocalFavs(ids);
}

export async function toggleFavouriteLocal(id: string) {
  const favs = await readLocalFavs();
  const exists = favs.includes(id);
  const updated = exists ? favs.filter(x => x !== id) : [...favs, id];
  await writeLocalFavs(updated);
  return updated;
}

export async function saveFavouritesToFirestore(uid: string, ids: string[]) {
  try {
    await firestore()
      .collection('favourites')
      .doc(uid)
      .set({ ids }, { merge: true });

    return true;
  } catch (e) {
    return false;
  }
}

export async function getFavouritesFromFirestore(uid: string) {
  try {
    const snap = await firestore()
      .collection('favourites')
      .doc(uid)
      .get();

    if (snap.exists) {
      const data = snap.data() as { ids?: string[] };
      return data?.ids || [];
    }
    return [];
  } catch (e) {
    return [];
  }
}

export async function saveProfile(profile: any) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function getProfile() {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}
