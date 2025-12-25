import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';

type Tile = {
  title: string;
  description: string;
  href: string;
  image: string;
  cta: string;
};

const tiles: Tile[] = [
  {
    title: 'Recurring janitorial',
    description:
      'Reliable visits with checklist-based scope—so cleaning stays consistent week after week.',
    href: 'services/',
    image: 'gallery/02.svg',
    cta: 'Learn more',
  },
  {
    title: 'Printable checklist',
    description:
      'Bring a practical checklist to your walkthrough to keep scope clear and comparable.',
    href: 'checklist/',
    image: 'gallery/03.svg',
    cta: 'Preview',
  },
  {
    title: 'Industries we serve',
    description:
      'Offices, property management, clinics, and customer spaces—scoped clearly for operations teams.',
    href: 'industries/',
    image: 'gallery/04.svg',
    cta: 'Learn more',
  },
  {
    title: 'Results & proof',
    description:
      'A look at recent work across commercial spaces, plus what a “standard visit” really includes.',
    href: 'about/#proof',
    image: 'gallery/01.svg',
    cta: 'Learn more',
  },
];

export const FeatureTilesPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

  return (
    <section className="section section-muted section-creative relative z-20 -mt-16 pt-20">
      <div className="container-page relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-10 -z-10">
          <div className="mx-auto h-72 w-[min(72rem,95vw)] rounded-full bg-brand-500/10 blur-3xl" />
        </div>

        <div className="mb-10 text-center">
          <p className="eyebrow">{siteConfig.brand.name}</p>
          <h2 className="heading-2 mt-3">Everything your workplace needs.</h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Commercial-grade cleaning with supplies and facilities support—built to fit your
            schedule.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile, idx) => (
            <Card key={idx} tile={tile} href={href} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ tile, href }: { tile: Tile; href: (p: string) => string }) => {
  return (
    <motion.div
      className="card card-hover group relative h-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <a
        href={href(tile.href)}
        className="block h-full focus-visible:outline-none"
        aria-label={`${tile.title} — ${tile.cta}`}
      >
        <div className="surface-muted relative aspect-[4/3] overflow-hidden">
          <img
            src={href(tile.image)}
            alt={tile.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
          />
        </div>

        <div className="relative p-6">
          <h3 className="heading-3">{tile.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{tile.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
            <span>{tile.cta}</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
};
