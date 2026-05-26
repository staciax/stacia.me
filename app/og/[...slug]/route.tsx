import { getPageImage } from '@/lib/metadata';
import { source } from '@/lib/source';

import { ImageResponse } from '@takumi-rs/image-response';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';

import { getImageResponseOptions, generate as MetadataImage } from './generate';

async function getMetadataImage(slug: string[]) {
  'use cache';
  cacheLife('max');

  const page = source.getPage(slug);
  if (!page) return null;

  return (
    <MetadataImage
      title={page.data.title}
      description={page.data.description}
    />
  );
}

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/[...slug]'>,
) {
  const { slug } = await params;
  const metadataImage = await getMetadataImage(slug);
  if (!metadataImage) notFound();
  return new ImageResponse(metadataImage, await getImageResponseOptions());
}

export function generateStaticParams(): {
  slug: string[];
}[] {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
