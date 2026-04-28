import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';

const principles = [
  {
    title: 'Two lanes, always visible',
    body: 'AI on one side, senior advisors on the other. Every engagement is explicit about which lane a piece of work is in. Founders always know who - or what - is doing what.',
  },
  {
    title: 'Judgment is not automatable',
    body: 'Positioning a business for a buyer, leading a negotiation, telling a founder a term is worse than it looks - these still require people with experience. We do not pretend otherwise.',
  },
  {
    title: 'Fees reflect the work',
    body: 'When the machinable parts of a process actually get machined, the hours add up differently. Our fee structures reflect that. We publish them, we do not hide behind them.',
  },
  {
    title: 'UK SMEs, not everything',
    body: 'We work with UK SMEs with £5M–£50M turnover. Outside that range other advisors are better placed. Saying what we are not is part of saying what we are.',
  },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">About</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        We find buyers other advisors don&apos;t reach.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Mastella is an M&amp;A advisory firm for UK owner-managed SMEs with £5M–£50M turnover. Off-market buyer
        sourcing, confidential processes, senior-led throughout.
      </p>
    </div>
  );
}

export default function About() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="About Mastella Advisory | M&A for UK SMEs £5–50M Turnover"
        description="Off-market M&A advisory for UK owner-managed SMEs with £5–50M turnover. Confidential sell-side, fundraising and exit readiness, led by senior advisors."
        canonical="https://mastellagroup.com/about"
      />

      {/* Thesis */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <FadeIn>
                <p className="eyebrow mb-6 text-navy-light">The thesis</p>
                <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                  A structural shift, not a sales pitch.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-8 space-y-6 text-body-lg text-navy-light leading-relaxed">
              <FadeIn>
                <p>
                  Adjacent professional services - consulting, audit, legal research - have quietly absorbed a generation
                  of AI tooling. M&amp;A advisory, especially in the lower mid-market, has not.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  The high monthly retainer fees charged on a £5M–£50M deal reflect the manual nature of how that work
                  used to get done: financial normalisation by hand, information memoranda written over six to eight weeks, buyer
                  outreach run from a rolodex, diligence coordinated in email.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  Those activities are now, to a significant extent, machinable. Models can normalise financials,
                  analyse thousands of comparable transactions, draft an IM, map a buyer universe, orchestrate a data
                  room, and benchmark term sheets against market norms - faster than a team of analysts and often more
                  thoroughly.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-navy font-medium">
                  Mastella is what an advisory firm looks like when you start from that premise rather than bolt it on
                  afterwards: senior advisors paired with agents we have built ourselves - purpose-built for lower
                  mid-market M&amp;A, not a chat wrapper over someone else&apos;s model - and fees that reflect the
                  actual cost of delivery.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-sand-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="eyebrow text-navy-light mb-6">How we work</p>
              <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                Four operating principles.
              </h2>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {principles.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="bg-white rounded-xl p-8 border border-navy/10 h-full">
                  <p className="font-mono text-xs text-accent-dark tracking-widest mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-2xl text-navy mb-4 leading-snug">{p.title}</h3>
                  <p className="text-navy-light leading-relaxed">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The bench */}
      <section className="bg-white py-24 md:py-32 border-t border-navy/10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <FadeIn>
                <p className="eyebrow text-navy-light mb-6">The bench</p>
                <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                  A small team with deeper reach.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-8 space-y-6 text-body-lg text-navy-light leading-relaxed">
              <FadeIn>
                <p>
                  We are a deliberately small resident team. Keeping the firm small is what makes seniority-only
                  delivery possible. But a small team alone cannot cover every sector and deal type that lower
                  mid-market founders need.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  So we run a vetted bench: a network of senior specialists who have been through exits and raises
                  across financial services, technology, consumer, industrials, infrastructure, healthcare and more. At
                  engagement we match you with either a resident partner or the right bench specialist for your
                  transaction type and buyer universe.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-navy font-medium">
                  Tech plus the right specialist. That is the equation. AI gives us leverage; the matched advisor gives
                  you someone who has already done your kind of deal.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are for */}
      <section className="bg-ink text-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <FadeIn>
                <p className="eyebrow mb-6">Who we&apos;re for</p>
                <h2 className="font-serif text-display-md text-white leading-tight text-balance">
                  Founders of lower mid-market businesses preparing to sell or raise.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-7 space-y-6 text-body-lg text-sand-light leading-relaxed">
              <FadeIn delay={0.1}>
                <p>
                  UK owner-managed SMEs with £5M–£50M turnover. Founder-led, family-owned, or PE-backed. Planning an exit in the next
                  6–24 months, running a current capital raise, or simply wanting to know what their business is
                  actually worth and what the path would look like.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  Sector-agnostic. We have advised across financial services, technology, consumer, logistics,
                  infrastructure, education, and agriculture. The thesis applies in all of them.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deepest text-white py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="font-serif text-display-md text-white mb-6 leading-tight text-balance">
                The best way to see if the approach fits is to have the conversation.
              </h2>
              <p className="text-body-lg text-sand-light mb-10 leading-relaxed">
                Forty-five minutes, confidential, no obligation. If we are not the right fit we will say so.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5"
                >
                  Book a conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/process"
                  className="inline-flex items-center gap-2 border border-sand/30 text-white px-7 py-3.5 rounded-md font-medium tracking-wide hover:bg-white/5 hover:border-sand/60 transition-all duration-200"
                >
                  See how the work gets done
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
