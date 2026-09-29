import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { AuthorityLine } from '../components/landing/AuthorityLine';
import { FaqSection } from '../components/landing/FaqSection';
import { MODEL } from '../content/readiness/model';
import type { ReadinessIndicator } from '../content/readiness/types';
import { SCORING_PAGE } from '../content/readiness/meta';
import { lcFirst } from '../components/readiness/format';
import { SITE, canonicalFor } from '../seo/site-meta';

const PATH = SCORING_PAGE.path;
const PUBLISHED = SCORING_PAGE.published;
const SCORING_META = SCORING_PAGE;

const byId = (id: string) => MODEL.indicators.find((i) => i.id === id) as ReadinessIndicator;
const lc = lcFirst;

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Resource</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-6 text-balance">
        How we score exit readiness
      </h1>
      <p className="text-lg md:text-2xl text-accent leading-snug mb-10 max-w-2xl text-balance">
        The five areas buyers test, how they are weighted, and the thresholds and buyer responses for the core
        measures.
      </p>
      <Link
        to="/exit-readiness-score/"
        className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-6 py-3 rounded-md text-sm md:text-base font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-px"
      >
        Score your own business, free
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function faqs() {
  const eq1 = byId('EQ1');
  const eq2 = byId('EQ2');
  const eq5 = byId('EQ5');
  const dd1 = byId('DD1');
  const fd1 = byId('FD1');
  const fd = [
    ...MODEL.indicators.filter((i) => i.module === 'FD').map((i) => lc(i.name)),
    ...MODEL.otherMeasures.filter((o) => o.module === 'FD').map((o) => lc(o.name)),
  ];
  return [
    {
      q: 'How much customer concentration is too much when selling a business?',
      a: `On our thresholds, a largest customer at ${eq2.bands['4']} of revenue is strong, ${eq2.bands['3']} adequate, ${eq2.bands['2']} weak and ${eq2.bands['1']} critical. At the weak end, a trade buyer typically responds as follows: ${lc(eq2.buyerView.trade)} Private equity: ${lc(eq2.buyerView.pe)}`,
    },
    {
      q: 'How do buyers measure founder dependency?',
      a: `We use ${fd.length} measures: ${fd.join(', ')}. The most heavily weighted is founder-held revenue, the share of revenue from customers who mainly deal with the founder: ${fd1.bands['4']} is strong and ${fd1.bands['1']} is critical. Founder dependency drives earn-out size, lock-in length and how much of the price is paid in cash at completion.`,
    },
    {
      q: 'How do add-backs affect the price of a business?',
      a: `Buyers test every normalisation adjustment. On our thresholds, add-backs of ${eq5.bands['4']} of reported EBITDA are strong, ${eq5.bands['2']} weak and ${eq5.bands['1']} critical. Trade buyer: ${lc(eq5.buyerView.trade)} Private equity: ${lc(eq5.buyerView.pe)}`,
    },
    {
      q: 'What recurring revenue do buyers want to see?',
      a: `Contracted or recurring revenue of ${eq1.bands['4']} of revenue scores as strong, ${eq1.bands['3']} adequate, ${eq1.bands['2']} weak and ${eq1.bands['1']} critical. Lower visibility means a lower multiple and, for private equity, less debt and a larger equity cheque.`,
    },
    {
      q: 'How quickly should month-end accounts be ready before selling a business?',
      a: `Final management accounts within ${dd1.bands['4']} after month end score as strong, ${dd1.bands['3']} adequate and ${dd1.bands['1']} critical. Slow reporting usually means a longer due diligence and completion accounts rather than a locked box.`,
    },
    {
      q: 'What is a good exit readiness score?',
      a: 'On a score out of 100, 75 or more is strong, 50 to 74 adequate, 25 to 49 weak and below 25 critical. The overall number matters less than the individual measures: a critical score on a blocker such as founder-held revenue, the largest customer or add-backs can change the deal structure on its own.',
    },
  ];
}

