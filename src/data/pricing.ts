import { services } from './services';
import { TWILIGHT_ADDON_PRICE } from './site';

/* Prices are settled. Flat "starting at" pricing — no square-footage tiers and
   no package names. */

/** Pull the one-line summary off the matching service so there is no second
    copy of it to drift. Throws at build time if a slug is ever renamed. */
const blurbOf = (slug: string): string => {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`pricing.ts: no service with slug "${slug}"`);
  return service.blurb;
};

export type Package = {
  /** Matches a service slug — drives the summary and the /services/ anchor. */
  slug: string;
  name: string;
  price: string;
  summary: string;
};

export const packages: Package[] = [
  { slug: 'stills', name: 'Photos', price: 'Starting at $180', summary: blurbOf('stills') },
  { slug: 'video', name: 'Video', price: 'Starting at $180', summary: blurbOf('video') },
  { slug: 'aerial', name: 'Drone only', price: 'Starting at $125', summary: blurbOf('aerial') },
];

export type AddOn = { name: string; price: string; note: string };

export const addOns: AddOn[] = [
  { name: 'Drone add-on', price: '$35', note: 'Added to a photo or video booking' },
  {
    name: 'Virtual twilight',
    price: TWILIGHT_ADDON_PRICE,
    note: 'Converted in post, delivered with the gallery',
  },
];
