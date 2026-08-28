/* Single source of truth for contact + identity.
   CONTENT-TODO: every [BRACKETED] value below needs replacing. */

/* ---------------------------------------------------------------------------
   Settled business facts.
   These are confirmed, not drafts. Every consumer imports from here — there is
   deliberately no second copy anywhere in the codebase. Change the value once
   and the whole site follows.
   --------------------------------------------------------------------------- */

/** Photo turnaround. Per-service times (video, floor plans, virtual staging,
    listing websites) are separate and live in services.ts — do not point them
    at this constant. */
export const TURNAROUND_HOURS = 24;

/** Prose form, e.g. "in your inbox within 24 hours". */
export const TURNAROUND = `${TURNAROUND_HOURS} hours`;

/** Mono metadata-stamp form. The .mono class uppercases it on render. */
export const TURNAROUND_STAMP = `${TURNAROUND_HOURS} HR DELIVERY`;

/** Travel inside this radius of Oxford is included in the price. Beyond it,
    travel is quoted at booking — that rate is internal and must never appear
    on the public site or anywhere in this repo. */
export const FREE_TRAVEL_RADIUS_MILES = 30;

/** CONTENT-TODO: still TBD. Priced once here, read by pricing.ts,
    services.ts, and TwilightSlider.astro. */
export const TWILIGHT_ADDON_PRICE = '$[XX]';

export const site = {
  name: 'Keyline Visuals',
  tagline: 'Real estate media for North Mississippi',
  phone: '[PHONE]', // e.g. '(662) 555-0142'
  phoneHref: 'tel:[PHONE]', // e.g. 'tel:+16625550142' — digits only, with +1
  smsHref: 'sms:[PHONE]',
  email: '[EMAIL]', // e.g. 'clayton@keylinevisuals.com'
  instagram: '[INSTAGRAM_HANDLE]', // e.g. 'keylinevisuals'
  instagramUrl: 'https://instagram.com/[INSTAGRAM_HANDLE]',
  droneLicense: '[PART_107_NUMBER]',
  domain: '[DOMAIN]', // e.g. 'keylinevisuals.com'
  // CONTENT-TODO: update these two every month or two so the banner stays true.
  bookingWindow: 'BOOKING [CURRENT MONTH] — [NEXT MONTH]',
  priceRange: '$$',
  base: 'Oxford, Mississippi',
  region: 'North Mississippi',
};

/* Where the work happens — not a statement about what travel is free.
   Coverage.astro states the travel rule once; these are just places. */
export const towns = [
  'Oxford',
  'Ole Miss campus area',
  'Lafayette County',
  'Tupelo',
  'Batesville',
  'Water Valley',
  'Holly Springs',
  'Sardis Lake properties',
  'Enid Lake properties',
];

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export const trustStrip = [
  // Turnaround and Coverage are settled. CONTENT-TODO: Delivery and Drone are
  // still unverified draft — edit until each is literally true.
  { label: 'Turnaround', value: TURNAROUND },
  { label: 'Delivery', value: 'MLS + print sizes' },
  { label: 'Coverage', value: `${FREE_TRAVEL_RADIUS_MILES} miles, travel included` },
  { label: 'Drone', value: 'FAA Part 107 licensed' },
];
