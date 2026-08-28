# Progress log

Newest entry at top. One entry per completed task.

For what still needs to happen before launch, see **CONTENT-TODO.md** — that is
the launch checklist and it is not duplicated here.

---

## 2026-08-27 — Payment terms taken off the site

Four claims were live that had never been confirmed: net-15 billing for
brokerages "with more than a few listings a month", no deposit, a cancellation
inside 24 hours billed at half, and "cancel free up to 24 hours out". All are
now gone.

Removed: the "When do I pay?" question and answer from `faq.ts` entirely, with
no replacement, and the booking-form footer line under the submit button. The
dead `.form__foot` rule went with it.

Kept: "The invoice comes with the gallery" in `Process.astro` step 3 — the one
payment detail worth having on the site, already in the right place.

**A trap disappeared with them.** `BookingForm.astro` and the payment answer
were the two places where "24 hours" meant a *cancellation window* rather than
turnaround. `CLAUDE.md` carried a warning never to wire them to `TURNAROUND`,
because changing turnaround would have silently rewritten a cancellation
policy. Both are gone, so the warning is gone and 24 hours now means exactly
one thing in this codebase.

`CLAUDE.md` records these as **off the site by decision, not TBD**, so a future
session does not helpfully restore them. The cancellation-policy row is out of
the TBD table.

Five FAQs remain. `CLAUDE.md` rule 7 said "six FAQ questions are in the
reader's voice" — corrected to five.

## 2026-08-27 — Sales tax line removed

"Sales tax added at invoice" is gone from the Pricing add-ons footer, which now
reads only "Travel within 30 miles of Oxford is included".

Searched the whole repo for other tax language — `tax`, `VAT`, `taxable`,
`surcharge` — across `src/`, `public/`, `brand/`, the markdown docs, and the
workflow. That footer was the only occurrence. Nothing in `pricing.ts`,
`faq.ts`, the payment answer, `Process.astro`, or any meta description
mentioned tax. Zero occurrences remain in source or in any built page.

Adjacent billing language was left alone, since none of it is about tax: the
payment answer in `faq.ts` (invoice due on delivery, card/ACH/check, net-15 for
brokerages, no deposit, half-price cancellation inside 24 hours), the "No
deposit" line in `BookingForm.astro`, and "The invoice comes with the gallery"
in `Process.astro`. The cancellation and net-15 terms there are still
unverified draft, as `CLAUDE.md` records.

## 2026-08-27 — Real prices, twilight becomes a post edit, services cut to four

**Pricing is settled and the structure is gone.** Three flat "starting at"
products — Photos $180, Video $180, Drone only $125 — plus two add-ons, Drone
add-on $35 and Virtual twilight $15. Cut: the three square-footage tiers, the
Essential / Full Listing / Signature names and all nine tier prices, the
`MOST BOOKED` tag, and every add-on that only had a placeholder price.

Pricing cards carry no bullet lists. Reusing each service's `includes` would
have shipped a bug — aerial's list says "4K aerial clips folded into the video
cut", which is false for a Drone only product with no video. Instead each card
pulls its one-line summary from the matching service `blurb` by slug, so there
is no second copy to drift, and a renamed slug throws at build time.

**Twilight is a post-production conversion, not a shoot.** We do not shoot real
twilight sessions; the only twilight product is a $15 edit of a daytime
exterior. The service entry was rewritten accordingly and four false claims
were removed: the twenty-minute window after sunset, the dusk drive, the seller
lights-on prep checklist, and the weather reschedule — including "free
reschedule on an overcast evening" from `includes`.

The same claim was traced out of `faq.ts` (the twilight rescheduling sentence
and twilight in the weather list), the JSON-LD `serviceType`, three meta
descriptions, and the hero subhead. The slider and both photographs stay — the
image demonstrates the look an agent gets — and its caption already read
"conversion" rather than "session". The $15 is interpolated from
`TWILIGHT_ADDON_PRICE`; no literal survives anywhere.

**Floor plans and virtual staging removed.** Neither had a real price. Three
knock-ons found by tracing rather than by the brief: `faq.ts` still offered
same-day rush delivery, which was one of the cut add-ons; `faq.ts` still sold
virtual staging in the staging answer; and the hero subhead still listed
twilight as a shot service.

