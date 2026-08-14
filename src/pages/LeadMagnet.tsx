import { Download, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn } from '../components/ui/motion';
import { LeadMagnetForm } from '../components/forms/LeadMagnetForm';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Free resource</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        The Exit Readiness Checklist
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Twelve questions every UK founder should answer before starting an M&amp;A process. Free, 3-minute read, no
        follow-up unless you ask.
      </p>
    </div>
  );
}

const CHECKLIST_PREVIEW = [
  'Financial readiness — can you defend your EBITDA bridge line by line?',
  'Operational readiness — could your business run without you for six months?',
  'Owner dependency — which top-20 customer relationships are held personally?',
  'Contract quality — how many change-of-control clauses are hiding in your book?',
  'Working capital — what does a normalised trailing-12-month position look like?',
  'IP protection — is every material IP asset assigned cleanly to the company?',
  'Key-person risk — what happens to EBITDA if three senior team members leave?',
  'Buyer profile — who are the three most likely buyers and why?',
  'Timing — is the next 24 months the right window, or the wrong one?',
  'Deal structure — how much deferred consideration are you willing to accept?',
  'Tax — have you spoken to a transaction-tax specialist yet?',
  'Life after exit — what does your first 12 months post-completion look like?',
];

export default function LeadMagnet() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Exit Readiness Checklist - Free Download | Mastella Advisory"
        description="Twelve questions every UK founder should answer before starting an M&A process. Free download, no follow-up unless you ask."
        canonical="https://mastellagroup.com/lead-magnet/"
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-7">
              <FadeIn>
                <p className="eyebrow text-navy-light mb-4">What&apos;s inside</p>
                <h2 className="font-serif text-display-md text-navy leading-tight mb-8 text-balance">
                  Twelve questions. One page each. No filler.
                </h2>
                <p className="text-body-lg text-navy-light leading-relaxed mb-8">
                  Every question is one we have watched founders fail to answer in real M&amp;A processes. Each one is
                  worth thinking about six to twenty-four months before you go to market, not during.
                </p>
                <ul className="space-y-3">
                  {CHECKLIST_PREVIEW.map((item, i) => (
                    <li key={i} className="flex gap-3 text-navy-light leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-accent-dark flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <div className="md:col-span-5">
              <div className="md:sticky md:top-24">
                <div className="bg-navy-deepest text-white rounded-xl p-8 shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Download className="h-5 w-5 text-accent" />
                    <p className="font-mono text-xs text-accent tracking-widest uppercase">Download</p>
                  </div>
                  <LeadMagnetForm />
                </div>
                <p className="text-xs text-navy-light text-center mt-4 leading-relaxed">
                  We use your email only to send the checklist and (rarely) related M&amp;A insights. You can
                  unsubscribe at any time. See our{' '}
                  <a href="/privacy-policy/" className="underline hover:text-accent-dark">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
