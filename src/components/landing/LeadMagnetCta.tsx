import { ArrowRight, Download, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/motion';

// Lower-friction secondary CTA rendered above the primary "Book a
// confidential conversation" CTA on every landing page. Visitors who
// arrive top-of-funnel — from an AI Assistant answer, a query-only
// impression, or a broad search — need an off-ramp that is not a
// meeting request. Two off-ramps: the free Exit Readiness Score (a
// scored result in about three minutes, no sign-up) and the Exit Readiness
// Checklist (a download).
export function LeadMagnetCta() {
  return (
    <section className="bg-sand-light py-16 md:py-20 border-t border-navy/10">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-4">
              Not ready to talk yet?
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-navy leading-tight mb-4 text-balance">
              See how a buyer would score your business.
            </h2>
            <p className="text-navy-light leading-relaxed mb-8 max-w-2xl mx-auto">
              The free Exit Readiness Score asks 11 of the questions buyers test and shows where your business is
              strong and where it would lose value. About three minutes, no sign-up.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/exit-readiness-score/"
                className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-deepest transition-all duration-200 hover:-translate-y-0.5"
              >
                <Gauge className="h-4 w-4" />
                Get my exit readiness score
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/lead-magnet/"
                className="inline-flex items-center gap-2 text-navy underline decoration-accent/50 underline-offset-4 hover:text-accent-dark py-3"
              >
                <Download className="h-4 w-4" />
                Or download the 12-question checklist
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
