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

  // Each slot maps to a specific theme so the site feels intentionally curated.
  // You can tweak these queries anytime and re-run `pnpm gallery:fetch`.
  const slots = [
    {
      id: '01',
      query: 'clean modern office lobby',
      label: 'Clean office / reception',
    },
    {
      id: '02',
      query: 'janitor cart office cleaning',
      label: 'Janitorial / tools in use',
    },
    {
      id: '03',
      query: 'restocking paper towels soap dispenser',
      label: 'Restocking / paper goods',
    },
    {
      id: '04',
      query: 'cleaning conference room table disinfecting',
      label: 'Detail cleaning / disinfecting',
    },
    {
      id: '05',
      query: 'mopping office floor cleaning',
      label: 'Floors / high-traffic lanes',
    },
    {
      id: '06',
      query: 'cleaning supplies shelves inventory',
      label: 'Supplies / inventory',
    },
  ];

  const seenPhotographers = new Set();
  const attributions = [];

  const pickBestForSlot = async ({ query }) => {
    // Try a couple pages to get variety, but keep it fast.
    const pools = [];
    for (const page of [1, 2]) {
      const data = await searchPexels({ apiKey, query, perPage: 30, page });
      pools.push(...(data?.photos ?? []));
      if (pools.length >= 40) break;
    }

    const unique = uniqBy(pools, (p) => String(p?.id));
    const withSrc = unique.filter((p) => p?.src?.original || p?.src?.large2x || p?.src?.large);

    // Prefer a unique photographer per slot to avoid a “single shoot” feel.
    for (const p of withSrc) {
      const name = (p?.photographer ?? '').trim();
      if (!name) continue;
      if (seenPhotographers.has(name)) continue;
      return p;
    }

    return withSrc[0];
  };

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const p = await pickBestForSlot(slot);
    if (!p) throw new Error(`No photos returned from Pexels for query: ${slot.query}`);

    const photographerName = (p?.photographer ?? '').trim();
    if (photographerName) seenPhotographers.add(photographerName);

    const n = slot.id;

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
        `Slot: ${slot.label}`,
        `Query: ${slot.query}`,
        `Pexels photo by ${photographer}`,
        photographerUrl ? `Photographer: ${photographerUrl}` : '',
        photoUrl ? `Photo: ${photoUrl}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );

    // Friendly progress line.
    process.stdout.write(`Downloaded ${i + 1}/${slots.length}: gallery/${n}.jpg\n`);
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
