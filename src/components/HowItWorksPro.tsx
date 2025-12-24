import React from 'react';
import { TracingBeam } from './ui/TracingBeam';
import { siteConfig } from '@/data/siteConfig';

export function HowItWorksPro() {
  return (
    <section className="relative w-full overflow-hidden py-20" id="how-it-works">
      <div className="container-page mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          How it works
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          A simple, repeatable process that keeps service consistent across visits.
        </p>
      </div>

      <TracingBeam className="px-6">
        <div className="relative mx-auto max-w-2xl pt-4 antialiased">
          {siteConfig.processSteps.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-600 ring-4 ring-white dark:bg-brand-900 dark:text-brand-300 dark:ring-slate-950">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
              </div>

              <div className="prose prose-sm dark:prose-invert ml-12">
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </section>
  );
}
