# Keyline Visuals — standing brief

Read this before doing anything else in this repo.

## Business

**Keyline Visuals** — real estate photography and video, based in Oxford, Mississippi.

**Domain:** `keylinevisuals.com` — purchased, but **not yet wired into the code**.
Three files still carry the `your-domain-goes-here.example.com` placeholder and
must be updated together: `astro.config.mjs` (the `SITE` constant), `public/CNAME`,
and `public/robots.txt`. See CONTENT-TODO.md §1.

### Settled facts

Confirmed by the owner. These live as named constants at the top of
`src/data/site.ts` and every consumer imports from there — **there is no second
copy anywhere, and adding one is a bug.**

| Fact | Value | Constant |
| --- | --- | --- |
| Photo turnaround | 24 hours | `TURNAROUND_HOURS`, `TURNAROUND`, `TURNAROUND_STAMP` |
| Travel included within | 30 miles of Oxford | `FREE_TRAVEL_RADIUS_MILES` |
| Image licensing | See the answer in `src/data/faq.ts` — supplied verbatim, do not reword | — |

Travel beyond 30 miles is quoted at booking. **That rate is internal. It must
never appear on the public site or anywhere in this repo**, including comments.

Two traps around these:

- **"24 hours" appears in this codebase meaning two different things.** The
  settled fact is *turnaround*. But `BookingForm.astro` and the payment answer in
  `faq.ts` describe a *cancellation window* that also happens to be 24 hours and
  is **not** settled. They are deliberately not wired to `TURNAROUND`. Never
  point them at it — changing turnaround later would silently rewrite a
  cancellation policy.
- **Per-service turnarounds are separate and still draft:** video 48 hr, floor
  plans 48 hr, virtual staging 72 hr, listing websites same week, plus the "one
  more day" and rush-delivery lines in `faq.ts`. Do not fold these into
  `TURNAROUND`.

### Everything else is TBD

The following have **not been supplied** and must never be filled in from
guesswork:

| Detail | Status |
| --- | --- |
| Phone number | **TBD** |
| Email address | **TBD** |
| Instagram handle | **TBD** |
| FAA Part 107 certificate number | **TBD** |
| Business hours | **TBD** |
| All prices (9 package tiers + 8 add-ons) | **TBD** |
| Cancellation policy | **TBD** |
| Per-service turnarounds (video, floor plans, staging, websites) | **TBD** |

**The dangerous part: not every placeholder looks like one.** Bracketed values
such as `[PHONE]` and `$[XXX]` are obvious. But the codebase also contains
plain-English draft copy that reads as established fact and is not:

- `src/data/site.ts` → `trustStrip` — "MLS + print sizes" and "FAA Part 107
  licensed" (the Turnaround and Coverage entries are settled)
- `src/data/services.ts` → image counts and the per-service stamps that are not
  the stills turnaround — "30–45 IMAGES", "4K / 60", "48 HR DELIVERY",
  "72 HR DELIVERY", "8–12 FRAMES", "FAA PART 107"
- `src/data/faq.ts` — half-price cancellation inside 24 hours, net-15 brokerage
  billing, "one more day" for video and floor plans, the rush-delivery claim
  (the licensing answer is settled and verbatim — do not reword it)
- `src/data/pricing.ts` — square-footage tiers and package contents
- `src/components/Process.astro` — text-when-finished, partial reshoot promise
- `src/layouts/BaseLayout.astro` — JSON-LD opening hours (Mon–Fri 08:00–19:00,
  Sat 09:00–17:00)

**Treat all of it as unverified draft copy.** These are commitments to paying
clients and legal claims about drone certification. Do not repeat them in new
copy, do not cite them as settled, and do not let them propagate into a new page
as if they were confirmed. If a task needs one of these values, ask.

Never invent a testimonial, client logo, star rating, review count, or credential.

## Stack

Astro 5 (`^5.18.2`), static output. Vanilla CSS — **no Tailwind, no preprocessor,
no framework components** (no React, Vue, or Svelte). Node 22.

The only JavaScript is five small vanilla modules in `src/scripts/`, inlined into
the HTML at build time, so the site makes zero JS network requests.

Fonts are self-hosted in `public/fonts/` — Archivo (variable, used at 118–125%
width), Manrope, IBM Plex Mono. Do not add Google Fonts links.

