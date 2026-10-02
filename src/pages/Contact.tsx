import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn } from '../components/ui/motion';
import { submitNetlifyForm, notifyContactEnquiry } from '../utils/netlifyForms';
import { getFirstTouch } from '../utils/firstTouch';

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  heard_via: string;
  message: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  heard_via: '',
  message: '',
};

// "How did you find us?" options. The AI assistant option is how we measure discovery through
// ChatGPT, Claude, Perplexity, Gemini and Copilot answers, alongside the automatic first-touch
// capture in utils/firstTouch.ts.
const HEARD_VIA_OPTIONS = [
  'AI assistant (ChatGPT, Claude, Perplexity, Gemini, Copilot)',
  'Google or another search engine',
  'LinkedIn',
  'Referral or introduction',
  'My accountant or another adviser',
  'Event or talk',
  'Other',
];

// Minimum seconds between form mount and submit for the submission to be
// treated as human. Humans filling six fields take much longer; scripted
// probes usually POST within milliseconds of mount.
const MIN_HUMAN_SECONDS = 3;

// Signals that a name or message field is being used as a SQL injection
// probe rather than a real enquiry. Kept short and in one place so it is
// easy to revise as the bots evolve. Case-insensitive match.
//
// These patterns must be narrow. An earlier version matched a bare `--`,
// which occurs constantly in ordinary business writing ("a sale -- probably
// next year", "2024--2025", an email sign-off), and matched `ORDER BY` in
// plain English ("we need to order by Friday"). Each pattern below requires
// SQL punctuation, not just SQL-adjacent words, so real enquiries cannot
// trip it.
const SQL_PROBE_PATTERNS = [
  /\bORDER\s+BY\s+\d/i,          // "ORDER BY 1-- -", not "order by Friday"
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /['")]\s*(--|#)/,               // comment marker straight after a quote or bracket
  /['")]\s*(AND|OR)\s*[('"]/i,    // ") AND (" probe shape
  /\b(\d+)\s*=\s*\1\b/,         // 1=1, 59225532=59225532
  /\bSLEEP\s*\(/i,
  /\bWAITFOR\s+DELAY\b/i,
];

function looksLikeSqlProbe(text: string): boolean {
  return SQL_PROBE_PATTERNS.some((re) => re.test(text));
}

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Get in touch</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Start with a confidential conversation.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Forty-five minutes, no obligation. You leave with a clearer view of what a sale or a capital raise would look
        like for your business.
      </p>
    </div>
  );
}

const inputClasses =
  'w-full bg-white border border-navy/20 rounded-md px-4 py-3 text-navy placeholder:text-navy-light/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';

function trackFormSubmit() {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'form_submit', { form_name: 'contact' });
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const mountedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
    // The page is prerendered, so on a slow connection the form can be filled in before React
    // hydrates. React keeps what is in the fields but starts with empty state, so read it in once.
    const form = formRef.current;
    if (!form) return;
    const entered: Partial<FormData> = {};
    for (const key of Object.keys(initialFormData) as (keyof FormData)[]) {
      const el = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
      if (el && 'value' in el && el.value) entered[key] = el.value;
    }
    if (Object.keys(entered).length) setFormData((prev) => ({ ...prev, ...entered }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please add your name, email and a short message.');
      return;
    }

    // Silent rejects: pretend to succeed in the UI, but do not POST.
    // Bots looking for form confirmation see success and go away.
    const elapsedSeconds = (Date.now() - mountedAt.current) / 1000;
    if (elapsedSeconds < MIN_HUMAN_SECONDS) {
      setStatus('success');
      setFormData(initialFormData);
      return;
    }
    // A content heuristic must never silently bin an enquiry. If the text
    // looks like a probe we still store it in Netlify Forms, which costs
    // nothing, and only skip the email notification. Nothing is ever lost.
    const looksAutomated =
      looksLikeSqlProbe(formData.name) || looksLikeSqlProbe(formData.message);

    setStatus('submitting');
    setErrorMessage('');

    try {
      const firstTouch = getFirstTouch();
      await submitNetlifyForm('contact', { ...formData, first_touch: firstTouch });
      // Redundant email notification. Fire-and-forget; the Netlify Forms
      // POST above already stored the submission, so a failure here never
      // costs us the enquiry. Skipped for submissions that look automated,
      // which keeps the inbox clean without ever discarding anything.
      if (!looksAutomated) {
        notifyContactEnquiry({ ...formData, heardVia: formData.heard_via, firstTouch });
      }
      trackFormSubmit();
      setStatus('success');
      setFormData(initialFormData);
    } catch (err) {
      console.error('contact form error', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email leo@mastellagroup.com directly.');
    }
  };

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Contact Mastella Advisory: Arrange a Confidential Conversation"
        description="Get in touch with Mastella Advisory for a confidential, no-obligation first conversation about selling your business, its value or raising capital."
        canonical="https://mastellagroup.com/contact/"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <FadeIn>
                <div className="sticky top-24">
                  <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                    Please get in touch.
                  </h2>
                  <p className="text-body-lg text-navy-light leading-relaxed mb-12">
                    For an initial conversation, use the form or contact us by phone or email. Everything you send is
                    treated in confidence.
                  </p>

                  <div className="space-y-7">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-accent-dark" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-navy-light tracking-widest mb-1">PHONE</p>
                        <a href="tel:+447860107704" className="text-navy hover:text-accent-dark transition-colors">
                          +44 (0) 7860 107704
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-accent-dark" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-navy-light tracking-widest mb-1">EMAIL</p>
                        <a href="mailto:leo@mastellagroup.com" className="text-navy hover:text-accent-dark transition-colors">
                          leo@mastellagroup.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-accent-dark" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-navy-light tracking-widest mb-1">OFFICE</p>
                        <p className="text-navy leading-relaxed">
                          International House<br />
                          101 King&apos;s Cross Rd<br />
                          London, WC1X 9LP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-7">
              <FadeIn delay={0.1}>
                <div className="bg-sand-light rounded-2xl p-8 md:p-10 border border-navy/10">
                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="h-8 w-8 text-accent-dark" />
                      </div>
                      <h3 className="font-serif text-2xl text-navy mb-3">Message received.</h3>
                      <p className="text-navy-light mb-8 max-w-sm mx-auto">
                        We will reply within one working day.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-sm text-navy font-medium hover:text-accent-dark transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form
                      ref={formRef}
                      name="contact"
                      method="POST"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Hidden fields for Netlify */}
                      <input type="hidden" name="form-name" value="contact" />
                      <p className="hidden">
                        <label>
                          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                        </label>
                      </p>

                      {status === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
                          {errorMessage}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Name *
                          </label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required maxLength={100} className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Company
                          </label>
                          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} maxLength={120} className={inputClasses} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Email *
                          </label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required maxLength={254} className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Phone
                          </label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} maxLength={30} className={inputClasses} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="interest" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                          Area of Interest
                        </label>
                        <select id="interest" name="interest" value={formData.interest} onChange={handleChange} className={inputClasses}>
                          <option value="">Select an option</option>
                          <option value="Sell-side Advisory">Sell-side advisory</option>
                          <option value="Fundraising">Fundraising</option>
                          <option value="Exit Readiness">Exit readiness consulting</option>
                          <option value="Executive Search">Executive search</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="heard_via" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                          How did you find us?
                        </label>
                        <select id="heard_via" name="heard_via" value={formData.heard_via} onChange={handleChange} className={inputClasses}>
                          <option value="">Select an option</option>
                          {HEARD_VIA_OPTIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                          Message *
                        </label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required maxLength={5000} className={inputClasses} placeholder="A short description of what you're looking to discuss" />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-navy-deepest text-white px-6 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-dark transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          'Send my enquiry'
                        )}
                      </button>
                      <p className="text-xs text-navy-light text-center">All enquiries are confidential.</p>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
