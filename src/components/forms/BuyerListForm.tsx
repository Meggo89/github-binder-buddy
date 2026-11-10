import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { submitNetlifyForm, notifyContactEnquiry } from '../../utils/netlifyForms';
import { getFirstTouch } from '../../utils/firstTouch';

// Offer of a short, anonymised buyer list for a sector report. The report stays fully readable;
// this is an extra, not a gate. Fields are declared in public/__forms.html ("sector-buyer-list").

const NICHES = [
  'Engineering consultancy',
  'Testing, inspection and certification',
  'Calibration and metrology',
  'Building services / M&E',
  'Geotechnical and environmental',
  'Other',
];
const SELLING = ['Yes', 'Maybe', 'Not yet'];

// Same rule as the other forms: scripted probes post within moments of the page loading.
const MIN_HUMAN_SECONDS = 3;

const input =
  'w-full bg-white border border-navy/20 rounded-md px-4 py-3 text-navy placeholder:text-navy-light/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';
const label = 'block text-xs font-mono text-navy tracking-widest uppercase mb-2';

type Props = {
  // Distinguishes the two copies of the form on one page (field ids must be unique).
  idPrefix: string;
  report: string;
};

export function BuyerListForm({ idPrefix, report }: Props) {
  const [form, setForm] = useState({ name: '', email: '', company: '', niche: '', selling_timeline: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
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
    const firstTouch = getFirstTouch();
    try {
      await submitNetlifyForm('sector-buyer-list', { ...form, report, first_touch: firstTouch });
      notifyContactEnquiry({
        name: form.name,
        email: form.email,
        company: form.company,
        interest: `Buyer list request: ${form.niche || 'niche not given'}`,
        message: `Report: ${report}\nNiche: ${form.niche || 'not given'}\nThinking of selling in the next 3 years: ${form.selling_timeline || 'not given'}`,
        firstTouch,
      });
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'buyer_list_request', { report, niche: form.niche });
      }
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="not-prose my-12 rounded-xl border border-navy/10 bg-sand-light p-8 text-center">
        <CheckCircle className="h-8 w-8 text-accent-dark mx-auto mb-4" />
        <p className="text-navy-light">Thanks. Leo will send your buyer list personally within two working days.</p>
      </div>
    );
  }

  const id = (f: string) => `${idPrefix}-${f}`;
  return (
    <section className="not-prose my-12 rounded-xl border border-accent/40 bg-sand-light p-6 md:p-8" aria-labelledby={id('heading')}>
      <h2 id={id('heading')} className="font-serif text-2xl text-navy leading-snug mb-2">Who would buy your business?</h2>
      <p className="text-navy-light leading-relaxed mb-6">
        Tell us which part of the sector you&apos;re in and we&apos;ll send you a short, anonymised list of the most active
        acquirers in your niche and what each of them looks for. Confidential, and no obligation.
      </p>
      <form name="sector-buyer-list" method="POST" onSubmit={submit} className="space-y-5">
        <input type="hidden" name="form-name" value="sector-buyer-list" />
        <input type="hidden" name="report" value={report} />
        <p className="hidden">
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
            Please add your name and email. If it still fails, email leo@mastellagroup.com.
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={id('name')} className={label}>Name *</label>
            <input id={id('name')} name="name" value={form.name} onChange={change} required maxLength={100} className={input} />
          </div>
          <div>
            <label htmlFor={id('email')} className={label}>Email *</label>
            <input id={id('email')} name="email" type="email" value={form.email} onChange={change} required maxLength={254} className={input} />
          </div>
          <div>
            <label htmlFor={id('company')} className={label}>Company</label>
            <input id={id('company')} name="company" value={form.company} onChange={change} maxLength={120} className={input} />
          </div>
          <div>
            <label htmlFor={id('niche')} className={label}>Your niche</label>
            <select id={id('niche')} name="niche" value={form.niche} onChange={change} className={input}>
              <option value="">Select an option</option>
              {NICHES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
        <fieldset>
          <legend className={label}>Thinking of selling in the next 3 years?</legend>
          <div className="flex flex-wrap gap-6 mt-1">
            {SELLING.map((s) => (
              <label key={s} className="flex items-center gap-2 text-navy cursor-pointer">
                <input
                  type="radio"
                  name="selling_timeline"
                  value={s}
                  checked={form.selling_timeline === s}
                  onChange={change}
                  className="h-4 w-4 accent-navy"
                />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full md:w-auto bg-navy text-white px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-light transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {status === 'sending' ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : 'Send me the buyer list'}
        </button>
      </form>
    </section>
  );
}
