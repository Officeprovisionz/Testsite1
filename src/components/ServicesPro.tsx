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
                header={
                  <div className="flex h-24 w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/30 dark:to-brand-800/20">
                    <div className="rounded-xl bg-white/80 p-3 shadow-sm dark:bg-slate-800/80">
                      {icons[family.title] || <Sparkles className="h-6 w-6 text-brand-500" />}
                    </div>
                  </div>
                }
                icon={icons[family.title]}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
