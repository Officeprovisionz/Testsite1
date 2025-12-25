export function makeTelHref(phoneE164: string): string {
  return `tel:${phoneE164}`;
}

export function makeMailtoHref(email: string): string {
  return `mailto:${email}`;
}

/**
 * Build an SMS link.
 *
 * Note: SMS URI handling differs slightly across platforms.
 * Using `?&body=` preserves the existing behavior used in this project.
 */
export function makeSmsHref(phoneE164: string, body?: string): string {
  if (!body) return `sms:${phoneE164}`;
  return `sms:${phoneE164}?&body=${encodeURIComponent(body)}`;
}
