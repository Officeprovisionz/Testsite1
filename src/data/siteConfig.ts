export type Service = {
  title: string;
  description: string;
  bullets: string[];
};

export type PricingTier = {
  name: string;
  startingAt: string;
  bestFor: string;
  includes: string[];
  disclaimer?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
};

export const siteConfig = {
  brand: {
    name: 'Office Provisionz',
    tagline: 'Commercial-grade cleaning with clear communication and consistent checklists.',
    city: 'Chicago, IL',
  },
  contact: {
    phoneDisplay: '(312) 555-0123',
    phoneE164: '+13125550123',
    email: 'hello@officeprovisionz.example',
    smsBody: 'Hi Office Provisionz — I’d like a cleaning quote.',
  },
  hours: {
    lines: ['Mon–Fri: 8am–6pm', 'Sat: 9am–2pm', 'Sun: Closed'],
  },
  trustBadges: [
    {
      title: 'Insured',
      description: 'Coverage details available on request.',
    },
    {
      title: 'Background-checked team',
      description: 'We hire carefully and train consistently.',
    },
    {
      title: 'Satisfaction-first policy',
      description: 'Tell us within 24 hours if something was missed.',
    },
  ],
  whatIncluded: [
    'Restrooms cleaned and sanitized',
    'Floors vacuumed and mopped',
    'High-touch surfaces disinfected',
    'Trash replaced and removed (as requested)',
  ],
  services: [
    {
      title: 'Standard Office Cleaning',
      description: 'Reliable upkeep to keep your workspace clean, professional, and work-ready.',
      bullets: [
        'Common areas & workstations (reachable surfaces)',
        'Breakroom wipe-down',
        'Restrooms serviced',
        'Floors throughout',
      ],
    },
    {
      title: 'Deep Cleaning',
      description:
        'A detailed reset for first visits, quarterly maintenance, or high-traffic spaces.',
      bullets: [
        'Detail dusting and edges',
        'Baseboards (accessible)',
        'Breakroom and restroom detail work',
        'Build-up removal focus',
      ],
    },
    {
      title: 'Move In / Move Out',
      description: 'A thorough turnover clean for suites, offices, and commercial spaces.',
      bullets: [
        'Empty-space cleaning',
        'Inside cabinets (optional)',
        'Inside fridge/microwave (optional)',
        'Checklist + walk-through notes',
      ],
    },
    {
      title: 'Office & Small Business',
      description: 'Flexible scheduling to keep client-facing spaces consistently presentable.',
      bullets: ['Reception & common areas', 'Restrooms', 'Trash & floors', 'After-hours options'],
    },
  ] satisfies Service[],
  pricing: {
    note: 'Pricing depends on square footage, condition, add-ons, and frequency. We’ll confirm a fixed quote before service.',
    tiers: [
      {
        name: 'Standard',
        startingAt: '$149',
        bestFor: 'Ongoing maintenance & recurring visits',
        includes: ['Core rooms', 'Floors', 'Surfaces', 'Bathroom refresh'],
        disclaimer: 'Starting price for smaller spaces. Final quote after details.',
      },
      {
        name: 'Deep Clean',
        startingAt: '$249',
        bestFor: 'First-time cleans & quarterly resets',
        includes: ['Extra detail work', 'More time per room', 'Build-up attention'],
        disclaimer: 'Recommended for first appointment for best results.',
      },
      {
        name: 'Move In/Out',
        startingAt: '$299',
        bestFor: 'Turnovers & empty spaces',
        includes: [
          'Thorough empty-home clean',
          'Optional appliance/cabinet add-ons',
          'Checklist verification',
        ],
        disclaimer: 'Add-ons available. We’ll confirm scope in writing.',
      },
    ] satisfies PricingTier[],
  },
  areasServed: {
    title: 'Areas served around Chicago',
    items: [
      'Lincoln Park',
      'Lakeview',
      'Wicker Park',
      'Logan Square',
      'West Loop',
      'Hyde Park',
      'Evanston (select)',
    ],
  },
  testimonials: [
    {
      name: 'Jordan P.',
      location: 'Lakeview',
      quote:
        'On time, professional, and the office looked client-ready. Communication was excellent.',
    },
    {
      name: 'Samira K.',
      location: 'Wicker Park',
      quote: 'Great attention to detail—restrooms were spotless and the floors looked incredible.',
    },
    {
      name: 'Chris M.',
      location: 'West Loop',
      quote: 'Easy scheduling and consistent results. Perfect for a busy team and shared spaces.',
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      question: 'Do you bring your own supplies and equipment?',
      answer:
        'Yes—by default we bring standard supplies. If you prefer specific products (or have allergies), let us know and we’ll accommodate.',
    },
    {
      question: 'Are you insured?',
      answer:
        'We operate with insurance appropriate for our work. We can share details during quoting.',
    },
    {
      question: 'What’s your cancellation policy?',
      answer:
        'Life happens. Please notify us as early as possible; same-day cancellations may incur a fee depending on staffing and travel.',
    },
    {
      question: 'Can I request add-ons?',
      answer:
        'Absolutely—common add-ons include inside the fridge, inside the oven, inside cabinets, and extra attention to high-traffic areas.',
    },
    {
      question: 'How do you handle quality?',
      answer:
        'We follow a checklist and encourage feedback. If something was missed, tell us within 24 hours and we’ll work with you to resolve it.',
    },
  ] satisfies FAQItem[],
  seo: {
    title: 'Office Provisionz | Cleaning services in Chicago, IL',
    description:
      'Professional cleaning services with clear pricing, checklists, and fast quotes. Mobile-friendly site built for GitHub Pages.',
    themeColor: '#0891b2',
  },
  analytics: {
    enabled: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
