// Exit readiness section: the full Exit Readiness Assessment (run on Scalexit) first, then the free
// three-minute score as a smaller, separate option. Used on the home page, the Exit Readiness
// Assessment service page and the Exit planning service page. Copy is fixed by Leo. No link to
// scalexit.com. The free score must never be described as running on Scalexit.
//
// FILE SLOTS (see vite.config.ts; the build picks the files up automatically):
// - Scalexit logo, unaltered: public/images/scalexit-logo.svg (or .png) for light backgrounds, and
//   public/images/scalexit-logo-dark.svg (or .png) for the charcoal home section. Shown small beside
//   the Part A sub-heading. Nothing shows until it is added.
// - Scalexit score card graphic, unaltered: public/images/scalexit-card.png (or .svg, .webp, .jpg).
//   Shown beside the Part A copy with its caption. Nothing shows until it is added. Do not rebuild
//   the card in code.
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOGO = __SCALEXIT_LOGO__;
const LOGO_DARK = __SCALEXIT_LOGO_DARK__;
const CARD = __SCALEXIT_CARD__;

const ASSESSMENT_CTA = { to: '/contact/', label: 'Ask about an exit readiness assessment' };

export function AssessmentCta({ className = '' }: { className?: string }) {
  return (
    <Link
      to={ASSESSMENT_CTA.to}
      className={`inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-md font-semibold tracking-wide hover:bg-navy-deepest transition-colors ${className}`}
    >
      {ASSESSMENT_CTA.label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function FullAssessment({ dark = false }: { dark?: boolean }) {
  return (
    <div className="er-panel rounded-xl border border-navy/10 bg-white p-6 md:p-10">
      <div className={CARD ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12 items-start' : ''}>
        <div className={CARD ? '' : 'max-w-3xl'}>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 mb-5">
            {dark && LOGO_DARK ? (
              // The dark version has its own background and margin, so it is shown a little taller.
              <img src={LOGO_DARK} alt="Scalexit" width={2000} height={547} className="h-10 w-auto shrink-0 rounded" loading="lazy" />
            ) : (
              LOGO && <img src={LOGO} alt="Scalexit" width={2100} height={400} className="h-6 w-auto shrink-0" loading="lazy" />
            )}
            <h3 className="font-serif text-2xl md:text-3xl text-navy leading-tight">The full Exit Readiness Assessment</h3>
          </div>
          <p className="text-body-lg text-navy-light leading-relaxed mb-4">
            We run full assessments on Scalexit, the platform we co-founded. It scores your business the way a buyer
            would across five areas: financial health, operational maturity, strategic position and growth, market
            attractiveness and diligence readiness. You see what to fix first and what each gap could cost you on
            price, and a senior adviser takes you through the results. It is a low-cost first step, months or years
            before a sale.
          </p>
          <p className="text-body-lg text-navy-light leading-relaxed mb-8">
            The platform also lets us start lining up buyers early: your business can be shown to vetted buyers under
            a codename, never your name, so by the time you are ready to sell we already know who is interested. If
            you go on to sell, the same work carries straight into the sale process.
          </p>
          <AssessmentCta />
        </div>
        {CARD && (
          <figure>
            <img
              src={CARD}
              alt="Sample Exit Readiness Assessment report for a fictional company: a weighted score of 60 out of 100, indicative value of £12.9m to £14.6m today and £15.6m to £17.3m after the plan, scores for the five areas buyers test, gaps ranked by what they could cost, and the first three priorities."
              className="w-full h-auto rounded-md border border-navy/10"
              width={1584}
              height={2496}
              loading="lazy"
            />
            <figcaption className="text-xs text-navy-light mt-3">
              Example from a full Scalexit assessment. Illustration only.
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

function FreeScore() {
  return (
    <div className="er-quick rounded-xl bg-sand-light p-6 md:p-7 md:flex md:items-center md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <h3 className="font-serif text-xl text-navy leading-snug mb-2">
          Not ready for that yet? Try the free three-minute score
        </h3>
        <p className="text-navy-light leading-relaxed">
          Eleven of the questions buyers test, covering four of the five areas. About three minutes, no sign-up. It
          gives you a quick read, not a full assessment.
        </p>
      </div>
      <Link
        to="/exit-readiness-score/"
        className="inline-flex items-center gap-2 mt-5 md:mt-0 shrink-0 font-semibold text-navy underline decoration-accent/50 underline-offset-4 hover:text-accent-dark transition-colors"
      >
        Get my free score
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

const HEADING = 'Know where you stand before you sell.';
const INTRO =
  'Most of the price a buyer chips away in a sale comes from things an owner could have fixed a year earlier. Before starting a sale process, we recommend a full exit readiness assessment.';

// Home page: a full-width section.
export function ExitReadinessSection() {
  return (
    <section className="er-dark bg-white py-24 md:py-28 border-t border-navy/5" aria-labelledby="exit-readiness-heading">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 id="exit-readiness-heading" className="font-serif text-display-md text-navy leading-tight mb-5 text-balance">
            {HEADING}
          </h2>
          <p className="text-body-lg text-navy-light leading-relaxed max-w-3xl mb-12">{INTRO}</p>
          <FullAssessment dark />
          <div className="mt-6">
            <FreeScore />
          </div>
        </div>
      </div>
    </section>
  );
}

// Service pages: the same content inside the page's own column.
export function ExitReadinessBlock({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-labelledby="exit-readiness-block-heading" role="region">
      <h2 id="exit-readiness-block-heading" className="font-serif text-display-md text-navy leading-tight mb-4 text-balance">
        {HEADING}
      </h2>
      <p className="text-body-lg text-navy-light leading-relaxed mb-8">{INTRO}</p>
      <FullAssessment />
      <div className="mt-5">
        <FreeScore />
      </div>
    </div>
  );
}
