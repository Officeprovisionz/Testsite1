import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { siteConfig } from '@/data/siteConfig';

export const HeroPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;
  const telHref = `tel:${siteConfig.contact.phoneE164}`;

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="rgb(var(--color-brand-200))"
      />
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
            <a className="btn-primary" href={href('contact/')}>
              Request a quote
            </a>
            <a className="btn-secondary" href={telHref}>
              Call/Text {siteConfig.contact.phoneDisplay}
            </a>
            <a className="btn-secondary" href={href('checklist/')}>
              Preview checklist
            </a>
          </div>

          <div className="glass-panel relative mt-8 overflow-hidden p-6">
            <div
              aria-hidden="true"
              className="from-brand-200/14 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-brand-300/10 opacity-70"
            />
            <div className="relative">
              <p className="text-strong text-sm font-semibold">Standard visit includes</p>
              <ul className="check-list check-list--compact text-muted mt-4 text-sm sm:grid-cols-2">
                {siteConfig.whatIncluded.map((item) => (
                  <li key={item}>
                    <span className="check-icon check-icon--sm" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-subtle text-xs">
                  Want to see examples? Browse recent work photos.
                </p>
                <a className="link link-muted text-sm" href={href('about/#proof')}>
                  View proof →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
