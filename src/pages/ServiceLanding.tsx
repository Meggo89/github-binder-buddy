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
import type { ServiceOffer, ServiceStep } from '../content/landing';
import { SITE, canonicalFor } from '../seo/site-meta';
import { heroSubtitle } from '../utils/heroSubtitle';

type HeroProps = {
  h1: string;
  subtitle: string;
  cta?: { to: string; label: string };
  secondary?: { to: string; label: string };
  priceLine?: string;
};

function Hero({ h1, subtitle, cta, secondary, priceLine }: HeroProps) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Services</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-6 text-balance">{h1}</h1>
      <p className="text-lg md:text-2xl text-accent leading-snug mb-10 max-w-2xl text-balance">
        {subtitle}
      </p>
      {priceLine && (
        <p className="font-mono text-xs md:text-sm text-sand-light tracking-widest uppercase mb-6">{priceLine}</p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          to={cta?.to ?? '/contact/'}
          className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-6 py-3 rounded-md text-sm md:text-base font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20 self-start"
        >
          {cta?.label ?? 'Book a confidential conversation'}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            className="inline-flex items-center gap-2 text-sm md:text-base text-sand-light underline decoration-accent/50 underline-offset-4 hover:text-white self-start"
          >
            {secondary.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function OfferBox({ offer }: { offer: ServiceOffer }) {
  return (
    <div className="rounded-xl border border-accent/40 bg-sand-light p-6 md:p-8 mb-12">
      <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-3">Fees and terms</p>
      <p className="font-serif text-2xl md:text-3xl text-navy leading-snug mb-4">{offer.display}</p>
      <p className="text-navy-light leading-relaxed mb-3">{offer.terms}</p>
      {offer.turnaround && <p className="text-navy-light leading-relaxed">{offer.turnaround}</p>}
    </div>
  );
}

function Steps({ steps }: { steps: ServiceStep[] }) {
  return (
    <div className="mb-14">
      <h2 className="font-serif text-display-md text-navy leading-tight mb-8 text-balance">
        How it works
      </h2>
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-5">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-navy text-white font-mono text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <h3 className="font-serif text-xl text-navy leading-snug mb-1">{step.title}</h3>
              <p className="text-body-md text-navy-light leading-relaxed">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
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
    ...(service.offer?.priceFrom !== undefined
      ? {
          offers: {
            '@type': 'Offer',
            url: canonical,
            priceCurrency: service.offer.currency,
            price: String(service.offer.priceFrom),
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: service.offer.priceFrom,
              priceCurrency: service.offer.currency,
              valueAddedTaxIncluded: false,
            },
            description: `${service.offer.display}. ${service.offer.terms}`,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  return (
    <PageLayout
      hero={
        <Hero
          h1={service.h1}
          subtitle={heroSubtitle(service.intro, service.metaDescription, service.heroSubtitle)}
          cta={service.heroCta}
          secondary={service.secondaryCta}
          priceLine={service.offer?.priceFrom !== undefined ? service.offer.display : undefined}
        />
      }
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

            {service.offer && <OfferBox offer={service.offer} />}
            {service.steps && <Steps steps={service.steps} />}

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
