import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { Sparkles, Building, Coffee, Wrench } from 'lucide-react';
import { Eyebrow } from './ui/Eyebrow';

export function ServicesPro() {
  const icons: Record<string, React.ReactNode> = {
    'Office Cleaning': <Sparkles className="text-brand h-6 w-6" />,
    'Professional Janitorial': <Building className="text-brand h-6 w-6" />,
    'Coffee, Snacks & Restocking': <Coffee className="text-brand h-6 w-6" />,
    'Facilities Support': <Wrench className="text-brand h-6 w-6" />,
  };

  return (
    <section className="section" id="services">
      <div className="container-page">
        <div className="mb-12 text-center">
          <Eyebrow className="mx-auto">Our Expertise</Eyebrow>
          <h2 className="heading-2 mt-4">Comprehensive Facility Solutions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Tailored cleaning and support services designed to meet the highest standards of
            professionalism and hygiene.
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
                  <div className="border-brand/20 bg-brand/10 flex h-10 w-10 items-center justify-center rounded-lg border">
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
