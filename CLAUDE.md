# Keyline Visuals — standing brief

Read this before doing anything else in this repo.

## Business

**Keyline Visuals** — real estate photography and video, based in Oxford, Mississippi.

**Domain:** `keylinevisuals.com` — apex, not www. **Wired in.** It lives in three
places that must stay in step: `astro.config.mjs` (`SITE`), `public/CNAME`, and
the Sitemap line in `public/robots.txt`. Everything else derives from
`Astro.site` — canonical URLs, `og:url`, `og:image`, `twitter:image`, the
JSON-LD `@id`/`url`/`image`, and the sitemap. Never hardcode the domain
anywhere else.

### Settled facts

Confirmed by the owner. These live as named constants at the top of
`src/data/site.ts` and every consumer imports from there — **there is no second
copy anywhere, and adding one is a bug.**

| Fact | Value | Constant |
| --- | --- | --- |
| Photo turnaround | 24 hours | `TURNAROUND_HOURS`, `TURNAROUND`, `TURNAROUND_STAMP` |
| Video turnaround | 48 hours | `VIDEO_TURNAROUND_HOURS`, `VIDEO_TURNAROUND`, `VIDEO_TURNAROUND_STAMP` |
| Travel included within | 30 miles of Oxford | `FREE_TRAVEL_RADIUS_MILES` |
| Phone | (662) 801-8541 | `site.phone` / `site.phoneHref` / `site.smsHref` |
| Email | info@keylinevisuals.com | `site.email` |
| Prices | Photos $180, Video $180, Drone only $125, Drone add-on $35, Virtual twilight $15 — all "starting at", no tiers | `pricing.ts`, `TWILIGHT_ADDON_PRICE` |
| Image licensing | See the answer in `src/data/faq.ts` — supplied verbatim, do not reword | — |
| Aerial service copy | `src/data/services.ts` — supplied verbatim, do not reword | — |

Travel beyond 30 miles is quoted at booking. **That rate is internal. It must
never appear on the public site or anywhere in this repo**, including comments.

One trap around these:

- **Two turnarounds, and only two.** Stills are 24 hours (`TURNAROUND_*`);
  video is 48 (`VIDEO_TURNAROUND_*`). Never fold one into the other — they are
  different promises.
- **Twilight is a post-production conversion, not a shoot.** $15 per listing,
  a daytime exterior converted in editing. Never write copy implying a dusk
  session, a weather reschedule, or a second visit — that was removed
  deliberately because it was false.

### Everything else is TBD

The following have **not been supplied** and must never be filled in from
guesswork:

| Detail | Status |
| --- | --- |
| Instagram handle | **TBD** |
| FAA Part 107 certificate number | **TBD** |
| Business hours | **TBD** |

**The dangerous part: not every placeholder looks like one.** Bracketed values
such as `[INSTAGRAM_HANDLE]` are obvious. But the codebase also contains
plain-English draft copy that reads as established fact and is not:

- `src/data/site.ts` → `trustStrip` — "MLS + print sizes" and "FAA Part 107
  licensed" (the Turnaround and Coverage entries are settled)
- `src/data/services.ts` → image and frame counts — "30–45 IMAGES", "4K / 60",
  "8–12 FRAMES", "6–8 FRAMES". The turnaround stamps are settled and read from
  constants. The aerial entry's prose is settled and verbatim.
- `src/data/gallery.ts` → every `caption`. These were written by reading the
  photographs, not supplied by the owner. They are accurate descriptions of
  what is in frame but nobody has approved the wording.
- `src/components/Process.astro` — text-when-finished, partial reshoot promise
- `src/layouts/BaseLayout.astro` — JSON-LD opening hours (Mon–Fri 08:00–19:00,
  Sat 09:00–17:00)

**Treat all of it as unverified draft copy.** These are commitments to paying
clients and legal claims about drone certification. Do not repeat them in new
copy, do not cite them as settled, and do not let them propagate into a new page
as if they were confirmed. If a task needs one of these values, ask.

### Booking happens off-site

Shoots are booked on **Fotello**, at
`https://book.keylinevisuals.com/book/default`. It lives in `BOOKING_URL` in
`src/data/site.ts`; spread `BOOKING_LINK` onto a CTA rather than writing the
href, target and rel by hand.

**It has to be a subdomain.** GitHub Pages holds the apex, and DNS resolves a
hostname rather than a path — so any `keylinevisuals.com/...` path is served by
Pages and would 404. Pages offers no path-level proxy. Do not "simplify" this
back onto the apex.

Booking CTAs open in a new tab and carry a visually-hidden "(opens in a new
tab)", gated on `BOOKING_NEW_TAB` so the announcement only appears when it is
true.

**One deliberate exception.** Virtual twilight carries `bookable: false` in
`services.ts`, so its CTA reads *"Ask about virtual twilight"* and points at
`/#contact`. It is a $15 post-production edit, not a shoot; sending someone
into a shoot scheduler for it would be wrong. The flag lives in the data rather
than a template conditional so the reason travels with the product. **Do not
re-point it at the portal.**

