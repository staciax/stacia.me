import { blog } from '@/lib/source';

import { type InferPageType, PathUtils } from 'fumadocs-core/source';
import Link from 'next/link';

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export type Post = InferPageType<typeof blog>;

function PostItem({ post }: { post: Post }) {
  return (
    <div>
      <Link key={post.url} href={post.url}>
        <span>{post.data.title}</span>
        <span> - </span>
        <span>
          {new Date(post.data.date ?? getName(post.path)).toDateString()}
        </span>
      </Link>
    </div>
  );
}

export default function ListPosts() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime(),
  );

  const groupedByYear = Object.groupBy(posts, (page) => {
    const date = new Date(page.data.date ?? getName(page.path));
    return date.getFullYear();
  }) as Record<string, typeof posts>;

  return (
    <div>
      {Object.entries(groupedByYear).map(([year, posts]) => (
        <div key={year}>
          <h2>{year}</h2>
          {posts.map((post) => (
            <PostItem key={post.url} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
}
