import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkRepoImages from './src/plugins/remark-repo-images.mjs';
import rehypePostFigures from './src/plugins/rehype-post-figures.mjs';

export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    remarkPlugins: [remarkRepoImages],
    rehypePlugins: [rehypePostFigures],
  },
});
