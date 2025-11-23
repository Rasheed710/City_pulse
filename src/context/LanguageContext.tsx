import React, { createContext, useContext, useState, ReactNode } from 'react';
import i18n from '../i18n';
import { I18nManager, Alert } from 'react-native';

type LangContextType = {
  language: string;
  toggleLanguage: () => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    const isRTL = newLang === 'ar';

    try {
      await i18n.changeLanguage(newLang);
      setLanguage(newLang);

      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      Alert.alert(
        newLang === 'ar' ? 'تم التغيير' : 'Restart Required',
        newLang === 'ar'
          ? 'سيتم قلب اتجاه التطبيق. يرجى إعادة تشغيل التطبيق.'
          : 'The app direction will flip. Please restart.'
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LangContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
