'use client';

import { ThemeProvider } from 'next-themes';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface RootProviderProps {
  /**
   * Customise options of `next-themes`
   */
  theme?: Partial<ComponentPropsWithoutRef<typeof ThemeProvider>> & {
    /**
     * Enable `next-themes`
     *
     * @defaultValue true
     */
    enabled?: boolean;
  };

  children?: ReactNode;
}

export function RootProvider({ children, theme = {} }: RootProviderProps) {
  let body = children;

  if (theme?.enabled !== false) {
    body = (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...theme}
      >
        {body}
      </ThemeProvider>
    );
  }

  return body;
}
