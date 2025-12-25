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
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-900 text-sm font-semibold text-white shadow-md shadow-brand-900/15 ring-1 ring-white/10">
                    {index + 1}
                  </span>
                  <h3 className="text-strong text-xl font-bold tracking-tight">{item.title}</h3>
                </div>

                <div className="ml-12">
                  <p className="text-base leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
