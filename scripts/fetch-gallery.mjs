import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'gallery');
const OUT_SERVICES_DIR = path.join(OUT_DIR, 'services');
const ATTRIBUTION_PATH = path.join(OUT_DIR, 'ATTRIBUTION.txt');

const RESPONSIVE_WIDTHS = [640, 960, 1280, 1600, 1920, 2560, 3840];

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

function normalizePhotoText(p) {
  return [p?.alt, p?.url, p?.photographer].filter(Boolean).join(' ').toLowerCase();
}

function isRejectedPhoto(p) {
  const text = normalizePhotoText(p);

  // Avoid “PPE / hazmat / COVID-era disinfecting” vibes.
  const banned = [
    'personal protective equipment',
    'protective equipment',
    'protective suit',
    'hazmat',
    'respirator',
    'biohazard',
    'covid',
    'pandemic',
    'fogging',
    'mask',
    'ppe',
  ];

  // Avoid obviously off-theme environments for an office-cleaning brand.
  // Note: keep these specific to avoid false positives like "workstation".
  const offTheme = [
    'train',
    'train station',
    'subway',
    'platform',
    'railway',
    'bar stool',
    'barstool',
    'bar stools',
  ];

  // Avoid “restocking/office” results that are actually generic gadget/paperwork stock shots.
  const irrelevant = [
    'macbook',
    'laptop',
    'computer',
    'monitor',
    'smartphone',
    'iphone',
    'tablet',
    'keyboard',
    'mouse',
    'business plan',
    'business-plan',
    'spreadsheet',
    'paperwork',
    'notes',
    'notebook',
    'pencil',
  ];

  return [...banned, ...offTheme, ...irrelevant].some((k) => text.includes(k));
}

