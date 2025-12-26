import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { Sparkles, Box, ClipboardCheck, Wrench } from 'lucide-react';

export function ServicesPro() {
  const icons: Record<string, React.ReactNode> = {
    'Janitorial & recurring cleaning': <Sparkles className="h-5 w-5 text-brand-500" />,
    'Deep / detail cleaning': <ClipboardCheck className="h-5 w-5 text-brand-500" />,
    'Supplies & restocking': <Box className="h-5 w-5 text-brand-500" />,
    'Facilities support': <Wrench className="h-5 w-5 text-brand-500" />,
  };

  const base = import.meta.env.BASE_URL;

  const headerImageByTitle: Record<string, { jpg: string; svg: string; alt: string }> = {
    'Janitorial & recurring cleaning': {
      jpg: `${base}gallery/02.jpg`,
      svg: `${base}gallery/02.svg`,
      alt: 'Janitorial service in an office environment',
    },
    'Deep / detail cleaning': {
      jpg: `${base}gallery/04.jpg`,
      svg: `${base}gallery/04.svg`,
      alt: 'Detail cleaning and disinfecting in a conference room',
    },
    'Supplies & restocking': {
      jpg: `${base}gallery/06.jpg`,
      svg: `${base}gallery/06.svg`,
      alt: 'Supply shelves and inventory organization for restocking',
    },
    'Facilities support': {
      jpg: `${base}gallery/05.jpg`,
      svg: `${base}gallery/05.svg`,
      alt: 'Floor care and upkeep in a commercial space',
    },
  };

  const renderHeader = (title: string) => {
    const img = headerImageByTitle[title];
    const icon = icons[title] || <Sparkles className="h-6 w-6 text-brand-500" />;

    return (
      <div className="relative flex h-24 w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-brand-100/50 bg-slate-50 dark:border-brand-800/30 dark:bg-slate-950/30">
        {img ? (
          <img
            src={img.jpg}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            onError={(e) => {
              if (e.currentTarget.src !== img.svg) e.currentTarget.src = img.svg;
            }}
          />
        ) : null}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/65 via-white/40 to-transparent dark:from-slate-950/70 dark:via-slate-950/45"
        />

        <div className="relative rounded-xl bg-white/85 p-3 shadow-sm ring-1 ring-brand-100/60 backdrop-blur-sm dark:bg-slate-900/70 dark:ring-brand-800/30">
          {icon}
        </div>
      </div>
    );
  };

  return (
    <section
      className="section bg-gradient-to-b from-transparent via-brand-50/30 to-transparent dark:via-brand-950/20"
      id="services"
    >
      <div className="container-page">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur-sm dark:border-brand-700/40 dark:bg-brand-950/60 dark:text-brand-200">
            Services
          </div>
          <h2 className="heading-2">Service families</h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Clear scope, consistent delivery, and one point of contact—built for busy workplaces.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-5xl md:grid-cols-2">
          {siteConfig.serviceFamilies.map((family) => {
            return (
              <BentoGridItem
                key={family.title}
                title={family.title}
                description={
                  <div className="mt-1">
                    <p className="mb-3 text-sm text-muted-foreground">{family.description}</p>
                    <ul className="space-y-1.5">
                      {family.bullets.map((b) => (
                        <li key={b} className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2 h-1 w-1 rounded-full bg-brand-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                header={renderHeader(family.title)}
                icon={icons[family.title]}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
