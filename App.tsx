import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { LogBox } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import i18n from './src/i18n';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <AuthProvider>
          <NavigationContainer
          onReady={() => {
            RNBootSplash.hide({ fade: true });
          }}
        >
            <RootNavigator />
               <Toast />
          </NavigationContainer>
        </AuthProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}
