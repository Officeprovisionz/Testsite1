import React from 'react';
import { HoverEffect } from './ui/HoverEffect';
import { siteConfig } from '@/data/siteConfig';

export function ServicesPro() {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

  const items = siteConfig.services.map((s) => ({
    title: s.title,
    description: s.description,
    link: href(`contact/?service=${encodeURIComponent(s.title)}`),
  }));

  return (
    <section className="section" id="services">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="eyebrow">Services</p>
          <h2 className="heading-2 mt-2">Popular services</h2>
          <p className="lede mx-auto">
            Office cleaning, supplies/restocking, and facilities support—built for busy teams.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <HoverEffect items={items} />
        </div>
      </div>
    </section>
  );
}
