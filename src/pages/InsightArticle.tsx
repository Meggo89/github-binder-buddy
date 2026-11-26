import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Download, User } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { MarkdownLink } from '../components/MarkdownLink';
import { markdownPathFor } from '../seo/markdown';
import { getArticle, articles, INSIGHT_LINKS, type Article } from '../content/insights';
import { SECTOR_REPORTS, SECTOR_REPORTS_PATH } from '../content/insights/sector-reports';
import { getSector } from '../content/landing';
import { FadeIn } from '../components/ui/motion';
import { SITE } from '../seo/site-meta';
import { BuyerListForm } from '../components/forms/BuyerListForm';
import { ScoreBlock } from '../components/landing/ScoreBlock';

export default function InsightArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug);

  if (!article) {
    return <Navigate to="/insights/" replace />;
  }

  const canonical = `https://mastellagroup.com/insights/${article.slug}/`;

  // Article dates are written for display ("5 November 2026"); schema.org wants ISO 8601.
  const isoDate = (d: string) => {
    const t = new Date(d);
    if (Number.isNaN(t.getTime())) return d;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      '@type': 'Person',
      '@id': `${SITE.domain}/team/#leo-meggitt`,
      name: article.author,
      jobTitle: 'Managing Director',
      worksFor: { '@id': `${SITE.domain}/#organization` },
    },
    publisher: { '@id': `${SITE.domain}/#organization` },
    datePublished: isoDate(article.date),
    dateModified: isoDate(article.dateModified ?? article.date),
    mainEntityOfPage: canonical,
    articleSection: article.category,
  };

  const faqSchema = article.faqs && article.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const reportMeta = article.category === 'Sector Report'
    ? SECTOR_REPORTS[article.slug] ?? { label: article.title, descriptor: '', group: 'Industrial and manufacturing' as const }
    : undefined;
  const breadcrumbSchema = reportMeta
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Insights', item: 'https://mastellagroup.com/insights/' },
          { '@type': 'ListItem', position: 2, name: 'Sector reports', item: `https://mastellagroup.com${SECTOR_REPORTS_PATH}` },
          { '@type': 'ListItem', position: 3, name: reportMeta.label, item: canonical },
        ],
      }
    : null;

  const markdownHref = markdownPathFor(`/insights/${article.slug}`);
  const links = INSIGHT_LINKS[article.slug];
  const pillar = getSector(links?.pillarSlug ?? 'business-services');
  const related = (links?.related ?? articles.filter((a) => a.slug !== article.slug).slice(0, 3).map((a) => a.slug))
    .map((s) => getArticle(s))
    .filter((a): a is Article => Boolean(a));

  return (
    <PageLayout heroTone="solid" mainClassName="">
      <SEO title={article.titleTag ?? article.metaTitle ?? article.title} exactTitle={Boolean(article.titleTag)} description={article.metaDescription ?? article.excerpt} canonical={canonical} type="article" image={article.image} author={article.author} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
        {breadcrumbSchema && (
          <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        )}
      </Helmet>

      {/* Article header */}
      <article>
        <header className="bg-navy-deepest text-white py-20 md:py-28">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                {reportMeta ? (
                  <nav aria-label="Breadcrumb" className="mb-10 text-sm">
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <li>
                        <Link to="/insights/" className="text-sand-light hover:text-accent transition-colors">Insights</Link>
                      </li>
                      <li aria-hidden="true" className="text-sand-light">›</li>
                      <li>
                        <Link to={SECTOR_REPORTS_PATH} className="text-sand-light hover:text-accent transition-colors">Sector reports</Link>
                      </li>
                      <li aria-hidden="true" className="text-sand-light">›</li>
                      <li aria-current="page" className="text-white">{reportMeta.label}</li>
                    </ol>
                  </nav>
                ) : (
                  <Link
                    to="/insights/"
                    className="flex w-fit items-center gap-2 text-sand-light hover:text-accent transition-colors mb-10 text-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to insights
                  </Link>
                )}
                <span className="inline-block bg-accent/10 text-accent border border-accent/30 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6">
                  {article.category}
                </span>
                <h1 className="font-serif text-display-md md:text-display-lg leading-[1.1] mb-8 text-balance text-white">
                  {article.title}
                </h1>
                {article.standfirst && (
                  <p className="text-lg md:text-xl text-sand-light leading-relaxed mb-6 max-w-2xl">{article.standfirst}</p>
                )}
                {article.download && (
                  <a
                    href={article.download.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light underline underline-offset-4 mb-8"
                  >
                    <Download className="h-4 w-4" />
                    {article.download.label}
                  </a>
                )}
                <div className="flex flex-wrap items-center gap-6 text-sm text-sand-light">
                  <span className="flex items-center gap-2"><User className="h-4 w-4" /> {article.author}</span>
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {article.date}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {article.readTime}</span>
                  {markdownHref && <MarkdownLink href={markdownHref} className="text-sand-light" />}
                </div>
              </div>
            </FadeIn>
          </div>
        </header>

        <div className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-12 bg-sand-light">
                  <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover" />
                </div>

                {/* A <!--FORM:buyer-list--> marker in the content places the buyer-list offer there. */}
                {article.content.split('<!--FORM:buyer-list-->').map((part, i, parts) => (
                  <Fragment key={i}>
                    <div className="prose-article" dangerouslySetInnerHTML={{ __html: part }} />
                    {i < parts.length - 1 && <BuyerListForm idPrefix={`buyer-list-${i + 1}`} report={article.formReportId ?? article.slug} niches={article.formNiches} />}
                  </Fragment>
                ))}

                <div className="prose-article">
                  <p>
                    If you are considering a sale, our{' '}
                    <Link to="/services/m-and-a-advisor-uk/">M&amp;A adviser service for UK founder-led businesses</Link>{' '}
                    explains how we run the process.
                    {pillar && (
                      <>
                        {' '}For the buyers active in one market, see{' '}
                        <Link to={`/sectors/${pillar.slug}/`}>{pillar.name.toLowerCase()} M&amp;A</Link>.
                      </>
                    )}{' '}
                    To see how a buyer would rate your business today, take the free{' '}
                    <Link to="/exit-readiness-score/">Exit Readiness Score</Link>: twelve questions, about three minutes.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </article>

      <ScoreBlock />

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand-light py-20 border-t border-navy/5">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="eyebrow text-navy-light mb-8">Related insights</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/insights/${r.slug}/`}
                    className="group bg-white rounded-xl p-6 border border-navy/10 hover:border-accent/40 hover:shadow-lg transition-all"
                  >
                    <span className="font-mono text-xs text-accent-dark tracking-widest uppercase">{r.category}</span>
                    <h3 className="font-serif text-xl text-navy mt-3 mb-2 leading-snug group-hover:text-accent-dark transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-navy-light leading-relaxed">{r.excerpt.slice(0, 120)}…</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
