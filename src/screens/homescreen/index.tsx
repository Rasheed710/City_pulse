import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import EventCard from '@/components/EventCard';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useEvents } from '@/hooks/useEvents';
import { RoottabParamList } from '@/Navigation/RootNavigator';
import { EventType } from '@/types';
import { getFavourites, getFavouritesFromFirestore } from '@/utils/storage';

type HomeProps = NativeStackScreenProps<RoottabParamList, 'Home'>;
function HomeScreen({ navigation }:HomeProps) {
  const { t, i18n } = useTranslation();
  const { toggleLanguage } = useLanguage();
  const { search, events, loading } = useEvents();
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const { user } = useAuth();
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    search('music');
    (async () => {
      const local = await getFavourites();
      setFavs(local);
      if (user?.uid) {
        const remote = await getFavouritesFromFirestore(user.uid);
        if (remote.length) {
          setFavs(remote);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user?.uid) {
        const remote = await getFavouritesFromFirestore(user.uid);
        if (remote.length) setFavs(remote);
      }
    })();
  }, [user]);

  const handleSearch = useCallback(() => {
    if (!keyword.trim() && !city.trim()) {
      Alert.alert(t('search'), t('Please enter a keyword or city to search.'));
      return;
    }
    search(keyword, city);
  }, [keyword, city, search, t]);

  const renderItem = useCallback(
    ({ item }: { item: EventType }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Details', { event: item })}
      >
        <EventCard event={item} />
      </TouchableOpacity>
    ),
    [navigation,events],
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>CityPulse</Text>
            <Text style={styles.subtitle}>
              {t('Discover events around you')}
            </Text>
          </View>

          <TouchableOpacity style={styles.langToggle} onPress={toggleLanguage}>
            <Text style={styles.langToggleText}>
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchCard}>
          <Text style={styles.searchTitle}>
            {t('searchEvents') || t('Search events')}
          </Text>
          <Text style={styles.searchHint}>
            {t('Find concerts, meetups, workshops and more')}
          </Text>

          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{t('keyword')}</Text>
              <TextInput
                placeholder={t('keyword')}
                placeholderTextColor="#9CA3AF"
                value={keyword}
                onChangeText={setKeyword}
                style={styles.input}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
            </View>

            <View style={[styles.inputWrapper, { marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>{t('city')}</Text>
              <TextInput
                placeholder={t('city')}
                placeholderTextColor="#9CA3AF"
                value={city}
                onChangeText={setCity}
                style={styles.input}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSearch}
            >
              <Text style={styles.primaryButtonText}>{t('search')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>
                {t('Loading events...')}
              </Text>
            </View>
          ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>{t('No events found')}</Text>
              }
              renderItem={renderItem}
               removeClippedSubviews={true}
    maxToRenderPerBatch={10}
    windowSize={10}
    initialNumToRender={10}
    getItemLayout={(data, index) => ({
      length: 105,
      offset: 105 * index,
      index,
    })}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default HomeScreen;


