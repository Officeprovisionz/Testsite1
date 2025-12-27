import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export type GalleryItem = {
  /** Path relative to the public root (no leading slash), e.g. "gallery/01.jpg" */
  src: string;
  alt: string;
  caption?: string;
};

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const VALID_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const RESPONSIVE_SUFFIXES = new Set(['640', '960', '1280', '1600', '1920', '2560', '3840']);
const DEFAULT_SEED = process.env.GALLERY_SHUFFLE_SEED || 'gallery';

const EXT_PRIORITY = new Map([
  ['.jpg', 0],
  ['.jpeg', 1],
  ['.png', 2],
  ['.webp', 3],
]);

const variantMatch = (name: string) => {
  const match = name.match(/^(.*)-(\d{3,4})\.(?:jpe?g|png|webp)$/i);
  if (!match) return null;
  const width = match[2] ?? '';
  if (!RESPONSIVE_SUFFIXES.has(width)) return null;
  return { base: match[1] ?? '', width: Number(width) };
};

const listGalleryFiles = () => {
  try {
    const entries = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });
    const groups = new Map<
      string,
      { baseCandidates: string[]; variants: { name: string; width: number; ext: string }[] }
    >();

    entries
      .filter((entry) => entry.isFile())
      .forEach((entry) => {
        const name = entry.name;
        const ext = path.extname(name).toLowerCase();
        if (!VALID_EXTS.has(ext)) return;
        if (name.toLowerCase().startsWith('attribution')) return;

        const variant = variantMatch(name);
        const baseKey = variant ? variant.base : path.basename(name, ext);
        const key = baseKey.toLowerCase();
        const group = groups.get(key) ?? { baseCandidates: [], variants: [] };

        if (variant) {
          group.variants.push({ name, width: variant.width, ext });
        } else {
          group.baseCandidates.push(name);
        }
        groups.set(key, group);
      });

    const getExtRank = (ext: string) => EXT_PRIORITY.get(ext) ?? EXT_PRIORITY.size;
    const pickBase = (candidates: string[]) => {
      if (!candidates.length) return undefined;
      return [...candidates].sort((a, b) => {
        const rankA = getExtRank(path.extname(a).toLowerCase());
        const rankB = getExtRank(path.extname(b).toLowerCase());
        if (rankA !== rankB) return rankA - rankB;
        return a.localeCompare(b);
      })[0];
    };
    const pickVariant = (variants: { name: string; width: number; ext: string }[]) => {
      if (!variants.length) return undefined;
      return [...variants].sort((a, b) => {
        if (b.width !== a.width) return b.width - a.width;
        const rankA = getExtRank(a.ext);
        const rankB = getExtRank(b.ext);
        if (rankA !== rankB) return rankA - rankB;
        return a.name.localeCompare(b.name);
      })[0]?.name;
    };

    const picks: string[] = [];
    groups.forEach((group) => {
      const basePick = pickBase(group.baseCandidates);
      if (basePick) {
        picks.push(basePick);
        return;
      }
      const variantPick = pickVariant(group.variants);
      if (variantPick) picks.push(variantPick);
    });

    return picks.sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
};

const dedupeByHash = (files: string[]) => {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const file of files) {
    try {
      const buf = fs.readFileSync(path.join(GALLERY_DIR, file));
      const hash = crypto.createHash('sha1').update(buf).digest('hex');
      if (seen.has(hash)) continue;
      seen.add(hash);
      unique.push(file);
    } catch {
      // ignore unreadable files
    }
  }

  return unique;
};

const toLabel = (_name: string, index: number) => {
  // Use generic labels because filenames are inconsistent.
  return `Gallery photo ${index + 1}`;
};

const buildGalleryItems = () => {
  const files = dedupeByHash(listGalleryFiles());
  return files.map((file, index) => {
    const label = toLabel(file, index);
    return {
      src: `gallery/${file}`,
      alt: label,
      caption: label,
    };
  });
};

export const galleryItems: GalleryItem[] = buildGalleryItems();

const hashSeed = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let n = t;
    n = Math.imul(n ^ (n >>> 15), n | 1);
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffleItems = <T>(items: T[], seed: string): T[] => {
  const out = [...items];
  const rand = mulberry32(hashSeed(seed));

  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    // Both indices are guaranteed valid: i is in [1, length-1], j is in [0, i]
    const temp = out[i]!;
    out[i] = out[j]!;
    out[j] = temp;
  }

  return out;
};

export const getShuffledGalleryItems = (key = 'default') => {
  return shuffleItems(galleryItems, `${DEFAULT_SEED}:${key}`);
};

export const pickGalleryItems = (key: string, count: number, offset = 0): GalleryItem[] => {
  const pool = getShuffledGalleryItems(key);
  if (!pool.length || count <= 0) return [];

  const picks: GalleryItem[] = [];
  for (let i = 0; i < count; i += 1) {
    // Modulo guarantees index is valid within pool bounds
    const item = pool[(offset + i) % pool.length];
    if (item) picks.push(item);
  }
  return picks;
};
