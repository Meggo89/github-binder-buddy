import { ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { AuthorityLine } from '../components/landing/AuthorityLine';
import { ContentTodoSection } from '../components/landing/ContentTodoSection';
import { CtaSection, MidPageCta } from '../components/landing/CtaSection';
import { FaqSection } from '../components/landing/FaqSection';
import { LeadMagnetCta } from '../components/landing/LeadMagnetCta';
import { ProofBand } from '../components/landing/ProofBand';
import { RelatedLinks } from '../components/landing/RelatedLinks';
import { getSector, getNichesForPillar } from '../content/landing';
import { SITE, canonicalFor } from '../seo/site-meta';
import { heroSubtitle } from '../utils/heroSubtitle';

function Hero({ name, h1, subtitle }: { name: string; h1: string; subtitle: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">{name}</p>
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

export default function SectorPillarPage() {
  const { slug } = useParams<{ slug: string }>();
  const sector = slug ? getSector(slug) : undefined;
  if (!sector) return <Navigate to="/sectors/" replace />;

  const niches = getNichesForPillar(sector.slug);
  const canonical = canonicalFor(`/sectors/${sector.slug}`);

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: 'Sectors', item: canonicalFor('/sectors') },
      { '@type': 'ListItem', position: 3, name: sector.name, item: canonical },
    ],
  };

  return (
    <PageLayout
      hero={<Hero name={sector.name} h1={sector.h1} subtitle={heroSubtitle(sector.intro, sector.metaDescription, sector.heroSubtitle)} />}
      heroTone="solid"
      mainClassName=""
    >
      <SEO title={sector.title} description={sector.metaDescription} canonical={canonical} />
      <StructuredData data={[breadcrumb]} />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <AuthorityLine />
              <p className="text-body-lg text-navy-light leading-relaxed mb-12">{sector.intro}</p>
            </FadeIn>

            {sector.whoWeWorkWith && <ContentTodoSection todo={sector.whoWeWorkWith} />}
            {sector.whatBuyersLookFor && <ContentTodoSection todo={sector.whatBuyersLookFor} />}
            {sector.ourProcess && <ContentTodoSection todo={sector.ourProcess} />}

            <section className="py-12 md:py-16 border-t border-navy/5">
              <h2 className="font-serif text-display-md text-navy leading-tight mb-8 text-balance">
                Sub-sectors we cover
              </h2>
              <Stagger className="grid sm:grid-cols-2 gap-3">
                {niches.map((n) => (
                  <StaggerItem key={n.slug}>
                    <Link
                      to={`/sectors/${sector.slug}/${n.slug}/`}
                      className="group flex items-start justify-between gap-4 rounded-lg border border-navy/10 p-5 hover:border-accent/40 transition-colors"
                    >
                      <span className="font-serif text-lg text-navy leading-snug">{n.name}</span>
                      <ArrowRight className="h-4 w-4 text-navy-light group-hover:text-accent-dark group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>
        </div>
      </section>

      <MidPageCta heading={`Considering a sale of your ${sector.nameLower} business?`} />

      <FaqSection faqs={sector.faqs} heading={`Selling a ${sector.nameLower} business: FAQs`} />

      <RelatedLinks
        heading="Related"
        links={[
          { to: '/process/', label: 'How we source buyers', description: 'Our six-stage senior-led M&A process.' },
          { to: '/sectors/', label: 'Other sectors we cover', description: 'Five other sector pillars Mastella works in.' },
          { to: '/contact/', label: 'Book a confidential conversation', description: 'No obligation, 45 minutes.' },
        ]}
      />

      <ProofBand />

      <LeadMagnetCta />

      <CtaSection heading={`Your ${sector.nameLower} transaction starts with a conversation.`} />
    </PageLayout>
  );
}
