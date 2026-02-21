import { type InferPageType, loader, update } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { content } from 'fumadocs-mdx:collections/server';

const filteredSource = update(content.toFumadocsSource())
  .files((files) =>
    files.filter((file) => {
      if (file.type === 'meta') return true;
      return !file.data.private;
    }),
  )
  .build();

export const source = loader(filteredSource, {
  baseUrl: '/',
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
