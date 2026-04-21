import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitNetlifyForm } from '../../utils/netlifyForms';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function LeadMagnetForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitNetlifyForm('lead-magnet', { name, email });
      setStatus('success');
    } catch (err) {
      console.error('lead magnet form error', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email leo@mastellagroup.com.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-4" />
        <p className="text-white font-serif text-xl mb-2">Thank you.</p>
        <p className="text-sand-light text-sm">Your checklist is on its way to your inbox.</p>
      </div>
    );
  }

  return (
    <form
      name="lead-magnet"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Required hidden fields for Netlify */}
      <input type="hidden" name="form-name" value="lead-magnet" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>

      <p className="eyebrow text-center mb-2">Get the checklist</p>

      <div>
        <label htmlFor="lead-name" className="sr-only">Your name</label>
        <input
          type="text"
          id="lead-name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/15 text-white placeholder-sand-dark/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"
        />
      </div>
      <div>
        <label htmlFor="lead-email" className="sr-only">Work email</label>
        <input
          type="email"
          id="lead-email"
          name="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/15 text-white placeholder-sand-dark/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-300 bg-red-900/30 border border-red-400/30 rounded-md px-3 py-2">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-accent text-navy-deepest px-6 py-3 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          'Download checklist'
        )}
      </button>
      <p className="text-xs text-sand-dark text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
