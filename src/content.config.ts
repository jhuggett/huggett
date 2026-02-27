import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      coverImage: image(),
      coverImageAlt: z.string(),
      writtenOn: z.date(),
      lastUpdatedOn: z.date().optional(),
      description: z.string(),
      tags: z.array(z.enum(['blacksmithing', 'coding', 'woodworking'])),
      order: z.number(),
    }),
});

export const collections = { posts };
