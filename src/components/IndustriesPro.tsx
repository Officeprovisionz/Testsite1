import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { makeContactHref } from '@/lib/routes';
import { HoverEffect } from './ui/HoverEffect';

export function IndustriesPro() {
  const contactHref = makeContactHref(import.meta.env.BASE_URL);

  const items = siteConfig.industries.map((industry) => ({
    title: industry.title,
    description: industry.description,
    link: contactHref({ industry: industry.title }),
  }));

  return (
    <section className="section lg:py-28" id="industries">
      <div className="container-page">
        <div className="mb-10 text-center lg:mb-14">
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur-sm dark:border-brand-700/40 dark:bg-brand-950/60 dark:text-brand-200 lg:px-5 lg:py-2 lg:text-base">
            Industries
          </div>
          <h2 className="heading-2 lg:text-4xl">Who we serve</h2>
          <p className="lede mx-auto mt-4 max-w-2xl lg:mt-5 lg:text-lg">
            Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <HoverEffect items={items} />
        </div>
      </div>
    </section>
  );
}
