export type Service = {
  title: string;
  description: string;
  bullets: string[];
};

export type ServiceLevel = {
  name: string;
  bestFor: string;
  includes: string[];
  note?: string;
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

export type Industry = {
  title: string;
  description: string;
  bullets: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceFamily = {
  title: string;
  description: string;
  bullets: string[];
  /** Used for pre-filling the contact form via query params. */
  prefillServices: string[];
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
    smsBody: 'Hi Office Provisionz — I’d like to request a quote for cleaning + supplies support.',
  },
  hours: {
    lines: ['Mon–Fri: 8am–6pm', 'Sat: 9am–2pm', 'Sun: Closed'],
  },

  industries: [
    {
      title: 'Offices & suites',
      description: 'Reliable recurring cleaning for focused workspaces and client-facing areas.',
      bullets: ['After-hours available', 'Checklist-driven scope', 'Fast issue follow-up'],
    },
    {
      title: 'Medical / dental (non-sterile areas)',
      description:
        'Discreet, detail-oriented cleaning for reception, restrooms, breakrooms, and offices.',
      bullets: ['High-touch focus', 'Clear protocols', 'Minimal disruption'],
    },
    {
      title: 'Property management',
      description:
        'Common-area upkeep and turnover support with consistent communication and documentation.',
      bullets: ['Suite turnovers', 'Vendor coordination', 'Walkthrough notes'],
    },
    {
      title: 'Retail & customer spaces',
      description:
        'Keep entrances, floors, and restrooms presentable—especially in high-traffic periods.',
      bullets: ['Entryways + floors', 'Restroom servicing', 'Flexible scheduling'],
    },
  ] satisfies Industry[],

  processSteps: [
    {
      title: 'Request a quote',
      description:
        'Share basics (space, services, frequency). We’ll respond quickly and confirm scope before quoting.',
    },
    {
      title: 'Scope + checklist',
      description:
        'We confirm what’s included, what’s optional, and any building requirements—then lock the scope.',
    },
    {
      title: 'Service delivery',
      description:
        'Your visits follow a consistent checklist for repeatable results across teams and shifts.',
    },
    {
      title: 'Quality follow-up',
      description:
        'Walkthrough notes and fast fixes if anything needs attention. One point of contact.',
    },
  ] satisfies ProcessStep[],
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
      title: 'Recurring Janitorial (Nightly/Weekly)',
      description:
        'Scheduled service for consistent upkeep—ideal for busy offices and shared spaces.',
      bullets: [
        'High-touch sanitizing (handles, switches, shared points)',
        'Trash + recycling, liners as needed',
        'Kitchen/breakroom reset',
        'Restroom servicing + checklist verification',
      ],
    },
    {
      title: 'Deep / Detail Cleaning',
      description:
        'A thorough reset for first visits, quarterly maintenance, or high-traffic periods.',
      bullets: [
        'Detail dusting (edges, corners, reachable ledges)',
        'Build-up removal in restrooms and breakrooms',
        'Spot treatment and extra time per room',
        'Optional add-ons coordinated during scoping',
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

  serviceFamilies: [
    {
      title: 'Janitorial & recurring cleaning',
      description:
        'Reliable scheduled service for consistent upkeep—ideal for offices, shared spaces, and multi-room suites.',
      bullets: ['Checklist-driven scope', 'After-hours options', 'Quality follow-up'],
      prefillServices: ['Recurring Janitorial (Nightly/Weekly)', 'Office Cleaning'],
    },
    {
      title: 'Deep / detail cleaning',
      description:
        'A reset for first visits, quarterly maintenance, turnovers, or high-traffic periods.',
      bullets: ['Detail work', 'Build-up removal', 'Coordinated add-ons'],
      prefillServices: ['Deep / Detail Cleaning', 'Move-In / Move-Out (Office Turnovers)'],
    },
    {
      title: 'Supplies & restocking',
      description:
        'Keep essentials stocked so teams don’t chase paper goods, soap, and breakroom basics.',
      bullets: ['Inventory checks', 'Restock checklists', 'Reorder notes'],
      prefillServices: ['Supplies & Restocking'],
    },
    {
      title: 'Facilities support',
      description:
        'Light support and coordination to keep your workplace running smoothly between vendors.',
      bullets: ['Punch-list items (scope dependent)', 'Vendor coordination', 'On-site checks'],
      prefillServices: ['Facilities Support'],
    },
  ] satisfies ServiceFamily[],

  mostRequestedServices: [
    'Recurring janitorial (nightly / weekly)',
    'Restroom servicing + restocking',
    'Breakroom/kitchenette reset',
    'Day porter / daytime upkeep',
    'Office turnovers (move-in / move-out)',
    'Post-construction cleanup',
    'Interior glass + touch-ups',
    'Periodic floor care',
  ] as const,

  specialtyServices: [
    {
      title: 'Move-In / Move-Out (Office Turnovers)',
      description: 'Turnover cleaning for suites, offices, and commercial spaces between tenants.',
      bullets: [
        'Empty-space reset and detail pass',
        'Kitchenette and restroom deep clean',
        'Inside cabinets/appliances (optional)',
        'Walkthrough notes + checklist closeout',
      ],
    },
    {
      title: 'Post-Construction Cleanup',
      description: 'Dust control and final detailing after construction or renovations.',
      bullets: [
        'Fine dust removal (reachable surfaces)',
        'Sticker/adhesive residue (scope-dependent)',
        'Floor detailing + vacuum/HEPA as applicable',
        'Final polish for move-in readiness',
      ],
    },
    {
      title: 'Interior Glass & Window Cleaning',
      description: 'Interior glass detailing for offices, conference rooms, and entry areas.',
      bullets: [
        'Interior glass and partition cleaning',
        'Conference room and entry touch-ups',
        'Smudge removal and spot detailing',
        'Coordinated around privacy/schedule needs',
      ],
    },
    {
      title: 'Floor Care (Hard Floors)',
      description: 'Periodic floor refresh to keep high-traffic areas looking sharp.',
      bullets: [
        'Scrub and refresh (surface dependent)',
        'Edge/detail focus in traffic lanes',
        'Entry mat and threshold attention',
        'Recommendations for frequency and finish',
      ],
    },
    {
      title: 'Carpet & Upholstery Care (Coordination)',
      description: 'We can coordinate periodic carpet/upholstery refresh for a complete clean.',
      bullets: [
        'Spot treatment planning',
        'Vendor coordination when needed',
        'Scheduling around office hours',
        'Pre/post walkthrough notes',
      ],
    },
    {
      title: 'Day Porter / Daytime Upkeep',
      description: 'Light daytime maintenance for busy offices and high-traffic common areas.',
      bullets: [
        'Restroom touch-ups and restocking checks',
        'Kitchen/breakroom resets',
        'Trash/recycling monitoring',
        'On-site requests and quick response',
      ],
    },
    {
      title: 'Disinfection Add-On (Targeted)',
      description: 'Targeted disinfecting of high-touch points during outbreaks or peak seasons.',
      bullets: [
        'High-touch focus areas identified during scoping',
        'Compatible product plan (as requested)',
        'Checklist confirmation of treated areas',
        'Scheduling for minimal disruption',
      ],
    },
  ] satisfies Service[],
  scope: {
    note: 'Scope depends on your layout, frequency, access window, and any add-ons. We confirm what’s included before service and provide a clear written quote.',
    levels: [
      {
        name: 'Essential',
        bestFor: 'Small offices & steady upkeep',
        includes: ['Work areas', 'Restrooms', 'Breakroom', 'Floors + trash'],
        note: 'A clean baseline with clear checklist scope.',
      },
      {
        name: 'Standard',
        bestFor: 'Larger spaces & multi-room suites',
        includes: ['More time per visit', 'Detail work', 'High-touch focus'],
        note: 'Great for client-facing spaces and shared breakrooms.',
      },
      {
        name: 'Managed',
        bestFor: 'Cleaning + restocking + facilities support',
        includes: [
          'Cleaning plan',
          'Restocking checklist',
          'Walkthrough cadence',
          'Priority support',
        ],
        note: 'Best for teams that want one reliable point of contact.',
      },
    ] satisfies ServiceLevel[],
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
