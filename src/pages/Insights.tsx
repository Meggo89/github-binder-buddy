import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { articles, getArticle, type Article } from '../content/insights';
import { FEATURED, LATEST_ARTICLE, SECTOR_REPORT_LABELS } from '../content/insights/featured';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Insights</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Perspectives on M&amp;A, fundraising and the AI era.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Long-form analysis and field notes from the team. Written for founders, not other advisers.
      </p>
    </div>
  );
}

const SECTOR_REPORT = 'Sector Report';

const isSectorReport = (a: Article) => a.category === SECTOR_REPORT;

// Featured items from the config in content/insights/featured.ts, skipping unknown slugs and repeats.
function featuredArticles(general: Article[]): Article[] {
  const out: Article[] = [];
  for (const key of FEATURED) {
    const a = key === LATEST_ARTICLE ? general[0] : getArticle(key);
    if (a && !out.some((o) => o.slug === a.slug)) out.push(a);
  }
  return out.slice(0, 4);
}

// Sector reports get a typographic cover in place of a stock photo: the short sector name
// on navy, with the logo's rising bars behind it.
function ReportCover({ label }: { label: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0A2647] flex flex-col justify-end p-6">
      <svg className="absolute right-3 top-3 h-28 w-28 opacity-10" viewBox="0 0 100 100" fill="#F2EDE4" aria-hidden="true">
        {[[8, 44], [27, 30], [46, 16], [65, 30], [84, 44]].map(([x, y]) => (
          <g key={x}>
            <polygon points={`${x - 5},${y + 10} ${x + 4},${y} ${x + 13},${y + 10}`} />
            <rect x={x} y={y + 10} width="8" height={90 - y} />
          </g>
        ))}
      </svg>
      <span className="relative block h-0.5 w-10 bg-[#FF87B7] mb-4" aria-hidden="true" />
      <span className="relative font-serif text-2xl leading-tight text-[#FFFFFF] text-balance">{label}</span>
      <span className="relative font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[#D4B545] mt-2">UK M&amp;A 2026</span>
    </div>
  );
}

function ArticleCard({ post, compact = false }: { post: Article; compact?: boolean }) {
  return (
    <Link
      to={`/insights/${post.slug}/`}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-navy/10 hover:border-accent/40 hover:shadow-xl transition-all duration-300"
    >
      <article className="flex flex-col h-full">
        {isSectorReport(post) ? (
          <ReportCover label={SECTOR_REPORT_LABELS[post.slug] ?? post.title} />
        ) : (
          <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <span className="inline-block text-xs font-mono tracking-widest uppercase text-accent-dark mb-4">
            {post.category}
          </span>
          <h3 className="font-serif text-xl text-navy mb-3 leading-snug group-hover:text-accent-dark transition-colors">
            {post.title}
          </h3>
          <p className={`text-sm text-navy-light leading-relaxed mb-5${compact ? ' line-clamp-4' : ''}`}>{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between text-xs text-navy-light">
            <span>{post.author}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Insights() {
  const general = articles.filter((a) => !isSectorReport(a));
  const featured = featuredArticles(general);
  const reports = articles
    .filter(isSectorReport)
    .map((a) => ({ slug: a.slug, label: SECTOR_REPORT_LABELS[a.slug] ?? a.title }))
    .sort((a, b) => a.label.localeCompare(b.label, 'en-GB'));

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Insights: M&A for Founder-Led Businesses"
        description="Long-form analysis on exits, fundraising and valuation for founder-led businesses. Written by the Mastella team for founders, not other advisers."
        canonical="https://mastellagroup.com/insights/"
      />

      {/* Featured */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="featured-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto mb-10">
            <h2 id="featured-heading" className="eyebrow text-navy-light">Featured</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featured.map((post) => (
              <ArticleCard key={post.slug} post={post} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Sector reports */}
      <section className="bg-sand-light py-16 md:py-20" aria-labelledby="sector-reports-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto mb-10">
            <h2 id="sector-reports-heading" className="eyebrow text-navy-light mb-4">Sector reports</h2>
            <p className="text-body-md text-navy-light max-w-2xl">
              Who is buying, what they pay and what moves the price, sector by sector.
            </p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {reports.map((r) => (
              <li key={r.slug}>
                <Link
                  to={`/insights/${r.slug}/`}
                  className="group flex items-center justify-between gap-3 h-full bg-white rounded-lg border border-navy/10 px-4 py-3 text-sm md:text-base text-navy font-medium leading-snug hover:border-accent/40 hover:text-accent-dark transition-colors"
                >
                  <span>{r.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-navy-light group-hover:text-accent-dark transition-colors" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest articles */}
      <section className="bg-white py-24" aria-labelledby="latest-heading">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-6xl mx-auto mb-12">
              <h2 id="latest-heading" className="eyebrow text-navy-light">Latest articles</h2>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {general.map((post) => (
              <StaggerItem key={post.slug}>
                <ArticleCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </PageLayout>
  );
}
