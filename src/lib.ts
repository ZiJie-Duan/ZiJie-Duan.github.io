import { getCollection, type CollectionEntry } from 'astro:content';
import { apps, docKinds, labels } from '../site.config.mjs';

export type Lang = 'zh' | 'en';
export type App = (typeof apps)[number];
export type Doc = CollectionEntry<'docs'>;

/** A path on the site: Chinese at the root, English under /en/. */
export function href(lang: Lang, ...parts: string[]): string {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
  const segments = lang === 'en' ? ['en', ...parts] : parts;
  return base + segments.map((s) => s + '/').join('');
}

export function t(lang: Lang) {
  return labels[lang];
}

/** Where a document's file is: "<lang>/<app>/<kind>". */
export function parts(doc: Doc) {
  const [lang, app, kind] = doc.id.split('/');
  return { lang: lang as Lang, app, kind };
}

/** An app's documents in one language, in the usual order. */
export async function docsOf(lang: Lang, app: string): Promise<Doc[]> {
  const all = await getCollection('docs', (doc) => {
    const p = parts(doc);
    return p.lang === lang && p.app === app;
  });
  return all.sort((a, b) => docKinds.indexOf(parts(a).kind) - docKinds.indexOf(parts(b).kind));
}

export function formatDate(date: Date, lang: Lang): string {
  return lang === 'zh'
    ? `${date.getUTCFullYear()} 年 ${date.getUTCMonth() + 1} 月 ${date.getUTCDate()} 日`
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
