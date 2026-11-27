import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FAQSection, type FAQItem } from '../components/FAQSection';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { useScrollTracking } from '../hooks/useScrollTracking';
import { trackCTA } from '../utils/trackCTA';
import { articles } from '../content/insights';
import { HOME_EVIDENCE, REPORT_EVIDENCE } from '../content/evidence';
import leoMeggitt from '../assets/leo-meggitt.jpg';
import { SECTORS } from '../content/landing';
import { CtaSection } from '../components/landing/CtaSection';
import { ExitReadinessSection } from '../components/scalexit/ExitReadinessSection';
import { HOME_RECENT_WORK } from '../content/case-studies';

// What buyers paid: published and derived prices from our own sector reports (first three rows).
// Colours are written as fixed values so the paper theme's overrides leave the dark panel alone.
// The panel carries its own charcoal so it sits as a dark card on a white band, next to the
// charcoal exit readiness section.
function BuyersPaid() {
  const reportCount = articles.filter((a) => a.category === 'Sector Report').length;
  const rows = HOME_EVIDENCE.filter((slug) => REPORT_EVIDENCE[slug]).slice(0, 3).map((slug) => ({ slug, ...REPORT_EVIDENCE[slug] }));
  return (
    <section className="mh-bg-white py-24 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
    <aside
      className="relative overflow-hidden rounded-[8px] border border-[#FAF7F2]/[0.14] bg-[#1F2226] text-[#FAF7F2]"
      aria-labelledby="hero-ledger-heading"
    >
      {/* The five rising bars of the logo, as a quiet watermark. */}
      <svg className="absolute -right-6 -top-4 h-40 w-40 opacity-[0.05]" viewBox="0 0 100 100" fill="#FAF7F2" aria-hidden="true">
        {[[8, 44], [27, 30], [46, 16], [65, 30], [84, 44]].map(([x, y]) => (
          <g key={x}>
            <polygon points={`${x - 5},${y + 10} ${x + 4},${y} ${x + 13},${y + 10}`} />
            <rect x={x} y={y + 10} width="8" height={90 - y} />
          </g>
        ))}
      </svg>
      <div className="relative p-6 md:p-8">
        <p className="text-[0.75rem] uppercase tracking-[0.08em] text-[#C9C5BE] mb-2">From our deal log</p>
        <h2 id="hero-ledger-heading" className="font-serif text-2xl md:text-[1.75rem] leading-tight text-balance text-[#FFFFFF] mb-6">
          What buyers paid, 2024 to 2026
        </h2>
        <ul className="border-t border-[#FAF7F2]/[0.14]">
          {rows.map((r) => (
            <li key={r.slug} className="border-b border-[#FAF7F2]/[0.14]">
              <Link
                to={`/insights/${r.slug}/`}
                onClick={() => trackCTA(`What buyers paid: ${r.sector}`, 'home')}
                className="group block py-3.5 -mx-2 px-2 rounded-md hover:bg-[#FAF7F2]/[0.06] transition-colors"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-medium text-[#FFFFFF] group-hover:underline underline-offset-4">{r.sector}</span>
                  <span className="font-serif text-2xl md:text-3xl leading-none text-[#C9A05A] tabular-nums whitespace-nowrap">{r.multiple}</span>
                </span>
                <span className="block text-[0.8125rem] leading-snug text-[#C9C5BE] mt-1.5">
                  {r.basis} · {r.deals} deals logged
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[0.8125rem] leading-relaxed text-[#C9C5BE] mt-5">
          Each figure is published or derived, and its report shows the source.
        </p>
        <Link
          to="/insights/sector-reports/"
          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#FFFFFF] underline decoration-[#FAF7F2]/40 underline-offset-4 hover:decoration-[#FFFFFF] transition-colors"
        >
          All {reportCount} sector reports
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-[#1F2226] mb-8 text-balance leading-[1.1] tracking-tight">
        Selling your business, led by a senior adviser from first conversation to completion.
      </h1>
      <p className="text-lg md:text-xl text-[#4A4E54] max-w-2xl mb-10 leading-relaxed">
        Mastella advises owners of UK businesses worth £5m to £50m on sales, management buyouts and raising capital,
        in confidence from day one.
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
        <Link
          to="/contact/"
          onClick={() => trackCTA('Arrange a confidential conversation', 'hero')}
          className="inline-flex items-center justify-center bg-[#96506D] text-[#FFFFFF] px-6 py-3 rounded-[4px] font-medium hover:bg-[#7F4159] transition-colors"
        >
          Arrange a confidential conversation
        </Link>
        <Link
          to="/exit-readiness-score/"
          onClick={() => trackCTA('Free Exit Readiness Score', 'hero')}
          className="text-[#1F2226] underline decoration-[#96506D]/50 underline-offset-4 hover:text-[#96506D] transition-colors"
        >
          Or try the free three-minute score
        </Link>
      </div>
    </div>
  );
}

// Credentials band directly under the hero (moved out of the hero, Leo's wording).
const CREDENTIALS = [
  { figure: '15 years', caption: 'in M&A' },
  { figure: '£800m+', caption: 'of transactions advised on' },
];

function CredentialsBand() {
  return (
    <section className="mh-bg-plum py-14 md:py-16" aria-label="Track record">
      <div className="container mx-auto px-6">
        <ul className="grid grid-cols-2 gap-8 max-w-3xl">
          {CREDENTIALS.map((c) => (
            <li key={c.figure}>
              <p className="font-serif text-4xl md:text-6xl text-[#FFFFFF] leading-none tracking-tight">{c.figure}</p>
              <p className="text-[#FFFFFF] text-base md:text-lg mt-2">{c.caption}</p>
            </li>
          ))}
        </ul>
        <p className="text-[#FFFFFF] text-base md:text-lg mt-8 max-w-3xl">
          Deals across manufacturing and industrials, business services, healthcare, logistics, professional services and technology.
        </p>
      </div>
    </section>
  );
}

// Four steps, each cut to one line from the Process page stages.
const STEPS = [
  { title: 'Prepare', body: 'We establish where the business actually stands against acquirer expectations, months before due diligence would force the question.' },
  { title: 'Find the right buyers', body: 'A broader, better-qualified buyer pool, with warm introductions where they matter most.' },
  { title: 'Negotiate', body: 'You enter negotiations with full market context, for better outcomes on terms beyond the headline number.' },
  { title: 'Complete', body: 'A well-run process protects value through diligence, and we sign alongside you on completion day.' },
];

function HowWeWork() {
  return (
    <section className="mh-bg-white py-24 md:py-32" aria-labelledby="how-we-work-heading">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h2 id="how-we-work-heading" className="font-serif text-display-md text-navy leading-tight mb-12 text-balance">
            Four steps, one adviser throughout.
          </h2>
          <ol>
            {STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-5">
                {/* Numeral, then a thin plum line down to the next numeral (none after the last). */}
                <span className="flex flex-col items-center" aria-hidden="true">
                  <span className="font-serif text-5xl text-[#96506D] leading-none">{i + 1}</span>
                  {i < STEPS.length - 1 && <span className="mt-3 w-px flex-1 bg-[#96506D]" />}
                </span>
                <div className={i < STEPS.length - 1 ? 'pb-10' : ''}>
                  <h3 className="font-serif text-xl text-navy mb-1.5">{s.title}</h3>
                  <p className="text-navy-light leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-navy leading-relaxed mt-12">
            Our own tools speed up the financial analysis and widen the buyer search, and a senior adviser leads every key
            conversation.
          </p>
          <Link to="/process/" className="inline-flex items-center gap-2 text-navy font-medium mt-6 hover:text-accent-dark transition-colors">
            How the process works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Three service groups. Each lists the existing service pages it covers.
const SERVICE_GROUPS = [
  {
    title: 'Selling your business',
    body: 'A full sale process for owners of businesses worth £5m to £50m, from preparation to completion.',
    links: [
      { to: '/services/m-and-a-advisor-uk/', label: 'M&A adviser for UK founder-led businesses' },
      { to: '/services/how-to-sell-a-business/', label: 'How to sell a business in the UK' },
      { to: '/services/company-valuation-uk/', label: 'Company valuation' },
    ],
  },
  {
    title: 'Management buyouts and growth capital',
    body: 'Structuring an MBO and sourcing the debt and equity to fund it, or raising growth capital from strategic and private equity investors.',
    links: [
      { to: '/services/management-buyout-advisor-uk/', label: 'Management buyout advice' },
      { to: '/services/growth-capital-advisor-uk/', label: 'Growth capital' },
    ],
  },
  {
    title: 'Preparing for a sale',
    body: 'Readiness work for owners 12 to 24 months before a sale.',
    links: [
      { to: '/services/exit-planning-advisor-uk/', label: 'Exit planning' },
      { to: '/services/exit-readiness-assessment/', label: 'Exit Readiness Assessment' },
    ],
  },
];

function Services() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-navy/5" aria-labelledby="services-heading">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h2 id="services-heading" className="font-serif text-display-md text-navy leading-tight text-balance">
            What we do.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_GROUPS.map((g) => (
            <div key={g.title} className="flex flex-col rounded-xl border border-navy/10 bg-white p-7">
              <h3 className="font-serif text-xl text-navy leading-snug mb-3">{g.title}</h3>
              <p className="text-sm text-navy-light leading-relaxed mb-6">{g.body}</p>
              <ul className="mt-auto space-y-2 text-sm">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="inline-flex items-center gap-1.5 text-navy hover:text-accent-dark transition-colors">
                      {l.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-navy-light leading-relaxed">
          Sectors:{' '}
          {SECTORS.map((s, i) => (
            <span key={s.slug}>
              <Link to={`/sectors/${s.slug}/`} className="text-navy underline decoration-navy/20 underline-offset-4 hover:text-accent-dark">
                {s.name}
              </Link>
              {i < SECTORS.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

const HOME_FAQ: FAQItem[] = [
  {
    question: 'What size of business do you work with?',
    answer:
      "Founder-led businesses worth £5M to £50M. Family-owned companies, founder-managed firms, and PE-backed businesses seeking an exit or capital raise. Most of our work is UK lower mid-market, with cross-border transactions where a founder's buyer universe is international, including Spanish and Portuguese deals.",
  },
  {
    question: 'How long does a typical exit take?',
    answer:
      'Most exits run 6 to 12 months from engagement to completion, shorter than the traditional 9 to 18 month range, primarily because readiness gaps are surfaced earlier and IM production is faster. We recommend starting exit planning 12 to 24 months before target completion so remediation time is on your side.',
  },
  {
    question: 'How do you charge?',
    answer: 'Fees are agreed upfront in our first conversation, tuned to your specific situation.',
  },
  {
    question: 'Do I need my financials in perfect order before engaging?',
    answer:
      'No. Identifying and closing the gaps in your financial reporting is part of the engagement. We work with your accountants and advisers to get financials into the form acquirers expect.',
  },
  {
    question: 'How do you use technology?',
    answer:
      'Your day-to-day contact is still a senior adviser. In the background, tools we have built ourselves handle the structured work: financial normalisation, buyer mapping, IM drafting, diligence tracking and term benchmarking. That work happens much faster, so senior time is spent on positioning, relationships and negotiation.',
  },
];

function RecentWork() {
  return (
    <section className="mh-bg-blush py-20 md:py-24">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mb-10">
            <h2 className="font-serif text-display-md text-navy leading-tight text-balance mb-4">Recent work</h2>
            <p className="text-navy-light text-base md:text-lg leading-relaxed">
              A selection of recent work. We have also advised on deals across manufacturing and industrials, business services, healthcare, logistics, professional services and technology.
            </p>
          </div>
        </FadeIn>
        {/* Three cards: stacked on mobile, one row of three from md up. */}
        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {HOME_RECENT_WORK.map((study) => (
            <StaggerItem key={study.title}>
              <Link
                to="/case-studies/"
                className="group flex flex-col h-full rounded-xl border border-[#E6E0D6] border-t-[3px] border-t-[#96506D] bg-[#FFFFFF] p-6 md:p-7"
              >
                <span className="self-start text-xs font-mono tracking-widest uppercase text-[#96506D] mb-4">
                  {study.tag}
                </span>
                <h3 className="font-serif text-xl text-[#1F2226] leading-snug mb-1 group-hover:text-[#96506D] transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs font-mono text-[#1F2226] tracking-widest uppercase mb-5">{study.sector}</p>
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
    <section className="mh-bg-blush py-24 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          <FadeIn className="md:col-span-4">
            <div className="w-full max-w-xs aspect-[4/5] overflow-hidden rounded-xl bg-sand-light">
              <img src={leoMeggitt} alt="Leo Meggitt" loading="lazy" className="block w-full h-full object-cover object-center" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-8">
            <h2 className="font-serif text-display-md text-[#96506D] leading-tight mb-2">Leo Meggitt</h2>
            <p className="font-mono text-xs text-[#96506D] tracking-widest uppercase mb-6">
              Managing Director, Mastella Advisory
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
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="mh">
      <SEO
        title="Off-market M&A for founder-led companies"
        description="Off-market M&A for founder-led businesses worth £5M to £50M. We find buyers other advisers don't reach. Confidential sell-side, fundraising and exit readiness."
        canonical="https://mastellagroup.com/"
      />

      <CredentialsBand />

      <HowWeWork />

      <LeoBlock />

      <BuyersPaid />

      <ExitReadinessSection />

      <RecentWork />

      <Services />

      <FAQSection items={HOME_FAQ} />

      <CtaSection heading="Your transaction starts with a conversation." />
    </PageLayout>
  );
}
