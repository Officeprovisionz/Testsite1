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
    src: 'gallery/services/facilities-01.jpg',
    alt: 'A client-facing office entry and common area cleaned and ready for the day',
    caption: 'Reception + common areas',
  },
  {
    src: 'gallery/services/janitorial-01.jpg',
    alt: 'A conference room reset with tables and floors cleaned for the next meeting',
    caption: 'Conference room reset',
  },
  {
    src: 'gallery/services/janitorial-03.jpg',
    alt: 'Restroom cleaning with restocking and touchpoint detailing completed',
    caption: 'Restrooms cleaned + restocked',
  },
  {
    src: 'gallery/services/restocking-01.jpg',
    alt: 'Breakroom or pantry surfaces cleaned with supplies set up for easy use',
    caption: 'Breakroom refresh',
  },
  {
    src: 'gallery/services/detail-02.jpg',
    alt: 'High-touch cleaning detail with a checklist-first process',
    caption: 'High-touch detail',
  },
  {
    src: 'gallery/services/detail-01.jpg',
    alt: 'Floors maintained and detailed to keep traffic areas sharp',
    caption: 'Floors that stay sharp',
  },
  {
    src: 'gallery/services/facilities-03.jpg',
    alt: 'Workspace reset and staged so the office feels client-ready',
    caption: 'Workstations reset',
  },
  {
    src: 'gallery/services/facilities-02.jpg',
    alt: 'Interior glass and partitions cleaned for a clear, polished look',
    caption: 'Glass + partitions',
  },
  {
    src: 'gallery/services/detail-03.jpg',
    alt: 'High-traffic entry lanes and carpets maintained so the whole space stays sharp',
    caption: 'Carpet + entry lanes',
  },
  {
    src: 'gallery/services/restocking-02.jpg',
    alt: 'Office pantry restocking with snacks and breakroom essentials topped up',
    caption: 'Snack + pantry restocking',
  },
  {
    src: 'gallery/services/restocking-03.jpg',
    alt: 'Coffee station restocking with coffee and breakroom supplies organized',
    caption: 'Coffee + espresso station restock',
  },
  {
    src: 'gallery/services/restocking-01.jpg',
    alt: 'Supplies organized with inventory checked so teams never run out unexpectedly',
    caption: 'Supplies + inventory checks',
  },
];
