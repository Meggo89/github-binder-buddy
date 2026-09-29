import { ArrowRight, AlertTriangle, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Answer, ReadinessResult } from '../../content/readiness/score';
import { BOOKING_URL, describeAnswer, lcFirst } from './format';
import { MODEL } from '../../content/readiness/model';
import { SendResultsForm } from './SendResultsForm';

const RATING_TONE: Record<string, string> = {
  Strong: 'bg-emerald-600',
  Adequate: 'bg-amber-500',
  Weak: 'bg-orange-600',
  Critical: 'bg-red-700',
  'Not scored': 'bg-navy/30',
};

function Bar({ label, score, rating, note }: { label: string; score: number | null; rating: string; note: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5 gap-4">
        <span className="font-medium text-navy">{label}</span>
        <span className="font-mono text-sm text-navy">
          {score === null ? 'not scored' : `${Math.round(score)} / 100`}{' '}
          <span className="text-navy-light">· {rating}</span>
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-navy/10 overflow-hidden" aria-hidden="true">
        <div className={`h-full rounded-full ${RATING_TONE[rating]}`} style={{ width: `${score ?? 0}%` }} />
      </div>
      <p className="text-xs text-navy-light mt-1">{note}</p>
    </div>
  );
}

interface Props {
  result: ReadinessResult;
  answers: Record<string, Answer | undefined>;
}

