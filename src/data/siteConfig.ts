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
    name: 'SparkleClean Co.',
    tagline: 'Reliable, detail-first cleaning—done the right way.',
    city: 'Chicago, IL',
  },
  contact: {
    phoneDisplay: '(312) 555-0123',
    phoneE164: '+13125550123',
    email: 'hello@sparklecleanco.example',
    smsBody: 'Hi SparkleClean Co! I’d like a cleaning quote.',
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
    'Kitchens & bathrooms cleaned and sanitized',
    'Floors vacuumed and mopped',
    'Dusting on reachable surfaces',
    'Trash removed (upon request)',
  ],
  services: [
    {
      title: 'Standard Home Cleaning',
      description: 'A dependable reset for busy weeks—clean, calm, and comfortable.',
      bullets: [
        'Bedrooms & living areas',
        'Kitchen wipe-down',
        'Bathroom refresh',
        'Floors throughout',
      ],
    },
    {
      title: 'Deep Cleaning',
      description:
        'For the “let’s really get it done” clean—great for first visits or seasonal resets.',
      bullets: [
        'Detail dusting',
        'Baseboards (accessible)',
        'Extra kitchen attention',
        'Soap scum & grout focus',
      ],
    },
    {
      title: 'Move In / Move Out',
      description: 'Help make transitions easier with a thorough, checklist-driven clean.',
      bullets: [
        'Empty home cleaning',
        'Inside cabinets (optional)',
        'Inside fridge/oven (optional)',
        'Final walk-through notes',
      ],
    },
    {
      title: 'Office & Small Business',
      description: 'Keep your space welcoming for clients and comfortable for your team.',
      bullets: ['Reception & common areas', 'Restrooms', 'Trash & floors', 'After-hours options'],
    },
  ] satisfies Service[],
  pricing: {
    note: 'Pricing depends on home size, condition, pets, add-ons, and frequency. We’ll confirm a fixed quote before service.',
    tiers: [
      {
        name: 'Standard',
        startingAt: '$149',
        bestFor: 'Upkeep cleans & recurring visits',
        includes: ['Core rooms', 'Floors', 'Surfaces', 'Bathroom refresh'],
        disclaimer: 'Starting price for smaller spaces. Final quote after details.',
      },
      {
        name: 'Deep Clean',
        startingAt: '$249',
        bestFor: 'First-time cleans & seasonal resets',
        includes: ['Extra detail work', 'More time per room', 'Build-up attention'],
        disclaimer: 'Recommended for first appointment for best results.',
      },
      {
        name: 'Move In/Out',
        startingAt: '$299',
        bestFor: 'Empty homes & turnovers',
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
      quote: 'Showed up on time, communicated clearly, and the place felt brand new.',
    },
    {
      name: 'Samira K.',
      location: 'Wicker Park',
      quote:
        'Loved the attention to details. Bathrooms were spotless and the floors looked amazing.',
    },
    {
      name: 'Chris M.',
      location: 'West Loop',
      quote: 'Easy booking and professional team. Great for keeping up with a busy schedule.',
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
    title: 'SparkleClean Co. | Cleaning services in Chicago, IL',
    description:
      'Mobile-first landing page starter for a cleaning company: services, pricing, FAQs, and a static contact form that works on GitHub Pages.',
    themeColor: '#0891b2',
  },
  analytics: {
    enabled: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
