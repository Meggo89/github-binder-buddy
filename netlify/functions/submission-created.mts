import type { Handler } from '@netlify/functions';
import { createDraft, graphConfigured, graphToken } from '../lib/graph';
import { buildReply, parseAnswers } from '../lib/score-reply';

// Netlify runs a function named `submission-created` for every form submission that passes its
// spam filter (an event-triggered function; visitors cannot call it). For Exit Readiness Score
// submissions it puts a draft reply in Leo's Outlook Drafts, addressed to the owner and built
// around their three biggest gaps. Nothing is sent: Leo reads, edits and sends.
//
// Mailbox: DRAFT_MAILBOX in the Netlify environment, default leo@mastellagroup.com. Uses the same
// mastella-scout-app credentials as notify-enquiry (Mail.ReadWrite). Never throws.

const DRAFT_MAILBOX = process.env.DRAFT_MAILBOX || 'leo@mastellagroup.com';
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

type SubmissionEvent = {
  payload?: { form_name?: string; data?: Record<string, string> };
};

export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}') as SubmissionEvent;
    const form = body.payload?.form_name;
    const data = body.payload?.data ?? {};
    if (form !== 'readiness-score') return { statusCode: 200, body: `ignored: ${form ?? 'unknown'} form` };

    const email = (data.email || '').trim();
    if (!EMAIL_RE.test(email) || email.length > 254) return { statusCode: 200, body: 'skipped: no valid email' };
    if (!graphConfigured()) {
      console.error('submission-created: MAIL_APP_* env vars not configured');
      return { statusCode: 200, body: 'skipped: graph not configured' };
    }

    const name = (data.name || '').slice(0, 100);
    const reply = buildReply(name, parseAnswers(data.answers));
    const token = await graphToken();
    await createDraft(token, DRAFT_MAILBOX, {
      subject: reply.subject,
      html: reply.html,
      to: { address: email, name },
      categories: ['Exit Readiness Score'],
    });
    console.log(`submission-created: draft reply created in ${DRAFT_MAILBOX}`);
    return { statusCode: 200, body: 'draft created' };
  } catch (err) {
    console.error('submission-created: failed', err);
    return { statusCode: 200, body: 'error logged' };
  }
};
