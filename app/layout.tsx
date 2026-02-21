import type { Metadata } from 'next';
import './globals.css';

import { RootProvider } from '@fumadocs/base-ui/provider/next';

export const metadata: Metadata = {
  title: 'STACiA',
  description: 'a small universe of mine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider theme={{ enabled: true }}>{children}</RootProvider>
      </body>
    </html>
  );
}
