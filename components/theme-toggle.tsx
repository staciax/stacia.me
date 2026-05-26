'use client';

import { cn } from '@/lib/cn';

import { buttonVariants } from '@fumadocs/base-ui/components/ui/button';
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
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
        'text-fd-muted-foreground/50 hover:text-fd-accent-foreground',
      )}
      onClick={toggleSwitchTheme}
      ref={ref}
    >
      {mounted ? (
        isDarkMode ? (
          <RiSunLine aria-hidden />
        ) : (
          <RiMoonLine aria-hidden />
        )
      ) : (
        <RiComputerLine className="opacity-0" aria-hidden />
      )}
    </button>
  );
}
