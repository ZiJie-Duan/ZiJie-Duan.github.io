import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per document and language:
//   src/content/docs/<lang>/<app>/<kind>.md   (lang: zh or en)
// The entry id is that path without the extension, e.g. "zh/utter/privacy".
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

export const collections = { docs };
