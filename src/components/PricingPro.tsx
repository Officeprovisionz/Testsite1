import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    title: 'What affects the scope',
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
          className="card card-hover relative overflow-hidden p-8"
        >
          <h3 className="heading-3">{plan.title}</h3>
          <ul className="mt-6 space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="check-icon check-icon--sm" aria-hidden="true">
                  ✓
                </span>
                <span className="text-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
