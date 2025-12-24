import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/utils';

export function IndustriesPro() {
  const items = siteConfig.industries.map((industry, i) => ({
    title: industry.title,
    description: (
      <div className="flex flex-col gap-2">
        <p>{industry.description}</p>
        <ul className="mt-2 space-y-1">
          {industry.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <span className="h-1 w-1 rounded-full bg-brand-500" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    ),
    className: i === 0 || i === 3 ? 'md:col-span-2' : '',
  }));

  return (
    <section className="section section-muted" id="industries">
      <div className="container-page">
        <div className="mb-12 text-center">
          <p className="eyebrow">Industries</p>
          <h2 className="heading-2 mt-2">Who we serve</h2>
          <p className="lede mx-auto">
            Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-4xl px-0">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className={cn(item.className, 'border border-slate-200 dark:border-slate-800')}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
