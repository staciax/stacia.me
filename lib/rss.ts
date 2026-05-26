import { blog } from '@/lib/source';

import { Feed } from 'feed';
import { cacheLife } from 'next/cache';

const baseUrl = 'https://stacia.me';

export async function getRSS() {
  'use cache';
  cacheLife('max');

  const feed = new Feed({
    title: 'STAC/A Blog',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'en',

    image: `${baseUrl}/banner.png`,
    favicon: `${baseUrl}/icon.png`,
    copyright: 'All rights reserved 2026, STAC/A',
  });

  for (const page of blog.getPages().sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  })) {
    if (page.data.private) continue;
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      date: new Date(page.data.date),
      author: [
        {
          name: page.data.author,
        },
      ],
    });
  }

  return feed.rss2();
}
