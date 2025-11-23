import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home_title: 'City Pulse',
      discover_events: 'Discover events around you',
      search_events_title: 'Search events',
      search_events_hint: 'Find concerts, meetups, workshops and more',
      keyword: 'Keyword',
      city: 'City',
      search: 'Search',
      loading_events: 'Loading events...',
      no_events_found: 'No events found',
      please_enter_keyword_or_city: 'Please enter a keyword or city to search.',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      profile: 'Profile',
      bio: 'Bio',
    },
  },
  ar: {
    translation: {
      home_title: 'نبض المدينة',
      discover_events: 'اكتشف الفعاليات من حولك',
      search_events_title: 'البحث عن الفعاليات',
      search_events_hint: 'ابحث عن الحفلات، اللقاءات، الدورات والمزيد',
      keyword: 'الكلمة',
      city: 'المدينة',
      search: 'بحث',
      loading_events: 'جاري تحميل الفعاليات...',
      no_events_found: 'لم يتم العثور على فعاليات',
      please_enter_keyword_or_city: 'يرجى إدخال كلمة أو مدينة للبحث.',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      profile: 'الملف الشخصي',
      bio: 'نبذة',
    },
  },
};

i18n.use(initReactI18next).init({
  // compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
