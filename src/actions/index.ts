// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';

export const server = {
  contact: {
    submit: defineAction({
      accept: 'form',
      input: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        companyName: z.string().optional(),
        email: z.string().email('Invalid email address'),
        phone: z.string().optional(),
        contactMethod: z.string().optional(),
        location: z.string().optional(),
        industry: z.string().min(1, 'Please select an industry'),
        frequency: z.string().optional(),
        startTiming: z.string().optional(),
        servicesNeeded: z.array(z.string()).min(1, 'Please select at least one service'),
        message: z.string().min(10, 'Message must be at least 10 characters'),
        source: z.string().optional(),
        consent: z.string().optional(),
        // Honeypot fields - should be empty/undefined
        website_url: z.string().optional(),
        website: z.string().optional(),
        // Tracking fields
        utm_source: z.string().optional(),
        utm_medium: z.string().optional(),
        utm_campaign: z.string().optional(),
        utm_content: z.string().optional(),
        utm_term: z.string().optional(),
        gclid: z.string().optional(),
        fbclid: z.string().optional(),
        msclkid: z.string().optional(),
        referrer: z.string().optional(),
        landing: z.string().optional(),
      }),
      handler: async (input) => {
        // Honeypot check
        if (input.website_url || input.website) {
          // Silent success for bots
          return { success: true, message: 'Thank you for your message.' };
        }

        // Example: Forward to an external endpoint if configured
        const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT;

        if (endpoint && endpoint.startsWith('http')) {
          try {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(input),
            });

            if (!res.ok) {
              console.error(`Form submission failed: ${res.statusText}`);
              throw new Error('Failed to submit form upstream');
            }
          } catch (e) {
            console.error('Upstream submission error:', e);
            // We still might want to return success to the user if we have a fallback or just log it
            throw new Error('Could not send message. Please try again.');
          }
        } else {
          // If no endpoint, this is likely a dev/demo setup or relying on client-side mailto fallback.
          // But since this is a server action, we really should be doing something "server-side".
          // For now, we'll log it.
          console.log('Form received (Server Action):', input);
        }

        return { success: true, message: "Thank you! We'll be in touch shortly." };
      },
    }),
  },
};
