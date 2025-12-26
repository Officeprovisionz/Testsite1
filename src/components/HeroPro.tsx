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
