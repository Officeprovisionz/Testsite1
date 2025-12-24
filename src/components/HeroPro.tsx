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
    <section className="bg-grid-white/[0.02] relative w-full overflow-hidden bg-slate-950 antialiased">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="container-page relative z-10 grid gap-10 pb-24 pt-24 lg:grid-cols-2 lg:items-center lg:pb-40 lg:pt-32">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            {siteConfig.brand.name}
          </p>
          <h1 className="mt-4 text-balance font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl">
            A cleaner office—
            <span className="text-brand-400"> with supplies and facilities support</span>.
          </h1>
          <p className="mt-6 max-w-prose text-pretty text-lg leading-relaxed text-slate-300">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="font-semibold text-white">{siteConfig.brand.city}</span>.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              href={href('contact/')}
            >
              Get Started
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              href={telHref}
            >
              Call/Text {siteConfig.contact.phoneDisplay}
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">Standard visit includes</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {siteConfig.whatIncluded.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">
                Trusted service
              </p>
              <div className="flex items-center gap-2" aria-label="Five-star care">
                <span className="text-amber-400" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="text-sm text-slate-400">Checklist-driven results.</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-300">
              Want extra confidence? Ask for our current checklist and recent references during your
              quote.
            </p>

            <div className="mt-6 grid gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={galleryPreviewA}
                    alt="Example of a supported space"
                    loading="eager"
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"
                  ></div>
                </div>
                <div className="relative aspect-[4/3] translate-y-4 rotate-[-1deg] overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={galleryPreviewB}
                    alt="Example of a recently cleaned area"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider at the bottom to blend into the next section */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
        <svg
          className="h-auto w-full fill-white dark:fill-slate-950"
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 48H1440V0C1440 0 1147 48 720 48C293 48 0 0 0 0V48Z" />
        </svg>
      </div>
    </section>
  );
};
