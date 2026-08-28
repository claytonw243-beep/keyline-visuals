import type { ImageMetadata } from 'astro';

/* Real photographs live in src/assets/gallery/ and go through astro:assets.
   Full-resolution originals stay in masters/, which is gitignored.

   To add a photo: export it to src/assets/gallery/ at 1600px on the long edge,
   then add an entry below. Order here is display order.

   An entry whose file is missing is dropped with a build warning rather than
   crashing, so a partial set works and a typo is survivable. */

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/*.{jpg,jpeg,png,avif,webp}',
  { eager: true }
);

/** Declared once. The filter row is derived from this, so there is no second
    list to keep in sync. */
export const CATEGORIES = {
  interiors: 'Interiors',
  exteriors: 'Exteriors',
  aerial: 'Aerial',
  twilight: 'Twilight',
  video: 'Video',
} as const;

export type Category = keyof typeof CATEGORIES;

type Entry = {
  /** Filename inside src/assets/gallery/ */
  file: string;
  filter: Category;
  /** Used as the alt text and the lightbox caption. Describe what is in the
      frame — not when or how it was shot. */
  caption: string;
  /* CONTENT-TODO: the three below are optional and currently unset. They are
     facts about the listing that only the owner knows. The hover overlay shows
     whichever are present and renders nothing when none are. */
  propertyType?: string;
  area?: string;
  meta?: string;
};

const entries: Entry[] = [
  {
    file: '01-front-elevation.jpg',
    filter: 'exteriors',
    caption: 'Front elevation with the drive curving in past mature oaks.',
  },
  {
    file: '02-sitting-room.jpg',
    filter: 'interiors',
    caption: 'Sitting room in charcoal, with the pocket door open through to the dining area.',
  },
  {
    file: '03-lot-aerial.jpg',
    filter: 'aerial',
    caption: 'Overhead frame with the lot boundary drawn on.',
  },
  {
    file: '04-dining-area.jpg',
    filter: 'interiors',
    caption: 'Dining area with the hall and staircase beyond.',
  },
  {
    file: '05-front-porch.jpg',
    filter: 'exteriors',
    caption: 'Covered porch running the front of the house, with the entry door centred.',
  },
  {
    file: '06-study.jpg',
    filter: 'interiors',
    caption: 'Study with charcoal built-ins and a butcher-block desk run.',
  },
];

export type Shot = Omit<Entry, 'file'> & {
  image: ImageMetadata;
  orientation: 'portrait' | 'landscape';
};

export const gallery: Shot[] = entries.flatMap((entry) => {
  const mod = files[`../assets/gallery/${entry.file}`];
  if (!mod) {
    console.warn(`[gallery] "${entry.file}" is not in src/assets/gallery/ — entry skipped.`);
    return [];
  }
  const image = mod.default;
  return [
    {
      ...entry,
      image,
      orientation: image.width >= image.height ? ('landscape' as const) : ('portrait' as const),
    },
  ];
});

/** Only categories that actually have a photo. Prevents a filter button that
    always resolves to an empty grid. */
const present = new Set(gallery.map((shot) => shot.filter));

export const filters = [
  { key: 'all' as const, label: 'All' },
  ...(Object.keys(CATEGORIES) as Category[])
    .filter((key) => present.has(key))
    .map((key) => ({ key, label: CATEGORIES[key] })),
];
