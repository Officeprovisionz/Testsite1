import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Generate responsive JPEG + modern (WebP/AVIF) variants for images in public/gallery.
 *
 * Output naming matches src/lib/publicImages.ts:
 *   <stem>-<width>.jpg/.jpeg
 *   <stem>-<width>.webp
 *   <stem>-<width>.avif
 */

const WIDTHS = [640, 768, 960, 1280, 1600, 1920];

// Keep Sharp memory usage conservative (especially on Windows).
// This script should be safe to run on developer machines.
sharp.cache({ memory: 128, files: 0, items: 256 });
sharp.concurrency(1);

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'public', 'gallery');

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const isJpeg = (name) => /\.jpe?g$/i.test(name);
const isSizeVariant = (name) => /-\d+\.jpe?g$/i.test(name);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }

  return out;
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

// Keep concurrency conservative; Sharp can use significant memory on large batches.
const mapLimit = async (items, limit, fn) => {
  const pending = new Set();

  const runOne = async (item) => {
    const p = (async () => fn(item))();
    pending.add(p);
    try {
      return await p;
    } finally {
      pending.delete(p);
    }
  };

  const results = [];
  for (const item of items) {
    while (pending.size >= limit) {
      await Promise.race(pending);
    }
    results.push(runOne(item));
  }

  return Promise.all(results);
};

const main = async () => {
  if (!(await exists(INPUT_DIR))) {
    console.error(`[images] Directory not found: ${INPUT_DIR}`);
    process.exitCode = 1;
    return;
  }

  const files = (await walk(INPUT_DIR)).filter((p) => isJpeg(p));

  // Treat only "base" images as sources (ignore already-sized variants).
  const sources = files.filter((p) => !isSizeVariant(path.basename(p)));

  console.log(`[images] Found ${sources.length} base JPEGs in ${INPUT_DIR}`);

  let created = 0;
  let skipped = 0;
  let failed = 0;
  let softFailed = 0;

  await mapLimit(sources, 2, async (inPath) => {
    const relFromGallery = path.relative(INPUT_DIR, inPath);
    const dir = path.dirname(inPath);
    const baseName = path.basename(inPath);
    const ext = baseName.toLowerCase().endsWith('.jpeg') ? '.jpeg' : '.jpg';
    const stem = baseName.replace(/\.jpe?g$/i, '');

    for (const w of WIDTHS) {
      const outJpg = path.join(dir, `${stem}-${w}${ext}`);
      const outWebp = path.join(dir, `${stem}-${w}.webp`);
      const outAvif = path.join(dir, `${stem}-${w}.avif`);

      await ensureDir(dir);

      const needJpg = !(await exists(outJpg));
      const needWebp = !(await exists(outWebp));
      const needAvif = !(await exists(outAvif));

      if (!needJpg && !needWebp && !needAvif) {
        skipped += 3;
        continue;
      }

      try {
        const base = sharp(inPath, { failOn: 'none' })
          .rotate()
          .resize({ width: w, withoutEnlargement: true });

        // JPEG (used as fallback + for srcset)
        if (needJpg) {
          await base.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(outJpg);
          created += 1;
        } else {
          skipped += 1;
        }

        // WebP
        if (needWebp) {
          try {
            await base.clone().webp({ quality: 80 }).toFile(outWebp);
            created += 1;
          } catch (err) {
            softFailed += 1;
            console.warn(`[images] WebP failed: ${relFromGallery} @ ${w}w`, err);
          }
        } else {
          skipped += 1;
        }

        // AVIF (very high savings on photo content)
        if (needAvif) {
          try {
            // Lower effort reduces memory/CPU spikes while still providing large savings.
            await base.clone().avif({ quality: 45, effort: 2 }).toFile(outAvif);
            created += 1;
          } catch (err) {
            softFailed += 1;
            console.warn(`[images] AVIF failed: ${relFromGallery} @ ${w}w`, err);
          }
        } else {
          skipped += 1;
        }
      } catch (err) {
        failed += 1;
        console.warn(`[images] Failed: ${relFromGallery} @ ${w}w`, err);
      }
    }
  });

  console.log(
    `[images] Done. Created: ${created}, skipped: ${skipped}, failures: ${failed}, soft failures: ${softFailed}`
  );
  if (failed) process.exitCode = 1;
};

await main();
