# Where this project stands

**Current state, not a changelog.** Per-commit detail lives in `git log`, whose
messages are written to be read. This file is what you need to pick the work up
cold.

Read `CLAUDE.md` first — it holds the standing rules and the settled business
facts. `CONTENT-TODO.md` is the launch checklist. Neither is duplicated here.

---

## Status

| | |
| --- | --- |
| Branch | `main`, working tree clean |
| HEAD | **run `git log -1`** — a file cannot record its own commit hash without being one behind |
| Remote | **none.** Nothing has ever been pushed. |
| Repo size | 1.26 MiB packed |
| Build | clean · `astro check` 0 errors, 1 hint (an intentional `is:inline` on the JSON-LD script) |
| Live? | No. Not deployed, not pushed. Domain **is** wired; DNS is not configured. |

**The site is structurally finished and content-accurate.** Four pages, twelve
components, real prices, real contact details, six real photographs. Everything
on it is either true or explicitly marked as draft in `CLAUDE.md`.

What it is not is *live* — that is plumbing, and it is listed below.

---

## What exists

- **Pages:** `/` (hero with the twilight slider, trust strip, services, gallery,
  process, pricing, coverage, FAQ, contact), `/work/`, `/services/` with an
  anchor per service, `/404`.
- **Four services:** stills, video, aerial, virtual twilight.
- **Pricing:** flat "starting at" — Photos $180, Video $180, Drone only $125;
  add-ons Drone $35, Virtual twilight $15.
- **Six real photographs** in `src/assets/gallery/`, through `astro:assets`.
- **Hero slider:** a genuine matched day/blue-hour pair of 108 Cedar Hill Drive,
  registered to scale 1.001 with sub-pixel offset so the house does not shift.
- **Logo files** in `brand/` — vector, type outlined, print-ready.

---

## Outstanding

### 1. Push to GitHub — not started, and there is a trap

No remote exists. The owner asked for a **private** repo and a push, then the
session ended before it happened.

⚠️ **`.github/workflows/deploy.yml` triggers on push to `main`.** The domain is
now real, so that push publishes a live site at `keylinevisuals.com`. It will
not resolve until **Settings → Pages → Source: GitHub Actions** is set and DNS
points at GitHub — an apex domain needs **A records, not a CNAME**. Addresses
are in `CONTENT-TODO.md` §1.

### 2. Deploy plumbing — three values, all in `CONTENT-TODO.md` §1

| What | Where | Status |
| --- | --- | --- |
| Domain `keylinevisuals.com` | `astro.config.mjs` (`SITE`), `public/CNAME`, `public/robots.txt` | **done** |
| DNS A records for the apex | registrar | outstanding — see `CONTENT-TODO.md` §1 |
| Pages source = GitHub Actions | repo settings | outstanding |
| Formspree form ID | `.env` → `PUBLIC_FORMSPREE_ID`, **and** a GitHub Actions *variable* of the same name | outstanding |
| Booking portal URL | `src/data/site.ts` → `BOOKING_URL` | **done** |

The domain is set in three files and nowhere else; everything downstream derives
from `Astro.site`. Verified: canonical, `og:url`, `og:image`, `twitter:image`,
the JSON-LD `@id`/`url`/`image`, and the sitemap all resolve to the real host.

### 3. Booking portal — done

Shoots are booked on **Fotello** at `https://book.keylinevisuals.com/book/default`,
set once in `BOOKING_URL` in `src/data/site.ts`. Booking CTAs spread
`BOOKING_LINK` (href + `target="_blank"` + `rel="noopener"`) and carry a
visually-hidden "(opens in a new tab)".

**The earlier conflict is resolved by the subdomain.** The URL first offered was
a path on the apex, which GitHub Pages would have swallowed — DNS resolves a
hostname, not a path, and Pages has no path-level proxy. `book.` is a separate
DNS record pointing at Fotello, so the apex staying on Pages is no longer a
problem. Do not move this back onto the apex.

**Virtual twilight is exempt**, by decision. It carries `bookable: false` in
`services.ts`; its CTA reads *"Ask about virtual twilight"* and goes to
`/#contact`. A $15 post-production edit does not belong in a shoot scheduler.
The flag lives in the data rather than a template conditional so the reason
travels with the product.

Seventeen anchors render across the four pages — the nav accounts for two on
each. All sixteen portal links were verified in the built HTML to carry the
target, the rel, and the announcement; the twilight one to carry none of them.

### 4. Photography — partially in

- **Six photos in.** Two exteriors, three interiors, one aerial.
- **No twilight or video frame yet**, so those two filter buttons do not render.
  Both are still services; adding a photo in either category restores its button
  automatically.
- **`propertyType`, `area`, and `meta` are empty on all six** — deliberate, see
  Decisions below.
- **Two service tiles are still SVG placeholders** and the last raw `<img>` tags
  pointing at `public/`.
- **`public/og-default.png` is generated art**, not a photograph.

### 5. Waiting on the owner

- Formspree form ID
- DNS records at the registrar, and Pages source set to GitHub Actions
- Instagram handle, FAA Part 107 certificate number, business hours
- `propertyType` / `area` / `meta` per gallery photo
- Whether gallery captions (written here, not supplied) are approved

### 6. Open design call — masonry columns

The `/work/` grid measured **820 / 775 / 249** at three columns with the current
six photos: five landscape and one portrait cannot divide evenly, so the third
column holds one image above a large gap. Two columns measured a **315px**
spread with images at 565px instead of 372px.