function BandTable({ indicators }: { indicators: ReadinessIndicator[] }) {
  const cell = 'px-3 py-3 align-top border-t border-navy/10';
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 mb-8">
      <table className="min-w-[720px] w-full text-sm text-left">
        <thead>
          <tr className="text-xs font-mono uppercase tracking-widest text-navy-light">
            <th className="px-3 py-2 w-[26%]">Measure</th>
            <th className="px-3 py-2">Strong</th>
            <th className="px-3 py-2">Adequate</th>
            <th className="px-3 py-2">Weak</th>
            <th className="px-3 py-2">Critical</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((i) => (
            <tr key={i.id}>
              <th scope="row" className={`${cell} font-normal`}>
                <span className="block font-medium text-navy">
                  {i.name}
                  {i.blocker && <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-red-700">blocker</span>}
                </span>
                <span className="block text-navy-light mt-1 leading-relaxed">{i.measures}</span>
              </th>
              <td className={`${cell} text-navy`}>{i.bands['4']}</td>
              <td className={`${cell} text-navy`}>{i.bands['3']}</td>
              <td className={`${cell} text-navy`}>{i.bands['2']}</td>
              <td className={`${cell} text-navy`}>{i.bands['1']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ExitReadinessScoring() {
  const canonical = canonicalFor(PATH);
  const blockers = MODEL.indicators.filter((i) => i.blocker).map((i) => lc(i.name));
  const heavy = MODEL.indicators.filter((i) => i.weight > 1).map((i) => lc(i.name));
  const faqList = faqs();

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO title={SCORING_META.title} description={SCORING_META.description} canonical={canonical} type="article" />
      <StructuredData
        data={[
          {
            '@type': 'Article',
            headline: 'How we score exit readiness',
            description: SCORING_META.description,
            author: {
              '@type': 'Person',
              name: 'Leo Meggitt',
              jobTitle: 'Managing Director',
              worksFor: { '@id': `${SITE.domain}/#organization` },
            },
            publisher: { '@id': `${SITE.domain}/#organization` },
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            mainEntityOfPage: canonical,
            inLanguage: 'en-GB',
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
              { '@type': 'ListItem', position: 2, name: 'How we score exit readiness', item: canonical },
            ],
          },
        ]}
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <AuthorityLine />
            <p className="font-mono text-xs text-navy-light tracking-widest uppercase mb-8">
              Model version {MODEL.version} · Published 29 September 2026
            </p>
            <div className="max-w-3xl space-y-5 text-body-lg text-navy-light leading-relaxed mb-14">
              <p>
                This is the scoring model behind our free{' '}
                <Link to="/exit-readiness-score/" className="text-navy underline decoration-accent/40 underline-offset-4">
                  Exit Readiness Score
                </Link>{' '}
                and our paid{' '}
                <Link to="/services/exit-readiness-assessment/" className="text-navy underline decoration-accent/40 underline-offset-4">
                  Exit Readiness Assessment
                </Link>
                . We publish the structure, and the thresholds for the {MODEL.indicators.length} core measures the free
                score uses, so owners can see what they are measured against. The Assessment scores{' '}
                {MODEL.otherMeasures.length} more, named under each area below. A buyer&apos;s due diligence asks the
                same questions, usually with less warning.
              </p>
            </div>

            <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">How the score works</h2>
            <div className="max-w-3xl space-y-5 text-body-lg text-navy-light leading-relaxed mb-8">
              <p>
                Each measure falls into one of four bands. Strong scores 4, adequate 3, weak 2 and critical 1. Bands
                convert to a score out of 100 (strong 100, adequate 67, weak 33, critical 0) and are averaged within
                each area. Within their areas, {heavy.join(', ')} carry one and a half times the weight of the other
                measures.
              </p>
              <p>
                The overall score weights the five areas as shown below. 75 or more is strong, 50 to 74 adequate, 25 to
                49 weak and below 25 critical.
              </p>
              <p>
                Some measures are blockers, including {blockers.join(', ')}. A critical score on any of them is
                reported separately from the average, because it can change the structure of a deal on its own.
              </p>
              <p>
                The free score uses the owner&apos;s own answers. In the paid Assessment the same measures are
                calculated from the business&apos;s data where possible and tested in interviews with the senior team,
                and each is marked as verified, owner&apos;s view only, or missing.
              </p>
            </div>
            <div className="overflow-x-auto mb-16">
              <table className="w-full max-w-3xl text-left text-sm">
                <thead>
                  <tr className="text-xs font-mono uppercase tracking-widest text-navy-light">
                    <th className="px-3 py-2">Area</th>
                    <th className="px-3 py-2">Weight</th>
                    <th className="px-3 py-2">Measures scored</th>
                    <th className="px-3 py-2">In the free score</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL.modules.map((m) => (
                    <tr key={m.id}>
                      <td className="px-3 py-3 border-t border-navy/10 text-navy font-medium">{m.name}</td>
                      <td className="px-3 py-3 border-t border-navy/10 text-navy">{m.weight}%</td>
                      <td className="px-3 py-3 border-t border-navy/10 text-navy">{m.totalMeasures}</td>
                      <td className="px-3 py-3 border-t border-navy/10 text-navy">
                        {MODEL.indicators.filter((i) => i.module === m.id).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {MODEL.modules.map((m) => {
              const inds = MODEL.indicators.filter((i) => i.module === m.id);
              const others = MODEL.otherMeasures.filter((o) => o.module === m.id);
              return (
                <section key={m.id} className="pt-12 pb-4 border-t border-navy/10">
                  <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-2">
                    {m.weight}% of the score
                  </p>
                  <h2 className="font-serif text-display-md text-navy leading-tight mb-4 text-balance">{m.name}</h2>
                  <p className="max-w-3xl text-body-lg text-navy-light leading-relaxed mb-8">{m.purpose}</p>
                  <BandTable indicators={inds} />
                  {others.length > 0 && (
                    <p className="max-w-3xl text-sm text-navy-light leading-relaxed mb-4">
                      <span className="font-medium text-navy">Also scored in the Assessment: </span>
                      {others.map((o) => lc(o.name)).join(', ')}.
                    </p>
                  )}
                  <h3 className="font-serif text-2xl text-navy leading-snug mt-10 mb-5">
                    What buyers do when the core measures are weak
                  </h3>
                  <dl className="max-w-3xl space-y-5 mb-8">
                    {inds.map((i) => (
                      <div key={i.id}>
                        <dt className="font-medium text-navy mb-1">{i.name}</dt>
                        <dd className="text-navy-light leading-relaxed">
                          <span className="font-mono text-xs uppercase tracking-widest text-navy mr-2">Trade</span>
                          {i.buyerView.trade}{' '}
                          <span className="font-mono text-xs uppercase tracking-widest text-navy mx-2">PE</span>
                          {i.buyerView.pe}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              );
            })}

            <div className="rounded-xl bg-navy-deepest text-white p-8 md:p-10 mt-8">
              <h2 className="font-serif text-3xl leading-tight mb-4 text-balance">See where your business sits</h2>
              <p className="text-sand-light leading-relaxed mb-8 max-w-2xl">
                The free Exit Readiness Score asks the {MODEL.indicators.length} core questions and scores your answers on
                these thresholds. About three minutes, no sign-up.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/exit-readiness-score/"
                  className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-6 py-3 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all self-start"
                >
                  Take the free score
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/exit-readiness-assessment/"
                  className="inline-flex items-center gap-2 text-sand-light underline decoration-accent/50 underline-offset-4 hover:text-white self-start py-3"
                >
                  About the verified Assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqList} heading="Exit readiness scoring: FAQs" />
    </PageLayout>
  );
}
