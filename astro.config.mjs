import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The live domain. Apex, not www. Must stay in step with public/CNAME (same
// value, no protocol) and the Sitemap line in public/robots.txt.
// Everything else derives from it: canonical URLs, og:url, og:image,
// twitter:image, the JSON-LD @id/url/image, and the sitemap.
// SITE_URL overrides it for a preview build without touching the file.
const SITE = process.env.SITE_URL ?? 'https://keylinevisuals.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  // Routes and sitemap both end in a slash. Do not change one without the other.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  image: {
    // AVIF first, WebP fallback. Applied by <Picture> in src/components/Frame.astro
    responsiveStyles: true,
  },
  vite: {
    build: { cssCodeSplit: false },
  },
});
