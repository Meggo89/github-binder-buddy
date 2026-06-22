import { ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { FadeIn } from '../components/ui/motion';
import { AuthorityLine } from '../components/landing/AuthorityLine';
import { ContentTodoSection } from '../components/landing/ContentTodoSection';
import { CtaSection, MidPageCta } from '../components/landing/CtaSection';
import { FaqSection } from '../components/landing/FaqSection';
import { ProofBand } from '../components/landing/ProofBand';
import { RelatedLinks } from '../components/landing/RelatedLinks';
import { getSector, getNiche, getNichesForPillar } from '../content/landing';
import { SITE, canonicalFor } from '../seo/site-meta';

function Hero({ h1, pillarName }: { h1: string; pillarName: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">{pillarName}</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">{h1}</h1>
    </div>
  );
}

export default function NicheLandingPage() {
  const { pillarSlug, slug } = useParams<{ pillarSlug: string; slug: string }>();
  const niche = pillarSlug && slug ? getNiche(pillarSlug, slug) : undefined;
  const pillar = pillarSlug ? getSector(pillarSlug) : undefined;
  if (!niche || !pillar) return <Navigate to="/sectors/" replace />;

  const canonical = canonicalFor(`/sectors/${pillar.slug}/${niche.slug}`);

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: 'Sectors', item: canonicalFor('/sectors') },
      { '@type': 'ListItem', position: 3, name: pillar.name, item: canonicalFor(`/sectors/${pillar.slug}`) },
      { '@type': 'ListItem', position: 4, name: niche.name, item: canonical },
    ],
  };

  const siblings = getNichesForPillar(pillar.slug)
    .filter((n) => n.slug !== niche.slug)
    .slice(0, 2);

  return (
    <PageLayout hero={<Hero h1={niche.h1} pillarName={pillar.name} />} heroTone="solid" mainClassName="">
      <SEO title={niche.title} description={niche.metaDescription} canonical={canonical} />
      <StructuredData data={[breadcrumb]} />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <AuthorityLine />
              <p className="text-body-lg text-navy-light leading-relaxed mb-4">{niche.intro}</p>
              <p className="text-sm font-mono text-navy-light tracking-wide">
                Part of{' '}
                <Link to={`/sectors/${pillar.slug}/`} className="text-accent-dark hover:underline">
                  {pillar.name}
                </Link>
                {' · '}
                <Link to="/sectors/" className="text-accent-dark hover:underline">
                  All sectors
                </Link>
              </p>
            </FadeIn>

            {niche.caseStudyAnchor && (
              <FadeIn>
                <section className="mt-12 p-6 rounded-xl border border-accent/30 bg-accent/5">
                  <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-2">
                    {niche.caseStudyAnchor.tag}
                  </p>
                  <h2 className="font-serif text-xl text-navy leading-snug mb-3">{niche.caseStudyAnchor.title}</h2>
                  <Link
                    to={niche.caseStudyAnchor.href}
                    className="inline-flex items-center gap-2 text-sm font-mono text-navy hover:text-accent-dark tracking-wide"
                  >
                    See the full case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>
              </FadeIn>
            )}

            {niche.contentTodos.map((todo) => (
              <ContentTodoSection key={todo.heading} todo={todo} />
            ))}

            {niche.subSections && niche.subSections.length > 0 && (
              <section className="py-12 md:py-16 border-t border-navy/5">
                <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                  Specialist sub-niches
                </h2>
                <div className="space-y-12">
                  {niche.subSections.map((s) => (
                    <ContentTodoSection key={s.heading} todo={s} headingLevel="h3" />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      <MidPageCta heading={`Considering a sale of your ${niche.nameLower} business?`} />

      <FaqSection faqs={niche.faqs} heading={`Selling a ${niche.nameLower} business: FAQs`} />

      <RelatedLinks
        heading="Related"
        links={[
          { to: `/sectors/${pillar.slug}/`, label: `${pillar.name} M&A overview`, description: `Pillar page covering all ${pillar.nameLower} M&A.` },
          ...siblings.map((s) => ({
            to: `/sectors/${pillar.slug}/${s.slug}/`,
            label: s.name,
            description: `Selling a ${s.nameLower} business in the UK.`,
          })),
          { to: '/process/', label: 'How we source buyers', description: 'Our six-stage senior-led process.' },
        ]}
      />

      <ProofBand />

      <CtaSection heading={`Your ${niche.nameLower} transaction starts with a conversation.`} />
    </PageLayout>
  );
}
