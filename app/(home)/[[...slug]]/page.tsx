import { JsonLd } from '@/components/json-ld';
import {
  ContentBody,
  ContentDescription,
  ContentPage,
  ContentTitle,
} from '@/components/layouts/page-content';
import { createRelativeLink } from '@/lib/mdx.server';
import { getPageImage, source } from '@/lib/source';
import { profilePageJsonLd } from '@/lib/structured-data';
import { getMDXComponents } from '@/mdx-components';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const { body: Mdx } = await page.data.load();

  return (
    <>
      {page.url === '/' && <JsonLd data={profilePageJsonLd} />}
      <ContentPage>
        <ContentTitle>{page.data.title}</ContentTitle>
        <ContentDescription>{page.data.description}</ContentDescription>
        <ContentBody>
          <Mdx
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </ContentBody>
      </ContentPage>
    </>
  );
}

export async function generateMetadata(
  props: PageProps<'/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      images: getPageImage(page).url,
    },
    ...(page.url === '/' && { keywords: ['STACiA', 'STAC/A'] }),
  };
}

export function generateStaticParams() {
  return source.generateParams();
}
