import { describe, expect, it } from 'vitest';
import {
  getContactTransport,
  parseLeadSubmitResponseMeta,
  resolveContactEndpoint,
} from './contact';

describe('resolveContactEndpoint', () => {
  it('prefers an explicit public form endpoint', () => {
    expect(
      resolveContactEndpoint({
        baseUrl: '/',
        publicFormEndpoint: 'https://formspree.io/f/demo',
        cloudflarePages: true,
      })
    ).toBe('https://formspree.io/f/demo');
  });

  it('uses the built-in endpoint only on Cloudflare Pages', () => {
    expect(
      resolveContactEndpoint({
        baseUrl: '/office-provisionz/',
        cloudflarePages: true,
      })
    ).toBe('/office-provisionz/api/contact');

    expect(
      resolveContactEndpoint({
        baseUrl: '/office-provisionz/',
        cloudflarePages: false,
      })
    ).toBeUndefined();
  });
});

describe('getContactTransport', () => {
  it('returns mailto when no send endpoint is available', () => {
    expect(getContactTransport({ baseUrl: '/', cloudflarePages: false })).toBe('mailto');
  });

  it('returns endpoint when a delivery endpoint is available', () => {
    expect(getContactTransport({ baseUrl: '/', cloudflarePages: true })).toBe('endpoint');
  });
});

describe('parseLeadSubmitResponseMeta', () => {
  it('extracts the server-issued reference and error fields from JSON', () => {
    expect(parseLeadSubmitResponseMeta('{"ok":true,"ref":"lead-123"}')).toEqual({
      payload: { ok: true, ref: 'lead-123' },
      ref: 'lead-123',
      error: undefined,
    });

    expect(parseLeadSubmitResponseMeta('{"ok":false,"error":"Missing fields"}')).toEqual({
      payload: { ok: false, error: 'Missing fields' },
      ref: undefined,
      error: 'Missing fields',
    });
  });

  it('fails safely on empty or non-JSON responses', () => {
    expect(parseLeadSubmitResponseMeta('')).toEqual({});
    expect(parseLeadSubmitResponseMeta('upstream timeout')).toEqual({});
  });
});