Not changed — column count is a design decision. It is a two-line CSS change in
`Work.astro`, and it self-corrects if more portraits arrive.

---

## Decisions, and why

These are not obvious from the code. Several look like gaps but are choices.

**Things were cut rather than filled in.** The recurring pattern this project
settled into: when a claim could not be verified, it was **deleted**, not
replaced with a guess or a placeholder. A placeholder invites someone to fill it
in later from memory; a deletion does not.

- **Payment terms** — net-15 for brokerages, no deposit, half-price cancellation
  inside 24 hours, "cancel free up to 24 hours out". Four unconfirmed
  commitments. The whole "When do I pay?" FAQ and the form footer went. Payment
  is handled on the invoice. **These are off the site by decision, not TBD.**
- **Flash** — the business does not shoot with flash, so four claims came out
  rather than being reworded. How a room is lit is more detail than a listing
  agent needs; the outcome is what sells.
- **Twilight became a $15 post-production conversion.** It was written as a real
  dusk session — twenty-minute window, seller prep checklist, weather
  reschedules. All false. Traced out of five places: the service entry, the FAQ,
  the JSON-LD `serviceType`, three meta descriptions, and two gallery captions.
  The hero slider and both photographs stayed, because the image demonstrates the
  look the product produces.
- **Listing websites, floor plans, virtual staging** — removed entirely. The rule
  the owner gave: *if it does not have a real price, it does not ship.*
- **Square-footage tiers and package names** (Essential / Full Listing /
  Signature) — replaced with flat "starting at" pricing.

**Gallery metadata is empty on purpose.** `propertyType`, `area`, `meta` are
facts about a listing only the owner knows. Inventing a neighbourhood would be
inventing a client. The overlay renders nothing when they are absent.

**Pricing cards carry no bullet lists.** Reusing each service's `includes` was
considered and rejected: aerial's list says *"4K aerial clips folded into the
video cut"*, which is false for a **Drone only** product with no video. Cards
pull their one-line summary from the service `blurb` by slug instead — one
source, and a renamed slug throws at build time.

**`priceRange` is `"$125-$180"`, not `"$$"`.** Google's LocalBusiness docs were
checked rather than guessed at: **there are no dollar thresholds** for the
currency-sign notation. It explicitly permits a numerical range. The signs are
relative to category and locale and mean nothing for a photography service.

**`masters/` is gitignored.** Full-resolution originals are large binaries and
git carries every version forever. Web-ready derivatives in `src/assets/` are
the committed source of truth. The 7.3MB hero master was 82% of the repo before
this convention existed.

**The services grid needs an even tile count.** The `:last-child` span hack that
used to paper over odd counts is deleted. At four tiles (2 large + 2 compact)
everything pairs cleanly at both breakpoints. **A fifth or seventh service
strands the last tile with empty columns beside it** and needs the layout
rethought, not another span rule. This does *not* apply to the gallery, which is
CSS `columns` and takes any count.

**Gallery captions are provisional.** Written here by looking at the
photographs. Accurate about what is in frame, but nobody has approved the
wording. They are also the alt text.

---

## The exact next step

Assuming the owner has not yet supplied the portal URL or domain, do this:

**Create the private GitHub repo and push a branch that is not `main`.**

```bash
gh repo create keyline-visuals --private --source=. --remote=origin --push
```

That command creates the repo, adds `origin`, and pushes. **Check which branch
it pushed.** If it pushed `main`, the Pages workflow will have fired and
deployed the placeholder domain — see the warning above. To be safe:

```bash
git checkout -b setup && git push -u origin setup
```

then create the repo without pushing, and push `main` only after the domain is
wired.

The owner will need to do two things in the browser afterwards, neither of which
can be done from here:

1. **Settings → Pages → Source: GitHub Actions**
2. **Settings → Secrets and variables → Actions → Variables** → add
   `PUBLIC_FORMSPREE_ID`. Without it the deployed contact form tells visitors it
   is not connected.

If the owner *has* supplied the domain and portal URL, do those first — they are
single-value edits, and pushing `main` afterwards deploys a correct site.

---

## Things not written down anywhere else

- **`npm run check` needs `@astrojs/check`**, already a devDependency. It reports
  one persistent hint about `is:inline` on the JSON-LD `<script>` in
  `BaseLayout.astro` — intentional, not a problem.
- **The dev server serves stale CSS after a scoped-`<style>` edit.** This cost
  real time once: a verified-correct grid change appeared broken in the browser
  through two reloads. `dist/` was right the whole time. Restart the dev server,
  and trust the build over dev.
- **`getImage()` powers the lightbox.** `lightbox.js` is vanilla and sets
  `img.src` from a data attribute, so `Work.astro` pre-generates one 1600px WebP
  per shot at build time. Changing the gallery markup means keeping that
  attribute populated.
- **`sizes="...372px..."` in `Work.astro` is measured, not guessed** — it is the
  real 3-column width inside the 1144px content area. It changes if the column
  count does.
- **`brand/` regenerates.** `build-logo.py` pulls glyph outlines from the
  self-hosted Archivo file (needs `fonttools`, `brotli`, `uharfbuzz`);
  `node brand/export.mjs` rasterises to 300 DPI PNGs. Nothing in `brand/` is part
  of the site build.
- **Astro's `trailingSlash: 'always'`** means every internal link needs its
  trailing slash or it 404s in dev. The sitemap matches.
