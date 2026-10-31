# ZiJie Duan · Code & Exploration

A bilingual personal website and complete public-project directory, built with
Astro and deployed to GitHub Pages on every push to `main`. Chinese lives at `/`,
English at `/en/`; the directory lives at `/projects/` and `/en/projects/`.

## Structure

- `src/components/Home.astro`: personal introduction, keyboard-accessible field tabs, repository statistics and contact.
- `src/components/Projects.astro`: server-rendered directory with every public repository and assessment details.
- `src/data/projects.json`: curated bilingual repository snapshot, descriptions, evidence and source links.
- `src/data/projects.ts`: shared categories, maturity ordering and search text.
- `src/scripts/projects.ts`: composable filters, sorting, list/grid view and shareable URL state.
- `src/scripts/shell.ts`: color theme, persistent preference and keyboard-accessible quick search.
- `src/styles/modern.css`: responsive light/dark design; `site.css` retains base document styles.
- `src/assets/social.svg`: source for the generated `public/social.png` preview.

The homepage introduces the person and areas of exploration. Individual projects
belong in the directory, without featured-project posters or oversized decorative
initials. Akiko-no-Hikari remains an ordinary text entry in the directory; keep it
out of the homepage, imagery and social preview. No private organizational projects
or unverified contribution claims are included.

## Repository coverage and assessment

The 2026-10-31 snapshot covers all 47 public repositories returned by
`GET /users/ZiJie-Duan/repos?per_page=100`: 44 non-fork repositories, 3 forks,
and 6 archived repositories. Counts and language distributions are derived from
this same dataset. “Public” does not imply a particular software license.

Each repository was reviewed using its README, recursive file tree and GitHub
release metadata. Disaster Response Australia additionally uses its nested app
README. Individual evidence notes link back to public sources. This is a review
of public materials, not a claim that all repository programs have been run.

Default order: documented workflows, core implementations, experiments,
learning/content records, then forks. Within a stage, the editorial `order`
reflects functional scope, documentation and validation evidence. Archive state
is independent. Do not infer completion from stars, commit dates, a test filename
or an alpha/beta release alone, and do not invent percentage-complete scores.

When updating the directory, reconcile IDs against the current public repository
list (paginate if needed), inspect new evidence, edit both language summaries and
rationales, and update `reviewedAt`. Refresh the social preview count if changed.
Never include authenticated-only repository data in this public snapshot.

## Interaction and privacy

All directory content is rendered at build time and remains readable without
JavaScript. Search, filters, theme switching and field tabs are progressive
enhancements. Query parameters preserve filters across reloads and language
switching. Quick search opens with Command/Control+K or `/` and closes with Escape.

No external fonts, analytics, runtime GitHub requests or third-party embeds are
used. Theme preference is stored locally. Email is only copied after a click;
no project or visitor data is uploaded. Motion honors reduced-motion preferences.

## Verification

Run `npm run build` and `npm run preview`. Check both languages in light/dark mode,
phone and desktop layouts, all filter combinations, maturity/name/date sorting,
empty results, URL restoration, language switching and no-JavaScript fallbacks.
Check keyboard tabs, dialog focus/Escape, theme persistence and email copying.
The original `/<app>/<kind>/` and `/en/<app>/<kind>/` routes must remain available.

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
