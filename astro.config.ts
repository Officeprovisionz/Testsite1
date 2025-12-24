import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

function normalizeBase(input: string | undefined): string {
  const raw = (input ?? '/').trim();
  if (raw === '' || raw === '/') return '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

const base = normalizeBase(process.env.PUBLIC_SITE_BASE);

// Recommendation: set SITE_URL to your full canonical URL *including* the base.
// Example (GitHub Pages): https://<owner>.github.io/<repo>/
const site = process.env.SITE_URL;

const integrations = [
  tailwind({ applyBaseStyles: false }),
  react(),
  // Only generate sitemap when a canonical site URL is configured.
  // This avoids build warnings and prevents producing a sitemap with an incorrect hostname.
  ...(site ? [sitemap({})] : []),
];

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  base,
  ...(site ? { site } : {}),
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  integrations,
});
