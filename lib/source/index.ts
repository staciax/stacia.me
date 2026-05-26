import { type InferPageType, loader, update } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { blog as blogPosts, content } from 'fumadocs-mdx:collections/server';

import { remixIconsPlugin } from '../remix-icons-plugin';

const filteredSource = update(content.toFumadocsSource())
  .files((files) =>
    files.filter((file) => {
      if (file.type === 'meta') return true;
      if (file.path.startsWith('/posts')) return false;
      return !file.data.private;
    }),
  )
  .build();

export const source = loader(filteredSource, {
  baseUrl: '/',
  plugins: [remixIconsPlugin()],
});
source.pageTree.name = 'STAC/A';

export const blog = loader(toFumadocsSource(blogPosts, []), {
  baseUrl: '/posts',
});

export type BlogPost = InferPageType<typeof blog>;

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

export type Page = (typeof source)['$inferPage'];
export type Meta = (typeof source)['$inferMeta'];
