# Progress log

Newest entry at top. One entry per completed task.

For what still needs to happen before launch, see **CONTENT-TODO.md** — that is
the launch checklist and it is not duplicated here.

---

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
