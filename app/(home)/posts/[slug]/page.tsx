import BackLink from '@/components/back-link';
import { ContentBody, ContentPage } from '@/components/layouts/page-content';
import { createRelativeLink } from '@/lib/mdx.server';
import { blog } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/posts/[slug]'>) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <div className="pt-4">
      <ContentPage>
        <div className="mb-8">
          <h1 className="mb-0">{page.data.title}</h1>
          <p className="not-prose">test</p>
          <p className="not-prose">
            {new Date(page.data.date).toLocaleDateString()}
          </p>
        </div>
        <ContentBody>
          <MDX
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(blog, page),
            })}
          />
        </ContentBody>
      </ContentPage>
      <BackLink href="/blog" />
    </div>
  );
}
