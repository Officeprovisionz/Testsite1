import { Spotlight } from './ui/Spotlight';
import { GridBackground } from './ui/GridBackground';
import { Button } from './ui/button';
import { siteConfig } from '@/data/siteConfig';
import { makeHref } from '@/lib/nav';
import { makeTelHref } from '@/lib/links';
import { ArrowRight, ClipboardCheck, MessageCircle, Phone, ShieldCheck } from 'lucide-react';

export const HeroPro = () => {
  const href = makeHref(import.meta.env.BASE_URL);
  const telHref = makeTelHref(siteConfig.contact.phoneE164);

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

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
            {siteConfig.brand.tagline} Serving{' '}
            <span className="text-strong font-semibold">{siteConfig.brand.city}</span>.
          </p>

          {/* CTA buttons - primary is the quote request, secondary is phone */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="accent" size="lg" className="h-12 w-full sm:w-auto" asChild>
              <a href={href('contact/')}>
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full justify-center gap-2 sm:w-auto"
              asChild
            >
              <a href={telHref}>
                <Phone className="h-4 w-4" />
                Call {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <span className="pill inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Insured + professional
            </span>
            <span className="pill inline-flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Checklist-driven scope
            </span>
            <span className="pill inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-brand-600" aria-hidden="true" />
              One point of contact
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
