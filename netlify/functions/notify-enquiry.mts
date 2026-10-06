import type { Config, Context } from '@netlify/functions';

// Redundant email notification for contact-form submissions. Runs in
// parallel with Netlify's own Forms notification, which is silenced any
// time Akismet classifies an enquiry as spam - a genuine sell-side enquiry
// was found in the spam folder on 2026-09-18. This path does not depend
// on Akismet: every submission that reaches this function emails Leo.
//
// Guarantees: this function NEVER fails the user's submission. Every
// error path returns 200 so the visitor never sees a failure caused by
// the notification pipeline.
//
// Auth: Microsoft Graph client-credentials flow against the
// mastella-scout-app registration. Env vars are set in the Netlify UI
// under Site configuration > Environment variables.

const TENANT_ID = process.env.MAIL_APP_TENANT_ID;
const CLIENT_ID = process.env.MAIL_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_APP_CLIENT_SECRET;

const SEND_FROM = 'leo.meggitt@mail.mastellagroup.com';
const SEND_TO = 'leo@mastellagroup.com';

const MAX_BODY_BYTES = 10 * 1024;

export type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  pagePath?: string;
  heardVia?: string;
  firstTouch?: string;
};

const OK = () => new Response('ok', { status: 200 });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function getAccessToken(): Promise<string> {
  const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
    scope: 'https://graph.microsoft.com/.default',
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error(`token endpoint ${res.status}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error('no access_token in token response');
  return json.access_token;
}

// Score enquiries end their message with this line and the answers as JSON (built in
// SendResultsForm). The JSON is shown verbatim at the very bottom of the email, under the same
// label, so it can be copied into `boycie init --from-score`.
const ENGINE_MARKER = 'Answers for the Review engine:';

export function splitEngineAnswers(message: string): { text: string; engine: string | null } {
  const at = message.lastIndexOf(ENGINE_MARKER);
  if (at === -1) return { text: message, engine: null };
  return { text: message.slice(0, at).trimEnd(), engine: message.slice(at + ENGINE_MARKER.length).trim() };
}

export function buildHtmlBody(p: Payload, submittedAt = new Date()): string {
  const row = (label: string, value: string | undefined) =>
    value && value.trim()
      ? `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top;">${label}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
      : '';
  const { text, engine } = splitEngineAnswers(p.message ?? '');
  const message = text.trim()
    ? `<div style="margin-top:20px;padding:16px;background:#f6f6f6;border-radius:6px;white-space:pre-wrap;">${escapeHtml(text)}</div>`
    : '';
  const engineBlock = engine
    ? `<div style="margin-top:28px;padding-top:12px;border-top:1px solid #ddd;">
    <p style="margin:0 0 6px 0;font-size:12px;color:#888;">For the Review engine: save the line below as a .json file and run boycie init --from-score.</p>
    <p style="margin:0 0 6px 0;font-weight:600;">${ENGINE_MARKER}</p>
    <pre style="margin:0;font-family:Consolas,Menlo,monospace;font-size:12px;white-space:pre-wrap;word-break:break-all;">${escapeHtml(engine)}</pre>
  </div>`
    : '';
  return `
<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;">
  <p style="margin:0 0 12px 0;">New enquiry via mastellagroup.com ${p.pagePath?.startsWith('/exit-readiness-score') ? 'Exit Readiness Score' : 'contact form'}:</p>
  <table style="border-collapse:collapse;font-size:14px;">
    ${row('Name', p.name)}
    ${row('Company', p.company)}
    ${row('Email', p.email)}
    ${row('Phone', p.phone)}
    ${row('Interest', p.interest)}
    ${row('Found us via', p.heardVia)}
    ${row('First touch', p.firstTouch)}
    ${row('Submitted', submittedAt.toISOString())}
    ${row('From page', p.pagePath)}
  </table>
  ${message}
  <p style="margin-top:20px;font-size:12px;color:#888;">Reply-to is set to the enquirer's email address, so replying to this message goes straight to them.</p>
  ${engineBlock}
</div>`.trim();
}

function subjectFor(p: Payload): string {
  const name = p.name?.trim() || 'unknown';
  const company = p.company?.trim();
  const interest = p.interest?.trim();
  if (company && interest) return `Website enquiry: ${name}, ${company} - ${interest}`;
  if (company) return `Website enquiry: ${name}, ${company}`;
  if (interest) return `Website enquiry: ${name} - ${interest}`;
  return `Website enquiry: ${name}`;
}

async function sendMail(token: string, p: Payload): Promise<void> {
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(SEND_FROM)}/sendMail`;
  const message: Record<string, unknown> = {
    subject: subjectFor(p),
    body: { contentType: 'HTML', content: buildHtmlBody(p) },
    toRecipients: [{ emailAddress: { address: SEND_TO } }],
  };
  const trimmedEmail = p.email?.trim();
  if (trimmedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    message.replyTo = [{ emailAddress: { address: trimmedEmail } }];
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, saveToSentItems: 'true' }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`sendMail ${res.status}: ${text.slice(0, 300)}`);
  }
}

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('method not allowed', { status: 405 });
  }

  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      console.warn('notify-enquiry: body too large, rejecting');
      return OK();
    }

    let payload: Payload;
    try {
      payload = JSON.parse(raw) as Payload;
    } catch {
      console.warn('notify-enquiry: non-JSON body, rejecting');
      return OK();
    }

    const name = payload.name?.trim() ?? '';
    const message = payload.message?.trim() ?? '';
    if (!name && !message) {
      console.warn('notify-enquiry: empty name and message, rejecting');
      return OK();
    }

    if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
      console.error('notify-enquiry: MAIL_APP_* env vars not configured');
      return OK();
    }

    const token = await getAccessToken();
    await sendMail(token, payload);
    return OK();
  } catch (err) {
    console.error('notify-enquiry: unexpected error', err);
    return OK();
  }
};

export const config: Config = {
  path: '/.netlify/functions/notify-enquiry',
  // Anyone can POST here directly, bypassing the forms' honeypot and timing checks, so cap it per
  // visitor: 5 emails a minute from one IP address (a person sending the contact form and their
  // score results together uses 2). Excess requests get a 429 from Netlify before this code runs.
  // The Netlify Forms record is a separate request and is not affected.
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
