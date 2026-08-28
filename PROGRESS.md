# Progress log

Newest entry at top. One entry per completed task.

For what still needs to happen before launch, see **CONTENT-TODO.md** — that is
the launch checklist and it is not duplicated here.

---

## 2026-08-27 — Flash claims removed, Process narrowed to three clean steps

**Flash is gone from the site entirely.** Keyline Visuals does not shoot with
flash, and the remaining four claims were removed rather than rewritten —
technique is more detail than a listing agent needs:

- stills `blurb` — the "Flashed so the windows still read" sentence dropped; the
  blurb is now one line about what gets shot
- `faq.ts` rain answer — "the flash does not care what the sky is doing" cut. The
  promise stands on its own; the reason was the part that was wrong
- `gallery.ts` — the kitchen caption, which is also alt text, now reads "Kitchen
  with the view out the window still visible"
- `Process.astro` — "We bring lighting for every interior" replaced with "A drone
  comes too if the package has one", keeping the useful half

Verified: zero occurrences of flash, strobe, off-camera, or speedlight in `src/`
or in any built page.

**Process.astro — Option A.** Three steps kept, no CSS change. Step 2 now names
video, floor plans, and virtual staging together at `EXTRAS_TURNAROUND`, which
resolves the contradiction with `faq.ts`. Step 3 narrows to the listing website,
the invoice, and the reshoot promise; its title changed from "Everything else
lands before the listing goes live" to "The last pieces land…", since "everything
else" no longer described one remaining deliverable.

`CLAUDE.md` — the "known factually wrong" flash block added last commit is
removed, since nothing in it is true of the codebase any more.

## 2026-08-27 — Plural voice, 48-hour extras, contact details, coverage link, flash claims

**Voice.** The site now speaks as "we" — 38 rendered strings across 10 files.
Three things were deliberately left in the first person singular: the six FAQ
*questions* (that "I" is the visitor asking us something), and `rel="me"` in the
footer, which is a microformats attribute rather than copy. Several answers
needed real rewrites rather than word swaps, since subject-verb agreement moved
with them. Added as rule 7 in `CLAUDE.md`, including a ban on "our pilots" or
anything else implying headcount.

**Per-service turnaround.** Virtual staging 72 → 48 hours. Video and floor plans
confirmed at 48. All three now read from `EXTRAS_TURNAROUND_*` in `site.ts`
rather than four separate literals. Listing websites stay "same week" and are
explicitly outside that constant. The FAQ line that said "video and floor plans
take one more day" now names the actual figure and folds staging in.

**Contact.** Phone (662) 801-8541 and info@keylinevisuals.com are live in
`site.ts`. Instagram, Part 107 number, hours, and booking window stay TBD.

**Coverage link.** The trust strip's Coverage value changed from
"30 miles, travel included" to "North Mississippi", linking to `/#coverage`. At
rest it is pixel-identical to its three siblings — same colour, size, weight, no
underline — with a 6px chevron at 50% opacity as the only cue. It points down
because the target is further down the page. On hover the text goes `--signal`
and the chevron nudges down and solidifies.

**JSON-LD left alone, deliberately.** `areaServed` still lists the nine towns as
`City` objects. Widening it to "North Mississippi" would mean typing a region
that is not an administrative entity as a generic `Place` — a broader claim that
tells search engines less. The visible label is a plain-language summary; the
structured data staying specific is correct, not contradictory.

**Aerial copy** replaced verbatim with the owner's text.

**Credential phrasing.** `Footer.astro` said "Licensed FAA Part 107 remote pilot",
which describes a person. Now "Aerial flown under an FAA Part 107 certificate" —
the credential as an activity, no headcount implied.

**Frequency claim removed.** The FAQ heading "Questions we get every week" became
"Questions we get most often". Weekly inbound volume was the same kind of
unearned claim as the "regular run" language deleted in the previous task.

**Flash.** Keyline Visuals does not shoot with flash, so the stills service was
carrying a false claim about its own technique. The "Off-camera flash on every
interior" bullet is gone and the two body paragraphs were replaced with the
owner's verbatim text. The third paragraph, on file delivery, was kept — it is
technique-neutral and is the only place that entry describes MLS sizing.

**Still wrong, awaiting a decision — do not treat as verified:**

- `src/data/services.ts` stills **blurb** — "Flashed so the windows still read".
  This is the tile copy on the home page, directly above the body just corrected.
- `src/data/faq.ts` rain answer — "the flash does not care what the sky is
  doing". Load-bearing: it is the *reason* the answer gives for shooting
  interiors in any weather, so it needs a rewrite rather than a deletion.
- `src/data/gallery.ts` — "Kitchen flashed against the ambient so the window
  keeps its view". This is alt text and the lightbox caption, so it reaches
  screen readers too.
- `src/components/Process.astro` — "We bring lighting for every interior". Not
  the word flash, but an equipment claim of the same family, and unverified.

**Also outstanding:** `Process.astro` still groups virtual staging under the
"Same week" step while `faq.ts` groups it with the 48-hour deliverables. Three
restructure options were put to the owner; none applied yet.

