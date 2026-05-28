import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'es' | 'en' | null;
    const initial = saved ?? 'es';
    setLang(initial);
    document.documentElement.setAttribute('data-lang', initial);
  }, []);

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es';
    setLang(next);
    localStorage.setItem('lang', next);
    document.documentElement.setAttribute('data-lang', next);
    document.documentElement.setAttribute('lang', next);
  };

  return (
    <button
      onClick={toggleLang}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="rounded-full px-3 py-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 transition-colors text-xs font-semibold tracking-wide"
    >
      {lang === 'es' ? 'ES' : 'ENG'}
    </button>
  );
}
