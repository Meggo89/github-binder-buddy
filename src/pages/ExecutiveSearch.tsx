import { ArrowRight, Target, Users, Search, TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';

type PostExitCard = { icon: ReactNode; title: string; body: string };

const postExit: PostExitCard[] = [
  {
    icon: <TrendingUp className="h-5 w-5 text-accent" />,
    title: 'Integration Leadership',
    body: 'Executives who can manage integration, align teams, and ensure continuity during ownership transitions.',
  },
  {
    icon: <Search className="h-5 w-5 text-accent" />,
    title: 'Cultural Alignment',
    body: 'Leaders who bridge organisational cultures, maintain morale, and drive the combined entity to shared objectives.',
  },
  {
    icon: <Users className="h-5 w-5 text-accent" />,
    title: 'Growth Acceleration',
    body: 'Strategic hires focused on capturing synergies, expanding market presence, and accelerating post-acquisition growth.',
  },
];

const approachSteps = [
  { step: '01', title: 'Needs Assessment', body: 'Understand strategic objectives, capability gaps, and timeline.' },
  { step: '02', title: 'Market Mapping', body: 'Identify and approach top-tier talent aligned with your needs.' },
  { step: '03', title: 'Evaluation', body: 'Rigorous assessment for cultural fit and strategic alignment.' },
  { step: '04', title: 'Onboarding', body: 'Facilitate smooth integration and ensure rapid impact from day one.' },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Executive search</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Strategic leadership for critical transitions.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        The right leadership team can make or break an exit. We place the executives who make a business more valuable
        to acquirers — and the interim managers who bridge transitions.
      </p>
    </div>
  );
}

export default function ExecutiveSearch() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Executive Search & Interim Solutions"
        description="Strategic leadership placement and interim management for companies pre and post exit. Executives with proven track records in M&A transitions."
        canonical="https://mastellagroup.com/executive-search"
      />

      {/* Pre-exit */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <FadeIn>
                <p className="eyebrow text-navy-light mb-6">Pre-exit</p>
                <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                  Strengthen the team before going to market.
                </h2>
                <p className="text-body-lg text-navy-light leading-relaxed">
                  Acquirers pay premiums for businesses with strong management bench depth. Closing leadership gaps in
                  the 12–24 months before a sale typically pays for itself many times over at transaction.
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-8 grid md:grid-cols-2 gap-6">
              <FadeIn>
                <div className="bg-sand-light rounded-xl p-8 h-full border border-navy/5">
                  <Target className="h-6 w-6 text-accent mb-5" />
                  <h3 className="font-serif text-xl text-navy mb-3 leading-snug">Strategic placement</h3>
                  <p className="text-navy-light leading-relaxed mb-5">
                    Senior executives who enhance operational efficiency, strengthen financial performance, and make the
                    business more attractive to buyers.
                  </p>
                  <ul className="space-y-2 text-sm text-navy-light font-mono tracking-wide">
                    <li>— CFO</li>
                    <li>— COO</li>
                    <li>— CRO</li>
                    <li>— Head of Sales &amp; Marketing</li>
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="bg-sand-light rounded-xl p-8 h-full border border-navy/5">
                  <Users className="h-6 w-6 text-accent mb-5" />
                  <h3 className="font-serif text-xl text-navy mb-3 leading-snug">Interim management</h3>
                  <p className="text-navy-light leading-relaxed mb-5">
                    Experienced interim executives who step in quickly to address capability gaps, lead special projects,
                    or stabilise through the pre-exit phase.
                  </p>
                  <ul className="space-y-2 text-sm text-navy-light font-mono tracking-wide">
                    <li>— Bridge transitions</li>
                    <li>— Operational improvements</li>
                    <li>— Financial systems</li>
                    <li>— Growth initiatives</li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Post-exit */}
      <section className="bg-sand-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="max-w-3xl mb-14">
                <p className="eyebrow text-navy-light mb-6">Post-exit</p>
                <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                  Integration support, cultural alignment, growth acceleration.
                </h2>
              </div>
            </FadeIn>
            <Stagger className="grid md:grid-cols-3 gap-6">
              {postExit.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="bg-white rounded-xl p-8 h-full border border-navy/10">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 mb-5">
                      {item.icon}
                    </div>
                    <h3 className="font-serif text-xl text-navy mb-3 leading-snug">{item.title}</h3>
                    <p className="text-navy-light leading-relaxed">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="max-w-3xl mb-14">
                <p className="eyebrow text-navy-light mb-6">Our approach</p>
                <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                  Four steps from brief to impact.
                </h2>
              </div>
            </FadeIn>
            <Stagger className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {approachSteps.map((phase) => (
                <StaggerItem key={phase.step}>
                  <div>
                    <p className="font-mono text-xs text-accent-dark tracking-widest mb-4">{phase.step}</p>
                    <h3 className="font-serif text-xl text-navy mb-3 leading-snug">{phase.title}</h3>
                    <p className="text-sm text-navy-light leading-relaxed">{phase.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deepest text-white py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="font-serif text-display-md text-white mb-6 leading-tight text-balance">
                Right leader, right moment.
              </h2>
              <p className="text-body-lg text-sand-light mb-10 leading-relaxed">
                Whether you are preparing for an exit or managing post-acquisition integration, we can help you secure
                the executive talent needed to maximise value.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5"
              >
                Discuss your leadership needs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
