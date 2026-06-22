import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/motion';

interface Props {
  heading: string;
  body?: string;
  ctaLabel?: string;
}

// Bottom-of-page CTA with the consistent risk-reversal line. The fee phrasing
// matches the homepage copy ("high monthly retainer fees ... aligned to deliver
// owner outcomes, not commission") so the message reads coherently across the site.
export function CtaSection({
  heading,
  body = 'Forty-five minutes, no obligation. We will tell you honestly whether what you want to achieve is realistic — and whether Mastella is the right firm for it.',
  ctaLabel = 'Book a confidential conversation',
}: Props) {
  return (
    <section className="bg-navy-deepest text-white py-24">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-serif text-display-md text-white mb-6 leading-tight text-balance">{heading}</h2>
            <p className="text-body-lg text-sand-light mb-6 leading-relaxed">{body}</p>
            <p className="text-sm text-sand-light/80 mb-10 leading-relaxed">
              <span className="font-mono text-xs text-accent tracking-widest uppercase mr-2">Aligned</span>
              We work on a high monthly retainer model that funds senior-led delivery throughout — not a commission
              structure that rewards getting any deal done.
            </p>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Inline mid-page CTA used after the FAQ / before the proof band on landing pages.
export function MidPageCta({ heading, ctaLabel = 'Book a confidential conversation' }: { heading: string; ctaLabel?: string }) {
  return (
    <section className="bg-sand-light py-14 border-y border-navy/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="font-serif text-2xl md:text-3xl text-navy leading-snug max-w-2xl text-balance">{heading}</h2>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold tracking-wide hover:bg-navy-deepest transition-all duration-200 flex-shrink-0"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
