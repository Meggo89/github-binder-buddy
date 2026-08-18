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
import { LeadMagnetCta } from '../components/landing/LeadMagnetCta';
import { ProofBand } from '../components/landing/ProofBand';
import { RelatedLinks } from '../components/landing/RelatedLinks';
import { getServiceLanding } from '../content/landing';
import { SITE, canonicalFor } from '../seo/site-meta';
import { heroSubtitle } from '../utils/heroSubtitle';

function Hero({ h1, subtitle }: { h1: string; subtitle: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Services</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-6 text-balance">{h1}</h1>
      <p className="text-lg md:text-2xl text-accent leading-snug mb-10 max-w-2xl text-balance">
        {subtitle}
      </p>
      <Link
        to="/contact/"
        className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-6 py-3 rounded-md text-sm md:text-base font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20"
      >
        Book a confidential conversation
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function ServiceLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceLanding(slug) : undefined;
  if (!service) return <Navigate to="/services/" replace />;

  const canonical = canonicalFor(`/services/${service.slug}`);

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: canonicalFor('/services') },
      { '@type': 'ListItem', position: 3, name: service.name, item: canonical },
    ],
  };

  const serviceSchema = {
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: { '@id': `${SITE.domain}/#organization` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    serviceType: service.name,
    url: canonical,
  };

  return (
    <PageLayout
      hero={<Hero h1={service.h1} subtitle={heroSubtitle(service.intro, service.metaDescription, service.heroSubtitle)} />}
      heroTone="solid"
      mainClassName=""
    >
      <SEO title={service.title} description={service.metaDescription} canonical={canonical} />
      <StructuredData data={[serviceSchema, breadcrumb]} />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <AuthorityLine />
              <p className="text-body-lg text-navy-light leading-relaxed mb-8">{service.intro}</p>
            </FadeIn>

            {service.contentTodos.map((todo) => (
              <ContentTodoSection key={todo.heading} todo={todo} />
            ))}
          </div>
        </div>
      </section>

      <MidPageCta heading="Want to talk about your situation?" />

      <FaqSection faqs={service.faqs} heading={`${service.name}: FAQs`} />

      <RelatedLinks
        heading="Related"
        links={[
          { to: '/services/', label: 'All services', description: 'Sell-side, fundraising, exit readiness, executive search.' },
          { to: '/sectors/', label: 'Sectors we cover', description: 'Six sector pillars across 34 niches.' },
          { to: '/process/', label: 'How we source buyers', description: 'Senior-led, off-market process.' },
        ]}
      />

      <ProofBand />

      <LeadMagnetCta />

      <CtaSection heading="Ready when you are." />
    </PageLayout>
  );
}
