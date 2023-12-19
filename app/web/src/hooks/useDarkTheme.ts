import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function useDarkTheme(): [
  string,
  Dispatch<SetStateAction<string>>,
] {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (localStorage.theme === 'dark') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
