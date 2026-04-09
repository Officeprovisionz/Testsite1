export interface Env {
  /** The "From" email address used when sending via MailChannels. Example: noreply@officeprovisionz.com */
  MAIL_FROM?: string;
  /** Optional friendly from name. */
  MAIL_FROM_NAME?: string;
  /** Optional override for destination inbox. Defaults to officeprovisionz@gmail.com */
  CONTACT_TO_EMAIL?: string;
}

// Minimal Cloudflare Pages Functions typing (keeps typecheck happy without adding a dependency).
type PagesFunction<EnvT = unknown> = (context: {
  request: Request;
  env: EnvT;
}) => Response | Promise<Response>;

type LeadPayload = {
  companyName: string;
  name: string;
  email: string;
  phone?: string | undefined;
  contactMethod?: string | undefined;
  location: string;
  industry: string;
  frequency: string;
  startTiming?: string | undefined;
  servicesNeeded: string[];
  message: string;
  consent: string;
  source?: string | undefined;
  landing?: string | undefined;
  referrer?: string | undefined;
  utm_source?: string | undefined;
  utm_medium?: string | undefined;
  utm_campaign?: string | undefined;
  utm_content?: string | undefined;
  utm_term?: string | undefined;
  gclid?: string | undefined;
  fbclid?: string | undefined;
  msclkid?: string | undefined;

  // Honeypots (should be empty)
  website?: string | undefined;
  website_url?: string | undefined;
};

const json = (data: unknown, init: ResponseInit = {}) => {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { ...init, headers });
};

const text = (value: unknown) => String(value ?? '').trim();

