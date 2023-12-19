import React, { useState } from 'react';
import useDarkTheme from '../hooks/useDarkTheme';
import DarkThemeButton from './buttons/darkThemeButton';
import LightThemeButton from './buttons/lightThemeButton';

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkTheme();
  const [darkTheme, setDarkTheme] = useState(
    colorTheme === 'light' ? true : false,
  );

  const setLight = () => {
    console.log('setLight');
    setDarkTheme(false);
    setTheme('light');
  };

  const setDark = () => {
    console.log('setDark');
    setDarkTheme(true);
    setTheme('dark');
  };

  return (
    <>
      <div className="flex grid-cols-2">
        <h2 className="text-sm font-light dark:text-white pt-1.5 pr-2">
          {darkTheme === true ? 'Dark Theme' : 'Light Theme'}
        </h2>
        <div className="flex justify-end bg-white dark:bg-zinc-950 rounded-full">
          <button
            className="px-2 py-1"
            onClick={setDark}
          >
            <LightThemeButton />
          </button>
          <button
            className="px-2 py-1"
            onClick={setLight}
          >
            <DarkThemeButton />
          </button>
        </div>
      </div>
    </>
  );
}
