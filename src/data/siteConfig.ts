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
    tagline:
      'Office cleaning, supply restocking, and facilities support—delivered with checklists and clear communication.',
    city: 'San Francisco, CA',
  },
  contact: {
    phoneDisplay: '(415) 555-0123',
    phoneE164: '+14155550123',
    email: 'hello@officeprovisionz.example',
    smsBody: 'Hi Office Provisionz — I’d like a quote for cleaning + supplies support.',
  },
  hours: {
    lines: ['Mon–Fri: 8am–6pm', 'Sat: 9am–2pm', 'Sun: Closed'],
  },
  trustBadges: [
    {
      title: 'Insured',
      description: 'Coverage details available during quoting.',
    },
    {
      title: 'Checklist-driven',
      description: 'Consistent results across visits, teams, and shifts.',
    },
    {
      title: 'Fast response',
      description: 'Quick replies during business hours.',
    },
  ],
  whatIncluded: [
    'Restrooms cleaned and sanitized',
    'Breakroom wipe-down',
    'Floors vacuumed and mopped',
    'Trash replaced and removed',
    'High-touch surfaces (reachable)',
    'Checklist verification',
  ],
  services: [
    {
      title: 'Office Cleaning',
      description: 'Routine cleaning to keep your workspace client-ready and team-friendly.',
      bullets: [
        'Work areas & common spaces (reachable surfaces)',
        'Breakroom/kitchenette wipe-down',
        'Restrooms cleaned and restocked',
        'Floors throughout (vacuum + mop as applicable)',
      ],
    },
    {
      title: 'Supplies & Restocking',
      description: 'We keep essentials stocked so your team doesn’t have to chase supplies.',
      bullets: [
        'Paper goods & soap (per checklist)',
        'Breakroom essentials (optional)',
        'Inventory checklists + reorder notes',
        'Delivery coordination and put-away (optional)',
      ],
    },
    {
      title: 'Facilities Support',
      description: 'Light facilities support to keep your space running smoothly.',
      bullets: [
        'Punch-list items and minor fixes (scope-dependent)',
        'Assembly and setup support',
        'Vendor coordination',
        'On-site checks and walkthrough notes',
      ],
    },
  ] satisfies Service[],
  pricing: {
    note: 'Pricing depends on square footage, condition, access, frequency, and add-ons. We confirm scope and a fixed quote before service.',
    tiers: [
      {
        name: 'Essential',
        startingAt: '$199',
        bestFor: 'Small offices & weekly upkeep',
        includes: ['Work areas', 'Restrooms', 'Breakroom', 'Floors + trash'],
        disclaimer: 'Starting price. Final quote after a quick scope check.',
      },
      {
        name: 'Standard',
        startingAt: '$349',
        bestFor: 'Larger spaces & multi-room suites',
        includes: ['More time per visit', 'Detail work', 'High-touch focus'],
        disclaimer: 'Great for client-facing spaces and shared breakrooms.',
      },
      {
        name: 'Managed',
        startingAt: '$599',
        bestFor: 'Cleaning + restocking + facilities support',
        includes: [
          'Cleaning plan',
          'Restocking checklist',
          'Monthly walkthrough',
          'Priority support',
        ],
        disclaimer: 'Best for teams that want one reliable point of contact.',
      },
    ] satisfies PricingTier[],
  },
  areasServed: {
    title: 'Areas served around San Francisco',
    items: [
      'Downtown / Financial District',
      'SoMa',
      'Mission Bay',
      'Mission District',
      'Civic Center',
      'Dogpatch',
      'South Beach / Embarcadero',
      'Hayes Valley (select)',
      'Potrero Hill (select)',
    ],
  },
  testimonials: [
    {
      name: 'Jordan R.',
      location: 'SoMa',
      quote:
        'On time, professional, and the office looked client-ready. Communication was excellent.',
    },
    {
      name: 'Samira K.',
      location: 'Financial District',
      quote:
        'Consistent results visit-to-visit. The checklist makes it easy to request tweaks and track scope.',
    },
    {
      name: 'Chris M.',
      location: 'Mission Bay',
      quote:
        'Easy scheduling and a noticeable difference in restrooms and common areas. Fast responses, too.',
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      question: 'Do you bring your own supplies and equipment?',
      answer:
        'Yes—we bring standard supplies and equipment. If you prefer specific products or your building has requirements, we’ll accommodate.',
    },
    {
      question: 'Can you restock paper goods and breakroom supplies?',
      answer:
        'Yes. We can restock items like paper towels, toilet paper, soap, and select breakroom essentials based on an agreed checklist.',
    },
    {
      question: 'Do you offer facilities support?',
      answer:
        'We offer light facilities support (punch-list items, setup help, and coordination). For specialized work we can coordinate vendors.',
    },
    {
      question: 'How do you handle quality?',
      answer:
        'We follow a checklist and encourage feedback. If something was missed, tell us within 24 hours and we’ll work with you to resolve it.',
    },
  ] satisfies FAQItem[],
  seo: {
    title:
      'Office Provisionz | Office cleaning, supplies & facilities support in San Francisco, CA',
    description:
      'Office cleaning, supply restocking, and facilities support in San Francisco. Clear checklists, consistent results, and fast quotes.',
    themeColor: 'hsl(190 85% 38%)',
  },
  analytics: {
    enabled: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
