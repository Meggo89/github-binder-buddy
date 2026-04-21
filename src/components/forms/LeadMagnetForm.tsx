import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function LeadMagnetForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-3" />
        <p className="text-white font-semibold mb-2">Thank you!</p>
        <p className="text-sand-light text-sm">Your checklist is on its way to your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-white font-semibold text-center mb-2">Get your free copy</p>
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
          className="w-full px-4 py-3 rounded-lg bg-navy border border-sand/30 text-white placeholder-sand-dark focus:outline-none focus:border-accent"
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
          className="w-full px-4 py-3 rounded-lg bg-navy border border-sand/30 text-white placeholder-sand-dark focus:outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200"
      >
        Download Checklist
      </button>
      <p className="text-sand-dark text-xs text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
