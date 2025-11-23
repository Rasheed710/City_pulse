import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const FAV_KEY = 'citypulse:favs';
const PROFILE_KEY = 'citypulse:profile';

export async function getFavourites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAV_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function setFavouritesLocal(ids: string[]) {
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export async function toggleFavouriteLocal(id: string) {
  const favs = await getFavourites();
  const exists = favs.includes(id);
  const updated = exists ? favs.filter(x => x !== id) : [...favs, id];
  await setFavouritesLocal(updated);
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
