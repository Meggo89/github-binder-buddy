import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { articles, type Article } from '../content/insights';
import { INSIGHTS_PAGE_REPORTS, SECTOR_REPORTS, SECTOR_REPORTS_PATH } from '../content/insights/sector-reports';
import { ReportTile } from '../components/insights/ReportTile';

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

const isSectorReport = (a: Article) => a.category === 'Sector Report';

function ArticleCard({ post }: { post: Article }) {
  return (
    <Link
      to={`/insights/${post.slug}/`}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-navy/10 hover:border-accent/40 hover:shadow-xl transition-all duration-300"
    >
      <article className="flex flex-col h-full">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs font-mono tracking-widest uppercase text-accent-dark mb-4">{post.category}</p>
          <h3 className="font-serif text-xl text-navy mb-3 leading-snug group-hover:text-accent-dark transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-navy-light leading-relaxed mb-5">{post.excerpt}</p>
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
  const live = new Set(articles.filter(isSectorReport).map((a) => a.slug));
  const tiles = INSIGHTS_PAGE_REPORTS.filter((slug) => live.has(slug)).sort((a, b) =>
    (SECTOR_REPORTS[a]?.label ?? a).localeCompare(SECTOR_REPORTS[b]?.label ?? b, 'en-GB'),
  );
  const general = articles.filter((a) => !isSectorReport(a));

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Insights: M&A for Founder-Led Businesses"
        description="Long-form analysis on exits, fundraising and valuation for founder-led businesses. Written by the Mastella team for founders, not other advisers."
        canonical="https://mastellagroup.com/insights/"
      />

      {/* Sector reports */}
      <section className="bg-sand-light py-16 md:py-20" aria-labelledby="sector-reports-heading">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto mb-10">
            <h2 id="sector-reports-heading" className="font-serif text-display-md text-navy leading-tight mb-4">Sector reports</h2>
            <p className="text-body-md text-navy-light max-w-2xl">
              What UK buyers are paying, sector by sector, from our deal log and published sources.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
            {tiles.map((slug) => (
              <li key={slug}>
                <ReportTile slug={slug} />
              </li>
            ))}
          </ul>
          <div className="max-w-6xl mx-auto mt-8">
            <Link
              to={SECTOR_REPORTS_PATH}
              className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent-dark transition-colors"
            >
              See all {live.size} sector reports
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-white py-20 md:py-24" aria-labelledby="articles-heading">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-6xl mx-auto mb-12">
              <h2 id="articles-heading" className="font-serif text-display-md text-navy leading-tight">Articles</h2>
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
