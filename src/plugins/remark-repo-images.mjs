import path from 'node:path';

/**
 * Lets Markdown posts reference images by repository path — `src/assets/posts/…`,
 * which is what the CMS media browser shows — by rewriting the URL to one
 * relative to the post. Astro only optimises images it can import relatively.
 */
export default function remarkRepoImages() {
  return (tree, file) => {
    if (typeof file.path !== 'string') return;
    const root = file.cwd ?? process.cwd();
    walk(tree, (node) => {
      if (node.type !== 'image' && node.type !== 'definition') return;
      const match = /^\/?(src\/.+)$/.exec(node.url ?? '');
      if (!match) return;
      let rel = path.relative(path.dirname(file.path), path.join(root, match[1]));
      if (!rel.startsWith('.')) rel = `./${rel}`;
      node.url = rel.split(path.sep).join('/');
    });
  };
}

function walk(node, fn) {
  fn(node);
  node.children?.forEach((child) => walk(child, fn));
}
