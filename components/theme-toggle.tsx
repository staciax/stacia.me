'use client';

import { RiComputerLine, RiMoonLine, RiSunLine } from '@remixicon/react';
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
  const label = mounted
    ? isDarkMode
      ? 'Switch to light theme'
      : 'Switch to dark theme'
    : 'Toggle theme';

  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-5 items-center justify-center text-fd-muted-foreground/50 transition-colors duration-200 hover:text-fd-accent-foreground"
      onClick={toggleSwitchTheme}
      ref={ref}
    >
      {mounted ? (
        isDarkMode ? (
          <RiSunLine className="size-5" aria-hidden />
        ) : (
          <RiMoonLine className="size-5" aria-hidden />
        )
      ) : (
        <RiComputerLine className="size-5" aria-hidden />
      )}
    </button>
  );
}
