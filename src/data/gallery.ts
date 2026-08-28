export type Shot = {
  id: string;
  file: string;
  filter: 'interiors' | 'exteriors' | 'aerial' | 'twilight' | 'video';
  propertyType: string;
  area: string;
  meta: string;
  orientation: 'portrait' | 'landscape';
  caption: string;
};

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'interiors', label: 'Interiors' },
  { key: 'exteriors', label: 'Exteriors' },
  { key: 'aerial', label: 'Aerial' },
  { key: 'twilight', label: 'Twilight' },
  { key: 'video', label: 'Video' },
] as const;

/* CONTENT-TODO: swap each `file` for a real photograph.
   Recommended dimensions are listed in CONTENT-TODO.md. */
export const gallery: Shot[] = [
  {
    id: 'g01',
    file: '/placeholders/work-01-twilight-front.svg',
    filter: 'twilight',
    propertyType: 'New construction',
    area: 'Grand Oaks',
    meta: '38 IMAGES',
    orientation: 'landscape',
    caption: 'Front elevation with the windows lit and the sky deep blue.',
  },
  {
    id: 'g02',
    file: '/placeholders/work-02-interior-kitchen.svg',
    filter: 'interiors',
    propertyType: 'Single family',
    area: 'Oxford Commons',
    meta: '42 IMAGES',
    orientation: 'portrait',
    caption: 'Kitchen with the view out the window still visible.',
  },
  {
    id: 'g03',
    file: '/placeholders/work-03-aerial-lot.svg',
    filter: 'aerial',
    propertyType: 'Acreage',
    area: 'Lafayette County',
    meta: '11 FRAMES',
    orientation: 'landscape',
    caption: 'Lot boundary and treeline, flown under Part 107.',
  },
  {
    id: 'g04',
    file: '/placeholders/work-04-interior-living.svg',
    filter: 'interiors',
    propertyType: 'Townhome',
    area: 'Old Taylor Road',
    meta: '31 IMAGES',
    orientation: 'landscape',
    caption: 'Living room at the height a buyer actually sees it from.',
  },
  {
    id: 'g05',
    file: '/placeholders/work-05-exterior-front.svg',
    filter: 'exteriors',
    propertyType: 'Historic',
    area: 'North Lamar',
    meta: '36 IMAGES',
    orientation: 'portrait',
    caption: 'Straightened verticals on a facade that leans in every phone photo.',
  },
  {
    id: 'g06',
    file: '/placeholders/work-06-video-walkthrough.svg',
    filter: 'video',
    propertyType: 'Single family',
    area: 'Country Club Road',
    meta: '4K / 60 · 1:34',
    orientation: 'landscape',
    caption: 'Ninety-second walkthrough, one continuous path through the house.',
  },
  {
    id: 'g07',
    file: '/placeholders/work-07-twilight-rear.svg',
    filter: 'twilight',
    propertyType: 'Lakefront',
    area: 'Sardis Lake',
    meta: '8 FRAMES',
    orientation: 'landscape',
    caption: 'Rear elevation and dock, house lit against a deep blue sky.',
  },
  {
    id: 'g08',
    file: '/placeholders/work-08-interior-bath.svg',
    filter: 'interiors',
    propertyType: 'New construction',
    area: 'The Links',
    meta: '45 IMAGES',
    orientation: 'portrait',
    caption: 'Primary bath, mirrors worked around rather than shot into.',
  },
  {
    id: 'g09',
    file: '/placeholders/work-09-aerial-neighborhood.svg',
    filter: 'aerial',
    propertyType: 'Short-term rental',
    area: 'Ole Miss campus area',
    meta: '9 FRAMES',
    orientation: 'landscape',
    caption: 'Walking distance to the Square, shown instead of claimed.',
  },
  {
    id: 'g10',
    file: '/placeholders/work-10-exterior-rear.svg',
    filter: 'exteriors',
    propertyType: 'Single family',
    area: 'Taylor',
    meta: '33 IMAGES',
    orientation: 'landscape',
    caption: 'Back yard and porch from the rear of the lot.',
  },
  {
    id: 'g11',
    file: '/placeholders/work-11-interior-primary.svg',
    filter: 'interiors',
    propertyType: 'Builder spec',
    area: 'Water Valley',
    meta: '29 IMAGES',
    orientation: 'portrait',
    caption: 'Primary bedroom in an unfurnished spec.',
  },
  {
    id: 'g12',
    file: '/placeholders/work-12-video-vertical.svg',
    filter: 'video',
    propertyType: 'Condo',
    area: 'Tupelo',
    meta: '9:16 · 0:48',
    orientation: 'portrait',
    caption: 'Vertical cut, delivered with the horizontal for Reels.',
  },
];