The on-site form is **contact only**. It deliberately does not collect an
address, square footage, a package, or preferred dates; the portal owns those.
Do not add booking fields back to it.

### Deliberately not on the site

Payment terms are handled on the invoice, not in the marketing. The "When do I
pay?" FAQ and the booking-form footer line were **removed on purpose**, taking
these four unverified claims with them: net-15 billing for brokerages, no
deposit, a cancellation inside 24 hours billed at half, and "cancel free up to
24 hours out". Invoice timing, payment methods, deposits, and the cancellation
window are **not TBD — they are off the site by decision.** Do not reintroduce
them.

The one payment detail that stays is "The invoice comes with the gallery" in
`Process.astro` step 3.

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
Custom domain via `public/CNAME`. **No remote is configured and nothing has been
pushed.**

⚠️ **The workflow fires on the first push to `main`**, and the domain is now
real, so that push publishes a live site at `keylinevisuals.com`. Two things
must be true first or it will not resolve:

- **Settings → Pages → Source: GitHub Actions** on the repo.
- **DNS.** An apex domain needs **A records** (or an ALIAS/ANAME), *not* a
  CNAME — a CNAME on the apex is the usual mistake. See CONTENT-TODO.md §1 for
  the addresses.

**Forms:** Formspree, since GitHub Pages cannot run server code. The contact
form posts to `https://formspree.io/f/{id}` over `fetch` from
`src/scripts/form.js` — this is Formspree's documented AJAX pattern, written by
hand. **Do not replace it with `@formspree/ajax` or a plain `action` POST:** the
library would add a dependency and, via its CDN build, a network request to a
site that currently makes none; a plain POST would navigate the visitor off-site
and lose the inline validation, the success state, and the not-connected
fallback.

The ID (`mdeokplg`) comes from `PUBLIC_FORMSPREE_ID` — `.env` locally, an Actions
*variable* in CI. Unset, the form validates normally and tells the visitor it is
not connected. It never fakes a success.

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
7. **The site speaks as "we".** Keyline Visuals is a business, not a person —
   no "I", "my", or "me" in visitor-facing copy. Two exceptions: the five **FAQ
   questions are in the reader's voice** (`"How fast do I get the photos?"` is
   the visitor asking us), and `rel="me"` in the footer is a microformats
   attribute, not prose. Never write "our pilots", "our team", or anything else
   implying headcount — that is a claim nobody has backed.

## Known architectural constraints

Real limitations found in an audit of the codebase. Do not trip on them:

- **`form.js`, `lightbox.js`, and `nav.js` use `document.querySelector`** (first
  match only), so each of those components can appear **only once per page**. A
  second instance is inert.
- **Section IDs (`work`, `pricing`, `contact`, `services`, `process`,
  `coverage`, `faq`) and every contact-form field ID (`name`, `brokerage`,
  `email`, `phone`, `message`) are hardcoded.** Reusing those components
  twice on one page produces duplicate DOM IDs — an accessibility failure that
  also breaks label associations.
- **The services grid works on an even number of tiles.** There are 4 — 2 large
  and 2 compact — which pair up cleanly at both breakpoints; the old
  `:last-child` trailing-row hack has been deleted. An odd count strands the
  last tile with empty columns beside it, and needs the layout rethought rather
  than another span rule.
- **`BaseLayout` accepts only `title`, `description`, and `ogImage`.** No
  `noindex`, no per-page JSON-LD override, and the LocalBusiness description is
  hardcoded in the layout rather than in `site.ts`.

One smaller note: turnaround, travel radius, and the twilight add-on price were
consolidated into constants in `site.ts` and are no longer duplicated — but other
facts still are, so check before adding a seventh copy of anything.

**Images.** The hero pair and all gallery photographs go through `astro:assets`
from `src/assets/`. The gallery resolves files with `import.meta.glob`, derives
each shot's orientation from the file, and derives the filter row from the
categories actually present — so a partial set works and there are no dead
filter buttons. An entry whose file is missing is skipped with a build warning.
The **two service tiles are the last raw `<img>` tags pointing at `public/`**
and still need converting when real photos replace them.

**Adding a gallery photo:** full-resolution original into `masters/`
(gitignored, never committed), a 1600px-long-edge JPEG at q85 into
`src/assets/gallery/`, then an entry in the `entries` array in `gallery.ts`.
Array order is display order. Strip EXIF on export — listing photographs carry
GPS coordinates.

Each entry can also carry `propertyType`, `area`, and `meta`. **All three are
deliberately empty on all six photos.** They are facts about a listing that
only the owner knows, and inventing a neighbourhood would be inventing a
client. The hover overlay renders nothing when they are absent, so the gallery
looks correct without them. Ask; do not fill them in.

**The gallery grid is CSS `columns`, not the services grid** — any tile count
and any aspect ratio works there. The even-count rule below applies only to the
services grid.

## Working agreement

- **One task per session.** Propose a plan and wait for approval before writing
  code.
- **Update `PROGRESS.md` after each completed task.**
- **Never edit files outside the stated scope of the current task.**
- `CONTENT-TODO.md` is the launch checklist — everything still needed before the
  site can go live. Consult it; do not duplicate it elsewhere.
