# Office Provisionz site

Production-grade, mobile-first business site built with **Astro + Tailwind + TypeScript**.

## Quick start

### Node + package manager (recommended)

This repo is standardized on **Node 22 LTS**.

- Windows: use **Volta** (supports multiple Node versions side-by-side)
- WSL/Linux/macOS: use **nvm**

The repo includes:

- `.nvmrc` (Node version)
- `package.json#volta` (Windows pin)
- `.npmrc` with `engine-strict=true` (fail fast if Node is wrong)

1. Install dependencies

- Preferred: pnpm
  - `corepack enable`
  - `pnpm install`

1. Run the dev server

- `pnpm dev`

1. Build static output

- `pnpm build`
- `pnpm preview`

## Key goals

- **Static output first** (deploy anywhere, including GitHub Pages)
- **Base-path aware** (works at `/` locally and `/<repo>/` on Pages)
- **Editable content** in `src/data/siteConfig.ts`
- **SEO + accessibility baseline** (robots, skip link, focus styles, accessible FAQ + optional sitemap)

## Images + gallery

This project is static-host friendly and supports a simple gallery with a built-in lightbox.

- Gallery images live in: `public/gallery/`
- Gallery data lives in: `src/data/gallery.ts`

To replace the placeholder images:

1. Add your real images to `public/gallery/` (recommended: `.webp`, also `.jpg`/`.png` work).
2. Update the `src` fields in `src/data/gallery.ts` to match filenames.
3. Keep filenames lowercase and avoid spaces (helps with URLs).

Tips:

- Use **WebP** for smaller file sizes.
- Aim for ~1600px wide for portfolio photos.
- If you change the folder name, update the paths in `src/data/gallery.ts`.

## Configuration (env)

Copy `.env.example` to `.env` and adjust as needed.

- `PUBLIC_SITE_BASE` (default `/`) — set to `/<repo>/` for GitHub Pages builds
- `SITE_URL` (recommended) — full canonical URL including base, e.g. `https://<owner>.github.io/<repo>/`
- `PUBLIC_FORM_ENDPOINT` — static form endpoint (Formspree/Basin/etc.)

### Sitemap notes

This project includes `@astrojs/sitemap`, but it is **only enabled when `SITE_URL` is set**.

- Prevents generating a sitemap with the wrong hostname during local builds.
- The GitHub Pages workflow sets `SITE_URL` automatically.

## Deployment

- GitHub Pages: see the **Deploy to GitHub Pages** section below.
- Azure Static Web Apps: see **Deploy to Azure Static Web Apps**.

---

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy-pages.yml`.

1. Push to GitHub.
2. In GitHub: **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. The workflow will build with the correct base path automatically.

### Troubleshooting base path

If your site assets 404 on Pages, it’s almost always the base path.

- Ensure `PUBLIC_SITE_BASE` is set to `/<repo>/` during the Pages build.
- Ensure `SITE_URL` includes the repo subpath too.

## Deploy to Azure Static Web Apps

Azure SWA works great with this project because the build output is plain static files (`dist/`).

Best practice: initialize SWA config using the SWA CLI instead of hand-authoring JSON.

- Install: `npm install -g @azure/static-web-apps-cli`
- Initialize: `npx swa init --yes`

When prompted:

- **app location**: `/`
- **output location**: `dist`
- **build command**: `pnpm build`

> Note: this repo is GitHub Pages-first. For SWA, you typically keep base `/` (no repo subpath).

## Editing content

All business content lives in:

- `src/data/siteConfig.ts`

Update phone, hours, service areas, quotes, FAQs, testimonials, etc. there.

## Scripts

- `pnpm dev` — local dev
- `pnpm build` — static production build
- `pnpm preview` — preview the build
- `pnpm lint` — ESLint
- `pnpm format` — Prettier check
- `pnpm typecheck` — `astro check`
