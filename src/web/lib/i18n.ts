import { de } from './translations/de';
import { en } from './translations/en';

export type TranslationKey = keyof typeof de;

const translations = { de, en } as const;
type Locale = keyof typeof translations;

let currentLocale: Locale = 'de';

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: TranslationKey): string {
  return translations[currentLocale][key] || translations['de'][key] || key;
}

export { de, en };
