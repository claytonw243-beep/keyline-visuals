import { TURNAROUND, EXTRAS_TURNAROUND_HOURS, TWILIGHT_ADDON_PRICE } from './site';

/* CONTENT-TODO — every price on this page is a placeholder.
   Fill in, in order:
     1. Essential   — up to 2,000 sq ft ....... $[XXX]
     2. Essential   — 2,001–3,500 sq ft ....... $[XXX]
     3. Essential   — 3,501+ sq ft ............ $[XXX]
     4. Full Listing — up to 2,000 sq ft ...... $[XXX]
     5. Full Listing — 2,001–3,500 sq ft ...... $[XXX]
     6. Full Listing — 3,501+ sq ft ........... $[XXX]
     7. Signature   — up to 2,000 sq ft ....... $[XXX]
     8. Signature   — 2,001–3,500 sq ft ....... $[XXX]
     9. Signature   — 3,501+ sq ft ............ $[XXX]
    10–16. Every add-on price below
   The same values also appear in the JSON-LD priceRange in src/data/site.ts. */

export type Package = {
  name: string;
  summary: string;
  tiers: { label: string; price: string }[];
  includes: string[];
  featured?: boolean;
  tag?: string;
};

export const packages: Package[] = [
  {
    name: 'Essential',
    summary: 'Photos only. The listing goes live looking right and nothing else.',
    tiers: [
      { label: 'Up to 2,000 sq ft', price: '$[XXX]' },
      { label: '2,001–3,500 sq ft', price: '$[XXX]' },
      { label: '3,501+ sq ft', price: '$[XXX]' },
    ],
    includes: [
      '25–35 edited photos',
      'Interior and exterior stills',
      'MLS-sized and full-resolution files',
      `Delivered in ${TURNAROUND}`,
    ],
  },
  {
    name: 'Full Listing',
    summary:
      'What most listings over $300k get. Photos, aerial, and a walkthrough in one visit.',
    featured: true,
    tag: 'MOST BOOKED',
    tiers: [
      { label: 'Up to 2,000 sq ft', price: '$[XXX]' },
      { label: '2,001–3,500 sq ft', price: '$[XXX]' },
      { label: '3,501+ sq ft', price: '$[XXX]' },
    ],
    includes: [
      'Everything in Essential, 35–45 photos',
      'Aerial photos and 4K clips',
      '60–120 second walkthrough video',
      'Vertical cut for Reels and TikTok',
      'Floor plan with room dimensions',
    ],
  },
  {
    name: 'Signature',
    summary:
      'For the listing you are going to be judged on. Two visits, one of them at blue hour.',
    tiers: [
      { label: 'Up to 2,000 sq ft', price: '$[XXX]' },
      { label: '2,001–3,500 sq ft', price: '$[XXX]' },
      { label: '3,501+ sq ft', price: '$[XXX]' },
    ],
    includes: [
      'Everything in Full Listing',
      'Twilight session, 6–8 frames',
      'Aerial twilight where airspace allows',
      'Three virtually staged rooms',
    ],
  },
];

export type AddOn = { name: string; price: string; note: string };

export const addOns: AddOn[] = [
  { name: 'Twilight session', price: TWILIGHT_ADDON_PRICE, note: 'Added to any package, same week' },
  { name: 'Aerial photo & video', price: '$[XX]', note: 'Standalone, Part 107 licensed' },
  { name: 'Floor plan', price: '$[XX]', note: 'Measured on shoot day' },
  { name: 'Virtual staging', price: '$[XX]', note: `Per image, ${EXTRAS_TURNAROUND_HOURS} hour turnaround` },
  { name: 'Vertical social cut', price: '$[XX]', note: 'Included in Full Listing and up' },
  { name: 'Same-day rush delivery', price: '$[XX]', note: 'Booked before 10am, in by 8pm' },
  { name: 'Reshoot after seller changes', price: '$[XX]', note: 'Return visit, same listing' },
];
