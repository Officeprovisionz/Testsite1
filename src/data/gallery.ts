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
    caption: 'Office Cleaning',
  },
  {
    src: 'gallery/02.jpg',
    alt: 'Professional office cleaning service in action',
    caption: 'Professional Janitorial',
  },
  {
    src: 'gallery/03.jpg',
    alt: 'Specialty coffee, snacks, and breakroom supplies fully stocked',
    caption: 'Coffee, Snacks & Restocking',
  },
  {
    src: 'gallery/05.jpg',
    alt: 'Corporate lobby clean and ready for clients',
    caption: 'Facilities Support',
  },
];