const isValidEmail = (value: string) => {
  // Simple, safe email sanity check (not RFC-perfect, but good enough for form validation).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const clamp = (s: string, max: number) => (s.length > max ? s.slice(0, max) : s);

const newRef = () => {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${Date.now().toString(36)}-${rand}`;
};

const buildPlainTextEmail = (lead: LeadPayload, ref: string) => {
  const lines: string[] = [];
  lines.push(`New quote request (${ref})`);
  lines.push('');

  lines.push(`Company: ${lead.companyName}`);
  lines.push(`Contact: ${lead.name}`);
  lines.push(`Email: ${lead.email}`);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.contactMethod) lines.push(`Preferred contact: ${lead.contactMethod}`);

  lines.push(`Location: ${lead.location}`);
  lines.push(`Industry: ${lead.industry}`);
  lines.push(`Frequency: ${lead.frequency}`);
  if (lead.startTiming) lines.push(`Timing: ${lead.startTiming}`);

  if (Array.isArray(lead.servicesNeeded) && lead.servicesNeeded.length) {
    lines.push(`Services: ${lead.servicesNeeded.join(', ')}`);
  }

  lines.push('');
  lines.push('Notes:');
  lines.push(lead.message);

  lines.push('');
  if (lead.source) lines.push(`Source: ${lead.source}`);
  if (lead.landing) lines.push(`Landing: ${lead.landing}`);
  if (lead.referrer) lines.push(`Referrer: ${lead.referrer}`);

  const utms = [
    ['utm_source', lead.utm_source],
    ['utm_medium', lead.utm_medium],
    ['utm_campaign', lead.utm_campaign],
    ['utm_content', lead.utm_content],
    ['utm_term', lead.utm_term],
    ['gclid', lead.gclid],
    ['fbclid', lead.fbclid],
    ['msclkid', lead.msclkid],
  ].filter(([, v]) => Boolean(v && String(v).trim()));

  if (utms.length) {
    lines.push('');
    lines.push('Attribution:');
    utms.forEach(([k, v]) => lines.push(`${k}: ${String(v)}`));
  }

  return lines.join('\n');
};

async function sendViaMailChannels(opts: {
  to: string;
  fromEmail: string;
  fromName: string;
  replyToEmail: string;
  replyToName: string;
  subject: string;
  textBody: string;
}) {
  // MailChannels API (works on Cloudflare Workers/Pages):
  // https://github.com/mailchannels/mailchannels-api
  const payload = {
    personalizations: [{ to: [{ email: opts.to }] }],
    from: { email: opts.fromEmail, name: opts.fromName },
    reply_to: { email: opts.replyToEmail, name: opts.replyToName },
    subject: opts.subject,
    content: [{ type: 'text/plain', value: opts.textBody }],
  };

  const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`MailChannels send failed (${res.status}): ${detail || res.statusText}`);
  }
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const req = context.request;

    // Basic CSRF / cross-site abuse mitigation: require same-origin when Origin is present.
    // (Direct form POSTs from our own site will be same-origin.)
    try {
      const origin = req.headers.get('Origin');
      if (origin) {
        const originHost = new URL(origin).host;
        const reqHost = new URL(req.url).host;
        if (originHost && reqHost && originHost !== reqHost) {
          console.warn('[contact] blocked invalid origin', {
            originHost,
            reqHost,
          });
          return json({ ok: false, error: 'Invalid origin.' }, { status: 403 });
        }
      }
    } catch {
      // ignore
    }

    const ct = req.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      return json({ ok: false, error: 'Expected JSON body.' }, { status: 415 });
    }

    const raw = (await req.json()) as Partial<LeadPayload>;

    // Honeypots: if filled, pretend success.
    if (text(raw.website_url || '') || text(raw.website || '')) {
      return json({ ok: true, skipped: true }, { status: 200 });
    }

    const lead: LeadPayload = {
      companyName: clamp(text(raw.companyName), 100),
      name: clamp(text(raw.name), 80),
      email: clamp(text(raw.email).toLowerCase(), 254),
      phone: clamp(text(raw.phone || ''), 40) || undefined,
      contactMethod: clamp(text(raw.contactMethod || ''), 20) || undefined,
      location: clamp(text(raw.location), 120),
      industry: clamp(text(raw.industry), 120),
      frequency: clamp(text(raw.frequency), 60),
      startTiming: clamp(text(raw.startTiming || ''), 60) || undefined,
      servicesNeeded: Array.isArray(raw.servicesNeeded)
        ? raw.servicesNeeded
            .map((v) => clamp(text(String(v)), 120))
            .filter(Boolean)
            .slice(0, 20)
        : [],
      message: clamp(text(raw.message), 4000),
      consent: clamp(text(raw.consent), 10),
      source: clamp(text(raw.source || ''), 200) || undefined,
      landing: clamp(text(raw.landing || ''), 500) || undefined,
      referrer: clamp(text(raw.referrer || ''), 500) || undefined,
      utm_source: clamp(text(raw.utm_source || ''), 100) || undefined,
      utm_medium: clamp(text(raw.utm_medium || ''), 100) || undefined,
      utm_campaign: clamp(text(raw.utm_campaign || ''), 120) || undefined,
      utm_content: clamp(text(raw.utm_content || ''), 120) || undefined,
      utm_term: clamp(text(raw.utm_term || ''), 120) || undefined,
      gclid: clamp(text(raw.gclid || ''), 120) || undefined,
      fbclid: clamp(text(raw.fbclid || ''), 120) || undefined,
      msclkid: clamp(text(raw.msclkid || ''), 120) || undefined,
    };

    const missing: string[] = [];
    if (!lead.companyName) missing.push('companyName');
    if (!lead.name) missing.push('name');
    if (!lead.email) missing.push('email');
    if (!lead.location) missing.push('location');
    if (!lead.industry) missing.push('industry');
    if (!lead.frequency) missing.push('frequency');
    if (!lead.message) missing.push('message');
    if (!lead.consent) missing.push('consent');
    if (!lead.servicesNeeded.length) missing.push('servicesNeeded');

    if (missing.length) {
      console.warn('[contact] validation failed', {
        fields: missing,
        source: lead.source || undefined,
      });
      return json(
        {
          ok: false,
          error: 'Missing required fields.',
          fields: missing,
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(lead.email)) {
      return json({ ok: false, error: 'Invalid email.' }, { status: 400 });
    }

    // Basic spam heuristic: block messages stuffed with links.
    const linkCount = (lead.message.match(/https?:\/\//gi) || []).length;
    if (linkCount >= 5) {
      console.warn('[contact] skipped suspected spam', {
        reason: 'link_threshold',
        linkCount,
        source: lead.source || undefined,
      });
      return json({ ok: true, skipped: true }, { status: 200 });
    }

    const to = context.env.CONTACT_TO_EMAIL?.trim() || 'officeprovisionz@gmail.com';
    const fromEmail = context.env.MAIL_FROM?.trim() || '';
    const fromName = context.env.MAIL_FROM_NAME?.trim() || 'Office Provisionz Website';

    if (!fromEmail) {
      console.error('[contact] missing mail sender configuration');
      return json(
        {
          ok: false,
          error:
            'Email sender not configured. Set MAIL_FROM in the Pages/Workers environment variables.',
        },
        { status: 500 }
      );
    }

    const ref = newRef();
    const subject = `New quote request (${ref}) — ${lead.companyName}`;
    const textBody = buildPlainTextEmail(lead, ref);

    await sendViaMailChannels({
      to,
      fromEmail,
      fromName,
      replyToEmail: lead.email,
      replyToName: lead.name,
      subject,
      textBody,
    });

    console.info('[contact] lead delivered', {
      ref,
      source: lead.source || undefined,
      servicesCount: lead.servicesNeeded.length,
    });
    return json({ ok: true, ref }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error.';
    console.error('[contact] submission failed', {
      error: msg,
    });
    return json({ ok: false, error: msg }, { status: 500 });
  }
};
