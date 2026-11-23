import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FAQSection } from '../components/FAQSection';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { TypedHeroTagline } from '../components/home/TypedHero';
import { useScrollTracking } from '../hooks/useScrollTracking';
import { trackCTA } from '../utils/trackCTA';
import { articles } from '../content/insights';
import { HOME_EVIDENCE, REPORT_EVIDENCE } from '../content/evidence';
import leoMeggitt from '../assets/leo-meggitt.jpg';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { HomeServiceLinks, HomeSectorLinks } from '../components/home/HomeLinks';
import { ScoreBlock } from '../components/landing/ScoreBlock';
import { CtaSection } from '../components/landing/CtaSection';
import { HOME_RECENT_WORK } from '../content/case-studies';

// The hero ledger: published and derived prices from our own sector reports.
// Colours are written as fixed values so the paper theme's overrides leave the dark panel alone.
function HeroLedger() {
  const reportCount = articles.filter((a) => a.category === 'Sector Report').length;
  const rows = HOME_EVIDENCE.filter((slug) => REPORT_EVIDENCE[slug]).map((slug) => ({ slug, ...REPORT_EVIDENCE[slug] }));
  const dealsRead = rows.reduce((n, r) => n + r.deals, 0);
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border-t-4 border-[#FF87B7] bg-[#0A2647] text-[#F2EDE4] shadow-2xl shadow-[#0A2647]/20"
      aria-labelledby="hero-ledger-heading"
    >
      {/* The five rising bars of the logo, as a quiet watermark. */}
      <svg className="absolute -right-6 -top-4 h-40 w-40 opacity-[0.07]" viewBox="0 0 100 100" fill="#F2EDE4" aria-hidden="true">
        {[[8, 44], [27, 30], [46, 16], [65, 30], [84, 44]].map(([x, y]) => (
          <g key={x}>
            <polygon points={`${x - 5},${y + 10} ${x + 4},${y} ${x + 13},${y + 10}`} />
            <rect x={x} y={y + 10} width="8" height={90 - y} />
          </g>
        ))}
      </svg>
      <div className="relative p-6 md:p-8">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-[#D4B545] mb-2">From our deal log</p>
        <h2 id="hero-ledger-heading" className="font-serif text-2xl md:text-[1.75rem] leading-tight text-balance text-[#FFFFFF] mb-6">
          What buyers paid, 2024 to 2026
        </h2>
        <ul className="border-t border-[#F2EDE4]/15">
          {rows.map((r) => (
            <li key={r.slug} className="border-b border-[#F2EDE4]/15">
              <Link
                to={`/insights/${r.slug}/`}
                onClick={() => trackCTA(`Hero ledger: ${r.sector}`, 'hero')}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 py-3.5 -mx-2 px-2 rounded-md hover:bg-[#F2EDE4]/[0.06] transition-colors"
              >
                <span>
                  <span className="block font-medium text-[#FFFFFF] group-hover:text-[#D4B545] transition-colors">{r.sector}</span>
                  <span className="block text-[0.8125rem] text-[#F2EDE4]/70 mt-0.5">{r.deals} deals logged</span>
                </span>
                <span className="text-right">
                  <span className="block font-serif text-2xl leading-none text-[#D4B545] tabular-nums whitespace-nowrap">{r.multiple}</span>
                  <span className="block text-[0.8125rem] text-[#F2EDE4]/70 mt-1">{r.basis}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[0.8125rem] leading-relaxed text-[#F2EDE4]/70 mt-5">
          {dealsRead} deals read across these {rows.length} sectors. Each figure is published or derived, and its report shows the source.
        </p>
        <Link
          to="/insights/"
          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#FFFFFF] hover:text-[#D4B545] transition-colors"
        >
          All {reportCount} sector reports
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_25rem] xl:grid-cols-[minmax(0,1fr)_27rem] gap-12 xl:gap-16 items-center">
      <div>
        <p className="eyebrow mb-6">UK & cross-border · worth £5M to £50M</p>
        <h1 className="font-serif text-display-xl lg:text-[3rem] xl:text-[4.25rem] text-white mb-8 text-balance leading-[1.05]">
          Business exits,<br />
          <TypedHeroTagline />
        </h1>
        <p className="text-body-lg md:text-xl text-sand-light max-w-2xl mb-10 leading-relaxed">
          A faster, more rigorous M&amp;A process. Proprietary technology accelerates analysis and buyer discovery;
          senior advisers lead every conversation that matters.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact/"
            onClick={() => trackCTA('Arrange a Confidential Conversation', 'hero')}
            className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5"
          >
            Arrange a Confidential Conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/exit-readiness-score/"
            onClick={() => trackCTA('Free Exit Readiness Score', 'hero')}
            className="inline-flex items-center gap-2 border border-sand/30 text-white px-7 py-3.5 rounded-md font-medium tracking-wide hover:bg-white/5 hover:border-sand/60 transition-all duration-200"
          >
            Get your free exit readiness score
          </Link>
        </div>
        <p className="mt-8 text-sm text-navy-light">
          <span className="font-semibold text-navy">15 years</span> in M&amp;A
          <span className="mx-3 text-navy/30" aria-hidden="true">|</span>
          <span className="font-semibold text-navy">£800m+</span> of transactions advised on
        </p>
      </div>
      <HeroLedger />
    </div>
  );
}

function RecentWork() {
  return (
    <section className="bg-white py-24 md:py-28 border-t border-navy/5">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-navy-light mb-6">Our work</p>
            <h2 className="font-serif text-display-md text-navy leading-tight text-balance">Recent work</h2>
          </div>
        </FadeIn>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOME_RECENT_WORK.map((study) => (
            <StaggerItem key={study.title}>
              <Link
                to="/case-studies/"
                className="group flex flex-col h-full rounded-xl border border-navy/10 bg-white p-7 hover:border-accent/40 hover:shadow-lg transition-all"
              >
                <span className="self-start bg-navy text-white px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-5">
                  {study.tag}
                </span>
                <h3 className="font-serif text-xl text-navy leading-snug mb-1 group-hover:text-accent-dark transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs font-mono text-navy-light tracking-widest uppercase mb-5">{study.sector}</p>
                <p className="text-sm text-navy leading-relaxed">{study.outcome}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Link
          to="/case-studies/"
          className="inline-flex items-center gap-2 text-navy font-medium mt-10 hover:text-accent-dark transition-colors"
        >
          See all our work
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function LeoBlock() {
  return (
    <section className="bg-white py-24 md:py-28 border-t border-navy/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          <FadeIn className="md:col-span-4">
            <div className="w-full max-w-xs aspect-[4/5] overflow-hidden rounded-xl bg-sand-light">
              <img src={leoMeggitt} alt="Leo Meggitt" loading="lazy" className="block w-full h-full object-cover object-center" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-8">
            <h2 className="font-serif text-display-md text-navy leading-tight mb-2">Leo Meggitt</h2>
            <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-6">
              Managing Director, Mastella Advisory
            </p>
            <p className="text-body-lg text-navy font-medium leading-relaxed mb-4">
              15 years in M&amp;A. Has advised on over £800m of transactions across multiple sectors.
            </p>
            <p className="text-body-lg text-navy-light leading-relaxed mb-8">
              When you engage Mastella, you engage me. I run the readiness work, lead every conversation with potential
              buyers, manage the negotiation, and sign alongside you on completion day.
            </p>
            <Link
              to="/team/"
              className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent-dark transition-colors"
            >
              Read Leo&apos;s full profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useScrollTracking();

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Off-market M&A for founder-led companies"
        description="Off-market M&A for founder-led businesses worth £5M to £50M. We find buyers other advisers don't reach. Confidential sell-side, fundraising and exit readiness."
        canonical="https://mastellagroup.com/"
      />

      {/* What we do */}
      <WhatWeDo />

      {/* Recent work: three sales from /case-studies/ */}
      <RecentWork />

      {/* Exit Readiness Score */}
      <ScoreBlock eyebrow="Free Exit Readiness Score" />

      {/* Leo Meggitt */}
      <LeoBlock />

      {/* Services: one link per service page */}
      <HomeServiceLinks />

      {/* Sectors: one link per sector pillar */}
      <HomeSectorLinks />

      <FAQSection />

      <CtaSection heading="Your transaction starts with a conversation." />
    </PageLayout>
  );
}
