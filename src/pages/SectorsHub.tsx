import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { ProofBand } from '../components/landing/ProofBand';
import { CtaSection } from '../components/landing/CtaSection';
import { SECTORS, getNichesForPillar } from '../content/landing';
import { SITE, canonicalFor } from '../seo/site-meta';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Sectors</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Sectors we work in
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Senior-led M&amp;A advisory for founder-led businesses worth £5–50M — UK-focused with cross-border capability
        — across six sectors. Each pillar links to specialist pages for the niches we cover most actively.
      </p>
    </div>
  );
}

export default function SectorsHub() {
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: 'Sectors', item: canonicalFor('/sectors') },
    ],
  };

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Sectors We Cover - UK M&A Advisory"
        description="UK M&A advisory across six sectors: business services, healthcare, light industrials, logistics, professional services, tech-enabled services."
        canonical="https://mastellagroup.com/sectors/"
      />
      <StructuredData data={[breadcrumb]} />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <Stagger className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {SECTORS.map((s) => {
              const niches = getNichesForPillar(s.slug);
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    to={`/sectors/${s.slug}/`}
                    className="group block bg-white border border-navy/10 rounded-xl p-8 h-full hover:border-accent/40 hover:shadow-xl transition-all duration-300"
                  >
                    <h2 className="font-serif text-2xl text-navy leading-snug mb-3 group-hover:text-accent-dark transition-colors">
                      {s.name}
                    </h2>
                    <p className="text-navy-light leading-relaxed mb-6">{s.intro}</p>
                    <p className="font-mono text-xs text-navy-light tracking-widest uppercase mb-3">
                      Niches we cover ({niches.length})
                    </p>
                    <ul className="text-sm text-navy-light space-y-1 mb-6">
                      {niches.slice(0, 4).map((n) => (
                        <li key={n.slug}>· {n.name}</li>
                      ))}
                      {niches.length > 4 && (
                        <li className="text-navy-light/70">· and {niches.length - 4} more</li>
                      )}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-sm font-mono text-accent-dark tracking-wide">
                      Visit pillar
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ProofBand />

      <CtaSection heading="Not sure which pillar fits yet?" />
    </PageLayout>
  );
}
