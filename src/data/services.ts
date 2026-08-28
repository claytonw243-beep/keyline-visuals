import {
  TURNAROUND,
  TURNAROUND_STAMP,
  VIDEO_TURNAROUND_STAMP,
  TWILIGHT_ADDON_PRICE,
} from './site';

export type Service = {
  slug: string;
  eyebrow: string;
  name: string;
  blurb: string;
  stamp: string[];
  size: 'large' | 'compact';
  image?: string;
  ratio?: [number, number];
  detail: string[];
  includes: string[];
};

export const services: Service[] = [
  {
    slug: 'stills',
    eyebrow: 'Photography',
    name: 'Interior & exterior stills',
    blurb:
      'Every room a buyer cares about, plus the front, back, and street view.',
    stamp: [TURNAROUND_STAMP, '30–45 IMAGES'],
    size: 'large',
    image: '/placeholders/service-stills.svg',
    ratio: [16, 10],
    detail: [
      'This is the base of every package. Rooms come back looking like the room: windows still show what\'s outside instead of blowing out to a white rectangle, and a beige wall stays beige instead of going green under the recessed lights.',
      'We shoot wide enough to show the space without stretching it. Ultra-wide photos make a bedroom look like a hotel lobby, and the buyer notices the second they walk in. A room that photographs honestly brings people to the showing already expecting what they find.',
      `Files land in a gallery link within ${TURNAROUND}. Web-sized JPEGs are sized for MLS upload limits, and full-resolution copies are in the same folder for print and flyers.`,
    ],
    includes: [
      'Vertical and horizontal of the front elevation',
      'MLS-sized and full-resolution files',
      'Straightened verticals and color correction',
    ],
  },
  {
    slug: 'video',
    eyebrow: 'Motion',
    name: 'Walkthrough video',
    blurb:
      'A steady walk through the house the way a buyer moves through it, cut to about ninety seconds. Vertical version included for Reels.',
    stamp: ['4K / 60', VIDEO_TURNAROUND_STAMP],
    size: 'large',
    image: '/placeholders/service-video.svg',
    ratio: [16, 10],
    detail: [
      'Gimbal-stabilized, shot in a single logical path: approach, entry, main living area, kitchen, primary suite, then out to the yard. No spinning, no whip transitions, no drone shot dropped into the middle of a hallway.',
      'You get a horizontal 16:9 cut for the listing page and YouTube, plus a vertical 9:16 cut trimmed to under sixty seconds for Instagram and TikTok. Both are licensed music, cleared for commercial use.',
      'If you want a talking intro, we can shoot you on the front walk at the start of the video. Bring what you want to say — it works better than reading a script off a phone.',
    ],
    includes: [
      '60–120 second horizontal cut',
      'Vertical cut for Reels and TikTok',
      'Licensed music, commercially cleared',
      'Optional agent intro on camera',
    ],
  },
  {
    slug: 'aerial',
    eyebrow: 'Aerial',
    name: 'Aerial photo & video',
    blurb:
      'Roof, lot lines, and whatever is behind the treeline. Part 107 licensed, so it is legal on a paid listing.',
    stamp: ['FAA PART 107', '8–12 FRAMES'],
    size: 'compact',
    ratio: [4, 3],
    detail: [
      'Aerial sells acreage, waterfront, and anything where the lot is the story. It also answers the question every buyer asks about a house near a highway or a neighbor, which is what is actually next door.',
      'We fly under an FAA Part 107 remote pilot certificate. That matters on a paid listing. An uncertified pilot is flying illegally, and the brokerage is the one that hears about it.',
      'Class G airspace around Oxford is straightforward. Tupelo sits under controlled airspace and needs a LAANC authorization.',
    ],
    includes: [
      'Front and rear elevations from altitude',
      'Lot boundary and approach frames',
      '4K aerial clips folded into the video cut',
      'LAANC authorization where required',
    ],
  },
  {
    slug: 'twilight',
    eyebrow: 'Post-production',
    name: 'Virtual twilight',
    blurb:
      'A daytime exterior converted to a twilight look in editing. The shot that goes at the top of the listing, without a second visit.',
    stamp: [`+${TWILIGHT_ADDON_PRICE} PER LISTING`, 'DONE IN POST'],
    size: 'compact',
    ratio: [4, 3],
    detail: [
      'Twilight is the frame agents want at the top of a listing — deep blue sky, windows reading warm. Getting it in camera means a second trip at dusk and a narrow window to work in.',
      'We do it in editing instead. You pick a daytime exterior from the gallery, and we convert it: sky replaced, windows and landscape lighting brought up, the house left alone.',
      `It is ${TWILIGHT_ADDON_PRICE} per listing and comes back with the rest of the gallery, so nothing waits on the weather or a second appointment.`,
    ],
    includes: [
      'Front elevation converted from a daytime frame',
      'Sky, window, and landscape lighting balanced',
      'Delivered with the rest of the gallery',
      `${TWILIGHT_ADDON_PRICE} per listing, no second visit`,
    ],
  },
];
