import fs from 'node:fs';
import path from 'node:path';

export type PublicResponsiveImage = {
  /** URL suitable for HTML (already prefixed with BASE_URL). */
  src: string;
  /** URL srcset string (already prefixed with BASE_URL). */
  srcSet?: string | undefined;
  /** WebP URL srcset string (already prefixed with BASE_URL). */
  webpSrcSet?: string | undefined;
  /** sizes attribute to pair with srcSet. */
  sizes?: string | undefined;
};

const publicFilePath = (relPath: string) => {
  const cleaned = relPath.replace(/^\/+/, '');
  return path.join(process.cwd(), 'public', cleaned);
};

const exists = (relPath: string) => {
  try {
    return fs.existsSync(publicFilePath(relPath));
  } catch {
    return false;
  }
};

const toPublicUrl = (baseUrl: string, relPath: string) => {
  const cleaned = relPath.replace(/^\/+/, '');
  return `${baseUrl}${cleaned}`;
};

export const getPublicResponsiveImage = (
  relJpgPath: string,
  baseUrl: string,
  opts?: {
    widths?: number[];
    /** Default is a reasonable responsive rule for full-width imagery. */
    sizes?: string;
  }
): PublicResponsiveImage => {
  const widths = opts?.widths ?? [640, 768, 960, 1280, 1600, 1920];
  const sizes = opts?.sizes ?? '(min-width: 1024px) 1024px, (min-width: 640px) 100vw, 100vw';

  const cleaned = relJpgPath.replace(/^\/+/, '');
  const isJpg = /\.jpe?g$/i.test(cleaned);

  const src = toPublicUrl(baseUrl, cleaned);

  if (!isJpg) return { src };

  const stem = cleaned.replace(/\.jpe?g$/i, '');
  const ext = cleaned.toLowerCase().endsWith('.jpeg') ? '.jpeg' : '.jpg';

  const candidates = widths
    .map((w) => ({ w, rel: `${stem}-${w}${ext}` }))
    .filter((c) => exists(c.rel));

  const webpCandidates = widths
    .map((w) => ({ w, rel: `${stem}-${w}.webp` }))
    .filter((c) => exists(c.rel));

  // If we don't have any generated variants, don't emit srcset.
  if (!candidates.length && !webpCandidates.length) return { src };

  const srcSet = candidates.length
    ? candidates.map((c) => `${toPublicUrl(baseUrl, c.rel)} ${c.w}w`).join(', ')
    : undefined;

  const webpSrcSet = webpCandidates.length
    ? webpCandidates.map((c) => `${toPublicUrl(baseUrl, c.rel)} ${c.w}w`).join(', ')
    : undefined;

  return { src, srcSet, webpSrcSet, sizes };
};
