# Content to supply

Everything below is a placeholder in the code right now. Work top to bottom —
the first section blocks deploying, the rest block the site being *true*.

A fast way to find what's left at any point:

```bash
grep -rn "\[INSTAGRAM_HANDLE\]\|\[PART_107_NUMBER\]\|CONTENT-TODO" src public astro.config.mjs
```

---

## 1. Blocks deployment

| What | Where | Notes |
| --- | --- | --- |
| ~~Domain~~ | | **done** — `keylinevisuals.com`, apex. Set in `astro.config.mjs` (`SITE`), `public/CNAME`, and `public/robots.txt`. Everything downstream derives from it. **DNS still needs configuring — see below.** |
| Formspree form ID | `.env` → `PUBLIC_FORMSPREE_ID` | ID is **`mdeokplg`** (endpoint `https://formspree.io/f/mdeokplg`). Set locally. **Still required in CI:** add a repository *variable* named `PUBLIC_FORMSPREE_ID` under Settings → Secrets and variables → Actions → Variables, or the deployed form will tell visitors it is not connected. `.env` is gitignored, so recreate it on a fresh clone with `echo 'PUBLIC_FORMSPREE_ID=mdeokplg' > .env` — the ID is not a secret, it ships in the page's `action` attribute. |
| ~~Booking portal URL~~ | | **done** — Fotello at `https://book.keylinevisuals.com/book/default`, in `src/data/site.ts` → `BOOKING_URL`. A **subdomain**, because Pages holds the apex and would swallow any path on it. Virtual twilight is exempt and points at the contact form instead. |

Until the Formspree ID is set, the contact form validates normally but tells the
visitor it isn't connected and points them at the phone number — it never fakes
a success.

DNS note: `book.keylinevisuals.com` is a separate record from the apex, pointing
at Fotello rather than GitHub. Changing the apex does not affect it, and vice
versa.

### DNS for the apex domain

