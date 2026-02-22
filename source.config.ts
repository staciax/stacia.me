import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import {
  defineCollections,
  defineConfig,
  defineDocs,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const content = defineDocs({
  dir: 'content',
  docs: {
    schema: pageSchema.extend({
      private: z.boolean().default(false),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// note: `content/posts` is actually already included in the content block above.
// separating it here cause the blog needs a different schema.
// filtered out from the main tree later (see `/lib/source.ts`).
// keeping the structure as-is, this setup just works better for me.
export const blog = defineCollections({
  type: 'doc',
  dir: 'content/posts',
  schema: pageSchema.extend({
    date: z.iso.date().or(z.date()),
    private: z.boolean().default(false),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
