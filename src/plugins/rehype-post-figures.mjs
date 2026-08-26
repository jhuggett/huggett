/**
 * Gives Markdown posts the image treatment the MDX components provide:
 * a paragraph holding a single image becomes <figure class="image-figure">
 * with the alt text as its caption, and a paragraph holding several images
 * becomes a <div class="row-of-images"> of such figures.
 *
 * Runs before Astro's own image handling, so the <img> is still picked up
 * and optimised; the widths/sizes mirror ImageWithCaption.astro.
 */
const WIDTHS = [360, 720, 1440];
const SIZES = '(max-width: 1440px) 100vw, 1440px';

export default function rehypePostFigures() {
  return (tree) => transform(tree);
}

function transform(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    const images = imagesOnly(child);
    if (!images) {
      transform(child);
      return child;
    }
    if (images.length === 1) return figure(images[0]);
    return element('div', { className: ['row-of-images'] }, images.map(figure));
  });
}

/** The <img> children of a <p> that contains nothing else, or null. */
function imagesOnly(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const meaningful = node.children.filter((n) => !(n.type === 'text' && !n.value.trim()));
  const allImages = meaningful.length > 0 && meaningful.every((n) => n.type === 'element' && n.tagName === 'img');
  return allImages ? meaningful : null;
}

function figure(img) {
  img.properties = { widths: WIDTHS, sizes: SIZES, ...img.properties };
  const caption = typeof img.properties.alt === 'string' ? img.properties.alt.trim() : '';
  const children = [img];
  if (caption) children.push(element('figcaption', {}, [{ type: 'text', value: caption }]));
  return element('figure', { className: ['image-figure'] }, children);
}

function element(tagName, properties, children) {
  return { type: 'element', tagName, properties, children };
}
