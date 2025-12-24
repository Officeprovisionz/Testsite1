import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
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
  integrations: [tailwind({ applyBaseStyles: false }), sitemap({})],
});