`keylinevisuals.com` is an **apex** domain, so it needs **A records**, not a
CNAME. Pointing a CNAME at the apex is the usual mistake and it will not work.
At your registrar, create four A records for `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally the four AAAA records for IPv6:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

An ALIAS or ANAME record pointing at your `username.github.io` default domain
works instead, if your registrar supports one.

Then in the repo: **Settings → Pages → Source: GitHub Actions**, and tick
**Enforce HTTPS** once the certificate provisions. `public/CNAME` is GitHub's
own config file — confusingly named, since the apex must not use a DNS CNAME.

*(Addresses checked against GitHub's custom-domain documentation, not recalled.)*

## 2. Contact and identity

All in `src/data/site.ts`:

| Field | Placeholder | Format |
| --- | --- | --- |
| ~~`phone`~~ | **done** — (662) 801-8541 | |
| ~~`phoneHref` / `smsHref`~~ | **done** — `tel:+16628018541` | |
| ~~`email`~~ | **done** — info@keylinevisuals.com | |
| `instagram` | `[INSTAGRAM_HANDLE]` | Handle only, no `@` — it's interpolated into the URL |
| `droneLicense` | `[PART_107_NUMBER]` | Your FAA Part 107 certificate number |
| ~~`priceRange`~~ | **done** — `$125-$180` | A literal numerical range, not currency signs. Google defines no dollar thresholds for `$` / `$$` / `$$$`, so the signs carry no meaning for a photography service. **Update this if prices change.** Must stay under 100 characters. |

Also in `src/data/site.ts`:

- **`trustStrip`** — four claims under the hero. Turnaround and Coverage are
  settled and read from the constants above them. The other two are still draft:
  "MLS + print sizes" and "FAA Part 107 licensed" — confirm both are literally
  true before launch.
- **`towns`** — the service-area list. Add or cut towns to match where you'll actually drive.

And in `src/layouts/BaseLayout.astro`: the `openingHoursSpecification` block in
the JSON-LD is set to Mon–Fri 08:00–19:00 and Sat 09:00–17:00. Change to your
real hours.

## 3. Prices — settled

Nothing to fill in. Flat "starting at" pricing lives in `src/data/pricing.ts`:

| Product | Price |
| --- | --- |
| Photos | Starting at $180 |
| Video | Starting at $180 |
| Drone only | Starting at $125 |
| Drone add-on | $35 |
| Virtual twilight | $15 |

The square-footage tiers and the Essential / Full Listing / Signature packages
are gone, along with every add-on that never had a real price. Virtual twilight
reads from `TWILIGHT_ADDON_PRICE` in `src/data/site.ts`, which also feeds the
twilight service stamp and the hero slider caption — change it there and all
three follow.

`site.priceRange` in the JSON-LD is `$125-$180`, covering the three products.
The $15 and $35 add-ons sit below it deliberately — neither is something an
agent buys on its own. Change it alongside any price change.

## 4. Photography

**Six real photographs are in.** They live in `src/assets/gallery/` and run
through `astro:assets`, which generates AVIF and WebP at four widths each.

### Adding more

1. Put the full-resolution original in `masters/` — gitignored, never committed.
2. Export to `src/assets/gallery/` as **JPEG, sRGB, 1600px on the long edge,
   quality ~85**. Do not pre-shrink further; Astro derives the smaller sizes.
3. Add an entry to the `entries` array in `src/data/gallery.ts`. Array order is
   display order.

Name files `NN-subject.jpg` — lowercase, hyphens. The number is for your own
sanity in the folder; ordering comes from the array, not the filename.

An entry whose file is missing is **skipped with a build warning** rather than
crashing, so a partial set always works and a typo is survivable.

### Metadata still to supply

Each gallery entry can carry `propertyType`, `area`, and `meta` (an image
count). **All three are unset**, because they are facts about the listing that
only you know — inventing a neighbourhood would be inventing a client. The hover
overlay shows whichever are present and renders nothing when none are, so the
gallery looks correct without them.

Fill them in per entry when you know them, for example:

```
propertyType: 'Single family',
area: 'Lafayette County',
meta: '38 IMAGES',
```

### Categories with no photo yet

The filter row is generated from what actually exists, so there are currently
four buttons: All, Interiors, Exteriors, Aerial. **Twilight and Video have no
photo**, so no dead buttons appear. Both are still services — a twilight
conversion and a video still would each add their filter back automatically.

### Service tiles — 2 images, still placeholders

| File | Slot | Recommended | Aspect |
| --- | --- | --- | --- |
| `service-stills.svg` | Stills tile | 1600 × 1000 | 16:10 |
| `service-video.svg` | Video tile | 1600 × 1000 | 16:10 |

These are the last two placeholder images on the site. Unlike the gallery they
are still raw `<img>` tags pointing at `public/`, so they skip AVIF and WebP
generation. When real photos replace them, move them into `src/assets/` and
convert the tile to `<Picture>` the way the gallery now works.

### Open Graph image

`public/og-default.png` (1200 × 630) is generated art, not a photo. Replace it
with a real frame plus your logotype — it is what shows when an agent pastes
your link into a text or a Facebook group.

## 5. Copy to check before launch

- `src/data/faq.ts` — the licensing answer is settled, supplied verbatim by the
  owner. Nothing else in the FAQ carries a business term any more: the payment
  question was removed on purpose, along with net-15, deposits, and the
  cancellation window. Do not add them back.
- `src/data/services.ts` — the aerial entry claims Part 107 and mentions LAANC
  for Tupelo. Make sure both are true.
- `src/components/Process.astro` — promises a text when the shoot is done and a
  partial reshoot if the seller changes something.
- `src/components/Coverage.astro` — settled: travel included inside 30 miles,
  anything further quoted at booking.

Nothing on this site invents a testimonial, a client logo, or a star rating.
Keep it that way.