**Deploy:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`,
`withastro/action@v3` → `actions/deploy-pages@v4`), triggered on push to `main`.
Custom domain via `public/CNAME`. **No remote is configured yet and nothing has
been pushed** — the first push to `main` will deploy.

**Forms:** Formspree, since GitHub Pages cannot run server code. The endpoint ID
comes from `PUBLIC_FORMSPREE_ID` (`.env` locally, an Actions *variable* in CI).
Unset, the form validates normally and tells the visitor it is not connected —
it never fakes a success.

**Commands:** `npm run dev` · `npm run build` · `npm run preview` · `npm run check`

### src/ layout

```
masters/           Full-res shoot originals — gitignored, never committed
src/
  assets/          Web-ready images, imported through astro:assets
  components/      12 .astro components, one per page section
  data/            All content (see below)
  layouts/         BaseLayout.astro — the only layout
  pages/           index, work, services, 404
  scripts/         form, lightbox, nav, reveal, slider (vanilla JS)
  styles/global.css  Tokens, reset, and every shared primitive
public/            fonts, favicon, robots, CNAME, SVG placeholders
brand/             Logo files — not part of the site build
```

**There are no content collections.** No `src/content/`, no content config. All
content lives in five TypeScript modules under `src/data/`: `site.ts`,
`services.ts`, `gallery.ts`, `pricing.ts`, `faq.ts`. Components import from them
directly. This means no schema validation and no collection-driven routing — if
a task needs either, that is a deliberate change to propose, not to assume.

## Rules — never break these

1. **Colors, type, and spacing come from the CSS variables in
   `src/styles/global.css`.** Never hardcode a hex value in a component. The
   single permitted exception is the `theme-color` meta tag in
   `BaseLayout.astro`, which cannot read a CSS variable.
2. **Section spacing is set once** by `.section { padding-block: var(--pad-section) }`.
   Components never override it.
3. **`trailingSlash` is `'always'`.** Every internal link must end in a slash
   (`/work/`, `/services/`). The sitemap matches; a missing slash 404s in dev.
4. **Images that render on the site go in `src/assets/` and import through
   `astro:assets`.** Never reference a photo from `public/` — that skips AVIF and
   WebP generation. Full-resolution originals go in `masters/`, which is
   gitignored.
5. **Never invent a testimonial, client logo, star rating, review count, or any
   credential.**
6. **Business facts belong in `src/data/`,** not hardcoded in components. Where
   a fact is settled it has a named constant in `site.ts` — import it. Never
   restate a settled value as a literal, not even inside prose.

## Known architectural constraints

Real limitations found in an audit of the codebase. Do not trip on them:

- **`form.js`, `lightbox.js`, and `nav.js` use `document.querySelector`** (first
  match only), so each of those components can appear **only once per page**. A
  second instance is inert.
- **Section IDs (`work`, `pricing`, `book`, `services`, `process`, `coverage`,
  `faq`) and every booking-form field ID (`name`, `email`, `phone`, `address`,
  `sqft`, `package`, `dates`, `notes`) are hardcoded.** Reusing those components
  twice on one page produces duplicate DOM IDs — an accessibility failure that
  also breaks label associations.
- **The services grid is hardcoded to exactly 7 tiles** via a
  `.svc__tile:last-child { grid-column: span N }` rule at two breakpoints, which
  exists only to fill the trailing row. Adding or removing a service silently
  breaks the layout.
- **`gallery.ts` declares its categories twice** — once as a union in the `Shot`
  type, once in the `filters` array — with nothing keeping them in sync.
- **`BaseLayout` accepts only `title`, `description`, and `ogImage`.** No
  `noindex`, no per-page JSON-LD override, and the LocalBusiness description is
  hardcoded in the layout rather than in `site.ts`.

Two smaller notes: turnaround, travel radius, and the twilight add-on price were
consolidated into constants in `site.ts` and are no longer duplicated — but other
facts still are, so check before adding a seventh copy of anything. And only the
two hero photos go through `astro:assets` — the
gallery and service tiles are still raw `<img>` tags pointing at `public/`,
which is correct for SVG placeholders but must change when real photos land.

## Working agreement

- **One task per session.** Propose a plan and wait for approval before writing
  code.
- **Update `PROGRESS.md` after each completed task.**
- **Never edit files outside the stated scope of the current task.**
- `CONTENT-TODO.md` is the launch checklist — everything still needed before the
  site can go live. Consult it; do not duplicate it elsewhere.
