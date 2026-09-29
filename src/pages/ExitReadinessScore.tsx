import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { AuthorityLine } from '../components/landing/AuthorityLine';
import { FaqSection } from '../components/landing/FaqSection';
import { RelatedLinks } from '../components/landing/RelatedLinks';
import { QuestionField } from '../components/readiness/QuestionField';
import { ResultsPanel } from '../components/readiness/ResultsPanel';
import { MODEL } from '../content/readiness/model';
import { scoreAnswers, type Answer, type ReadinessResult } from '../content/readiness/score';
import { SCORE_PAGE } from '../content/readiness/meta';
import { SITE, canonicalFor } from '../seo/site-meta';

const MIN_ANSWERED = 8;
const ASKED = MODEL.indicators.length;
const PATH = SCORE_PAGE.path;
const SCORE_META = SCORE_PAGE;

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Free tool</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-6 text-balance">Exit Readiness Score</h1>
      <p className="text-lg md:text-2xl text-accent leading-snug mb-8 max-w-2xl text-balance">
        {ASKED} questions, about three minutes. An indicative read on how a buyer would see your business, using{' '}
        {ASKED} of the {MODEL.totalMeasures} measures in our paid Exit Readiness Assessment.
      </p>
      <p className="flex items-center gap-2 text-sm text-sand-light mb-10">
        <Lock className="h-4 w-4 text-accent" />
        No sign-up. Your answers stay in your browser unless you choose to send them.
      </p>
      <a
        href="#questions"
        className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-6 py-3 rounded-md text-sm md:text-base font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-px"
      >
        Start the questions
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function scoreFaqs() {
  const w = MODEL.modules.map((m) => `${m.name.toLowerCase()} ${m.weight}%`).join(', ');
  const heavy = MODEL.indicators.filter((i) => i.weight > 1).map((i) => i.name.toLowerCase());
  return [
    {
      q: 'Is the Exit Readiness Score free?',
      a: 'Yes. There is no sign-up and no email needed to see your result. Your answers are scored in your browser and are only sent to Mastella Advisory if you choose to send them.',
    },
    {
      q: 'How is the exit readiness score calculated?',
      a: `Each of the ${ASKED} answers falls into one of four bands (strong, adequate, weak or critical) using published thresholds. Bands convert to a score out of 100, averaged within five areas weighted as follows: ${w}. Within their areas, ${heavy.join(', ')} count for more than the other measures.`,
    },
    {
      q: 'What is a good exit readiness score?',
      a: '75 or more is strong, 50 to 74 adequate, 25 to 49 weak and below 25 critical. The overall number matters less than the individual measures: a single critical score on a measure such as founder-held revenue or the largest customer\'s share of revenue can change the deal structure on its own.',
    },
    {
      q: 'How accurate is a self-assessed exit readiness score?',
      a: `It is an indicative read based on your own answers to ${ASKED} of the ${MODEL.totalMeasures} measures we use. The paid Exit Readiness Assessment covers all ${MODEL.totalMeasures} and checks each answer against your accounts, your customer data and interviews with your senior team.`,
    },
    {
      q: 'Who is the Exit Readiness Score for?',
      a: 'Owners of UK owner-managed businesses thinking about a sale, a management buyout, an employee ownership trust or outside investment in the next few years. The thresholds were set with businesses worth roughly £5M to £50M in mind, but the measures apply to smaller businesses too.',
    },
  ];
}

