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
    header: <Skeleton i={i} />,
    className: i === 0 || i === 3 ? 'md:col-span-2' : '',
  }));

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950" id="industries">
      <div className="container-page mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Who we serve
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
        </p>
      </div>
      <BentoGrid className="mx-auto max-w-4xl px-4">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn(item.className, 'border border-slate-200 dark:border-slate-800')}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

const Skeleton = ({ i }: { i: number }) => {
  const variants = [
    'bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900 dark:to-slate-900',
    'bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900',
    'bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-slate-900',
    'bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-slate-900',
  ];

  return (
    <div
      className={cn(
        'flex h-full min-h-[6rem] w-full flex-1 rounded-xl',
        variants[i % variants.length]
      )}
    ></div>
  );
};
