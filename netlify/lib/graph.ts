// Microsoft Graph helpers for Netlify functions, using the mastella-scout-app client-credentials
// registration (MAIL_APP_* environment variables, set in the Netlify UI; see README).

const TENANT_ID = process.env.MAIL_APP_TENANT_ID;
const CLIENT_ID = process.env.MAIL_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_APP_CLIENT_SECRET;

export function graphConfigured(): boolean {
  return !!(TENANT_ID && CLIENT_ID && CLIENT_SECRET);
}

export async function graphToken(): Promise<string> {
  const res = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      scope: 'https://graph.microsoft.com/.default',
    }).toString(),
  });
  if (!res.ok) throw new Error(`token endpoint ${res.status}`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error('no access_token in token response');
  return json.access_token;
}

// Creates a message in the mailbox's Drafts folder. Nothing is sent.
export async function createDraft(
  token: string,
  mailbox: string,
  draft: { subject: string; html: string; to: { address: string; name?: string }; categories?: string[] },
): Promise<string> {
  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: draft.subject,
      body: { contentType: 'HTML', content: draft.html },
      toRecipients: [{ emailAddress: { address: draft.to.address, name: draft.to.name || undefined } }],
      categories: draft.categories,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`createDraft ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as { id?: string };
  return json.id ?? '';
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
