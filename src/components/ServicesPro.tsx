import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { Sparkles, Box, ClipboardCheck, Wrench } from 'lucide-react';
import { RotatingImage } from './ui/RotatingImage';

export function ServicesPro() {
  const icons: Record<string, React.ReactNode> = {
    'Janitorial & recurring cleaning': <Sparkles className="h-6 w-6 text-brand-500" />,
    'Deep / detail cleaning': <ClipboardCheck className="h-6 w-6 text-brand-500" />,
    'Supplies & restocking': <Box className="h-6 w-6 text-brand-500" />,
    'Facilities support': <Wrench className="h-6 w-6 text-brand-500" />,
  };

  const rotatingMediaByFamily: Record<string, string[]> = {
    'Janitorial & recurring cleaning': [
      'gallery/services/janitorial-01.jpg',
      'gallery/services/janitorial-02.jpg',
      'gallery/services/janitorial-03.jpg',
    ],
    'Deep / detail cleaning': [
      'gallery/services/detail-01.jpg',
      'gallery/services/detail-02.jpg',
      'gallery/services/detail-03.jpg',
    ],
    'Supplies & restocking': [
      'gallery/services/restocking-01.jpg',
      'gallery/services/restocking-02.jpg',
      'gallery/services/restocking-03.jpg',
    ],
    'Facilities support': [
      'gallery/services/facilities-01.jpg',
      'gallery/services/facilities-02.jpg',
      'gallery/services/facilities-03.jpg',
    ],
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
            const sources = (rotatingMediaByFamily[family.title] ?? []).map((src) => ({
              src,
              alt: '',
            }));

            return (
              <BentoGridItem
                key={family.title}
                title={family.title}
                description={family.description}
                header={
                  sources.length ? (
                    <RotatingImage
                      sources={sources}
                      intervalMs={5000}
                      className="h-40 w-full rounded-2xl"
                      imgClassName="object-cover"
                      overlayClassName="bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent"
                    />
                  ) : null
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
