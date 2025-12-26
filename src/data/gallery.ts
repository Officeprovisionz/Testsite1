export type GalleryItem = {
  /** Path relative to the public root (no leading slash), e.g. "gallery/01.jpg" */
  src: string;
  alt: string;
  caption?: string;
};

// Replace these placeholders with real before/after photos or portfolio shots.
// Put files in `public/gallery/` and update `src` accordingly.
export const galleryItems: GalleryItem[] = [
  {
    src: 'gallery/01.jpg',
    alt: 'Modern clean office interior with organized workspace',
    caption: 'Modern office spaces',
  },
  {
    src: 'gallery/02.jpg',
    alt: 'Professional office cleaning service in action',
    caption: 'Professional cleaning',
  },
  {
    src: 'gallery/03.jpg',
    alt: 'Specialty coffee and espresso service for office',
    caption: 'Specialty coffee service',
  },
  {
    src: 'gallery/04.jpg',
    alt: 'Office pantry with snacks and breakroom supplies',
    caption: 'Snacks & breakroom',
  },
  {
    src: 'gallery/05.jpg',
    alt: 'Corporate lobby clean and ready for clients',
    caption: 'Corporate lobbies',
  },
  {
    src: 'gallery/06.jpg',
    alt: 'Office supplies restocked and organized',
    caption: 'Restocking & supplies',
  },
];
