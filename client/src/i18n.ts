import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en.json';
import fi from './translations/fi.json';

const resources = {
    en,
    fi,
};

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).use(LanguageDetector).init({
    lng: 'fi',
    resources,
    defaultNS: 'common',
    fallbackLng: 'en',
});
