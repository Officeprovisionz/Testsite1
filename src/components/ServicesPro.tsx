import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { Sparkles, Box, ClipboardCheck, Wrench } from 'lucide-react';

export function ServicesPro() {
  const icons: Record<string, React.ReactNode> = {
    'Janitorial & recurring cleaning': <Sparkles className="h-6 w-6 text-brand-500" />,
    'Deep / detail cleaning': <ClipboardCheck className="h-6 w-6 text-brand-500" />,
    'Supplies & restocking': <Box className="h-6 w-6 text-brand-500" />,
    'Facilities support': <Wrench className="h-6 w-6 text-brand-500" />,
  };

  return (
    <section className="section py-24" id="services">
      <div className="container-page">
        <div className="mb-16 text-center">
          <h2 className="text-strong font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Our Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Comprehensive facility solutions tailored to your standards.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-6xl gap-6 md:grid-cols-2">
          {siteConfig.serviceFamilies.map((family, i) => {
            return (
              <BentoGridItem
                key={family.title}
                title={family.title}
                description={family.description}
                header={
                  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl border border-brand-100/50 bg-gradient-to-br from-brand-50 to-slate-50 dark:border-white/5 dark:from-slate-900 dark:to-slate-800">
                    {/* Simple, clean icon placeholder or abstract graphic could go here */}
                    <div className="scale-150 transform opacity-10">{icons[family.title]}</div>
                  </div>
                }
                icon={
                  <div className="w-fit rounded-lg bg-brand-50 p-2 dark:bg-slate-800">
                    {icons[family.title]}
                  </div>
                }
                className={i === 0 || i === 3 ? 'md:col-span-2' : ''}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
