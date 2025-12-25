import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { siteConfig } from '@/data/siteConfig';

export const HeroPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;
  const telHref = `tel:${siteConfig.contact.phoneE164}`;

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 pb-20 pt-24 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{siteConfig.brand.name}</p>
          <h1 className="heading-1 mt-4">
            A cleaner office—{' '}
            <span className="text-brand-700 dark:text-brand-300">
              with supplies and facilities support
            </span>
            .
          </h1>
          <p className="text-muted mt-6 max-w-prose text-pretty text-lg leading-relaxed">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="text-strong font-semibold">{siteConfig.brand.city}</span>.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a className="btn-secondary" href={telHref}>
              Call/Text {siteConfig.contact.phoneDisplay}
            </a>
            <a className="btn-secondary" href={href('checklist/')}>
              Preview checklist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
