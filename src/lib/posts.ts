import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * Posts for the site, newest first. Drafts are hidden from builds but still
 * render in `astro dev`, so they can be previewed while being written.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort(
    (a, b) =>
      b.data.writtenOn.getTime() - a.data.writtenOn.getTime() ||
      (a.data.order ?? 0) - (b.data.order ?? 0),
  );
}
