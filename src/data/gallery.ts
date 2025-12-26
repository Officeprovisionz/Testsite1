import fs from 'node:fs';
import path from 'node:path';

export type GalleryItem = {
  /** Path relative to the public root (no leading slash), e.g. "gallery/01.jpg" */
  src: string;
  alt: string;
  caption?: string;
};

const publicGalleryFile = (fileName: string) =>
  path.join(process.cwd(), 'public', 'gallery', fileName);

const fileExists = (fileName: string) => {
  try {
    return fs.existsSync(publicGalleryFile(fileName));
  } catch {
    return false;
  }
};

/**
 * Returns a path (relative to `public/`) for a gallery image.
 *
 * If `public/gallery/<id>.jpg` exists, it uses that.
 * Otherwise it falls back to the existing SVG placeholders (`public/gallery/<id>.svg`).
 * If neither exists (e.g. you reference 07+ before generating assets), it falls back to 01.svg.
 */
export const getGalleryImageSrc = (id: string) => {
  const cleaned = id.replace(/\D/g, '').padStart(2, '0').slice(-2);
  if (fileExists(`${cleaned}.jpg`)) return `gallery/${cleaned}.jpg`;
  if (fileExists(`${cleaned}.svg`)) return `gallery/${cleaned}.svg`;
  return 'gallery/01.svg';
};

// Replace these placeholders with real before/after photos or portfolio shots.
// Put files in `public/gallery/` and update `src` accordingly.
export const galleryItems: GalleryItem[] = [
  {
    src: getGalleryImageSrc('01'),
    alt: 'Office reception area cleaned and staged',
    caption: 'Reception + common areas',
  },
  {
    src: getGalleryImageSrc('02'),
    alt: 'Conference room cleaned and reset for the next meeting',
    caption: 'Conference room reset',
  },
  {
    src: getGalleryImageSrc('03'),
    alt: 'Restroom cleaned and restocked',
    caption: 'Restrooms cleaned + restocked',
  },
  {
    src: getGalleryImageSrc('04'),
    alt: 'Breakroom counters wiped down and sanitized',
    caption: 'Breakroom refresh',
  },
  {
    src: getGalleryImageSrc('05'),
    alt: 'Workstations cleaned and high-touch points disinfected',
    caption: 'Workstations + high-touch',
  },
  {
    src: getGalleryImageSrc('06'),
    alt: 'Supply shelves organized and inventory checked',
    caption: 'Supplies + inventory checks',
  },
  {
    src: getGalleryImageSrc('07'),
    alt: 'Office workstations reset and staged for the next day',
    caption: 'Workstations reset',
  },
  {
    src: getGalleryImageSrc('08'),
    alt: 'Interior glass and partitions cleaned in an office space',
    caption: 'Glass + partitions',
  },
  {
    src: getGalleryImageSrc('09'),
    alt: 'Carpeted office area vacuumed and refreshed',
    caption: 'Carpet + entry lanes',
  },
];
