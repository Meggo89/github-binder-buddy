// Spam and probe checks shared by the contact form, the Exit Readiness Score form and the
// notify-enquiry function. No browser or Node APIs here, so the function bundle can import it.

// Name of the hidden honeypot input. Matches netlify-honeypot="bot-field" in public/__forms.html.
export const HONEYPOT_FIELD = 'bot-field';

// Signals that a field is being used as a SQL injection probe rather than a real enquiry.
// Case-insensitive. Each pattern requires SQL punctuation, not just SQL-adjacent words, so
// plain English ("we need to order by Friday", "sales -- probably next year") cannot trip it.
// A match now blocks the submission outright, so keep these narrow.
const SQL_PROBE_PATTERNS = [
  /\bORDER\s+BY\s+\d/i, // "ORDER BY 1-- -", not "order by Friday"
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /['")]\s*(--|#)/, // comment marker straight after a quote or bracket
  /['")]\s*(AND|OR)\s*[('"]/i, // ") AND (" probe shape
  /\b(\d+)\s*=\s*\1\b/, // 1=1, 59225532=59225532
  /\bSLEEP\s*\(/i,
  /\bWAITFOR\s+DELAY\b/i,
];

export function looksLikeSqlProbe(text: string | undefined): boolean {
  if (!text) return false;
  return SQL_PROBE_PATTERNS.some((re) => re.test(text));
}

export type LeadCheck = 'ok' | 'missing' | 'probe';

// 'missing': name or email is empty, so the visitor should be asked to fill them in.
// 'probe': a field looks like a SQL probe, so the submission is dropped without sending anything.
export function checkLead(fields: Record<string, string | undefined>): LeadCheck {
  if (!fields.name?.trim() || !fields.email?.trim()) return 'missing';
  if (Object.values(fields).some((v) => looksLikeSqlProbe(v))) return 'probe';
  return 'ok';
}

export function honeypotFilled(value: string | undefined | null): boolean {
  return Boolean(value && value.trim());
}
