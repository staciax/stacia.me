import type { BlogPost } from '@/lib/source';

import { baseUrl } from './metadata';

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
};

export async function generateBlogPosting(post: BlogPost) {
  const { lastModified } = await post.data.load();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    url: `${baseUrl}${post.url}`,
    // mainEntityOfPage: `${baseUrl}${post.url}`,
    datePublished: post.data.date,
    ...(lastModified ? { dateModified: lastModified } : {}),
    articleBody: {
      author: { '@type': 'Person', name: post.data.author },
    },
    // "image": "<absolute OG image URL>"
  };
}
