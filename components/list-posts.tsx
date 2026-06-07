import { blog } from '@/lib/source';

import { type InferPageType, PathUtils } from 'fumadocs-core/source';
import Link from 'next/link';

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export type Post = InferPageType<typeof blog>;

function PostItem({ post }: { post: Post }) {
  const date = new Date(
    post.data.date ?? getName(post.path),
  ).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      key={post.url}
      href={post.url}
      className="group not-prose no-underline"
    >
      <div className="flex flex-row items-end gap-2">
        <div>
          <span className="font-semibold text-2xl text-fd-muted-foreground transition-colors duration-300 group-hover:text-fd-foreground">
            {post.data.title}
          </span>
        </div>
        <div>
          <span className="text-fd-muted-foreground text-sm opacity-60 transition-colors duration-300 group-hover:text-fd-foreground">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ListPosts() {
  const posts = blog
    .getPages()
    .toSorted(
      (a, b) =>
        new Date(b.data.date ?? getName(b.path)).getTime() -
        new Date(a.data.date ?? getName(a.path)).getTime(),
    );

  const groupedByYear = Object.groupBy(posts, (page) => {
    const date = new Date(page.data.date ?? getName(page.path));
    return date.getFullYear();
  }) as Record<string, typeof posts>;

  return (
    <div className="not-prose">
      {Object.entries(groupedByYear).map(([year, posts]) => (
        <div key={year}>
          <h2 className="mb-2 font-bold text-3xl">{year}</h2>
          {posts.map((post) => (
            <PostItem key={post.url} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
}
