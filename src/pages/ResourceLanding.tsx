import { useParams, Navigate } from 'react-router-dom';
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
import { getResource } from '../content/landing';
import { SITE, canonicalFor } from '../seo/site-meta';

function Hero({ h1 }: { h1: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Resource</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">{h1}</h1>
    </div>
  );
}

export default function ResourceLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const resource = slug ? getResource(slug) : undefined;
  if (!resource) return <Navigate to="/" replace />;

  const canonical = canonicalFor(`/resources/${resource.slug}`);

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: SITE.domain + '/resources/' },
      { '@type': 'ListItem', position: 3, name: resource.name, item: canonical },
    ],
  };

  const articleSchema = {
    '@type': 'Article',
    headline: resource.h1,
    description: resource.metaDescription,
    author: { '@type': 'Person', name: 'Leo Meggitt' },
    publisher: { '@id': `${SITE.domain}/#organization` },
    mainEntityOfPage: canonical,
    url: canonical,
  };

  return (
    <PageLayout hero={<Hero h1={resource.h1} />} heroTone="solid" mainClassName="">
      <SEO title={resource.title} description={resource.metaDescription} canonical={canonical} type="article" />
      <StructuredData data={[articleSchema, breadcrumb]} />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <AuthorityLine />
              <p className="text-body-lg text-navy-light leading-relaxed mb-8">{resource.intro}</p>
            </FadeIn>

            {resource.contentTodos.map((todo) => (
              <ContentTodoSection key={todo.heading} todo={todo} />
            ))}
          </div>
        </div>
      </section>

      <MidPageCta heading="Want a senior-led view on what fits your situation?" />

      <FaqSection faqs={resource.faqs} heading={`${resource.name}: FAQs`} />

      <RelatedLinks
        heading="Related"
        links={[
          { to: '/services/m-and-a-advisor-uk/', label: 'M&A advisor (UK)', description: 'How Mastella delivers senior-led M&A advisory.' },
          { to: '/services/how-to-sell-a-business/', label: 'How to sell a business', description: 'The six-stage sale process explained.' },
          { to: '/process/', label: 'How we source buyers', description: 'Senior-led, off-market process.' },
        ]}
      />

      <ProofBand />

      <CtaSection heading="Start with a confidential conversation." />
    </PageLayout>
  );
}
