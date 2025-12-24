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

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <BorderBeam size={250} duration={12} delay={9} />

          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {siteConfig.brand.name}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Checklist-based delivery
              </p>
              <p className="mt-3 max-w-prose leading-relaxed text-slate-600 dark:text-slate-300">
                Clear scope, consistent checklists, and fast communication—so you can manage
                cleaning like a system, not a surprise.
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 dark:text-slate-400">
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner dark:border-slate-700 dark:bg-slate-800">
                {/* Placeholder for device mock or dashboard view */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <span className="text-sm">Dashboard Preview</span>
                </div>
                {/* Abstract UI elements */}
                <div className="absolute left-4 right-4 top-4 h-2 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="absolute left-4 right-4 top-8 h-2 w-1/2 rounded-full bg-slate-200 dark:bg-slate-700"></div>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent dark:from-slate-900"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
