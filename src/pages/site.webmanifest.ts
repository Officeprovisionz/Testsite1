// Generated at build time.
// Why: static `public/site.webmanifest` can't adapt `start_url` or `scope` for subpath deploys.
// This ensures PWA installation works correctly on GitHub Pages /<repo>/ paths.

import { siteConfig } from '@/data/siteConfig';

export async function GET() {
  const base = import.meta.env.BASE_URL || '/';

  const manifest = {
    name: siteConfig.brand.name,
    // PWA short_name should be ≤12 chars for optimal display on home screens.
    short_name: 'OfficeProv',
    description: siteConfig.brand.tagline,
    start_url: base,
    scope: base,
    display: 'standalone',
    background_color: '#ffffff',
    // Teal-500 from the design system
    theme_color: '#00B4A6',
    icons: [
      {
        src: `${base}favicon.svg`,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
