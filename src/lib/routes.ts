import { makeHref } from '@/lib/nav';

export type ContactPrefillParams = {
  industry?: string;
  /** A single service option label. */
  service?: string;
  /** Multiple service option labels. Will be joined with commas for the `services` param. */
  services?: string[] | string;
};

/**
 * Builds a base-aware `contact/` URL and (optionally) appends query params that the contact form
 * can use to prefill fields/checkboxes.
 */
export const makeContactHref = (base: string) => {
  const href = makeHref(base);

  return (params?: ContactPrefillParams) => {
    if (!params) return href('contact/');

    const search = new URLSearchParams();

    if (params.industry) search.set('industry', params.industry);
    if (params.service) search.set('service', params.service);

    if (params.services) {
      const value = Array.isArray(params.services) ? params.services.join(',') : params.services;
      if (value.trim()) search.set('services', value);
    }

    const qs = search.toString();
    return href(`contact/${qs ? `?${qs}` : ''}`);
  };
};
