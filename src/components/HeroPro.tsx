import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { siteConfig } from '@/data/siteConfig';

export const HeroPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;
  const telHref = `tel:${siteConfig.contact.phoneE164}`;
  const galleryPreviewA = href('gallery/02.svg');
  const galleryPreviewB = href('gallery/04.svg');

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 grid gap-10 pb-20 pt-24 lg:grid-cols-2 lg:items-center lg:pb-32 lg:pt-32">
        <div>
          <p className="eyebrow">{siteConfig.brand.name}</p>
          <h1 className="heading-1 mt-4">
            A cleaner office—{' '}
            <span className="text-[rgb(var(--color-brand-700))] dark:text-[rgb(var(--color-brand-300))]">
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
              Request a walkthrough
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
            </div>
          </div>
        </div>

        <div className="glass-card relative overflow-hidden p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="from-brand-200/16 to-brand-300/12 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">Trusted service</p>
              <div className="flex items-center gap-2" aria-label="Five-star care">
                <span className="text-amber-500" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="text-subtle text-sm">Checklist-driven results.</span>
              </div>
            </div>

            <p className="text-muted mt-3 text-sm">
              Want extra confidence? Ask for our current checklist and recent references during your
              walkthrough.
            </p>

            <div className="mt-6 grid gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="border-app surface relative aspect-[4/3] overflow-hidden rounded-2xl border">
                  <img
                    src={galleryPreviewA}
                    alt="Example of a supported space"
                    loading="eager"
                    className="h-full w-full object-cover opacity-95"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent"
                  ></div>
                </div>
                <div className="border-app surface relative aspect-[4/3] translate-y-4 rotate-[-1deg] overflow-hidden rounded-2xl border">
                  <img
                    src={galleryPreviewB}
                    alt="Example of a recently cleaned area"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-95"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
