import {
  type InferPageType,
  loader,
  PathUtils,
  update,
} from 'fumadocs-core/source';
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

const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
});

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

function parseBlogDate(value: Date | string) {
  if (value instanceof Date) {
    return new Date(
      Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()),
    );
  }

  const dateOnly = dateOnlyPattern.exec(value);
  if (dateOnly) {
    return new Date(
      Date.UTC(
        Number(dateOnly[1]),
        Number(dateOnly[2]) - 1,
        Number(dateOnly[3]),
      ),
    );
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid blog post date: ${value}`);
  }

  return date;
}

export function getBlogPostDate(post: BlogPost) {
  return parseBlogDate(post.data.date ?? getName(post.path));
}

export function getBlogPostYear(post: BlogPost) {
  return getBlogPostDate(post).getUTCFullYear();
}

export function formatBlogPostDate(post: BlogPost) {
  return blogDateFormatter.format(getBlogPostDate(post));
}

export function compareBlogPostsByDateDesc(a: BlogPost, b: BlogPost) {
  return getBlogPostDate(b).getTime() - getBlogPostDate(a).getTime();
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

export type Page = (typeof source)['$inferPage'];
export type Meta = (typeof source)['$inferMeta'];
