// Builds the draft reply to an owner who sent their Exit Readiness Score. Re-scores their answers
// with the same code the website uses, so the draft cannot disagree with what they saw.

import { MODEL } from '../../src/content/readiness/model';
import { scoreAnswers, type Answer, type Answers } from '../../src/content/readiness/score';
import { describeAnswer, lcFirst } from '../../src/components/readiness/format';
import { escapeHtml } from './graph';

const SIGNATURE = [
  'Leo Meggitt',
  'Managing Director, Mastella Advisory',
  'leo@mastellagroup.com',
  'www.mastellagroup.com',
  'M +44 (0) 7860 107704',
  "International House, 101 King's Cross Rd, London, WC1X 9LP",
];

export function parseAnswers(raw: string | undefined): Answers {
  if (!raw) return {};
  let parsed: Record<string, Answer & { score?: number | null }>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  const known = new Set(MODEL.indicators.map((i) => i.id));
  const out: Answers = {};
  for (const [id, a] of Object.entries(parsed)) {
    if (!known.has(id) || !a || typeof a !== 'object') continue;
    const clean: Answer = {};
    if (typeof a.value === 'number' && Number.isFinite(a.value)) clean.value = a.value;
    if (typeof a.option === 'string') clean.option = a.option;
    if (Array.isArray(a.items)) clean.items = a.items.filter((x) => typeof x === 'string');
    if (a.none === true) clean.none = true;
    if (a.unsure === true) clean.unsure = true;
    out[id] = clean;
  }
  return out;
}

export function buildReply(name: string, answers: Answers): { subject: string; html: string; text: string } {
  const r = scoreAnswers(answers);
  const first = (name || '').trim().split(/\s+/)[0] || 'there';
  const scored = r.modules.filter((m) => m.score !== null);
  const weakest = scored.length ? scored.reduce((a, b) => ((b.score as number) < (a.score as number) ? b : a)) : null;
  const overall = r.overall === null ? null : Math.round(r.overall);

  const paras: string[] = [];
  paras.push(`Hi ${first},`);
  paras.push(
    overall === null
      ? 'Thanks for running the Exit Readiness Score.'
      : `Thanks for running the Exit Readiness Score. You came out at ${overall} out of 100` +
          // Name the weakest area only when it is below strong; otherwise it reads oddly.
          (weakest && (weakest.score as number) < 75
            ? `. The weakest area was ${lcFirst(weakest.name)}, at ${Math.round(weakest.score as number)} out of 100.`
            : '.'),
  );

  const gaps = r.gaps.slice(0, 3);
  const list: string[] = [];
  if (gaps.length) {
    const count = ['', 'one', 'two', 'three'][gaps.length];
    paras.push(gaps.length === 1 ? 'The thing a buyer would push on first:' : `The ${count} things a buyer would push on first:`);
    for (const g of gaps) {
      const ind = g.indicator;
      const lookFor = ind.bands['4'] === 'none' ? 'none of these' : lcFirst(ind.bands['4']);
      list.push(
        `${ind.name}. You said: ${lcFirst(describeAnswer(g, answers[ind.id]))}. Buyers look for: ${lookFor}. A trade buyer's usual response: ${lcFirst(ind.buyerView.trade)}`,
      );
    }
  } else {
    paras.push(
      'Nothing in your answers scored as weak, which is unusual. The measures the free score does not cover are where I would look next.',
    );
  }

  const after: string[] = [];
  if (r.unsure.length) {
    after.push(
      `You were not sure about ${r.unsure.map((u) => lcFirst(u.indicator.name)).join(', ')}. ` +
        (r.unsure.length === 1
          ? "That will come up in a buyer's due diligence, so it is worth pinning down."
          : "Each of those will come up in a buyer's due diligence, so they are worth pinning down."),
    );
  }
  after.push(
    `The free score covers ${MODEL.indicators.length} of the ${MODEL.totalMeasures} measures we look at, and it takes your answers as given. If it would help to go through what the rest would show and what I would tackle first, reply to this email and I will suggest a time.`,
  );

  const subject = 'Your exit readiness score';
  const p = (t: string) => `<p style="margin:0 0 14px 0;">${escapeHtml(t)}</p>`;
  const html = `<div style="font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#111;">
${paras.map(p).join('\n')}
${list.length ? `<ol style="margin:0 0 14px 0;padding-left:22px;">${list.map((l) => `<li style="margin-bottom:8px;">${escapeHtml(l)}</li>`).join('')}</ol>` : ''}
${after.map(p).join('\n')}
<p style="margin:18px 0 0 0;">${SIGNATURE.map(escapeHtml).join('<br>')}</p>
</div>`;
  const text = [...paras, ...list.map((l, i) => `${i + 1}. ${l}`), ...after, SIGNATURE.join('\n')].join('\n\n');
  return { subject, html, text };
}
