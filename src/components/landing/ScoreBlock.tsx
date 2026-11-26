import { ArrowRight, Download, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/motion';
// An example result, so owners can see what they get before they start. The five areas are the
// ones the score reports under; the figures are made up for illustration.
const SAMPLE_AREAS = [
  { name: 'Financial health', score: 68 },
  { name: 'Operational maturity', score: 55 },
  { name: 'Strategic position and growth', score: 42 },
  { name: 'Market attractiveness', score: 74 },
  { name: 'Diligence readiness', score: 59 },
];

function SampleResult() {
  return (
    <div className="bg-white rounded-xl border border-navy/10 shadow-lg p-6 md:p-7 text-left" aria-label="Example result">
      <div className="flex items-start justify-between gap-4 mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-navy-light pt-2">Example result</p>
        <div className="text-right">
          <p className="font-serif text-navy leading-none"><span className="text-4xl">60</span><span className="text-navy-light"> / 100</span></p>
          <p className="text-sm text-navy-light mt-1">Getting ready</p>
        </div>
      </div>
      <ul className="space-y-3.5">
        {SAMPLE_AREAS.map((a) => (
          <li key={a.name}>
            <div className="flex justify-between gap-4 text-sm mb-1.5">
              <span className="text-navy font-medium">{a.name}</span>
              <span className="text-navy-light tabular-nums">{a.score}</span>
            </div>
            <div className="h-1.5 rounded-full bg-navy/10" aria-hidden="true">
              <div className="h-full rounded-full bg-navy" style={{ width: `${a.score}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-navy-light mt-5">Illustration only. Your result shows your own answers.</p>
    </div>
  );
}

export function ScoreBlock({ showChecklist = false, eyebrow = 'Not ready to talk yet?' }: { showChecklist?: boolean; eyebrow?: string }) {
  return (
    <section className="bg-sand-light py-16 md:py-20 border-t border-navy/10">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 items-center">
            <div className="text-center lg:text-left">
            <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-4">{eyebrow}</p>
            <h2 className="font-serif text-2xl md:text-3xl text-navy leading-tight mb-4 text-balance">
              See how a buyer would score your business.
            </h2>
            <p className="text-navy-light leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              The free Exit Readiness Score asks 11 of the questions buyers test and shows where your business is
              strong and where it would lose value. About three minutes, no sign-up.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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
                  <Download className="h-4 w-4" />
                  Or download the 12-question checklist
                </Link>
              )}
            </div>
            </div>
            <SampleResult />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
