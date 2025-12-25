import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    bullets: z.array(z.string()),
    category: z.enum(['standard', 'specialty']).optional(),
  }),
});

const industries = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    bullets: z.array(z.string()),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    location: z.string(),
    quote: z.string(),
  }),
});

const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

export const collections = {
  services,
  industries,
  testimonials,
  faqs,
};
