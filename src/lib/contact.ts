export type ContactEndpointOptions = {
  baseUrl: string;
  publicFormEndpoint?: string | null | undefined;
  cloudflarePages?: boolean;
};

const trimToUndefined = (value: string | null | undefined) => {
  const trimmed = String(value ?? '').trim();
  return trimmed || undefined;
};

const normalizeBaseUrl = (baseUrl: string) => {
  const trimmed = trimToUndefined(baseUrl) ?? '/';
  if (trimmed === '/') return '/';
  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
};

export const resolveContactEndpoint = ({
  baseUrl,
  publicFormEndpoint,
  cloudflarePages = false,
}: ContactEndpointOptions) => {
  const explicitEndpoint = trimToUndefined(publicFormEndpoint);
  if (explicitEndpoint) return explicitEndpoint;

  if (!cloudflarePages) return undefined;
  return `${normalizeBaseUrl(baseUrl)}api/contact`;
};

export const getContactTransport = (opts: ContactEndpointOptions) =>
  resolveContactEndpoint(opts) ? 'endpoint' : 'mailto';

export type LeadSubmitResponseMeta = {
  error?: string | undefined;
  payload?: Record<string, unknown> | undefined;
  ref?: string | undefined;
};

export const parseLeadSubmitResponseMeta = (rawText: string): LeadSubmitResponseMeta => {
  const trimmed = trimToUndefined(rawText);
  if (!trimmed) return {};

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    const payload = parsed as Record<string, unknown>;
    const ref = trimToUndefined(typeof payload.ref === 'string' ? payload.ref : undefined);
    const error = trimToUndefined(typeof payload.error === 'string' ? payload.error : undefined);

    return {
      payload,
      ref,
      error,
    };
  } catch {
    return {};
  }
};
