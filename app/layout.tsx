import type { Metadata } from 'next';
import './globals.css';

import { baseUrl, createMetadata } from '@/lib/metadata';

import { RootProvider } from '@fumadocs/base-ui/provider/next';

export const metadata: Metadata = createMetadata({
  title: {
    template: '%s | STAC/A',
    default: 'STAC/A',
  },
  description: 'a small universe of mine',
  metadataBase: baseUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <RootProvider theme={{ enabled: true }}>{children}</RootProvider>
      </body>
    </html>
  );
}
