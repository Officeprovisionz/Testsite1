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
    <section className="section py-20" id="services">
      <div className="container-page">
        <div className="mb-12 text-center">
          <h2 className="heading-2">Our Expertise</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Comprehensive facility solutions tailored to your standards.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-6xl gap-6 md:auto-rows-[16.5rem] md:grid-cols-2">
          {siteConfig.serviceFamilies.map((family) => {
            return (
              <BentoGridItem
                key={family.title}
                title={family.title}
                description={family.description}
                icon={
                  <div className="w-fit rounded-lg border border-brand-100 bg-brand-50/70 p-2 dark:border-brand-800/40 dark:bg-brand-950/25">
                    {icons[family.title]}
                  </div>
                }
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
