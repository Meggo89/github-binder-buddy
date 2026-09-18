# Mastella Advisory — mastellagroup.com

M&A advisory firm website, repositioned around an AI-enabled delivery model.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 (tokens in [tailwind.config.js](tailwind.config.js))
- React Router v6 — client-side routing
- react-helmet-async — per-page SEO tags and JSON-LD
- Framer Motion — scroll-triggered entry animations, respects `prefers-reduced-motion`
- Deployed on Netlify (see [netlify.toml](netlify.toml))

## Develop

```bash
npm install
npm run dev          # Vite dev server on :8080
npm run build        # production build to dist/
npm run preview      # preview the production build
npm run lint         # ESLint
npm run sitemap      # regenerate public/sitemap.xml
```

## Environment variables

Local development needs none. The redundant email-notification function ([Forms](#forms), below) needs three, set in the Netlify UI under **Site configuration → Environment variables**:

- `MAIL_APP_TENANT_ID`
- `MAIL_APP_CLIENT_ID`
- `MAIL_APP_CLIENT_SECRET`

These are the credentials for the `mastella-scout-app` registration in the Mastella Microsoft 365 tenant. See [.env.example](.env.example) for the template. Do **not** commit real values.

## Forms

Both forms post to Netlify's built-in form handler:

- `/contact` — lead enquiries
- `/lead-magnet` — Exit Readiness Checklist downloads

Hidden form templates in [index.html](index.html) are detected by Netlify's build scanner and enable the endpoints. Spam is deterred via the `bot-field` honeypot, a time-to-submit check, `maxLength` limits and a small client-side reject list of obvious SQL-probe patterns (see [src/pages/Contact.tsx](src/pages/Contact.tsx)).

**Email notifications:** two independent paths run in parallel so a real enquiry can never be silenced by a single filter.

1. **Netlify Forms notification** — configured in the Netlify dashboard under *Site → Forms → Settings → Form notifications* (`leo@mastellagroup.com`). Subject to Akismet spam filtering.
2. **[netlify/functions/notify-enquiry.mts](netlify/functions/notify-enquiry.mts)** — a Netlify Function that authenticates to Microsoft Graph via the client-credentials flow and sends from `leo.meggitt@mail.mastellagroup.com`. Runs for every contact-form POST, is not subject to Akismet, and returns 200 on every error path so a mail failure never surfaces to the visitor.

**Viewing submissions:** Netlify dashboard → *Site → Forms* (all submissions, including Akismet-classified spam).

## Content

Insights articles live as individual TypeScript modules under [src/content/insights/](src/content/insights/). To add a new article:

1. Create `src/content/insights/my-new-slug.ts` exporting a default `Article` object (see [types.ts](src/content/insights/types.ts) for the shape).
2. Add the import + export to [src/content/insights/index.ts](src/content/insights/index.ts).
3. Add the slug to the `insightSlugs` array in [generate-sitemap.js](generate-sitemap.js) and run `npm run sitemap`.

Process stage content (used by both the homepage and `/process` deep-dive) lives in [src/content/process-stages.tsx](src/content/process-stages.tsx).

## Component structure

- [src/components/layout/](src/components/layout/) — `Navigation`, `Footer`, `PageLayout`. Every page wraps itself in `PageLayout`.
- [src/components/ui/](src/components/ui/) — shared primitives (`Button`, `Card`, `Section`, `Container`, `Heading`) plus motion primitives (`FadeIn`, `Stagger`, `Parallax`).
- [src/components/illustrations/](src/components/illustrations/) — bespoke SVG diagrams for the AI-enabled process. All illustrations share one visual vocabulary via `primitives.tsx` + `tokens.ts`.
- [src/components/forms/](src/components/forms/) — Netlify-wired form components.

## Design tokens

Extended in [tailwind.config.js](tailwind.config.js):

- Colours: `navy` (default / light / dark / deepest), `sand`, `accent` gold, `ink` near-black
- Fonts: `sans` (Inter), `serif` (Playfair Display), `mono` (JetBrains Mono)
- Typography scale: `display-xl/lg/md`, `heading-lg/md/sm`, `body-lg/md/sm`, `caption`
- Fonts are loaded from Google Fonts in [index.html](index.html) — the Netlify CSP permits `fonts.googleapis.com` and `fonts.gstatic.com`

## Deployment

Netlify builds on push to `main`:

1. `npm run build` → `dist/`
2. SPA fallback: `/* → /index.html` (configured in [netlify.toml](netlify.toml))
3. Security headers: strict CSP with Google Analytics and Google Fonts allowed
4. Form endpoints are auto-detected from [index.html](index.html) hidden templates
