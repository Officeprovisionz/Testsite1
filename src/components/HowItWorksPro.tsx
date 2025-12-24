import React from 'react';
import { TracingBeam } from './ui/TracingBeam';
import { siteConfig } from '@/data/siteConfig';

export function HowItWorksPro() {
  return (
    <section className="section section-creative" id="how-it-works" aria-label="How it works">
      <div className="container-page">
        <div className="mb-12 text-center">
          <p className="eyebrow">Process</p>
          <h2 className="heading-2 mt-2">How it works</h2>
          <p className="lede mx-auto">
            A simple, repeatable process that keeps service consistent across visits.
          </p>
        </div>

        <TracingBeam className="px-0">
          <div className="relative mx-auto max-w-2xl pt-4 antialiased">
            {siteConfig.processSteps.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-600 ring-4 ring-white dark:bg-brand-900 dark:text-brand-300 dark:ring-slate-950">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                </div>

                <div className="ml-12">
                  <p className="text-muted text-base leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
