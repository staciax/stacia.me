'use client';

import { Airplay, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { useModeAnimation } from 'react-theme-switch-animation';

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    isDarkMode: theme === 'dark',
    onDarkModeChange: (nextIsDark) => setTheme(nextIsDark ? 'dark' : 'light'),
  });

  return (
    <button
      type="button"
      className="text-base opacity-50 transition-all duration-200 hover:opacity-100 md:text-sm"
      onClick={toggleSwitchTheme}
      ref={ref}
    >
      <span className="flex items-center justify-center">
        {mounted ? (
          isDarkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )
        ) : (
          <Airplay size={20} className="opacity-0" aria-hidden />
        )}
      </span>
    </button>
  );
}
