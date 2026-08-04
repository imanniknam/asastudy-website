# ASA-STUDY

Bilingual (English / Persian) marketing website for **ASA-Study**, an agency that guides
international students through admission to Iranian universities.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a token-based design system
- **next-intl** for `en` / `fa` routing, translations, and RTL
- **Framer Motion** for scroll reveals and hero parallax
- **Radix UI** primitives (accordion, slot) styled in-house

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` and redirects to the default locale (`/en`).

```bash
npm run build   # production build (stop the dev server first)
npm start       # serve the production build
```

## Routes

Every route is served under a locale prefix — `/en/...` and `/fa/...`.

| Route | Description |
| --- | --- |
| `/` | Home — hero, services, admission journey, universities, programs, why Iran, FAQ, CTA |
| `/about` | Mission and guiding values |
| `/services` | Full service list + admission journey timeline |
| `/universities` | Searchable, city-filterable directory of all universities |
| `/universities/[slug]` | University profile: overview, gallery, admission requirements, documents, tuition, programs, student life, dormitory, FAQ |
| `/faq` | Frequently asked questions |
| `/contact` | Contact form and details |

## Content architecture

University content is **not hardcoded in components**. Each university is a JSON
document in `src/content/universities/` shaped by the `University` interface in
`src/types/university.ts`. Every user-facing field carries both locales:

```ts
interface LocalizedText { en: string; fa: string }
```

`src/lib/content/universities.ts` is the only module that reads that directory. To move
to a CMS (Sanity, Strapi, …), reimplement `getAllUniversities`, `getUniversityBySlug`,
and `getAllUniversitySlugs` against the CMS client — no page or component changes needed.

Adding a university is a one-file change: drop `<slug>.json` into the content directory.
Its detail page, directory card, and static route are generated automatically.

UI copy (navigation, section headings, buttons) lives in `src/messages/en.json` and
`src/messages/fa.json`.

## Design system

Defined as CSS custom properties in `src/app/[locale]/globals.css`:

| Token | Value |
| --- | --- |
| Primary | `#12355B` |
| Accent | `#2563EB` |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Text | `#0F172A` |
| Border | `#E2E8F0` |
| Radius | 24px / 16px / 12px |

Typography uses Inter for Latin and Vazirmatn for Persian, swapped automatically via
`html[dir="rtl"]`.

## Internationalization

- `src/i18n/routing.ts` — locale list and routing strategy
- `src/middleware.ts` — locale negotiation and redirects
- Always import `Link`, `useRouter`, and `usePathname` from `@/i18n/navigation` so
  locale prefixes are preserved.
- The `<html>` element receives `lang` and `dir` per request; layouts use logical CSS
  properties (`ms-`, `me-`, `start-`, `end-`) so RTL mirrors correctly.

## Deployment

Deploys to Vercel with no extra configuration — import the repository and Vercel detects
Next.js automatically. All pages are statically prerendered for both locales.
