import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { makeContactHref } from '@/lib/routes';
import { HoverEffect } from './ui/HoverEffect';
import { RotatingImage } from './ui/RotatingImage';

export function IndustriesPro() {
  const contactHref = makeContactHref(import.meta.env.BASE_URL);

  const mediaForIndustry = (title: string) => {
    const t = title.toLowerCase();

    // Keep these in sync with the Pexels downloader output naming.
    if (t.includes('office')) {
      return [
        'gallery/services/janitorial-01.jpg',
        'gallery/services/janitorial-02.jpg',
        'gallery/services/janitorial-03.jpg',
      ];
    }

    if (t.includes('medical') || t.includes('dental')) {
      return [
        'gallery/services/detail-01.jpg',
        'gallery/services/detail-02.jpg',
        'gallery/services/detail-03.jpg',
      ];
    }

    if (t.includes('property')) {
      return [
        'gallery/services/facilities-01.jpg',
        'gallery/services/facilities-02.jpg',
        'gallery/services/facilities-03.jpg',
      ];
    }

    if (t.includes('retail') || t.includes('customer')) {
      return [
        'gallery/services/janitorial-02.jpg',
        'gallery/services/detail-02.jpg',
        'gallery/services/facilities-02.jpg',
      ];
    }

    return [
      'gallery/services/janitorial-01.jpg',
      'gallery/services/detail-01.jpg',
      'gallery/services/restocking-01.jpg',
    ];
  };

  const items = siteConfig.industries.map((industry) => {
    const sources = mediaForIndustry(industry.title).map((src) => ({ src, alt: '' }));
    return {
      title: industry.title,
      description: industry.description,
      link: contactHref({ industry: industry.title }),
      media: (
        <RotatingImage
          sources={sources}
          intervalMs={5000}
          className="h-28 w-full rounded-xl"
          overlayClassName="bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent"
        />
      ),
    };
  });

  return (
    <section className="section" id="industries">
      <div className="container-page">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur-sm dark:border-brand-700/40 dark:bg-brand-950/60 dark:text-brand-200">
            Industries
          </div>
          <h2 className="heading-2">Who we serve</h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <HoverEffect items={items} />
        </div>
      </div>
    </section>
  );
}
