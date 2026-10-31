# ZiJie Duan · Personal Studio

A bilingual personal portfolio with selected software projects, a small interactive
pixel canvas, a filterable project archive, and app documentation. Chinese at the
root, English under `/en/`. Built with [Astro](https://astro.build) and published
to GitHub Pages on every push to `main`.

## Edit the portfolio

- `src/components/Home.astro`: bilingual introduction, selected work, project archive and about copy.
- `src/components/PixelBoard.astro`: browser-local pixel canvas; nothing is uploaded or saved. Supports click/tap, arrow keys and reset.
- `src/styles/studio.css`: shared visual identity and responsive portfolio styles.
- `site.config.mjs`: identity, public contact address and app configuration.
- `src/assets/social.svg`: editable source for `public/social.png` (1200 × 630).
- `src/pages/sitemap.xml.ts`: sitemap generated from existing content routes.

The homepage works without JavaScript; pixel editing and archive filtering are
progressive enhancements. Motion respects the reduced-motion preference. No
external fonts, analytics, runtime GitHub requests or third-party embeds are used.

Project descriptions are based on their public GitHub READMEs. Product artwork
is an illustrative workflow, not a screenshot or a claim of release status.
Akiko-no-Hikari stays as a quiet text entry in the archive; do not promote it
to the hero, selected work, social preview or imagery without a new request.
Private organizational projects are not included in this public portfolio.

## Verify a change

Run `npm run build`, then preview the output with `npm run preview`. Check both
`/` and `/en/` at phone and desktop widths, keyboard operation of the pixel board,
archive filters, language switching, and all existing Utter document routes.
Review contrast and focus visibility when changing colors. The original
`/<app>/<kind>/` and `/en/<app>/<kind>/` URLs must remain available.

## Add or change a document

Each document is one Markdown file per language:

```
src/content/docs/zh/<app>/<kind>.md
src/content/docs/en/<app>/<kind>.md
```

`<kind>` is one of `privacy`, `terms`, `beta`, `support` (the order they are
listed in is set in `site.config.mjs`). Front matter:

```yaml
---
title: 隐私政策
updated: 2026-10-31 # shown as "最后更新 / Last updated"
summary: One line shown on the app page.
---
```

In the text, `{{owner}}`, `{{email}}` and `{{site}}` are filled in from
`site.config.mjs` (the owner in the document's language).

The page appears at `/<app>/<kind>/` (Chinese) and `/en/<app>/<kind>/`
(English), for example `/utter/privacy/` and `/en/utter/privacy/`.

## Add an app

Add it to `apps` in `site.config.mjs` (slug, name, taglines, TestFlight link),
then add its documents as above.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```