## 2026-08-27 — Business facts consolidated into a single source of truth

Settled facts moved into named constants at the top of `src/data/site.ts`:
`TURNAROUND_HOURS` (24), `TURNAROUND`, `TURNAROUND_STAMP`,
`FREE_TRAVEL_RADIUS_MILES` (30), and `TWILIGHT_ADDON_PRICE` (still TBD, but now
priced in one place). Eleven files import from there. **No literal copy of any
settled value survives anywhere in `src/`** — verified by grep.

Contradictions fixed. The trust strip claimed a 45-mile radius while
`Coverage.astro` said 25 miles free; both are now 30. Turnaround said
"next morning by 9am" in six places; all now read 24 hours. The Process stamp
changed from `NEXT MORNING` to `24 HOURS`.

The travel fee is gone from the public site — the `$[X]` per-mile line in
`Pricing.astro` and all per-mile language in `Coverage.astro`. Coverage now says
travel within 30 miles is included and invites contact for anything further. The
per-mile rate is internal, calculated at booking, and appears nowhere in this
repo, comments included.

Licensing answer in `faq.ts` replaced with the owner's verbatim text.

`towns` split `"Sardis & Enid lake properties"` into two entries. Tupelo stays —
it is outside the free radius, not outside the business — but the copy calling it
a "regular run" is gone, since that was a volume claim with nothing behind it.

**One trap worth remembering:** "24 hours" means two unrelated things here. The
settled fact is *turnaround*. The cancellation window in `BookingForm.astro` and
the payment answer in `faq.ts` is also 24 hours and is **not** settled — it is
deliberately not wired to `TURNAROUND`, so changing turnaround later cannot
silently rewrite a cancellation policy. Documented in `CLAUDE.md`.

Left alone by agreement: per-service turnarounds (video, floor plans, virtual
staging, listing websites), the "one more day" line, the rush-delivery claim, and
the hero headline.

`CLAUDE.md` updated — turnaround and travel radius moved from TBD to settled;
cancellation policy and per-service turnarounds added to TBD; the draft-copy
warning narrowed to what is still unverified. `CONTENT-TODO.md` item 18 marked no
longer applicable and the price count corrected from eighteen to seventeen.

Verified: `npm run build` clean, `astro check` 0 errors, and the built HTML
contains no instance of "9am", "45 miles", "25 miles", "per mile", or
"next morning".

## 2026-08-27 — Standing brief and progress log

Added `CLAUDE.md` as the brief every future session reads first, and this file.

`CLAUDE.md` covers the business (domain purchased; phone, email, Instagram,
Part 107 number, hours, prices, service radius, and turnaround all still TBD),
the stack, six hard rules, and five architectural constraints found in a
read-only audit of the codebase.

The audit's main finding, recorded in `CLAUDE.md` so it is not rediscovered the
hard way: **not every placeholder looks like one.** Alongside obvious markers
like `[PHONE]` and `$[XXX]`, the codebase carries plain-English draft copy that
reads as settled fact — "Next morning by 9am", "45 miles from Oxford", "FAA Part
107 licensed", the JSON-LD opening hours, the FAQ's cancellation and licensing
terms. All of it is unverified. These are client commitments and claims about
drone certification, so `CLAUDE.md` lists every location and instructs future
sessions to ask rather than repeat them.

Other constraints documented: the three scripts that use `document.querySelector`
and therefore cap their components at one instance per page; hardcoded section
and form-field IDs; the services grid pinned to exactly 7 tiles; `gallery.ts`
declaring its categories in two places that nothing keeps in sync; and
`BaseLayout` accepting only three props.

## 2026-08-27 — Version control

Repo initialised on `main`. Initial commit `6bfb465` — 74 files, 1.60 MB
(1.26 MiB packed).

`.gitignore` covers `node_modules/`, `dist/`, `.astro/`, `.env` (with a
`!.env.example` negation), `.DS_Store`, editor directories, logs, and
`brand/fontenv/` — the Python virtualenv used by the logo generator, which would
otherwise have committed thousands of files.

Established the image convention: **`masters/` holds full-resolution shoot
originals and is gitignored; `src/assets/` holds only web-ready derivatives that
components import through `astro:assets`.** The 7.3 MB camera master for the hero
was moved to `masters/` — it was 82% of the repo by size and nothing imported it.
Kept on disk for future re-crops, never committed, since git carries every
version of a binary forever. Documented in `README.md`.

Before committing: verified no `node_modules/`, `dist/`, `.astro/`, `.env`, or
`.DS_Store` were staged, and ran a secret scan across all staged files (four hits,
all false positives — the literal phrase "Secrets and variables" in GitHub setup
instructions, plus npm lockfile metadata).

The initial commit contains the full site build that preceded version control:
four pages, twelve components, the design-token system, and the real matched
day/twilight photo pair in the hero slider.

**No remote configured. Nothing pushed.** Note that
`.github/workflows/deploy.yml` triggers on push to `main`, so the first push
after adding a remote will deploy.
