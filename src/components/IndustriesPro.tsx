import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/utils';

export function IndustriesPro() {
  const base = import.meta.env.BASE_URL;
  const href = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

  const items = siteConfig.industries.map((industry, i) => ({
    title: industry.title,
    description: (
      <div className="flex flex-col gap-2">
        <p>{industry.description}</p>
        <ul className="mt-2 space-y-1">
          {industry.bullets.map((bullet, idx) => (
            <li key={idx} className="text-subtle flex items-center gap-2 text-xs">
              <span className="h-1 w-1 rounded-full bg-brand-500" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    ),
    className: i === 0 || i === 3 ? 'md:col-span-2' : '',
  }));

  return (
    <section className="section section-muted" id="industries">
      <div className="container-page">
        <div className="mb-12 text-center">
          <p className="eyebrow">Industries</p>
          <h2 className="heading-2 mt-2">Who we serve</h2>
          <p className="lede mx-auto">
            Commercial cleaning built for real workplaces—scoped clearly and delivered consistently.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {items.map((item, i) => {
            const contactLink = href(`contact/?industry=${encodeURIComponent(item.title)}`);
            return (
              <a
                key={i}
                href={contactLink}
                className={cn(
                  'glass-panel border-app card-hover group relative overflow-hidden rounded-2xl border p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg))]',
                  item.className
                )}
                aria-label={`${item.title} — request a quote`}
              >
                <div
                  aria-hidden="true"
                  className="from-brand-200/14 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-brand-300/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative">
                  <h3 className="text-strong text-lg font-bold tracking-tight">{item.title}</h3>
                  <div className="text-muted mt-2 text-sm leading-relaxed">{item.description}</div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
                    <span>Request a quote</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
