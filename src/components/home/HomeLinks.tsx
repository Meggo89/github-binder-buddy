import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '../ui/motion';
import { SECTORS, getNichesForPillar } from '../../content/landing';
import { getArticle, type Article } from '../../content/insights';

// Homepage link blocks. The homepage body used to link to one service page, no sector pages and
// no insights, so most link equity from the most-linked page on the site went nowhere. Anchors
// describe the target page in plain words, taken from that page's own title and description.

const SERVICE_LINKS = [
  {
    to: '/services/m-and-a-advisor-uk/',
    label: 'M&A adviser for UK founder-led businesses',
    description: 'Sell-side, buy-side, MBO and capital advisory for owners of businesses worth £5M to £50M.',
  },
  {
    to: '/services/management-buyout-advisor-uk/',
    label: 'Management buyout advice',
    description: 'Structuring an MBO and sourcing the debt and equity to fund it.',
  },
  {
    to: '/services/exit-planning-advisor-uk/',
    label: 'Exit planning',
    description: 'Readiness work for owners 12 to 24 months before a sale.',
  },
  {
    to: '/services/company-valuation-uk/',
    label: 'Company valuation',
    description: 'Indicative and exit-ready valuation work for UK owners.',
  },
  {
    to: '/services/growth-capital-advisor-uk/',
    label: 'Growth capital',
    description: 'Minority and majority growth capital rounds with strategic and private equity investors.',
  },
  {
    to: '/services/how-to-sell-a-business/',
    label: 'How to sell a business in the UK',
    description: 'How a UK sale process works, from preparation to completion.',
  },
  {
    to: '/services/exit-readiness-assessment/',
    label: 'Exit Readiness Assessment',
    description: '29 buyer measures, verified against your data and interviews with your senior team.',
  },
];

const LATEST_INSIGHT_SLUGS = [
  'uk-search-funds-explained',
  'search-fund-vs-private-equity-vs-strategic',
  '12-months-before-you-sell',
];

function listNames(names: string[]): string {
  if (names.length < 2) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

function sectorSummary(slug: string): string {
  const names = getNichesForPillar(slug)
    .slice(0, 3)
    .map((n) => n.nameLower);
  const text = listNames(names);
  return text ? `Including ${text}.` : '';
}

export function HomeServiceLinks() {
  return (
    <section className="bg-navy-deepest text-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-6">Services</p>
            <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
              Selling, raising capital or preparing for a sale.
            </h2>
            <p className="text-body-lg text-sand-light leading-relaxed">
              Each service is led by a senior adviser. Start with the one closest to where your business is today.
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" step={0.05}>
          {SERVICE_LINKS.map((s) => (
            <StaggerItem key={s.to}>
              <Link
                to={s.to}
                className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif text-xl text-white leading-snug">{s.label}</h3>
                  <ArrowUpRight className="h-4 w-4 text-sand-dark group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-sand-light leading-relaxed">{s.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.1}>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 text-accent font-medium mt-10 hover:text-accent-light transition-colors"
          >
            All services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export function HomeSectorLinks() {
  return (
    <section className="bg-white py-24 md:py-32 border-b border-navy/5">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mb-14">
            <p className="eyebrow text-navy-light mb-6">Sectors</p>
            <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
              The six sectors we cover.
            </h2>
            <p className="text-body-lg text-navy-light leading-relaxed">
              Each sector page sets out who buys businesses in that market and what they look for.
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" step={0.05}>
          {SECTORS.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                to={`/sectors/${s.slug}/`}
                className="group flex h-full items-start justify-between gap-4 rounded-xl border border-navy/10 p-6 hover:border-accent/40 hover:shadow-md transition-all"
              >
                <span>
                  <span className="block font-serif text-xl text-navy leading-snug mb-2">{s.name} M&amp;A</span>
                  <span className="block text-sm text-navy-light leading-relaxed">{sectorSummary(s.slug)}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-navy-light group-hover:text-accent-dark group-hover:translate-x-0.5 transition-all mt-1.5 flex-shrink-0" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.1}>
          <Link
            to="/sectors/"
            className="inline-flex items-center gap-2 text-navy font-medium mt-10 hover:text-accent-dark transition-colors"
          >
            All sectors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export function HomeLatestInsights() {
  const posts = LATEST_INSIGHT_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is Article => Boolean(a),
  );
  if (!posts.length) return null;

  return (
    <section className="bg-sand-light py-24 md:py-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-3xl mb-14">
            <p className="eyebrow text-navy-light mb-6">Latest insights</p>
            <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
              Recent writing for owners considering a sale.
            </h2>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" step={0.06}>
          {posts.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to={`/insights/${p.slug}/`}
                className="group block h-full bg-white rounded-xl p-6 border border-navy/10 hover:border-accent/40 hover:shadow-lg transition-all"
              >
                <span className="font-mono text-xs text-accent-dark tracking-widest uppercase">{p.category}</span>
                <h3 className="font-serif text-xl text-navy mt-3 mb-2 leading-snug group-hover:text-accent-dark transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-navy-light leading-relaxed">{p.excerpt.slice(0, 120)}…</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.1}>
          <Link
            to="/insights/"
            className="inline-flex items-center gap-2 text-navy font-medium mt-10 hover:text-accent-dark transition-colors"
          >
            All insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
