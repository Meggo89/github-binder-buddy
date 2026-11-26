import type { ReactNode } from 'react';
import { ArrowRight, Download, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/motion';
import { MODEL } from '../../content/readiness/model';

// An example result, so owners can see what they get before they start. The five areas are the
// real ones the score uses; the bands shown are made up for illustration.
const SAMPLE_BANDS = [
  { band: 'Weak', width: '42%', tone: 'bg-[#C9772E]' },
  { band: 'Adequate', width: '64%', tone: 'bg-accent' },
  { band: 'Strong', width: '88%', tone: 'bg-navy' },
  { band: 'Adequate', width: '60%', tone: 'bg-accent' },
  { band: 'Critical', width: '24%', tone: 'bg-[#A63D2F]' },
];

function SampleResult() {
  return (
    <div className="bg-white rounded-xl border border-navy/10 shadow-lg p-6 md:p-7 text-left" aria-label="Example result">
      <div className="flex items-baseline justify-between mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-navy-light">Example result</p>
        <p className="font-serif text-navy"><span className="text-4xl">58</span><span className="text-navy-light"> / 100</span></p>
      </div>
      <ul className="space-y-3.5">
        {MODEL.modules.slice(0, SAMPLE_BANDS.length).map((m, i) => (
          <li key={m.id}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-navy font-medium">{m.name}</span>
              <span className="text-navy-light">{SAMPLE_BANDS[i].band}</span>
            </div>
            <div className="h-1.5 rounded-full bg-navy/10" aria-hidden="true">
              <div className={`h-full rounded-full ${SAMPLE_BANDS[i].tone}`} style={{ width: SAMPLE_BANDS[i].width }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-navy-light mt-5">Illustration only. Your result shows your own answers.</p>
    </div>
  );
}

// The Exit Readiness Score block: headline, one line and a button to /exit-readiness-score/.
// Used on the home page, every sector and niche page (via LeadMagnetCta, which adds the checklist
// download) and every insight article, so the offer reads the same wherever an owner meets it.
export function ScoreBlock({
  showChecklist = false,
  eyebrow = 'Not ready to talk yet?',
  note,
}: {
  showChecklist?: boolean;
  eyebrow?: string;
  note?: ReactNode;
}) {
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
            {note && <div className="mt-10 text-left">{note}</div>}
            </div>
            <SampleResult />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
