import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/motion';

// Lower-friction secondary CTA rendered above the primary "Book a
// confidential conversation" CTA on every landing page. Visitors who
// arrive top-of-funnel — from an AI Assistant answer, a query-only
// impression, or a broad search — need an off-ramp that is not a
// meeting request. The Exit Readiness Checklist is that off-ramp.
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
              Get our Exit Readiness Checklist.
            </h2>
            <p className="text-navy-light leading-relaxed mb-8 max-w-2xl mx-auto">
              The 12 questions every UK owner should answer before starting an M&amp;A process. Free, 3-minute
              read, no follow-up unless you ask.
            </p>
            <Link
              to="/lead-magnet/"
              className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-deepest transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download the checklist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
