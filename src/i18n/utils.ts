import translations from './translations.json';

export type Language = 'es' | 'en';

export function getTranslations(lang: Language) {
  return translations[lang] || translations.es;
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = getTranslations(lang);
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return typeof value === 'string' ? value : key;
}
