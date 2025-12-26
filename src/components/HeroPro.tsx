import { Button } from './ui/button';
import { siteConfig } from '@/data/siteConfig';
import { makeHref } from '@/lib/nav';
import { makeTelHref } from '@/lib/links';
import { ArrowRight, Phone } from 'lucide-react';

export const HeroPro = () => {
  const href = makeHref(import.meta.env.BASE_URL);
  const telHref = makeTelHref(siteConfig.contact.phoneE164);
  const base = import.meta.env.BASE_URL;
  const heroImg = `${base}gallery/01.jpg`;
  const heroFallback = `${base}gallery/01.svg`;

  return (
    <section className="hero-splash relative w-full overflow-hidden antialiased">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover opacity-[0.18]"
          loading="eager"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== heroFallback) e.currentTarget.src = heroFallback;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-transparent dark:from-slate-950/75 dark:via-slate-950/60" />
      </div>

      <div className="container-page relative z-10 pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">{siteConfig.brand.name}</p>

          <h1 className="heading-1 text-balance">A cleaner office—simplified.</h1>

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
        </div>
      </div>
    </section>
  );
};
