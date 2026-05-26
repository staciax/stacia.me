// https://github.com/fuma-nama/fumadocs/blob/dev/apps/docs/app/og/%5B...slug%5D/generate.tsx
// MIT License

import type { ImageResponseOptions } from '@takumi-rs/image-response';
import { cacheLife } from 'next/cache';

export interface GenerateProps {
  title: string;
  description?: string;
}

const font = Bun.file('@/lib/og/JetBrainsMono-Regular.ttf')
  .arrayBuffer()
  .then((data) => ({
    name: 'JetBrainsMono',
    data,
    weight: 400,
  }));

const fontBold = Bun.file('@/lib/og/JetBrainsMono-Bold.ttf')
  .arrayBuffer()
  .then((data) => ({
    name: 'JetBrainsMono',
    data,
    weight: 600,
  }));

export async function getImageResponseOptions(): Promise<ImageResponseOptions> {
  'use cache';
  cacheLife('max');

  return {
    width: 1200,
    height: 630,
    format: 'webp',
    fonts: await Promise.all([font, fontBold]),
  };
}

export function generate({ title, description }: GenerateProps) {
  const siteName = 'STAC/A';
  const primaryTextColor = 'rgb(240,240,240)';
  const logo = <div>STAC/A</div>; // TODO: logo

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: 'white',
        backgroundColor: 'rgb(10,10,10)',
        fontFamily: 'JetBrainsMono',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '4rem',
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: '76px',
          }}
        >
          {title}
        </span>
        <p
          style={{
            fontSize: '48px',
            color: 'rgba(240,240,240,0.7)',
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            marginTop: 'auto',
            color: primaryTextColor,
          }}
        >
          {logo}
          <span
            style={{
              fontSize: '46px',
              fontWeight: 600,
            }}
          >
            {siteName}
          </span>
        </div>
      </div>
    </div>
  );
}
