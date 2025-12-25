import React from 'react';
import { siteConfig } from '@/data/siteConfig';

export function ServicesPro() {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

  return (
    <section className="section" id="services">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="eyebrow">Services</p>
          <h2 className="heading-2 mt-2">Service families</h2>
          <p className="lede mx-auto max-w-2xl">
            Clear scope, consistent delivery, and one point of contact—built for busy workplaces.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {siteConfig.serviceFamilies.map((family) => {
            const services = family.prefillServices.join(',');
            const contactLink = href(`contact/?services=${encodeURIComponent(services)}`);

            return (
              <a
                key={family.title}
                href={contactLink}
                className="glass-panel border-app card-hover group relative overflow-hidden rounded-2xl border p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg))]"
                aria-label={`${family.title} — request a quote`}
              >
                <div
                  aria-hidden="true"
                  className="from-brand-200/14 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-brand-300/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative">
                  <h3 className="text-strong text-lg font-bold tracking-tight">{family.title}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{family.description}</p>

                  <ul className="check-list check-list--compact text-subtle mt-4 text-sm sm:grid-cols-3">
                    {family.bullets.map((b) => (
                      <li key={b}>
                        <span className="check-icon check-icon--sm" aria-hidden="true">
                          ✓
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="glass-card border-app overflow-hidden rounded-2xl border p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-strong text-sm font-semibold">Most requested</p>
                <p className="text-muted mt-1 text-sm">
                  Common asks we can scope quickly during quoting.
                </p>
              </div>
              <a
                className="link link-muted text-sm font-semibold"
                href={href('services/#specialty')}
              >
                View add-ons →
              </a>
            </div>

            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              {siteConfig.mostRequestedServices.map((item) => (
                <li key={item} className="text-subtle flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
