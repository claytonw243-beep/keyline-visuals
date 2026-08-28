import {
  TURNAROUND,
  TURNAROUND_STAMP,
  EXTRAS_TURNAROUND_STAMP,
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
    stamp: ['4K / 60', EXTRAS_TURNAROUND_STAMP],
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
    eyebrow: 'Blue hour',
    name: 'Twilight photos',
    blurb:
      'The shot that goes at the top of the listing. Twenty-minute window after sunset, every light on inside, sky still holding color.',
    stamp: [`+${TWILIGHT_ADDON_PRICE} PER LISTING`, '6–8 FRAMES'],
    size: 'compact',
    ratio: [4, 3],
    detail: [
      'There is a window of roughly twenty minutes after the sun goes down where the sky is deep blue and the windows read warm. Before it, the sky is washed out. After it, the sky is black and the house looks like a security photo.',
      'It takes preparation on your side: every interior light on, every blind open, cars off the driveway, and the porch lights working. We send a one-page checklist when a twilight is on the order.',
      'Weather kills more twilights than anything else. If the sky is flat gray, we will tell you before driving out and reschedule instead of shooting something you would not post.',
    ],
    includes: [
      'Front elevation at blue hour',
      'Rear or pool elevation where it applies',
      'Window and lawn lighting balanced by hand',
      'Free reschedule on an overcast evening',
    ],
  },
  {
    slug: 'floor-plans',
    eyebrow: 'Measured',
    name: 'Floor plans',
    blurb:
      'Measured on site, drawn to scale, with room dimensions and total square footage under each level.',
    stamp: [EXTRAS_TURNAROUND_STAMP, 'PDF + PNG'],
    size: 'compact',
    ratio: [4, 3],
    detail: [
      'Buyers scroll a gallery and still cannot tell how the rooms connect. A floor plan answers that in one image, and listings that carry one get fewer wasted showings.',
      'We laser-measure on site while we are already there shooting, so it does not add a second appointment. Room labels and dimensions are included, and a black-on-white and a white-on-dark version both come in the folder.',
      'These are marketing floor plans, drawn from our own measurements. They are not an appraisal and not a survey — if your MLS requires a certified square footage figure, use the county or an appraiser for that number.',
    ],
    includes: [
      'Laser-measured on shoot day',
      'Room labels and dimensions',
      'Per-level and total square footage',
      'Light and dark versions, PDF and PNG',
    ],
  },
  {
    slug: 'virtual-staging',
    eyebrow: 'Digital',
    name: 'Virtual staging',
    blurb:
      'Empty rooms furnished digitally. Photorealistic, always disclosed, and a fraction of what real staging costs.',
    stamp: [EXTRAS_TURNAROUND_STAMP, 'PER IMAGE'],
    size: 'compact',
    ratio: [4, 3],
    detail: [
      'An empty living room reads smaller than it is and buyers cannot place their own furniture in it. Staging it digitally fixes that for a fraction of the cost of trucking in real furniture for a listing that may sell in a week.',
      'You pick the direction — transitional, traditional, or something closer to what sells in that neighborhood — and we furnish the room to match the scale of the space rather than filling it.',
      'Every staged image is delivered with a "virtually staged" label baked into the corner, and we recommend keeping the empty original in the gallery next to it. Most MLS rules require the disclosure, and buyers trust the listing more when both are there.',
    ],
    includes: [
      'Photorealistic furniture at true scale',
      'Style chosen per room',
      'Disclosure label on every staged file',
      'Empty original delivered alongside',
    ],
  },
  {
    slug: 'listing-websites',
    eyebrow: 'Delivery',
    name: 'Listing websites',
    blurb:
      'A single-property page carrying your branding and the full gallery, on its own address you can paste into the remarks.',
    stamp: ['SAME WEEK', 'CUSTOM URL'],
    size: 'compact',
    ratio: [4, 3],
    detail: [
      'One page, one property, your name and headshot on it. The gallery, the video, the floor plan, and a contact form that emails you directly, all at an address short enough to read out loud at an open house.',
      'It gives you somewhere to send a buyer that is not a portal covered in three other agents advertising against your listing.',
      'The page stays live through the listing and for thirty days after closing, and you can hand it to the seller as part of your listing presentation for the next one.',
    ],
    includes: [
      'Custom short URL',
      'Your branding, photo, and contact form',
      'Full gallery, video, and floor plan',
      'Live through closing plus 30 days',
    ],
  },
];
