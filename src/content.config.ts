import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Go Git CMS writes media as repository paths (`src/assets/posts/…`); Astro's
 * `image()` helper resolves relative to the post file. Posts are flat under
 * src/content/posts, so the mapping is fixed.
 */
const fromRepoPath = (value: unknown) =>
  typeof value === 'string' ? value.replace(/^\/?src\//, '../../') : value;

// Posts are edited through Go Git CMS (see go-git-cms.yml). Existing posts are
// MDX; new ones written in the CMS are plain Markdown. Both live here.
const posts = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      coverImage: z.preprocess(fromRepoPath, image()),
      coverImageAlt: z.string(),
      // The CMS writes dates back as quoted strings, so coerce rather than require a Date.
      writtenOn: z.coerce.date(),
      lastUpdatedOn: z.coerce.date().optional(),
      description: z.string(),
      tags: z.array(z.enum(['blacksmithing', 'coding', 'woodworking'])),
      draft: z.boolean().default(false),
      // Legacy manual ordering; posts now sort by writtenOn, with this as a tie-break.
      order: z.number().optional(),
    }),
});

export const collections = { posts };