**EXTRAS_TURNAROUND renamed to VIDEO_TURNAROUND.** Floor plans and virtual
staging were two of the three things on 48 hours. Video is the only one left,
so a plural "extras" name covering a single service stopped being true. Still
three consumers — the video stamp, the FAQ answer, and the Process body — so it
keeps its own home.

**Grid is 4 tiles, which is even, so nothing broke.** Worth recording that the
brief said 5; the arithmetic is 6 services minus 2, and twilight being the
*fourth* tile is its position, not the count. Five would have stranded a tile
with three empty columns beside it. Verified live: two rows of 571px at
desktop.

**Process step 3 re-stamped "Afterward".** With listing websites gone nothing in
that step takes a week, and the reshoot promise has no deadline attached.

**Not changed, flagged for a decision:** two gallery captions still describe a
real dusk shoot — "Front elevation at blue hour, lawn and window lighting
balanced by hand" and "Rear elevation and dock in the twenty minutes after
sunset". They are alt text as well as captions. Placeholder gallery data, so
they disappear when real listings land, but they are live copy today.

## 2026-08-27 — Coverage and process copy, service area trimmed, listing websites removed

**Service area.** "Ole Miss campus area" removed from `towns` in `site.ts`. That
array feeds both the visible list in `Coverage.astro` and `areaServed` in the
JSON-LD, so one edit covered both — verified in the built output on all four
pages.

**Coverage** rewritten. "Oxford out to about 30 miles" framed the business
around a radius; it now leads with where the business is and what it covers:
"Based in Oxford, working across North Mississippi." The travel rule stays but
is tightened to one sentence, and the radius is still interpolated from
`FREE_TRAVEL_RADIUS_MILES` rather than hardcoded.

**Process.** The intro now asks for the address and the square footage rather
than "an address and a way in". Shoot day no longer says "Send the address" —
that implied emailing us, when everything arrives at booking. The
burned-out-bulb / dead-lawn / neighbor's-boat list is cut.

Step 3 was "The last pieces land before the listing goes live", which was
filler wrapped around a deliverable list. It now leads with the reshoot
guarantee — "If something changes, we come back" — which is the actual reason
an agent would choose us and was previously buried in the last clause.

**Listing websites removed as a service.** The `services.ts` entry is gone, and
with it the grid tile, the `#listing-websites` section, and the jump-nav link on
/services/ — all three are data-driven, so deleting the entry removed them.
Manual edits: the Signature package bullet and the add-on row in `pricing.ts`,
the /services/ meta description, and the service count in two headings
("Seven things we do" → "Six").

**The 7-tile grid hack is retired.** The `.svc__tile:last-child` span rule at
both breakpoints existed only to fill a trailing row that an odd count left
short. Measured at 6 tiles it did the opposite: at =1040px it stretched virtual
staging to 761px in a 1144px grid, leaving a 383px hole, and at 700-1039px it
left floor plans alone in a half-empty row and made virtual staging full-width
for no reason.

Both rules are deleted and `.svc__tile--compact` goes from `span 2` to `span 3`
at =1040px. Because 6 is 2 large + 4 compact, tiles now pair up with no
special case: three rows of 571px at desktop, and full / full / 401+401 /
401+401 at tablet. Verified live at both breakpoints. Compact tiles are wider
than before — the grid is uniformly 2-across, so the large/compact distinction
is carried by the image frame rather than width.

**EXTRAS_TURNAROUND simplified.** Listing websites were the only service sitting
outside it. The rule is now simply stills 24 hours, everything else 48, and the
carve-out language is deleted from four places: the doc comments on both
`TURNAROUND_HOURS` and `EXTRAS_TURNAROUND_HOURS`, the per-service bullet in
`CLAUDE.md`, and the `Listing-website turnaround` row in the TBD table.

`CLAUDE.md` architectural constraints: the hardcoded-7-tiles item is replaced
with a note that the grid takes any even count and that a 7th service would
bring the ragged row back.

**Still open:** booking moves to an external portal and the on-site form
becomes contact-only. That work is on hold pending the portal URL. Six CTAs
point at `#book` today (nav desktop and mobile, hero, 404, three pricing cards,
and every service on /services/), and the form still collects booking fields —
address, square footage, package, preferred dates — that will belong to the
portal instead.

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
