import { ArrowRight, Handshake, Banknote, ClipboardCheck, UserSearch, Cpu, User } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';

type Service = {
  icon: ReactNode;
  title: string;
  lead: string;
  aiLayer: string;
  humanLayer: string;
  outcome: string;
};

const services: Service[] = [
  {
    icon: <Handshake className="h-6 w-6 text-accent" />,
    title: 'Sell-side Advisory',
    lead: 'Full-service exit advisory for founders taking a business to market - minority sale, majority sale, or full exit.',
    aiLayer:
      'Readiness assessment, financial normalisation, IM drafting, systematic buyer identification, data-room orchestration, term-sheet benchmarking.',
    humanLayer:
      'Strategy. Narrative. Relationship management with priority buyers. Negotiation leadership. Calls that move deals forward.',
    outcome: 'Broader buyer pools, faster to market, terms benchmarked end-to-end.',
  },
  {
    icon: <Banknote className="h-6 w-6 text-accent" />,
    title: 'Fundraising',
    lead: 'Seed, Series A, growth capital, and pre-exit funding for lower mid-market businesses.',
    aiLayer:
      'Investor mapping, market and competitor analysis, pitch deck and supporting model first drafts, round benchmarking.',
    humanLayer:
      'Positioning the story. Warm introductions where they matter. Guiding founders through valuation and term negotiations.',
    outcome: 'Well-qualified investor conversations. Less dilution, cleaner terms.',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 text-accent" />,
    title: 'Exit Readiness Consulting',
    lead: 'For founders 12–24 months out from a potential sale. Diagnose the gaps early, fix them while time is on your side.',
    aiLayer:
      'Automated readiness assessment across financials, contracts, operations, team, and IP. Benchmarking against successful exits in your sector.',
    humanLayer:
      'Founder coaching. Prioritisation of remediation. Calls with accountants and lawyers to get the work actually done.',
    outcome: 'Avoid the issues that cost founders value or kill deals at diligence.',
  },
  {
    icon: <UserSearch className="h-6 w-6 text-accent" />,
    title: 'Executive Search',
    lead: 'Leadership placement for the pre-exit period - CFO, COO, CRO - and interim management for transitions.',
    aiLayer:
      'Market mapping of candidate universe. Analysis of track records against specific pre-exit requirements. Structured evaluation.',
    humanLayer:
      'Approach and attraction of senior candidates. Judgment on fit. Onboarding and early-impact support.',
    outcome: 'A leadership team that makes the business more valuable to acquirers.',
  },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">What we do</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Four services. One delivery model.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Every engagement runs on the same two-lane model: AI handles what can be machined, senior advisors handle what
        requires judgment. Below is where we apply it.
      </p>
    </div>
  );
}

export default function Services() {
  return (
    <PageLayout hero={<Hero />} heroTone="ink" mainClassName="">
      <SEO
        title="Services - Sell-side, Fundraising, Exit Readiness, Executive Search"
        description="Sell-side M&A advisory, fundraising, exit readiness consulting, and executive search - all delivered through an AI-enabled model that combines machine speed with senior judgment."
        canonical="https://mastellagroup.com/services"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <Stagger className="max-w-6xl mx-auto space-y-24">
            {services.map((service, i) => (
              <StaggerItem key={service.title}>
                <div className="grid md:grid-cols-12 gap-12 items-start">
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30">
                        {service.icon}
                      </span>
                      <p className="font-mono text-xs text-accent-dark tracking-widest">
                        {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                      </p>
                    </div>
                    <h2 className="font-serif text-display-md text-navy leading-[1.1] mb-5 text-balance">
                      {service.title}
                    </h2>
                    <p className="text-body-lg text-navy-light leading-relaxed">{service.lead}</p>
                  </div>

                  <div className="md:col-span-7 space-y-5">
                    <div className="rounded-xl border border-navy/10 bg-sand-light p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu className="h-4 w-4 text-accent-dark" />
                        <p className="font-mono text-xs text-accent-dark tracking-widest">AI-DELIVERED</p>
                      </div>
                      <p className="text-navy-light leading-relaxed">{service.aiLayer}</p>
                    </div>

                    <div className="rounded-xl border border-navy/10 bg-white p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="h-4 w-4 text-navy" />
                        <p className="font-mono text-xs text-navy tracking-widest">HUMAN-LED</p>
                      </div>
                      <p className="text-navy-light leading-relaxed">{service.humanLayer}</p>
                    </div>

                    <div className="rounded-xl bg-ink text-white p-6 flex items-start gap-4">
                      <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sand-light leading-relaxed">
                        <span className="font-mono text-xs text-accent tracking-widest mr-2">OUTCOME ·</span>
                        {service.outcome}
                      </p>
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
                Not sure which one fits yet?
              </h2>
              <p className="text-body-lg text-sand-light mb-10 leading-relaxed">
                Most founders do not start with a clear answer. Book a short conversation and we&apos;ll tell you honestly
                which of these - if any - is the right starting point for your business.
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
