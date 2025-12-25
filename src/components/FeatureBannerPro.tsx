import React from 'react';
import { BorderBeam } from './ui/BorderBeam';
import { siteConfig } from '@/data/siteConfig';

export const FeatureBannerPro = () => {
  return (
    <section className="section pb-0" aria-label="What makes us different">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow">Makes us different</p>
          <h2 className="heading-2 mt-2">Makes operations easier</h2>
        </div>

        <div className="glass-card border-app relative mt-10 overflow-hidden rounded-2xl border">
          <BorderBeam
            size={250}
            duration={12}
            delay={9}
            colorFrom="rgb(var(--color-brand-500))"
            colorTo="rgb(var(--color-brand-700))"
          />

          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-subtle text-sm font-medium">{siteConfig.brand.name}</p>
              <p className="text-strong mt-2 text-2xl font-semibold tracking-tight">
                Checklist-based delivery
              </p>
              <p className="mt-3 max-w-prose leading-relaxed text-muted">
                Clear scope, consistent checklists, and fast communication—so you can manage
                cleaning like a system, not a surprise.
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span
                    className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600"
                    aria-hidden="true"
                  ></span>
                  <span>Defined scope + add-ons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600"
                    aria-hidden="true"
                  ></span>
                  <span>After-hours friendly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600"
                    aria-hidden="true"
                  ></span>
                  <span>Supplies management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-600"
                    aria-hidden="true"
                  ></span>
                  <span>Insured & bonded</span>
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="border-app surface-muted relative aspect-[4/3] overflow-hidden rounded-xl border shadow-inner">
                {/* Placeholder for device mock or dashboard view */}
                <div className="text-subtle absolute inset-0 flex items-center justify-center">
                  <span className="text-sm">Dashboard preview</span>
                </div>
                {/* Abstract UI elements */}
                <div className="absolute left-4 right-4 top-4 h-2 w-3/4 rounded-full bg-[rgb(var(--color-border))] opacity-60"></div>
                <div className="absolute left-4 right-4 top-8 h-2 w-1/2 rounded-full bg-[rgb(var(--color-border))] opacity-60"></div>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[rgb(var(--color-surface))] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