function scorePhoto(p) {
  const text = normalizePhotoText(p);
  const good = [
    // Keep office context present.
    'office',
    'lobby',
    'reception',
    'conference',
    'meeting',
    'breakroom',
    'pantry',
    'kitchen',
    'kitchenette',
    'coffee',
    'snack',
    'workstation',
    'desk',
    'glass',
    'partition',
    'restroom',
    'bathroom',
    'toilet',
    'supply',
    'restock',
    // Stronger janitorial/commercial-cleaning signals.
    'janitorial',
    'janitor',
    'cleaner',
    'cleaning',
    'cleaning cart',
    'cart',
    'mop',
    'mop bucket',
    'vacuum',
    'floor',
    'floor cleaning',
    'trash',
    'waste',
    'paper towel',
    'soap dispenser',
    'commercial',
  ];
  let score = 0;
  for (const term of good) {
    if (text.includes(term)) score += 1;
  }
  return score;
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
  await fs.mkdir(OUT_SERVICES_DIR, { recursive: true });

  // Each slot maps to a specific theme so the site feels intentionally curated.
  // You can tweak these queries anytime and re-run `pnpm gallery:fetch`.
  const slots = [
    {
      id: '01',
      query: 'modern clean office interior workspace',
      label: 'Modern office interior',
    },
    {
      id: '02',
      query: 'office cleaning professional janitorial service',
      label: 'Office cleaning',
    },
    {
      id: '03',
      query: 'specialty coffee latte art barista office',
      label: 'Specialty coffee',
    },
    {
      id: '04',
      query: 'office pantry snacks breakroom supplies',
      label: 'Office pantry + snacks',
    },
    {
      id: '05',
      query: 'modern corporate lobby reception clean',
      label: 'Corporate lobby',
    },
    {
      id: '06',
      query: 'office supply restocking organized shelves',
      label: 'Restocking supplies',
    },
  ];

  const seenGalleryPhotographers = new Set();
  const attributions = [];

  const pickBestForSlot = async ({ query, seen }) => {
    // Try a couple pages to get variety, but keep it fast.
    const pools = [];
    for (const page of [1, 2]) {
      const data = await searchPexels({ apiKey, query, perPage: 30, page });
      pools.push(...(data?.photos ?? []));
      if (pools.length >= 40) break;
    }

    const unique = uniqBy(pools, (p) => String(p?.id));
    const withSrc = unique.filter((p) => p?.src?.original || p?.src?.large2x || p?.src?.large);

    // Prefer on-theme photos and avoid obvious mismatches.
    const filtered = withSrc.filter((p) => !isRejectedPhoto(p));
    const candidates = filtered.length ? filtered : withSrc;
    candidates.sort((a, b) => scorePhoto(b) - scorePhoto(a));

    // Prefer results that match at least a couple “on-theme” terms when available.
    const strong = candidates.filter((p) => scorePhoto(p) >= 2);
    const ranked = strong.length ? strong : candidates;

    // Prefer a unique photographer per slot to avoid a “single shoot” feel.
    if (seen && typeof seen.has === 'function') {
      for (const p of ranked) {
        const name = (p?.photographer ?? '').trim();
        if (!name) continue;
        if (seen.has(name)) continue;
        return p;
      }
    }

    for (const p of ranked) {
      const name = (p?.photographer ?? '').trim();
      if (!name) continue;
      return p;
    }

    return ranked[0];
  };

  const writePhoto = async ({ photo, outPath }) => {
    const srcUrl = photo?.src?.original || photo?.src?.large2x || photo?.src?.large;
    if (!srcUrl) throw new Error(`Missing photo src for Pexels id=${photo?.id}`);

    const buf = await downloadBuffer(srcUrl);

    const image = sharp(buf).rotate();
    const meta = await image.metadata();

    // Downscale to 4K max-width to keep files reasonable but still high-res.
    const maxWidth = meta.width && meta.width > 3840 ? 3840 : meta.width;
    const base = maxWidth ? image.resize({ width: maxWidth }) : image;

    // 1) Write the primary image (kept for back-compat paths like gallery/01.jpg).
    await base.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(outPath);

    // 2) Write responsive variants for srcset usage.
    // Naming: <name>-<width>.jpg next to the primary file.
    const ext = path.extname(outPath);
    const stem = outPath.slice(0, -ext.length);
    const availableMax = typeof maxWidth === 'number' && maxWidth > 0 ? maxWidth : 3840;

    const widths = RESPONSIVE_WIDTHS.filter((w) => w <= availableMax);
    for (const w of widths) {
      const variantPath = `${stem}-${w}${ext}`;
      // Avoid unnecessary re-encoding if the primary image already matches this width.
      if (w === availableMax && variantPath === outPath) continue;
      await sharp(buf)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toFile(variantPath);
    }
  };

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const p = await pickBestForSlot({ query: slot.query, seen: seenGalleryPhotographers });
    if (!p) throw new Error(`No photos returned from Pexels for query: ${slot.query}`);

    const photographerName = (p?.photographer ?? '').trim();
    if (photographerName) seenGalleryPhotographers.add(photographerName);

    const n = slot.id;

    const outPath = path.join(OUT_DIR, `${n}.jpg`);

    await writePhoto({ photo: p, outPath });

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

  // Additional rotating images for the Services cards (3 per card by default).
  const serviceSets = [
    {
      key: 'janitorial',
      label: 'Services: Office cleaning',
      queries: [
        'professional office cleaning service',
        'commercial cleaning crew modern office',
        'clean empty office space interior',
      ],
      count: 3,
    },
    {
      key: 'detail',
      label: 'Services: Deep cleaning',
      queries: [
        'deep cleaning modern office',
        'commercial floor cleaning polishing',
        'professional cleaning service office',
      ],
      count: 3,
    },
    {
      key: 'restocking',
      label: 'Services: Restocking & supplies',
      queries: [
        'office supply cabinet organized',
        'paper towels soap dispenser restroom supplies',
        'organized office storage shelves supplies',
      ],
      count: 3,
    },
    {
      key: 'facilities',
      label: 'Services: Coffee & snacks',
      queries: [
        'specialty coffee latte art office',
        'modern office coffee machine espresso',
        'office breakroom snacks pantry',
      ],
      count: 3,
    },
  ];

  let serviceWritten = 0;
  const serviceTotal = serviceSets.reduce((sum, s) => sum + (s.count ?? 0), 0);

  for (const set of serviceSets) {
    const seenServicePhotographers = new Set();
    for (let j = 1; j <= set.count; j++) {
      const query = Array.isArray(set.queries)
        ? set.queries[(j - 1) % set.queries.length]
        : set.query;

      const p = await pickBestForSlot({ query, seen: seenServicePhotographers });
      if (!p) throw new Error(`No photos returned from Pexels for query: ${query}`);

      const photographerName = (p?.photographer ?? '').trim();
      if (photographerName) seenServicePhotographers.add(photographerName);

      const idx = String(j).padStart(2, '0');
      const outRel = `gallery/services/${set.key}-${idx}.jpg`;
      const outPath = path.join(OUT_SERVICES_DIR, `${set.key}-${idx}.jpg`);

      await writePhoto({ photo: p, outPath });

      const photographer = p?.photographer ?? 'Unknown';
      const photographerUrl = p?.photographer_url ?? '';
      const photoUrl = p?.url ?? '';

      attributions.push(
        [
          outRel,
          `Slot: ${set.label}`,
          `Query: ${query}`,
          `Pexels photo by ${photographer}`,
          photographerUrl ? `Photographer: ${photographerUrl}` : '',
          photoUrl ? `Photo: ${photoUrl}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      );

      serviceWritten++;
      process.stdout.write(`Downloaded ${serviceWritten}/${serviceTotal}: ${outRel}\n`);
    }
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
