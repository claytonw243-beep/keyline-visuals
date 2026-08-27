import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// CONTENT-TODO #1 — replace this with your real domain, e.g. 'https://keylinevisuals.com'.
// It must match public/CNAME (without the protocol) and the Sitemap line in
// public/robots.txt. Astro needs a parseable URL here, so the placeholder is a
// valid hostname rather than [DOMAIN] — search the repo for "your-domain-goes-here".
const SITE = process.env.SITE_URL ?? 'https://your-domain-goes-here.example.com';

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
