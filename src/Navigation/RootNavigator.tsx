import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@react-native-vector-icons/feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import BiometricLockScreen from '@/screens/biometriclockscreen';
import EventDetailsScreen from '@/screens/eventdetailsscreen';
import HomeScreen from '@/screens/homescreen';
import ProfileScreen from '@/screens/profilescreen';
import SignupScreen from '@/screens/signupscreen';
import AuthScreen from '@/screens/authscreen';

export type RootStackParamList = {
  Auth: undefined;
  Signup: undefined;
  Home: undefined;
  Details: { event: any };
  Profile: undefined;
  BiometricLock:undefined
};

export type RoottabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RoottabParamList>();
const AUTH_KEY = 'citypulse:auth_local';
const BIOMETRIC_FLAG = 'citypulse:biometric_enabled';


function Tabnavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Profile":
              iconName = "user";
              break;
            default:
              iconName = "home";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },

      
       tabBarActiveTintColor: Colors.link,
        tabBarInactiveTintColor: Colors.textTertiary, 

        tabBarStyle: {
          backgroundColor: "rgba(15,23,42,0.9)",  
          borderTopWidth: 0,
          elevation: 5,
          height: 70,
          paddingBottom: 5,
        },

        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useAuth();

    const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const bio = await AsyncStorage.getItem(BIOMETRIC_FLAG);
        const rawUser = await AsyncStorage.getItem(AUTH_KEY);

        if (bio && rawUser) {
        
          setInitialRoute('BiometricLock');
        } else if (rawUser) {
         
          setInitialRoute('Home'); 
        } else {

          setInitialRoute('Auth');
        }
      } catch {
        setInitialRoute('Auth');
      }
    })();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <Stack.Navigator  initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Tabnavigator} />
          <Stack.Screen name="Details" component={EventDetailsScreen} />
        </>
      ) : (
        <>
        <Stack.Screen name="BiometricLock" component={BiometricLockScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

