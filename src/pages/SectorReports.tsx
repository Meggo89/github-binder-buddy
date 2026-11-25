import { ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { articles, type Article } from '../content/insights';
import { SECTOR_GROUPS, SECTOR_REPORTS } from '../content/insights/sector-reports';
import { SITE } from '../seo/site-meta';

const TITLE = 'UK Sector M&A Reports 2026 | Mastella';
const DESCRIPTION =
  'Our UK sector M&A reports for 2026: who is buying owner-managed businesses, what they pay for and what moves the price, sector by sector.';
const CANONICAL = `${SITE.domain}/insights/sector-reports/`;

function Hero() {
  return (
    <div className="max-w-3xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <Link to="/insights/" className="text-navy-light hover:text-accent-dark transition-colors">
          Insights
        </Link>
        <span className="mx-2 text-navy/40" aria-hidden="true">›</span>
        <span className="text-navy" aria-current="page">Sector reports</span>
      </nav>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">UK sector M&amp;A reports 2026</h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Each report sets out who has been buying UK owner-managed businesses in one sector since 2024, the prices that
        were published, what buyers pay more for and what an owner can prepare in the next 12 to 24 months. They draw on
        our deal log and on published sources, and every report can be downloaded as a PDF.
      </p>
    </div>
  );
}

function ReportEntry({ article }: { article: Article }) {
  const meta = SECTOR_REPORTS[article.slug];
  return (
    <li className="py-5 border-b border-navy/10 last:border-b-0 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
      <div>
        <Link
          to={`/insights/${article.slug}/`}
          className="group inline-flex items-center gap-2 font-serif text-xl text-navy leading-snug hover:text-accent-dark transition-colors"
        >
          {meta?.label ?? article.title}
          <ArrowUpRight className="h-4 w-4 shrink-0 text-navy-light group-hover:text-accent-dark" aria-hidden="true" />
        </Link>
        <p className="text-sm text-navy-light leading-snug mt-1">{meta?.descriptor ?? article.excerpt}</p>
      </div>
      {article.download && (
        <a
          href={article.download.href}
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-accent-dark transition-colors whitespace-nowrap"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          PDF<span className="sr-only">: {meta?.label ?? article.title}</span>
        </a>
      )}
    </li>
  );
}

export default function SectorReports() {
  const reports = articles.filter((a) => a.category === 'Sector Report');
  const byLabel = (a: Article, b: Article) =>
    (SECTOR_REPORTS[a.slug]?.label ?? a.title).localeCompare(SECTOR_REPORTS[b.slug]?.label ?? b.title, 'en-GB');
  const groups = [...SECTOR_GROUPS, 'Other'].map((g) => ({
    name: g,
    items: reports
      .filter((a) => (SECTOR_REPORTS[a.slug]?.group ?? 'Other') === g)
      .sort(byLabel),
  })).filter((g) => g.items.length > 0);

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Insights', item: `${SITE.domain}/insights/` },
      { '@type': 'ListItem', position: 2, name: 'Sector reports', item: CANONICAL },
    ],
  };

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO title={TITLE} exactTitle description={DESCRIPTION} canonical={CANONICAL} />
      <StructuredData data={[breadcrumb]} />
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-14">
            {groups.map((g) => (
              <section key={g.name} aria-labelledby={`group-${g.name.replace(/\W+/g, '-').toLowerCase()}`}>
                <h2
                  id={`group-${g.name.replace(/\W+/g, '-').toLowerCase()}`}
                  className="font-mono text-xs uppercase tracking-[0.14em] text-accent-dark pb-3 border-b border-accent/40"
                >
                  {g.name}
                </h2>
                <ul>
                  {g.items.map((a) => (
                    <ReportEntry key={a.slug} article={a} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
