import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    href: 'results/',
    image: 'gallery/01.svg',
    cta: 'Learn more',
  },
];

export const FeatureTilesPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

  return (
    <section className="relative z-20 -mt-20 pb-20">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {tiles.map((tile, idx) => (
            <Card key={idx} tile={tile} href={href} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ tile, href }: { tile: Tile; href: (p: string) => string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={href(tile.image)}
          alt={tile.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
      </div>

      <div className="relative p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tile.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {tile.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
          <a href={href(tile.href)} className="after:absolute after:inset-0">
            {tile.cta}
          </a>
          <svg
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              isHovered ? 'translate-x-1' : ''
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
    </motion.div>
  );
};
