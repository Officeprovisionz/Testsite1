export type GalleryItem = {
  /** Path relative to the public root (no leading slash), e.g. "gallery/01.svg" */
  src: string;
  alt: string;
  caption?: string;
};

// Replace these placeholders with real before/after photos or portfolio shots.
// Put files in `public/gallery/` and update `src` accordingly.
export const galleryItems: GalleryItem[] = [
  {
    src: 'gallery/01.svg',
    alt: 'Office reception area cleaned and staged',
    caption: 'Reception + common areas',
  },
  {
    src: 'gallery/02.svg',
    alt: 'Breakroom counters wiped down and sanitized',
    caption: 'Breakroom refresh',
  },
  {
    src: 'gallery/03.svg',
    alt: 'Restroom cleaned and restocked',
    caption: 'Restrooms cleaned + restocked',
  },
  {
    src: 'gallery/04.svg',
    alt: 'Conference room cleaned and reset',
    caption: 'Conference room reset',
  },
  {
    src: 'gallery/05.svg',
    alt: 'Workstations cleaned and high-touch points disinfected',
    caption: 'Workstations + high-touch',
  },
  {
    src: 'gallery/06.svg',
    alt: 'Supply shelves organized and inventory checked',
    caption: 'Supplies + inventory checks',
  },
];
