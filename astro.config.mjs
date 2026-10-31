import { defineConfig } from 'astro/config';
import { site } from './site.config.mjs';

/** Fills {{owner}}, {{email}} and {{site}} in Markdown text and links; the
 * owner in the document's language (its path is docs/<lang>/...). */
function fillTokens() {
  return () => (tree, file) => {
    const lang = /[\\/]en[\\/]/.test(String(file?.path ?? '')) ? 'en' : 'zh';
    const values = { owner: site.owner[lang], email: site.email, site: site.url + site.base };
    const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] ?? match);
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
