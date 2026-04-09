import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

function normalizeBase(input: string | undefined): string {
  const raw = (input ?? '/').trim();
  if (raw === '' || raw === '/') return '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

function inferGithubPagesBase(): string {
  // When building on GitHub Actions for a *project* Pages site, the site is typically served from
  // `https://<owner>.github.io/<repo>/`.
  // If PUBLIC_SITE_BASE isn't set (common when users deploy from branch settings or ad-hoc builds),
  // infer the base from GITHUB_REPOSITORY to avoid broken /_astro/* asset URLs.
  const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
  if (!repo) return '/';
  return `/${repo}/`;
}

const base = normalizeBase(
  process.env.PUBLIC_SITE_BASE ??
    (process.env.GITHUB_ACTIONS === 'true' ? inferGithubPagesBase() : undefined)
);

const plausibleScriptOrigin = (() => {
  const src = process.env.PUBLIC_PLAUSIBLE_SRC?.trim();
  if (!src) return undefined;
  try {
    return new URL(src).origin;
  } catch {
    return undefined;
  }
})();

const scriptSrcOrigins = [`'self'`, `'unsafe-inline'`, ...(plausibleScriptOrigin ? [plausibleScriptOrigin] : [])];
const connectSrcOrigins = [
  `'self'`,
  'https://formspree.io',
  'https://*.ingest.sentry.io',
  ...(plausibleScriptOrigin ? [plausibleScriptOrigin] : []),
];

// Recommendation: set SITE_URL to your full canonical URL *including* the base.
// Example (GitHub Pages): https://<owner>.github.io/<repo>/
const site = process.env.SITE_URL;

const integrations = [
  react(),
  partytown({
    // Adds dataLayer.push as a forwarded-event.
    config: {
      forward: ['plausible', 'damraTrack', 'dataLayer.push'],
    },
  }),
  icon(),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [tailwindcss() as any],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      // Improve chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
    },
  },
  // Security headers (works with Cloudflare Pages, Netlify, Vercel)
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Baseline modern hardening headers.
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'X-Permitted-Cross-Domain-Policies': 'none',
      // Keep local dev behavior closer to hosts that honor `public/_headers`.
      // (GitHub Pages ignores custom headers; see README.)
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'X-DNS-Prefetch-Control': 'on',

      // Content Security Policy
      // Astro uses inline scripts for island hydration and our own inline scripts.
      // We keep a tight baseline while allowing required inline script/style.
      // Tighten later with nonces/hashes.
      'Content-Security-Policy':
        "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; " +
        "form-action 'self' https://formspree.io; " +
        `script-src ${scriptSrcOrigins.join(' ')}; ` +
        "style-src 'self' 'unsafe-inline'; " +
        "font-src 'self' data:; " +
        "img-src 'self' data: https:; " +
        "media-src 'self' https:; " +
        `connect-src ${connectSrcOrigins.join(' ')}; ` +
        'upgrade-insecure-requests',
    },
  },
  integrations,
  // Prefetch links on hover for faster navigation
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  // Type-safe environment variables
  env: {
    schema: {
      // Optional external form provider endpoint (Formspree/Basin/etc.).
      // If unset, the site falls back to the built-in Pages Function (/api/contact) when available.
      PUBLIC_FORM_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_PLAUSIBLE_DOMAIN: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_PLAUSIBLE_SRC: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_ENABLE_ANALYTICS: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_ENABLE_SERVICE_WORKER: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_SENTRY_DSN: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
  // Compress HTML output
  compressHTML: true,
});
