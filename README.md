# Apps by ZiJie Duan

Privacy policies, terms and beta guides for my apps. Chinese at the root,
English under `/en/`. Built with [Astro](https://astro.build) and published to
GitHub Pages on every push to `main`.

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
updated: 2026-10-31      # shown as "最后更新 / Last updated"
summary: One line shown on the app page.
---
```

In the text, `{{owner}}`, `{{email}}` and `{{site}}` are filled in from
`site.config.mjs`.

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
