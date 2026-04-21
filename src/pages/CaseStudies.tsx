import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';

type CaseStudy = {
  tag: string;
  value?: string;
  status?: string;
  title: string;
  sector: string;
  challenge: string;
  approach: string;
  outcome: string;
};

const caseStudies: CaseStudy[] = [
  {
    tag: 'Seed Funding',
    value: '£2m',
    title: 'HR Tech Platform',
    sector: 'Technology',
    challenge:
      'Early-stage HR technology company needed capital to scale its platform and expand into new markets, but lacked established revenue metrics typical investors require.',
    approach:
      'Structured a compelling investment narrative around product-market fit and user growth. Ran a targeted outreach to 40+ investors across VC, family office, and angel networks.',
    outcome:
      'Secured approximately £2m in seed funding from a diversified investor base, enabling the company to triple its engineering team and launch in two new verticals.',
  },
  {
    tag: 'Full Sale',
    value: 'Target achieved',
    title: 'Institutional Asset Manager',
    sector: 'Financial Services',
    challenge:
      "Founder-led asset management firm with £500m+ AUM sought a full exit after 15 years. The business was highly dependent on the founder's relationships and reputation.",
    approach:
      'Conducted a structured sale process, identifying 12 strategic buyers. Worked closely with the founder to document key relationships and create a robust transition plan.',
    outcome:
      "Completed a full sale to a strategic acquirer at the founder's target valuation, with a structured earn-out that protected long-term client relationships.",
  },
  {
    tag: 'Majority Sale',
    title: 'DFM Platform',
    sector: 'Wealth Management',
    challenge:
      'A discretionary fund manager with strong performance but limited distribution sought a partner to accelerate growth while preserving its investment philosophy.',
    approach:
      'Identified PE-backed consolidators in the wealth management space. Ran a competitive process that attracted four serious offers, enabling founders to negotiate from strength.',
    outcome:
      'Majority sale to a PE-backed asset manager at a premium multiple, with founders retaining a meaningful minority stake to participate in future upside.',
  },
  {
    tag: 'Seed Round',
    value: '£1.5m+',
    title: 'Food Manufacturer',
    sector: 'Consumer Goods',
    challenge:
      'Innovative food manufacturer with strong retail traction needed growth capital to expand production capacity and secure national supermarket listings.',
    approach:
      "Positioned the company's sustainability credentials and margin profile to attract impact-oriented investors. Structured the round to balance founder dilution with growth ambitions.",
    outcome:
      'Raised over £1.5m from family offices and HNW investors, funding a new production line and enabling listings with two major UK supermarket chains.',
  },
  {
    tag: 'Series A & Sale',
    status: 'Current',
    title: 'Human Capital AI',
    sector: 'Artificial Intelligence',
    challenge:
      'An AI-powered platform for relational intelligence required successive funding rounds to scale its technology while exploring strategic minority sale options.',
    approach:
      "Advised across multiple capital events, building a phased funding strategy that aligned investor expectations with the company's rapid growth trajectory.",
    outcome:
      'Successfully closed two funding rounds from institutional and individual investors, with ongoing advisory on a strategic minority sale to a corporate partner.',
  },
  {
    tag: 'Capital Raise',
    title: 'Alternative Fund Manager',
    sector: 'Infrastructure',
    challenge:
      'An alternative fund manager pursuing a buy-and-build strategy in infrastructure needed to raise institutional capital to fund its acquisition pipeline.',
    approach:
      "Acted as placement agent, structuring the fund narrative around the team's track record and the infrastructure sector's resilient return profile. Targeted pension funds and institutional allocators.",
    outcome:
      'Secured institutional commitments enabling the fund to execute on its first three acquisitions in the UK infrastructure sector.',
  },
  {
    tag: 'Majority Sale',
    title: 'Logistics Business',
    sector: 'Transport & Logistics',
    challenge:
      'A family-owned logistics company with 30+ years of trading history sought an exit. The founders wanted continuity for long-standing employees and customers.',
    approach:
      'Guided the family through a structured sale process, prioritising buyers who would invest in the business long-term. Managed complex family dynamics and succession planning.',
    outcome:
      "Completed a majority sale to a respected PE investor who committed to preserving the company's culture, retaining all employees, and investing in fleet modernisation.",
  },
  {
    tag: 'Buy-side Advisory',
    status: 'Ongoing',
    title: 'Agricultural Group',
    sector: 'Agriculture',
    challenge:
      'A global agricultural group needed to expand its UK and European footprint through targeted acquisitions but lacked local market knowledge and deal origination capability.',
    approach:
      "Embedded within the group's corporate development team, mapping the UK and European market, identifying acquisition targets, and managing the full deal pipeline.",
    outcome:
      'Supporting execution of targeted acquisitions, with two deals in advanced due diligence and a pipeline of 15+ qualified targets.',
  },
  {
    tag: 'Series A',
    value: '£1m',
    title: 'Edtech Platform',
    sector: 'Education Technology',
    challenge:
      'An education technology platform with strong user engagement needed Series A capital to expand its content library and enter the corporate training market.',
    approach:
      'Crafted a growth narrative combining B2C traction with B2B potential. Targeted VCs and HNW investors with sector expertise in education and workplace learning.',
    outcome:
      'Closed a £1m Series A round and continuing to advise on subsequent capital events as the company scales into corporate training.',
  },
  {
    tag: 'Series A',
    title: 'Neobank',
    sector: 'Fintech',
    challenge:
      'A challenger bank needed significant Series A funding to obtain regulatory approvals and build its technology platform ahead of a planned market launch.',
    approach:
      'Managed a complex fundraise involving VCs, family offices, and strategic investors, navigating regulatory requirements and structuring the round to meet FCA capital adequacy expectations.',
    outcome:
      'Secured a major Series A round, providing the capital needed for regulatory approval and platform build, positioning the neobank for a successful market entry.',
  },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Our work</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Real outcomes for real founders.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        From seed raises to full exits across ten sectors. A selection of transactions we have led or are currently
        leading.
      </p>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Our Work - Selected Transactions"
        description="Real outcomes for real founders. Exit advisory, M&A transactions, and capital raises led by Mastella Advisory across ten sectors."
        canonical="https://mastellagroup.com/case-studies"
      />

      {/* Stats */}
      <section className="bg-white py-16 md:py-20 border-b border-navy/10">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { stat: '£200M+', label: 'Transaction value advised' },
                { stat: '20+', label: 'Deals completed' },
                { stat: '10', label: 'Sectors covered' },
                { stat: '95%', label: 'Client retention' },
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

      {/* Case studies grid */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((study) => (
              <StaggerItem key={study.title}>
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
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

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
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5"
              >
                Book a confidential conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
