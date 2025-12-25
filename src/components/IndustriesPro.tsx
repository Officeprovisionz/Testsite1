import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { HoverEffect } from './ui/HoverEffect';

export function IndustriesPro() {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

  const items = siteConfig.industries.map((industry) => ({
    title: industry.title,
    description: industry.description,
    link: href(`contact/?industry=${encodeURIComponent(industry.title)}`),
  }));

  return (
    <section className="section section-muted" id="industries">
      <div className="container-page">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
            Industries
          </div>
          <h2 className="heading-2 text-4xl font-bold tracking-tight">Who we serve</h2>
          <p className="lede mx-auto mt-4 max-w-2xl text-muted-foreground">
            Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <HoverEffect items={items} />
        </div>
      </div>
    </section>
  );
}
