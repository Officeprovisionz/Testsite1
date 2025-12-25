import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Walkthrough + scope',
    description:
      'Tell us your space and goals. We confirm details, lock the scope, and send a clear written quote.',
  },
  {
    number: '2',
    title: 'Checklist cleaning',
    description: 'We use a consistent checklist so the important details don’t get missed.',
  },
  {
    number: '3',
    title: 'Communication',
    description: 'We let you know when we arrive and leave, and flag any issues immediately.',
  },
];

export const ProcessStepsPro = () => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-panel card-hover group relative overflow-hidden p-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative z-10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-600/20">
              {step.number}
            </span>
            <h3 className="text-strong mt-4 text-xl font-bold">{step.title}</h3>
            <p className="mt-2 text-muted">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
