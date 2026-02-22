import BackLink from '@/components/back-link';
import { ContentBody, ContentPage } from '@/components/layouts/page-content';
import NotFoundMdx from '@/content/not-found.mdx';
import { getMDXComponents } from '@/mdx-components';

export default async function NotFoundPage() {
  return (
    <>
      <ContentPage>
        <ContentBody>
          <NotFoundMdx components={getMDXComponents()} />
        </ContentBody>
      </ContentPage>
      <BackLink href="/" />
    </>
  );
}
