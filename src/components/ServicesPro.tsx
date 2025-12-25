import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { Sparkles, Box, ClipboardCheck, Wrench } from 'lucide-react';

export function ServicesPro() {
  const icons = {
    'Janitorial & recurring cleaning': <Sparkles className="h-6 w-6 text-brand-500" />,
    'Deep / detail cleaning': <ClipboardCheck className="h-6 w-6 text-brand-500" />,
    'Supplies & restocking': <Box className="h-6 w-6 text-brand-500" />,
    'Facilities support': <Wrench className="h-6 w-6 text-brand-500" />,
  };

  return (
    <section className="section" id="services">
      <div className="container-page">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
            Services
          </div>
          <h2 className="heading-2 text-4xl font-bold tracking-tight">Service families</h2>
          <p className="lede mx-auto mt-4 max-w-2xl text-muted-foreground">
            Clear scope, consistent delivery, and one point of contact—built for busy workplaces.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-6xl">
          {siteConfig.serviceFamilies.map((family, i) => {
            return (
              <BentoGridItem
                key={family.title}
                title={family.title}
                description={
                  <div className="mt-2">
                    <p className="mb-4 text-sm text-muted-foreground">{family.description}</p>
                    <ul className="space-y-2">
                      {family.bullets.map((b) => (
                        <li key={b} className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                header={
                  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
                    {icons[family.title as keyof typeof icons]}
                  </div>
                }
                className={i === 0 || i === 3 ? 'md:col-span-2' : ''}
                icon={icons[family.title as keyof typeof icons]}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
