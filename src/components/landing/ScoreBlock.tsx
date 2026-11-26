import { ArrowRight, Gauge, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/motion';

export function ScoreBlock({
  showChecklist = false,
  eyebrow = 'Not ready to talk yet?',
}: {
  showChecklist?: boolean;
  eyebrow?: string;
}) {
  return (
    <section className="bg-sand-light py-16 md:py-20 border-t border-navy/10">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
            <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-4">{eyebrow}</p>
            <h2 className="font-serif text-2xl md:text-3xl text-navy leading-tight mb-4 text-balance">
              See how a buyer would score your business.
            </h2>
            <p className="text-navy-light leading-relaxed mb-8 max-w-2xl mx-auto">
              The free Exit Readiness Score asks 12 of the questions buyers test and shows where your business is
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
              {showChecklist && (
                <Link
                  to="/lead-magnet/"
                  className="inline-flex items-center gap-2 text-navy underline decoration-accent/50 underline-offset-4 hover:text-accent-dark py-3"
                >
                  <Mail className="h-4 w-4" />
                  Get the exit readiness checklist by email
                </Link>
              )}
            </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
