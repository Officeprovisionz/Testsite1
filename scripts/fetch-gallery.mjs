import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'gallery');
const ATTRIBUTION_PATH = path.join(OUT_DIR, 'ATTRIBUTION.txt');

function parseDotEnv(contents) {
  const out = {};
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function loadEnvFileIfPresent(filePath) {
  try {
    const contents = await fs.readFile(filePath, 'utf8');
    const parsed = parseDotEnv(contents);
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof process.env[k] === 'undefined') process.env[k] = v;
    }
  } catch {
    // ignore
  }
}

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function downloadBuffer(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Download failed ${res.status} ${res.statusText} (${url})`);
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}

function uniqBy(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

async function searchPexels({ apiKey, query, perPage = 30, page = 1 }) {
  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('size', 'large');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));

  return fetchJson(url.toString(), {
    headers: {
      Authorization: apiKey,
    },
  });
}

async function main() {
  await loadEnvFileIfPresent(path.join(ROOT, '.env'));

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing PEXELS_API_KEY. Add it to .env (see .env.example) and re-run this script.'
    );
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  const wanted = 6;
  const queries = [
    'commercial cleaning office',
    'janitorial cleaning office',
    'office cleaner workspace',
    'clean office lobby',
  ];

  let photos = [];
  for (const q of queries) {
    // Grab a decent pool per query and dedupe.
    const data = await searchPexels({ apiKey, query: q, perPage: 24, page: 1 });
    photos = uniqBy([...photos, ...(data?.photos ?? [])], (p) => String(p?.id));
    if (photos.length >= wanted * 2) break;
  }

  if (photos.length < wanted) {
    throw new Error(
      `Not enough photos returned from Pexels (got ${photos.length}, need ${wanted}).`
    );
  }

  // Pick the first N unique photographers to avoid a "same shoot" look.
  const picked = [];
  const seenPhotographers = new Set();
  for (const p of photos) {
    const name = (p?.photographer ?? '').trim();
    if (!name) continue;
    if (seenPhotographers.has(name)) continue;
    seenPhotographers.add(name);
    picked.push(p);
    if (picked.length >= wanted) break;
  }

  if (picked.length < wanted) {
    // Fall back to first N.
    picked.length = 0;
    picked.push(...photos.slice(0, wanted));
  }

  const attributions = [];

  for (let i = 0; i < picked.length; i++) {
    const p = picked[i];
    const n = String(i + 1).padStart(2, '0');

    const srcUrl = p?.src?.original || p?.src?.large2x || p?.src?.large;
    if (!srcUrl) throw new Error(`Missing photo src for Pexels id=${p?.id}`);

    const buf = await downloadBuffer(srcUrl);

    const outPath = path.join(OUT_DIR, `${n}.jpg`);

    // Downscale to 4K max-width to keep files reasonable but still high-res.
    const image = sharp(buf).rotate();
    const meta = await image.metadata();

    const pipeline = meta.width && meta.width > 3840 ? image.resize({ width: 3840 }) : image;

    await pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(outPath);

    const photographer = p?.photographer ?? 'Unknown';
    const photographerUrl = p?.photographer_url ?? '';
    const photoUrl = p?.url ?? '';

    attributions.push(
      [
        `gallery/${n}.jpg`,
        `Pexels photo by ${photographer}`,
        photographerUrl ? `Photographer: ${photographerUrl}` : '',
        photoUrl ? `Photo: ${photoUrl}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );

    // Friendly progress line.
    process.stdout.write(`Downloaded ${n}/${wanted}: gallery/${n}.jpg\n`);
  }

  const header =
    'Gallery photos downloaded from Pexels (https://www.pexels.com).\n' +
    'Keep this file for attribution/reference and license tracking.\n\n';

  await fs.writeFile(ATTRIBUTION_PATH, header + attributions.join('\n\n') + '\n', 'utf8');
  process.stdout.write(`Wrote attribution: public/gallery/ATTRIBUTION.txt\n`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
