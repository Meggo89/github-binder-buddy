import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { submitNetlifyForm, notifyContactEnquiry } from '../../utils/netlifyForms';
import { getFirstTouch } from '../../utils/firstTouch';
import type { Answer, ReadinessResult } from '../../content/readiness/score';
import { summarise } from './format';

const input =
  'w-full bg-white border border-navy/20 rounded-md px-4 py-3 text-navy placeholder:text-navy-light/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';
const label = 'block text-xs font-mono text-navy tracking-widest uppercase mb-2';

// Same rule as the contact form: scripted probes post within milliseconds of mount.
const MIN_HUMAN_SECONDS = 3;

function answersJson(result: ReadinessResult, answers: Record<string, Answer | undefined>): string {
  const out: Record<string, unknown> = {};
  for (const r of result.indicators) {
    const a = answers[r.indicator.id];
    if (a) out[r.indicator.id] = { ...a, score: r.score };
  }
  return JSON.stringify(out).slice(0, 8000);
}

export function SendResultsForm({ result, answers }: { result: ReadinessResult; answers: Record<string, Answer | undefined> }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', note: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setStatus('error');
      return;
    }
    if ((Date.now() - mountedAt.current) / 1000 < MIN_HUMAN_SECONDS) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    const summary = summarise(result, answers);
    const firstTouch = getFirstTouch();
    try {
      await submitNetlifyForm('readiness-score', {
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        note: form.note,
        overall: String(result.overall ?? ''),
        summary,
        answers: answersJson(result, answers),
        first_touch: firstTouch,
      });
      notifyContactEnquiry({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        interest: `Exit Readiness Score ${result.overall === null ? '' : Math.round(result.overall)}`.trim(),
        // The compact answers at the end can be saved as a file for `boycie init --from-score`.
        message: `${form.note ? 'Their note: ' + form.note + '\n\n' : ''}${summary}\n\nAnswers for the Review engine:\n${answersJson(result, answers)}`,
        firstTouch,
      });
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'readiness_score_sent', { score: result.overall ?? 0 });
      }
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-navy/10 bg-sand-light p-8 text-center">
        <CheckCircle className="h-8 w-8 text-accent-dark mx-auto mb-4" />
        <p className="font-serif text-2xl text-navy mb-2">Results sent to Leo.</p>
        <p className="text-navy-light">He will reply personally, usually within one working day.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-navy/10 bg-sand-light p-6 md:p-8">
      <h2 className="font-serif text-2xl text-navy leading-snug mb-2">Send your results to Leo</h2>
      <p className="text-navy-light leading-relaxed mb-6">
        Leo Meggitt will look at your answers and reply with his read on what a buyer would focus on. Nothing is
        shared with anyone else.
      </p>
      <form name="readiness-score" method="POST" onSubmit={submit} className="space-y-5">
        <input type="hidden" name="form-name" value="readiness-score" />
        <p className="hidden">
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
            Please add your name and email. If it still fails, email leo@mastellagroup.com.
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="rs-name" className={label}>Name *</label>
            <input id="rs-name" name="name" value={form.name} onChange={change} required maxLength={100} className={input} />
          </div>
          <div>
            <label htmlFor="rs-email" className={label}>Email *</label>
            <input id="rs-email" name="email" type="email" value={form.email} onChange={change} required maxLength={254} className={input} />
          </div>
          <div>
            <label htmlFor="rs-company" className={label}>Company</label>
            <input id="rs-company" name="company" value={form.company} onChange={change} maxLength={120} className={input} />
          </div>
          <div>
            <label htmlFor="rs-phone" className={label}>Phone</label>
            <input id="rs-phone" name="phone" type="tel" value={form.phone} onChange={change} maxLength={30} className={input} />
          </div>
        </div>
        <div>
          <label htmlFor="rs-note" className={label}>Anything else (optional)</label>
          <textarea id="rs-note" name="note" value={form.note} onChange={change} rows={3} maxLength={2000} className={input}
            placeholder="Timing you have in mind, an approach you have had, anything useful" />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-navy-deepest text-white px-6 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-dark transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === 'sending' ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : 'Send my results'}
        </button>
        <p className="text-xs text-navy-light text-center">
          Your answers and contact details go to Leo only. See our{' '}
          <a href="/privacy-policy/" className="underline">privacy policy</a>.
        </p>
      </form>
    </div>
  );
}