export function ResultsPanel({ result, answers }: Props) {
  const gaps = result.gaps.slice(0, 3);
  const moreGaps = result.gaps.slice(3);
  return (
    <section id="results" className="bg-white py-16 md:py-20 border-t border-navy/10 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow text-navy-light mb-4">Your result</p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10 mb-10">
            <div>
              <p className="font-serif text-7xl text-navy leading-none">
                {result.overall === null ? 'n/a' : Math.round(result.overall)}
                <span className="text-3xl text-navy-light"> / 100</span>
              </p>
              <p className="font-mono text-sm tracking-widest uppercase text-accent-dark mt-3">{result.rating}</p>
            </div>
            <p className="text-body-lg text-navy-light leading-relaxed max-w-xl">
              Based on {result.answered} of {MODEL.indicators.length} questions answered. An indicative score on{' '}
              {MODEL.indicators.length} of the {MODEL.totalMeasures} measures in a paid Exit Readiness Assessment, using
              your answers only.
            </p>
          </div>

          <div className="grid gap-6 mb-14">
            {result.modules.map((m) => (
              <Bar
                key={m.id}
                label={`${m.name} (${m.weight}% of the score)`}
                score={m.score}
                rating={m.rating}
                note={`${m.answered} of ${m.total} questions answered. The Assessment scores ${
                  MODEL.modules.find((x) => x.id === m.id)?.totalMeasures ?? m.total
                } measures here.`}
              />
            ))}
          </div>

          {result.blockers.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 mb-12 flex gap-4">
              <AlertTriangle className="h-5 w-5 text-red-700 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-red-900 mb-2">Critical on a measure buyers treat as a deal issue</p>
                <p className="text-red-900/90 leading-relaxed">
                  {result.blockers.map((b) => b.indicator.name).join(', ')}. A score of 1 here usually changes the deal
                  structure on its own, whatever the rest of the business looks like.
                </p>
              </div>
            </div>
          )}

          {gaps.length > 0 && (
            <div className="mb-14">
              <h2 className="font-serif text-display-md text-navy leading-tight mb-3 text-balance">
                Where a buyer would push
              </h2>
              <p className="text-navy-light leading-relaxed mb-8">
                The weakest measures in your answers, most costly first. Cost is weighted by how much each measure
                moves price and terms.
              </p>
              <div className="space-y-6">
                {gaps.map((g) => (
                  <article key={g.indicator.id} className="rounded-xl border border-navy/10 p-6 break-inside-avoid">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="font-serif text-xl text-navy leading-snug">{g.indicator.name}</h3>
                      <span className="font-mono text-xs uppercase tracking-widest text-orange-700 flex-shrink-0">
                        {g.score === 1 ? 'Critical' : 'Weak'}
                      </span>
                    </div>
                    <dl className="grid gap-3 text-sm leading-relaxed">
                      <div className="grid md:grid-cols-[11rem_1fr] gap-1">
                        <dt className="font-mono text-xs uppercase tracking-widest text-navy-light pt-0.5">Your answer</dt>
                        <dd className="text-navy">{describeAnswer(g, answers[g.indicator.id])}</dd>
                      </div>
                      <div className="grid md:grid-cols-[11rem_1fr] gap-1">
                        <dt className="font-mono text-xs uppercase tracking-widest text-navy-light pt-0.5">Buyers look for</dt>
                        <dd className="text-navy">{g.indicator.bands['4'] === 'none' ? 'None of these' : g.indicator.bands['4']}</dd>
                      </div>
                      <div className="grid md:grid-cols-[11rem_1fr] gap-1">
                        <dt className="font-mono text-xs uppercase tracking-widest text-navy-light pt-0.5">Trade buyer</dt>
                        <dd className="text-navy-light">{g.indicator.buyerView.trade}</dd>
                      </div>
                      <div className="grid md:grid-cols-[11rem_1fr] gap-1">
                        <dt className="font-mono text-xs uppercase tracking-widest text-navy-light pt-0.5">Private equity</dt>
                        <dd className="text-navy-light">{g.indicator.buyerView.pe}</dd>
                      </div>
                      {g.indicator.actions[0] && (
                        <div className="grid md:grid-cols-[11rem_1fr] gap-1">
                          <dt className="font-mono text-xs uppercase tracking-widest text-navy-light pt-0.5">Usual fix</dt>
                          <dd className="text-navy">{g.indicator.actions.join('; ')}</dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
              </div>
              {moreGaps.length > 0 && (
                <p className="text-navy-light leading-relaxed mt-6">
                  Also weak in your answers: {moreGaps.map((g) => lcFirst(g.indicator.name)).join(', ')}.
                </p>
              )}
            </div>
          )}

          {result.unsure.length > 0 && (
            <div className="mb-14">
              <h2 className="font-serif text-2xl text-navy leading-snug mb-3">Worth finding out</h2>
              <p className="text-navy-light leading-relaxed mb-4">
                You were not sure about these. A buyer&apos;s due diligence will ask for every one of them.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-navy">
                {result.unsure.map((u) => (
                  <li key={u.indicator.id} className="flex gap-2">
                    <span className="text-accent-dark">·</span>
                    {u.indicator.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl bg-sand-light border border-navy/10 p-6 md:p-8 mb-12">
            <h2 className="font-serif text-2xl text-navy leading-snug mb-3">What this score does not tell you</h2>
            <p className="text-navy-light leading-relaxed mb-3">
              It scores your own answers. It does not check them against your accounts, your customer list or your
              team, and those checks are where most useful findings come from. A buyer&apos;s due diligence will test
              every answer.
            </p>
            <p className="text-navy-light leading-relaxed">
              The{' '}
              <Link to="/services/exit-readiness-assessment/" className="text-navy underline decoration-accent/50 underline-offset-4">
                Exit Readiness Assessment
              </Link>{' '}
              is the verified version: all {MODEL.totalMeasures} measures, tested against your data and interviews with
              your senior team, with a view on which exit routes are open and an action plan.
            </p>
            <p className="text-sm text-navy-light leading-relaxed mt-4">
              Not covered by the free score: {MODEL.otherMeasures.map((o) => lcFirst(o.name)).join(', ')}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-14 print:hidden">
            <a
              href={BOOKING_URL}
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag)
                  window.gtag('event', 'booking_click', { location: 'readiness_score_results' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-accent text-navy-deepest px-6 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all"
            >
              Book a call to go through it
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => typeof window !== 'undefined' && window.print()}
              className="inline-flex items-center justify-center gap-2 border border-navy/20 text-navy px-6 py-3.5 rounded-md font-semibold tracking-wide hover:border-navy/40 transition-all"
            >
              <Printer className="h-4 w-4" />
              Print or save as PDF
            </button>
          </div>

          <div className="print:hidden">
            <SendResultsForm result={result} answers={answers} />
          </div>
        </div>
      </div>
    </section>
  );
}
