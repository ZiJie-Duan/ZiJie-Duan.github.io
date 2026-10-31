import { defineConfig } from 'astro/config';
import { site } from './site.config.mjs';

/** Fills {{owner}}, {{email}} and {{site}} in Markdown text and links. */
function fillTokens() {
  const values = { owner: site.owner, email: site.email, site: site.url + site.base };
  const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] ?? match);
  return () => (tree) => {
    const walk = (node) => {
      if (typeof node.value === 'string') node.value = fill(node.value);
      if (typeof node.url === 'string') node.url = fill(node.url);
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: site.url,
  base: site.base || undefined,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [fillTokens()],
  },
});
