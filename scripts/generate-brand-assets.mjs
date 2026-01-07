import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Generate brand/social images from SVG sources using Sharp.
 *
 * - public/og-image.svg  -> public/og-image.png (1200x630)
 * - public/brand/logo-mark.svg -> public/brand/logo.png (512x512)
 */

const ROOT = process.cwd();

const OG_SVG = path.join(ROOT, 'public', 'og-image.svg');
const OG_PNG = path.join(ROOT, 'public', 'og-image.png');

const LOGO_SVG = path.join(ROOT, 'public', 'brand', 'logo-mark.svg');
const LOGO_PNG = path.join(ROOT, 'public', 'brand', 'logo.png');

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  let failed = false;

  if (await exists(OG_SVG)) {
    // Higher density improves rasterization quality.
    await sharp(OG_SVG, { density: 300 })
      .resize(1200, 630, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(OG_PNG);
    console.log(`[brand] Wrote ${path.relative(ROOT, OG_PNG)}`);
  } else {
    console.warn(`[brand] Missing ${path.relative(ROOT, OG_SVG)} (skipping OG PNG)`);
    failed = true;
  }

  if (await exists(LOGO_SVG)) {
    await sharp(LOGO_SVG, { density: 400 })
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(LOGO_PNG);
    console.log(`[brand] Wrote ${path.relative(ROOT, LOGO_PNG)}`);
  } else {
    console.warn(`[brand] Missing ${path.relative(ROOT, LOGO_SVG)} (skipping logo PNG)`);
    failed = true;
  }

  if (failed) process.exitCode = 1;
};

await main();
