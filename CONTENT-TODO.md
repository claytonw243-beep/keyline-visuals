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
| Formspree form ID | `.env` → `PUBLIC_FORMSPREE_ID` | Powers the **contact** form. Create a form at formspree.io, copy the 8 characters from `formspree.io/f/xxxxxxxx`. Also add it as a **repository variable** named `PUBLIC_FORMSPREE_ID` (Settings → Secrets and variables → Actions → Variables) or the deployed form will not send. |
| Booking portal URL | `src/data/site.ts` → `BOOKING_URL` | The external portal shoots are booked through. All six "Book a shoot" CTAs read it. **Until it is set they fall back to `/#contact`**, so nothing is broken — but visitors reach a contact form instead of the booking flow. |

Until the Formspree ID is set, the contact form validates normally but tells the
visitor it isn't connected and points them at the phone number — it never fakes
a success.

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
