import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn } from '../components/ui/motion';
import { submitContactRequest, ContactRequest } from '../utils/contactService';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Get in touch</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Start with a confidential conversation.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Forty-five minutes. No obligation. You leave with a clearer view of what an exit process — or a capital raise —
        would actually look like for your business.
      </p>
    </div>
  );
}

const inputClasses =
  'w-full bg-white border border-navy/20 rounded-md px-4 py-3 text-navy placeholder:text-navy-light/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';

export default function Contact() {
  const [formData, setFormData] = useState<ContactRequest>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.interest || !formData.company) {
      setFormStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: 'Please fill in all required fields.',
      });
      return;
    }

    setFormStatus({
      submitted: false,
      submitting: true,
      error: false,
      message: 'Sending your message…',
    });

    try {
      const result = await submitContactRequest(formData);
      if (result.success) {
        setFormStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: result.message,
        });
        setFormData({ name: '', company: '', email: '', phone: '', interest: '', message: '' });
      } else {
        setFormStatus({ submitted: false, submitting: false, error: true, message: result.message });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Contact — Book a Confidential Conversation"
        description="Schedule a confidential, no-obligation conversation with Mastella Advisory. Discuss your exit strategy, valuation, or fundraising needs."
        canonical="https://mastellagroup.com/contact"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <FadeIn>
                <div className="sticky top-24">
                  <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                    Direct to the principal.
                  </h2>
                  <p className="text-body-lg text-navy-light leading-relaxed mb-12">
                    All initial enquiries come to Leo directly. If email or phone suits you better than the form, those
                    options are below.
                  </p>

                  <div className="space-y-7">
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
                        <Phone className="h-4 w-4 text-accent-dark" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-navy-light tracking-widest mb-1">PHONE</p>
                        <p className="text-navy">+44 (0)20 7123 4567</p>
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
                  {formStatus.submitted ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="h-8 w-8 text-accent-dark" />
                      </div>
                      <h3 className="font-serif text-2xl text-navy mb-3">Message received.</h3>
                      <p className="text-navy-light mb-8 max-w-sm mx-auto">{formStatus.message}</p>
                      <button
                        onClick={() => setFormStatus((prev) => ({ ...prev, submitted: false }))}
                        className="text-sm text-navy font-medium hover:text-accent-dark transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {formStatus.error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
                          {formStatus.message}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Name *
                          </label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Company *
                          </label>
                          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className={inputClasses} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Email *
                          </label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                            Phone
                          </label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="interest" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                          Area of Interest *
                        </label>
                        <select id="interest" name="interest" value={formData.interest} onChange={handleChange} required className={inputClasses}>
                          <option value="">Select an option</option>
                          <option value="Sell-side Advisory">Sell-side advisory</option>
                          <option value="Fundraising">Fundraising</option>
                          <option value="Exit Readiness">Exit readiness consulting</option>
                          <option value="Executive Search">Executive search</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-mono text-navy tracking-widest uppercase mb-2">
                          Message *
                        </label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required className={inputClasses} placeholder="A short description of what you're looking to discuss" />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus.submitting}
                        className="w-full bg-navy-deepest text-white px-6 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-dark transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {formStatus.submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          'Send message'
                        )}
                      </button>
                      <p className="text-xs text-navy-light text-center">
                        All enquiries are confidential.
                      </p>
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
