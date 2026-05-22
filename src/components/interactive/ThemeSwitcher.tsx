import { useEffect, useState } from 'react';

const ICON_SUN = (
	<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
);
const ICON_MOON = (
	<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
);

export default function ThemeSwitcher() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		// On mount, check localStorage or prefers-color-scheme
		const saved = localStorage.getItem('theme');
		if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			setDark(true);
		} else {
			document.documentElement.classList.remove('dark');
			setDark(false);
		}
	}, []);

	const toggleTheme = () => {
		if (dark) {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
			setDark(false);
		} else {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			setDark(true);
		}
	};

	return (
		<button
			onClick={toggleTheme}
			aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
			className="rounded-full p-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 transition-colors"
			title={dark ? 'Modo claro' : 'Modo oscuro'}
		>
			{dark ? ICON_SUN : ICON_MOON}
		</button>
	);
}
