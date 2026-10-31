import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { apps, site } from "../../site.config.mjs";
import { href, parts } from "../lib";
export const GET: APIRoute = async () => {
  const docs = await getCollection("docs");
  const paths = [
    href("zh"),
    href("en"),
    href("zh", "projects"),
    href("en", "projects"),
    ...apps.flatMap((app) => [href("zh", app.slug), href("en", app.slug)]),
    ...docs.map((doc) => {
      const p = parts(doc);
      return href(p.lang, p.app, p.kind);
    }),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${new URL(path, site.url).href}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