export default function ExitReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, Answer | undefined>>({});
  const [raw, setRaw] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReadinessResult | null>(null);
  const [warning, setWarning] = useState('');

  const live = useMemo(() => scoreAnswers(answers), [answers]);
  const touched = Object.values(answers).filter(Boolean).length;

  useEffect(() => {
    if (result && typeof document !== 'undefined') {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const update = (id: string, next: Answer | undefined, rawText?: string) => {
    setAnswers((a) => ({ ...a, [id]: next }));
    if (rawText !== undefined) setRaw((r) => ({ ...r, [id]: rawText }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (live.answered < MIN_ANSWERED) {
      setWarning(
        `Please answer at least ${MIN_ANSWERED} questions (you have ${live.answered}). "Not sure" is fine where you don't know, but the score needs enough answers to mean something.`,
      );
      return;
    }
    setWarning('');
    setResult(live);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'readiness_score_complete', { score: live.overall ?? 0, answered: live.answered });
    }
  };

  const canonical = canonicalFor(PATH);
  const faqs = scoreFaqs();
  let n = 0;

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO title={SCORE_META.title} description={SCORE_META.description} canonical={canonical} />
      <StructuredData
        data={[
          {
            '@type': 'WebApplication',
            name: 'Exit Readiness Score',
            url: canonical,
            description: SCORE_META.description,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web browser)',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
            provider: { '@id': `${SITE.domain}/#organization` },
            inLanguage: 'en-GB',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
              { '@type': 'ListItem', position: 2, name: 'Exit Readiness Score', item: canonical },
            ],
          },
        ]}
      />

      <section className="bg-white pt-20 pb-6 md:pt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AuthorityLine />
            <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">How it works</h2>
            <div className="space-y-5 text-body-lg text-navy-light leading-relaxed">
              <p>
                Buyers judge an owner-managed business on a fairly consistent set of questions: how much depends on
                the founder, whether there is a team they can back, how much of the profit they can rely on, whether
                the growth shows up in the numbers, and how cleanly the business will get through due diligence. This
                tool asks {ASKED} of the {MODEL.totalMeasures} questions we use to score those five areas: the ones you can
                answer without looking anything up.
              </p>
              <p>
                Each answer is placed in a band (strong, adequate, weak or critical) using thresholds we publish on{' '}
                <a href="/resources/exit-readiness-scoring/" className="text-navy underline decoration-accent/40 underline-offset-4">
                  how we score exit readiness
                </a>
                . You get a score out of 100 overall and for each area, the weak measures ranked by how much they would
                cost you in a sale, and what a trade buyer and a private equity fund typically do about each one.
              </p>
              <p>
                Estimates are fine. Where you don&apos;t know an answer, tick &quot;Not sure&quot;: the result lists those
                separately, because a buyer will ask for every one of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <form id="questions" onSubmit={submit} className="bg-white pb-16 scroll-mt-24 print:hidden" noValidate>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {MODEL.modules.map((m) => (
              <section key={m.id} className="pt-14">
                <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-2">
                  {m.weight}% of the score
                </p>
                <h2 className="font-serif text-display-md text-navy leading-tight mb-3 text-balance">{m.name}</h2>
                <p className="text-navy-light leading-relaxed mb-4 max-w-3xl">{m.purpose}</p>
                <div className="rounded-xl border border-navy/10 px-6 md:px-8">
                  {MODEL.indicators
                    .filter((i) => i.module === m.id)
                    .map((ind) => {
                      n += 1;
                      return (
                        <QuestionField
                          key={ind.id}
                          indicator={ind}
                          number={n}
                          answer={answers[ind.id]}
                          raw={raw[ind.id] ?? ''}
                          onChange={(next, rawText) => update(ind.id, next, rawText)}
                        />
                      );
                    })}
                </div>
              </section>
            ))}

            <div className="sticky bottom-0 mt-12 bg-white/95 backdrop-blur border-t border-navy/10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-navy-light text-sm" aria-live="polite">
                {touched} of {ASKED} answered
                {warning && <span className="block text-red-700 mt-1">{warning}</span>}
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-navy-deepest text-white px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-dark transition-all"
              >
                {result ? 'Update my score' : 'See my score'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {result && <ResultsPanel result={result} answers={answers} />}

      <FaqSection faqs={faqs} heading="Exit Readiness Score: FAQs" />

      <RelatedLinks
        heading="Related"
        links={[
          {
            to: '/services/exit-readiness-assessment/',
            label: 'Exit Readiness Assessment',
            description: 'The verified version: all 29 measures, tested against your data and your team.',
          },
          {
            to: '/resources/exit-readiness-scoring/',
            label: 'How we score exit readiness',
            description: 'Every measure and threshold, and what buyers do when a business falls short.',
          },
          {
            to: '/insights/12-months-before-you-sell/',
            label: 'The 12 months before you sell',
            description: 'The preparation work, in the order it pays back.',
          },
          {
            to: '/services/exit-planning-advisor-uk/',
            label: 'Exit planning adviser UK',
            description: 'How we work with owners 12 to 24 months before a sale.',
          },
        ]}
      />
    </PageLayout>
  );
}
