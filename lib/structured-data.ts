import type { BlogPost } from '@/lib/source';

import type { BlogPosting, Person, ProfilePage, WithContext } from 'schema-dts';

import { baseUrl } from './metadata';

function toIsoString(value: string | Date) {
  return value instanceof Date
    ? value.toISOString()
    : new Date(value).toISOString();
}

export const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'STACIA',
    alternateName: 'STAC/A',
    url: 'https://stacia.me/',
    sameAs: ['https://github.com/staciax', 'https://twitter.com/stacia__x'],
  },
} satisfies WithContext<ProfilePage>;

export async function generateBlogPosting(
  post: BlogPost,
): Promise<WithContext<BlogPosting>> {
  const { lastModified } = await post.data.load();
  const url = new URL(post.url, baseUrl).href;
  const author: Person = {
    '@type': 'Person',
    name: post.data.author,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    url,
    // mainEntityOfPage: `${baseUrl}${post.url}`,
    // "image": "<absolute OG image URL>"
    datePublished: toIsoString(post.data.date),
    ...(lastModified ? { dateModified: toIsoString(lastModified) } : {}),
    author,
  };
}
