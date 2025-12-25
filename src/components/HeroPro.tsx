import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { GridBackground } from './ui/GridBackground';
import { Button } from './ui/button';
import { siteConfig } from '@/data/siteConfig';
import { ArrowRight, Phone } from 'lucide-react';

export const HeroPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;
  const telHref = `tel:${siteConfig.contact.phoneE164}`;

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <GridBackground />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(14, 165, 233, 0.5)" />

      <div className="container-page relative z-10 pb-20 pt-32 lg:pb-32 lg:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-brand-200 bg-brand-50/50 px-3 py-1 text-sm font-medium text-brand-800 backdrop-blur-sm dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-200">
            <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-brand-500"></span>
            {siteConfig.brand.name}
          </div>

          <h1 className="heading-1 text-balance text-5xl font-bold tracking-tight md:text-7xl">
            A cleaner office—{' '}
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-brand-200">
              simplified.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="font-semibold text-foreground">{siteConfig.brand.city}</span>.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 gap-2 px-8 text-base shadow-lg shadow-brand-500/20"
              asChild
            >
              <a href={telHref}>
                <Phone className="h-4 w-4" />
                Call {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 gap-2 bg-white/50 px-8 text-base backdrop-blur-sm hover:bg-white/80 dark:bg-slate-950/50"
              asChild
            >
              <a href={href('checklist/')}>
                Preview checklist
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-brand-100 dark:border-slate-950 dark:bg-brand-900"
                  />
                ))}
              </div>
              <span>Trusted by local businesses</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
