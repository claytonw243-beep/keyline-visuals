# Content to supply

Everything below is a placeholder in the code right now. Work top to bottom —
the first section blocks deploying, the rest block the site being *true*.

A fast way to find what's left at any point:

```bash
grep -rn "\[PHONE\]\|\[EMAIL\]\|\[XXX\]\|\[XX\]\|your-domain-goes-here\|CONTENT-TODO" src public astro.config.mjs
```

---

## 1. Blocks deployment

| What | Where | Notes |
| --- | --- | --- |
| Domain | `astro.config.mjs` (`SITE`), `public/CNAME`, `public/robots.txt` | All three must match. Replace `your-domain-goes-here.example.com`. Set the apex or `www` — pick one and stay on it. |
| Formspree form ID | `.env` → `PUBLIC_FORMSPREE_ID` | Create a form at formspree.io, copy the 8 characters from `formspree.io/f/xxxxxxxx`. Also add it as a **repository variable** named `PUBLIC_FORMSPREE_ID` (Settings → Secrets and variables → Actions → Variables) or the deployed form will not send. |

Until the Formspree ID is set, the form validates normally but tells the visitor
it isn't connected and points them at the phone number — it never fakes a success.

## 2. Contact and identity

All in `src/data/site.ts`:

| Field | Placeholder | Format |
| --- | --- | --- |
| `phone` | `[PHONE]` | Display format, e.g. `(662) 555-0142` |
| `phoneHref` / `smsHref` | `tel:[PHONE]` | Digits with country code, e.g. `tel:+16625550142` |
| `email` | `[EMAIL]` | |
| `instagram` | `[INSTAGRAM_HANDLE]` | Handle only, no `@` — it's interpolated into the URL |
| `droneLicense` | `[PART_107_NUMBER]` | Your FAA Part 107 certificate number |
| `bookingWindow` | `BOOKING [CURRENT MONTH] — [NEXT MONTH]` | Shown beside the booking form. **Update this every month or two** or it reads as stale. |
| `priceRange` | `$$` | Feeds the JSON-LD. `$$` or `$$$` |

Also in `src/data/site.ts`:

- **`trustStrip`** — four claims under the hero. Turnaround and Coverage are
  settled and read from the constants above them. The other two are still draft:
  "MLS + print sizes" and "FAA Part 107 licensed" — confirm both are literally
  true before launch.
- **`towns`** — the service-area list. Add or cut towns to match where you'll actually drive.

And in `src/layouts/BaseLayout.astro`: the `openingHoursSpecification` block in
the JSON-LD is set to Mon–Fri 08:00–19:00 and Sat 09:00–17:00. Change to your
real hours.

## 3. Prices

All in `src/data/pricing.ts`. Seventeen numbers:

**Packages** — three tiers each:

1. Essential — up to 2,000 sq ft
2. Essential — 2,001–3,500 sq ft
3. Essential — 3,501+ sq ft
4. Full Listing — up to 2,000 sq ft
5. Full Listing — 2,001–3,500 sq ft
6. Full Listing — 3,501+ sq ft
7. Signature — up to 2,000 sq ft
8. Signature — 2,001–3,500 sq ft
9. Signature — 3,501+ sq ft

**Add-ons:**

10. Twilight session
11. Aerial photo & video
12. Floor plan
13. Virtual staging (per image)
14. Listing website
15. Vertical social cut
16. Same-day rush delivery
17. Reshoot after seller changes

~~18. Travel fee per mile past the free radius~~ — **no longer applies.** Travel
inside 30 miles of Oxford is included in the price; beyond that it is quoted at
booking. That rate is internal and deliberately appears nowhere on the site or in
this repo. Nothing to fill in.

The twilight price now lives in exactly one place — `TWILIGHT_ADDON_PRICE` in
`src/data/site.ts`. Set it there and the pricing table, the twilight service
stamp, and the hero slider caption all follow. Nothing to keep in sync.

## 4. Photography

Placeholders live in `public/placeholders/` with a machine-readable index at
`public/placeholders/manifest.json`. Every placeholder is labelled on-image with
its filename and pixel dimensions, so you can match a real file to its slot by
looking at it.

**Swap in real photos by keeping the same filename** (change the extension and
update the path in the data file), or point the data file at a new name.

### The hero slider — done

Both halves are real photographs of 108 Cedar Hill Drive, and they are a genuine
matched pair. Measured registration between the two frames is **scale 1.001 with
sub-pixel offset**, so the house does not shift when the handle moves.

