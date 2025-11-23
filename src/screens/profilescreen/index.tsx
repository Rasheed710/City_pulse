import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { getProfile } from '../../utils/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { styles } from './styles';
type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export default function ProfileScreen(props:ProfileProps) {
  const {
    user,
    signOut,
    biometricEnabled,
    enableBiometrics,
    disableBiometrics,
  } = useAuth();

  const [profile, setProfile] = useState<{ name?: string }>({});
  const [bioLoading, setBioLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      if (p) setProfile(p);
    })();
  }, []);

  const displayName = profile?.name || user?.displayName || 'Guest User';
  const displayEmail = user?.email || 'Not signed in';

  const onToggleBiometric = useCallback(async (value: boolean) => {
try {
      setBioLoading(true);
      if (value) {
        await enableBiometrics();
        Alert.alert('Biometrics enabled', 'You can now sign in using biometrics.');
      } else {
        await disableBiometrics();
        Alert.alert('Biometrics disabled', 'Biometric sign-in has been turned off.');
      }
    } catch (e: any) {
      Alert.alert(
        'Biometric error',
        e?.message ? String(e.message) : 'Something went wrong while updating biometrics.'
      );
    } finally {
      setBioLoading(false);
    }
}, []);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <View style={styles.avatarWrap}>
            <Image
              source={require('../assets/placeholder.png')} // replace if needed
              style={styles.avatar}
              resizeMode="cover"
            />
          </View> */}

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {displayName}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {displayEmail}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Name:</Text>
            <Text style={styles.rowValue}>{displayName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email:</Text>
            <Text style={styles.rowValue}>{displayEmail}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Biometric login</Text>
              <Text style={styles.rowDescription}>
                Use Face ID / fingerprint to sign in next time.
              </Text>
            </View>

            <Switch
              value={biometricEnabled}
              onValueChange={onToggleBiometric}
              disabled={bioLoading}
              trackColor={{ false: '#4B5563', true: '#22C55E' }}
              thumbColor="#F9FAFB"
            />
          </View>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}


