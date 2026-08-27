# Keyline Visuals

Marketing site for a real estate photography and videography business in Oxford,
Mississippi. Astro 5, static output, no client frameworks.

**Before anything goes live, work through [`CONTENT-TODO.md`](CONTENT-TODO.md).**
Every price, the phone number, the email, and the domain are placeholders.

## Local setup

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Runs at http://localhost:4321.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` exactly as it will deploy |
| `npm run check` | Type-check `.astro` and `.ts` files |

## How it's put together

```
masters/         Full-res shoot originals — local only, gitignored
src/
  assets/        Web-ready images, imported and optimized by astro:assets
  data/          All copy and content lives here — edit these, not the components
    site.ts        Contact details, service area, nav, trust strip
    services.ts    The seven services, tile copy and long-form detail
    gallery.ts     The 12 gallery slots
    pricing.ts     Packages, tiers, add-ons
    faq.ts         Six questions
  components/    One component per page section
  scripts/       The only JavaScript on the site (see below)
  styles/
    global.css   Colour tokens, type scale, and every shared primitive
  pages/
    index.astro    Home
    work.astro     Full gallery
    services.astro Long-form service detail, one anchor per service
    404.astro
public/
  fonts/         Self-hosted Archivo, Manrope, IBM Plex Mono
  placeholders/  SVG stand-ins + manifest.json index
```

**To change wording, go to `src/data/`.** The components read from it. The only
copy that lives inside a component is the three-step process text in
`Process.astro` and the section intros.

### Where images live

Two directories, and the split matters:

- **`masters/`** holds full-resolution originals straight off the camera. It is
  gitignored, so nothing in it is ever committed — these are large binaries and
  git would carry every version of them forever. Keep it on your machine (and in
  whatever you back up with), not in the repo.
- **`src/assets/`** holds only web-ready derivatives that are actually imported
  by a component. Anything here goes through `astro:assets`, which generates
  AVIF and WebP at multiple widths at build time.

So the workflow for a new photo is: drop the original in `masters/`, export a
web-sized version into `src/assets/`, and import that one. If you need to
re-crop later, the master is still sitting there locally.

Because `masters/` is gitignored, a fresh clone won't have it. That's intended —
the repo builds fine without it, since only `src/assets/` is imported.

### JavaScript

Four small vanilla modules, no libraries. They total about 6KB and Astro inlines
them into the HTML, so the site makes zero JavaScript network requests.

- `slider.js` — the twilight comparison slider (pointer, touch, arrow keys)
- `reveal.js` — scroll-reveal via IntersectionObserver, fires once per element
- `nav.js` — mobile menu toggle and the nav's scrolled border
- `lightbox.js` — gallery filters and the `<dialog>` lightbox
- `form.js` — booking form validation and the Formspree submit

All motion is wrapped in `prefers-reduced-motion` guards.

### CSS

Vanilla CSS with custom properties. No Tailwind, no preprocessor.

Two rules worth knowing before you edit:

1. **Section spacing is set once**, by `.section { padding-block: var(--pad-section) }`
   in `global.css`. Don't add vertical padding to a section in a component's
   scoped `<style>` — that's how the rhythm between blocks drifts.
2. **Every colour comes from the eight tokens on `:root`**, or an alpha of one.
   `--glow` (the amber) is deliberately rationed: the primary button, the slider
   handle, hovered link underlines, the "booking" dot, the `MOST BOOKED` tag, and
   form error states. If you reach for it a seventh time, use `--signal` instead.

## Swapping in real photos

1. Drop your files in `public/placeholders/` (or make a new `public/photos/`
   folder — nothing depends on the directory name).
2. Update the path in the relevant data file:
   - Gallery → `file` in `src/data/gallery.ts`
   - Service tiles → `image` in `src/data/services.ts`
   - Hero slider → the two constants at the top of `src/components/TwilightSlider.astro`
3. Rewrite the `caption` for each gallery entry. It's used as both the alt text
   and the lightbox caption, so write a real sentence about what's in the frame.

`CONTENT-TODO.md` lists every slot with its recommended pixel dimensions and
aspect ratio.

### Getting AVIF and WebP

The SVG placeholders don't need conversion. Once you're using real JPEGs, move
them into `src/assets/`, import them, and pass the import to Astro's `<Picture>`
component — `astro:assets` will then emit AVIF and WebP with a responsive
`srcset` at build time. `sharp` is already installed for this. Files served from
`public/` are copied as-is and skip that pipeline, which is fine for placeholders
but not what you want for a 4MB twilight frame.

## Deploying

Pushes to `main` build and publish via `.github/workflows/deploy.yml`.

One-time setup:

1. **Settings → Pages → Source: GitHub Actions**
2. **Settings → Secrets and variables → Actions → Variables** → add
   `PUBLIC_FORMSPREE_ID` with your form ID. Without it the deployed form will
   tell visitors it isn't connected.
3. Put your domain in `public/CNAME` and in `astro.config.mjs`, then point your
   DNS at GitHub Pages and enable **Enforce HTTPS**.

Routes use trailing slashes (`/work/`, `/services/`) and the sitemap matches.
If you ever change `trailingSlash` in `astro.config.mjs`, the sitemap follows
automatically — but any hardcoded internal link you've written won't, so grep
for `href="/` afterwards.

## Accessibility notes

Worth preserving if you edit:

- Every text/background pair passes WCAG AA. `--muted` on `--ink` is 6.9:1 and
  dark text on `--glow` is 11.2:1. If you introduce a colour, check it.
- The twilight slider is a real `role="slider"` with arrow-key support and a
  live `aria-valuetext`. Don't reduce it to a drag-only widget.
- Form errors say what to do ("Enter an email so I can send the gallery link"),
  not what went wrong. Keep that voice if you add fields.
- One `<h1>` per page. The gallery component takes a `headingLevel` prop for
  exactly this reason.
