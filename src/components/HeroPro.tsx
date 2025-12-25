import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { GridBackground } from './ui/GridBackground';
import { Button } from './ui/button';
import { siteConfig } from '@/data/siteConfig';
import { ArrowRight, Phone, Shield, CheckCircle, Clock } from 'lucide-react';

export const HeroPro = () => {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;
  const telHref = `tel:${siteConfig.contact.phoneE164}`;

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <GridBackground />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(14, 165, 233, 0.4)" />

      <div className="container-page relative z-10 pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge - removed pulse animation for cleaner look */}
          <div className="mb-6 inline-flex items-center rounded-full border border-brand-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur-sm dark:border-brand-700/40 dark:bg-brand-950/60 dark:text-brand-200">
            <span className="mr-2 flex h-1.5 w-1.5 rounded-full bg-brand-500"></span>
            {siteConfig.brand.name}
          </div>

          <h1 className="heading-1 text-balance">
            A cleaner office—{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent dark:from-brand-300 dark:via-brand-400 dark:to-brand-500">
              simplified.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="font-semibold text-foreground">{siteConfig.brand.city}</span>.
          </p>

          {/* CTA buttons - primary accent for phone, secondary for checklist */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={telHref}
              className="btn-accent inline-flex h-12 items-center gap-2 px-8 text-base"
            >
              <Phone className="h-4 w-4" />
              Call {siteConfig.contact.phoneDisplay}
            </a>
            <Button
              variant="outline"
              size="lg"
              className="h-12 gap-2 border-brand-200/50 bg-white/70 px-8 text-base backdrop-blur-sm transition-all hover:border-brand-300 hover:bg-white/90 dark:border-brand-700/40 dark:bg-slate-900/50"
              asChild
            >
              <a href={href('contact/')}>
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Trust indicators - replaced empty avatars with real badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground md:gap-8">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-500" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Checklist-Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-500" />
              <span>Fast Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
