import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/BreadcrumbSchema';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { CASE_STUDY_GROUPS, type CaseStudy } from '../content/case-studies';

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="bg-white border border-navy/10 rounded-xl p-8 h-full hover:border-accent/40 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-navy text-white px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase">
            {study.tag}
          </span>
          {study.status && (
            <span className="bg-accent/10 text-accent-dark border border-accent/30 px-2 py-1 rounded text-xs font-mono tracking-widest uppercase">
              {study.status}
            </span>
          )}
        </div>
        {study.value && (
          <span className="font-serif text-xl text-accent-dark tracking-tight">{study.value}</span>
        )}
      </div>

      <h3 className="font-serif text-2xl text-navy mb-1 leading-tight">{study.title}</h3>
      <p className="text-xs font-mono text-navy-light tracking-widest uppercase mb-6">{study.sector}</p>

      <div className="space-y-5 text-sm">
        <div>
          <p className="font-mono text-xs text-navy tracking-widest uppercase mb-1.5">Challenge</p>
          <p className="text-navy-light leading-relaxed">{study.challenge}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-navy tracking-widest uppercase mb-1.5">Approach</p>
          <p className="text-navy-light leading-relaxed">{study.approach}</p>
        </div>
        <div>
          <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-1.5">Outcome</p>
          <p className="text-navy leading-relaxed font-medium">{study.outcome}</p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Our work</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Real outcomes for real founders.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        From seed raises to full exits across six sectors. A selection of transactions we have led or are currently
        leading.
      </p>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Our Work: Selected M&A Transactions"
        description="Real outcomes for real founders. Exit advisory, M&A transactions, and capital raises led by Mastella Advisory across six sectors."
        canonical="https://mastellagroup.com/case-studies/"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Case studies', path: '/case-studies' }]} />

      {/* Stats */}
      <section className="bg-white py-16 md:py-20 border-b border-navy/10">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { stat: '15', label: 'Years in M&A' },
                { stat: '£800m+', label: 'Transaction value advised on' },
                { stat: '6', label: 'Sectors covered' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl text-navy mb-2 tracking-tight">{item.stat}</p>
                  <p className="font-mono text-xs text-navy-light tracking-widest uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Case studies, grouped */}
      {CASE_STUDY_GROUPS.map((group, gi) => (
        <section key={group.heading} className={`bg-white ${gi === 0 ? 'pt-20 md:pt-24' : 'pt-4'} pb-16 md:pb-20`}>
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-display-md text-navy leading-tight mb-10 max-w-6xl mx-auto">{group.heading}</h2>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {group.studies.map((study) => (
                <StaggerItem key={study.title}>
                  <CaseStudyCard study={study} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-navy-deepest text-white py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="font-serif text-display-md text-white mb-6 leading-tight text-balance">
                Your transaction is the one we have not run yet.
              </h2>
              <p className="text-body-lg text-sand-light mb-10 leading-relaxed">
                Every transaction starts with a conversation. Let us understand your goals and tell you what is possible.
              </p>
              <Link
                to="/contact/"
                className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5"
              >
                Arrange a confidential conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
