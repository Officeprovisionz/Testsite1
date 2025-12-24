import React from 'react';
import { HoverEffect } from './ui/HoverEffect';
import { siteConfig } from '@/data/siteConfig';

export function ServicesPro() {
  const items = siteConfig.services.map((s) => ({
    title: s.title,
    description: s.description,
    link: '#', // You can add links if needed
  }));

  return (
    <section className="py-20" id="services">
      <div className="container-page mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Popular services
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Office cleaning, supplies/restocking, and facilities support—built for busy teams.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-8">
        <HoverEffect items={items} />
      </div>
    </section>
  );
}
