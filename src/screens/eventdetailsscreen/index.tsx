import { AntDesign } from '@react-native-vector-icons/ant-design';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import {
  getFavourites,
  saveFavouritesToFirestore,
  toggleFavouriteLocal,
} from '../../utils/storage';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
type DetailProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export default function EventDetailsScreen({ route }:DetailProps ) {
  const { event } = route.params;
  const navigation = useNavigation();
  const [isFav, setIsFav] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const favs = await getFavourites();
      setIsFav(favs.includes(event.id));
    })();
  }, [event.id]);
  
  const onToggle = useCallback(async () => {
  const updated = await toggleFavouriteLocal(event.id);
  setIsFav(updated.includes(event.id));

  if (user?.uid) {
    const ok = await saveFavouritesToFirestore(user.uid, updated);
    if (!ok) {
      Alert.alert('Sync failed', 'Could not sync favourites to server');
    }
  }
}, [event.id, user?.uid]);

  const venueData = useMemo(() => {
    const venue = event._embedded?.venues?.[0];

    return {
      venue,
      lat: venue?.location?.latitude
        ? parseFloat(venue.location.latitude)
        : null,
      lon: venue?.location?.longitude
        ? parseFloat(venue.location.longitude)
        : null,
      banner: event.images?.[0]?.url,
      venueName: venue?.name || 'Venue TBA',
      city: venue?.city?.name,
      country: venue?.country?.name,
      address: venue?.address?.line1,
      date: event.dates?.start?.localDate,
      time: event.dates?.start?.localTime,
    };
  }, [event]);

  const {
    lat,
    lon,
    banner,
    venueName,
    city,
    country,
    address,
    date,
    time,
  } = venueData;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      
        <View style={styles.heroContainer}>
          {banner ? (
            <Image source={{ uri: banner }} style={styles.heroImage} />
          ) : (
            <View style={[styles.heroImage, styles.heroFallback]}>
              <Text style={styles.heroFallbackText}>City Pulse Event</Text>
            </View>
          )}

          
          <View style={styles.heroOverlay}>

         
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              activeOpacity={0.8}
            >
              <AntDesign name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>

       
            <View style={styles.overlayRight}>
              <View style={styles.chipRow}>
                {date ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{date}</Text>
                  </View>
                ) : null}
                {time ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{time}</Text>
                  </View>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  styles.favButton,
                  isFav && styles.favButtonActive,
                ]}
                onPress={onToggle}
                activeOpacity={0.8}
              >
            {isFav?<AntDesign name={'heart'} size={20} color={'#ff3366'}/>:
     <Feather name={'heart'} size={20} color={'#ff3366'}/>}
              </TouchableOpacity>
            </View>

          </View>
        </View>

        
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.subtitle}>{venueName}</Text>
          <Text style={styles.locationText}>
            {[city, country].filter(Boolean).join(', ')}
          </Text>
        </View>

     
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About this event</Text>
          <Text style={styles.cardBody}>
            {event.info ||
              event._embedded?.attractions
                ?.map((a: any) => a.name)
                .join(', ') ||
              'No additional information provided.'}
          </Text>
        </View>

   
        {lat !== null && lon !== null && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.cardBody}>
              {address}
              {city ? `, ${city}` : ''}
              {country ? `, ${country}` : ''}
            </Text>

            {/* <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker coordinate={{ latitude: lat, longitude: lon }} />
              </MapView>
            </View> */}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}


