import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    title: 'What affects the price',
    features: [
      'Square footage + layout complexity',
      'Frequency (one-time vs recurring)',
      'Access window (after-hours/weekends)',
      'Add-ons (restocking, floor care, windows)',
    ],
  },
  {
    title: 'What you get',
    features: [
      'Checklist-based scope (no guesswork)',
      'Simple add-ons you can request anytime',
      'Follow-up support if anything needs attention',
    ],
  },
];

export const PricingPro = () => {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      {plans.map((plan, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.title}</h3>
          <ul className="mt-6 space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex-none rounded-full bg-brand-100 p-1 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-slate-600 dark:text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
