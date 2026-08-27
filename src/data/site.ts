/* Single source of truth for contact + identity.
   CONTENT-TODO: every [BRACKETED] value below needs replacing. */

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

export const towns = [
  'Oxford',
  'Ole Miss campus area',
  'Lafayette County',
  'Tupelo',
  'Batesville',
  'Water Valley',
  'Holly Springs',
  'Sardis & Enid lake properties',
];

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export const trustStrip = [
  // CONTENT-TODO: edit all four of these until every one is literally true.
  { label: 'Turnaround', value: 'Next morning by 9am' },
  { label: 'Delivery', value: 'MLS + print sizes' },
  { label: 'Coverage', value: '45 miles from Oxford' },
  { label: 'Drone', value: 'FAA Part 107 licensed' },
];