| Half | File |
| --- | --- |
| Midday | `src/assets/hero-day.jpg` |
| Blue hour | `src/assets/hero-twilight.jpg` |

Both run through `astro:assets` — AVIF, WebP, and JPEG at four widths each,
generated at build time.

Nothing to do here unless you want to swap the property. **If you do, both frames
have to be reshot together** from one tripod position — replacing only one breaks
the comparison, which is the entire point of the interaction.

Both sources are 1536 × 1024, matched deliberately so the two halves have
identical sharpness at any display size. If you ever have the twilight frame at
full resolution, re-export both at the same larger size rather than just the one.

The 6000 × 4000 original the midday half was derived from lives at
`masters/108_Cedar_Hill_Dr-2.jpg`. `masters/` is gitignored — full-resolution
originals stay on your machine and are never committed. Keep new shoot originals
there and export web-sized versions into `src/assets/`. See the README.

### Service tiles — 2 photos

| File | Slot | Recommended | Aspect |
| --- | --- | --- | --- |
| `service-stills.svg` | Stills tile | 1600 × 1000 | 16:10 |
| `service-video.svg` | Video tile | 1600 × 1000 | 16:10 |

Referenced in `src/data/services.ts` (`image` field). The five compact tiles have
no image by design — leave them that way unless you have frames strong enough to
carry them.

### Gallery — 12 photos

Referenced in `src/data/gallery.ts`. Each entry also carries a `propertyType`,
`area`, `meta`, and `caption` you should rewrite to describe the real listing —
the alt text and lightbox caption both come from `caption`, so write it as a
plain sentence about what's in the frame.

| File | Type | Recommended | Aspect |
| --- | --- | --- | --- |
| `work-01-twilight-front.svg` | Twilight, front elevation | 1600 × 1067 | 3:2 landscape |
| `work-02-interior-kitchen.svg` | Interior, kitchen | 1067 × 1600 | 2:3 portrait |
| `work-03-aerial-lot.svg` | Aerial, lot and treeline | 1600 × 1067 | 3:2 landscape |
| `work-04-interior-living.svg` | Interior, living room | 1600 × 1067 | 3:2 landscape |
| `work-05-exterior-front.svg` | Exterior, front elevation | 1067 × 1600 | 2:3 portrait |
| `work-06-video-walkthrough.svg` | Video still, walkthrough | 1600 × 900 | 16:9 landscape |
| `work-07-twilight-rear.svg` | Twilight, rear elevation | 1600 × 1067 | 3:2 landscape |
| `work-08-interior-bath.svg` | Interior, primary bath | 1067 × 1600 | 2:3 portrait |
| `work-09-aerial-neighborhood.svg` | Aerial, neighbourhood context | 1600 × 1067 | 3:2 landscape |
| `work-10-exterior-rear.svg` | Exterior, rear and yard | 1600 × 1067 | 3:2 landscape |
| `work-11-interior-primary.svg` | Interior, primary bedroom | 1067 × 1600 | 2:3 portrait |
| `work-12-video-vertical.svg` | Video still, vertical cut | 900 × 1600 | 9:16 portrait |

**Mix matters more than count.** The grid is a masonry column layout, so a run of
identical aspect ratios makes it look like a spreadsheet. Keep roughly the
landscape/portrait split above. If you add more than 12, the home page shows the
first 8 and `/work` shows all of them — no code change needed.

### Open Graph image

`public/og-default.png` (1200 × 630) is generated art, not a photo. Replace it
with a real twilight frame plus your logotype once you have one — it's what shows
when an agent pastes your link into a text or a Facebook group.

## 5. Copy to check before launch

- `src/data/faq.ts` — the payment answer says no deposit and half-price
  cancellation inside 24 hours. **Still a draft business decision, not settled.**
  Note it is unrelated to the 24-hour turnaround and is deliberately not wired to
  the `TURNAROUND` constant, so changing turnaround will not move it.
  (The licensing answer is settled — supplied verbatim by the owner.)
- `src/data/services.ts` — the aerial entry claims Part 107 and mentions LAANC
  for Tupelo. The virtual staging entry promises a disclosure label baked into
  every file. Make sure you do all of that.
- `src/components/Process.astro` — promises a text when the shoot is done and a
  partial reshoot if the seller changes something.
- `src/components/Coverage.astro` — settled: travel included inside 30 miles,
  anything further quoted at booking.

Nothing on this site invents a testimonial, a client logo, or a star rating.
Keep it that way.
