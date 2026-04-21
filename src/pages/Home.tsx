import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Download, CheckCircle2, Cpu } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FAQSection } from '../components/FAQSection';
import { LeadMagnetForm } from '../components/forms/LeadMagnetForm';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { ProcessOverviewIllustration } from '../components/illustrations';
import { processStages } from '../content/process-stages';
import { useScrollTracking } from '../hooks/useScrollTracking';
import { trackCTA } from '../utils/trackCTA';
import francisMartin from '../assets/francis-martin.jpg';
import erikVynkier from '../assets/erik-vynkier.jpg';

const teamPreview = [
  {
    name: 'Leo Meggitt',
    title: 'Managing Director',
    image: '/lovable-uploads/5a8b577b-26fe-4020-b9c9-cecef8f4f735.png',
    // Portrait source (ratio 0.67) - fits a portrait frame cleanly
    imageFit: 'object-cover object-[center_25%]',
    description:
      '20+ years in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies.',
  },
  {
    name: 'Francis Martin CBE',
    title: 'Director',
    image: francisMartin,
    // Landscape source (ratio 1.30) - contain inside the frame so the face matches Leo's visual scale
    imageFit: 'object-contain object-top',
    description:
      'Distinguished advisor with 25+ years in strategic consulting. Former President of the British Chambers of Commerce.',
  },
  {
    name: 'Erik Vynkier',
    title: 'Senior Advisor',
    image: erikVynkier,
    // Landscape source (ratio 1.18)
    imageFit: 'object-contain object-top',
    description:
      'Deep experience in financial services, asset management and private equity across multiple sectors and geographies.',
  },
];

const matchingSteps = [
  {
    eyebrow: 'Step 01',
    title: 'We match you',
    body: 'On first conversation we pair you with a sector-specialist advisor chosen for your transaction type, stage, and buyer universe. Never a generalist on the rota.',
  },
  {
    eyebrow: 'Resident or bench',
    title: 'One named advisor leads',
    body: 'Either a resident Mastella partner or a vetted specialist from our wider bench of senior practitioners across sectors and deal types.',
  },
  {
    eyebrow: 'Plus the AI layer',
    title: 'Tech does the rest',
    body: 'Financial normalisation, buyer mapping, IM drafting, data-room orchestration, term benchmarking - handled in the background at machine speed.',
  },
];

const founderImpact = [
  {
    metric: '3–5×',
    label: 'Broader buyer pool',
    description: 'Systematic identification expands coverage well beyond a traditional advisor\u2019s rolodex.',
  },
  {
    metric: '2–3 wks',
    label: 'Information memorandum',
    description: 'IM production compressed from 6–8 weeks. More iterations, higher production quality.',
  },
  {
    metric: 'days',
    label: 'Valuation turnaround',
    description: 'Defensible valuation analysis across thousands of comparables - delivered in days, not weeks.',
  },
  {
    metric: '100%',
    label: 'Terms benchmarked',
    description: 'Every term of every offer is checked against market norms. Nothing slips past.',
  },
];

const testimonials = [
  {
    quote:
      'Mastella guided us through a complex exit process with professionalism and deep market knowledge. They secured a buyer who truly valued what we had built.',
    name: 'CEO',
    company: 'Financial Services Firm',
    context: 'Full sale, founder exit',
  },
  {
    quote:
      'Their fundraising expertise was exceptional. They connected us with the right investors and structured a round that gave us the capital to scale without excessive dilution.',
    name: 'Founder',
    company: 'Technology Company',
    context: 'Seed funding, £2m raised',
  },
  {
    quote:
      'What set Mastella apart was their ability to manage the entire process while keeping us focused on running the business. We felt supported at every stage.',
    name: 'Managing Director',
    company: 'Logistics Business',
    context: 'Majority sale to PE',
  },
];

function Hero() {
  return (
    <div className="max-w-4xl">
      <p className="eyebrow mb-6">Lower mid-market · £5M–£50M</p>
      <h1 className="font-serif text-display-xl text-white mb-8 text-balance leading-[1.05]">
        M&amp;A advisory,<br />
        <span className="text-accent italic">rebuilt for the AI era.</span>
      </h1>
      <p className="text-body-lg md:text-xl text-sand-light max-w-2xl mb-10 leading-relaxed">
        Sharper analysis. Broader buyer reach. Faster outcomes. Fees that reflect how the work actually gets done -
        not how it was done thirty years ago.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/contact"
          onClick={() => trackCTA('Book a Confidential Conversation', 'hero')}
          className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5"
        >
          Book a Confidential Conversation
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/process"
          onClick={() => trackCTA('See the Process', 'hero')}
          className="inline-flex items-center gap-2 border border-sand/30 text-white px-7 py-3.5 rounded-md font-medium tracking-wide hover:bg-white/5 hover:border-sand/60 transition-all duration-200"
        >
          See how we work
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  useScrollTracking();

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="M&A Advisory Rebuilt for the AI Era"
        description="Strategic exit and M&A advisory for founders building companies worth £5M to £50M. AI-enabled delivery producing faster, sharper, lower-cost outcomes than traditional advisors."
        canonical="https://mastellagroup.com"
      />

      {/* Positioning - why traditional M&A is being disrupted */}
      <section className="bg-ink text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <FadeIn>
                <p className="eyebrow mb-6">The shift</p>
                <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
                  Traditional M&amp;A has been slow to change. Adjacent professional services haven&apos;t.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-7 space-y-6 text-body-lg text-sand-light leading-relaxed">
              <FadeIn delay={0.1}>
                <p>
                  The 5–7% fee structure on lower mid-market deals reflects the manual nature of how the work used to get
                  done: advisors sifting through spreadsheets by hand, drafting information memoranda over six to eight
                  weeks, cold-calling a rolodex of buyers, tracking diligence in email chains.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  That work is now partly automatable. Financial normalisation, comparable transaction analysis,
                  IM drafting, buyer mapping, data-room orchestration, term benchmarking - all of it can be done faster
                  and more rigorously with AI than without it.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white font-medium">
                  Mastella is built around that insight. We use AI to do the work that used to consume weeks, so
                  experienced advisors can spend their time on what still requires judgment: positioning, relationships,
                  negotiation, and the calls that actually move deals.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke agents */}
      <section className="bg-navy-deepest text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sand/5 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-12 gap-12 items-start mb-16">
            <div className="md:col-span-5">
              <FadeIn>
                <p className="eyebrow mb-6">Built, not bolted on</p>
                <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
                  Our own M&amp;A agents. Built for this work.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-7 space-y-6 text-body-lg text-sand-light leading-relaxed">
              <FadeIn delay={0.1}>
                <p>
                  Generic AI can summarise documents and draft emails. What an exit process actually needs is specialist
                  work: financial statements normalised against sector benchmarks, buyer universes mapped by transaction
                  behaviour, every term of every offer benchmarked against live market norms.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  We have built our own agents for each of these jobs, purpose-built for lower mid-market M&amp;A. Not a
                  chat wrapper. Not a dashboard over someone else&apos;s model. Agents that know this specific work
                  because we built them around it.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white font-medium">
                  &ldquo;We use AI&rdquo; is what most firms now say. &ldquo;We have agents built for this&rdquo; is a
                  different claim.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Named agents */}
          <FadeIn delay={0.35}>
            <div className="mt-14">
              <p className="font-mono text-xs text-accent tracking-widest mb-6 uppercase">Our M&amp;A agents</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Readiness', job: 'Exit-gap diagnostic' },
                  { name: 'Valuation', job: 'Comparables at scale' },
                  { name: 'IM Drafter', job: 'First draft, fast' },
                  { name: 'Buyer Map', job: 'Acquirer universe' },
                  { name: 'Diligence', job: 'Data-room + Q&A' },
                  { name: 'Terms', job: 'Offer benchmarking' },
                ].map((agent) => (
                  <div key={agent.name} className="rounded-lg border border-accent/25 bg-accent/[0.04] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-3.5 w-3.5 text-accent" />
                      <p className="font-mono text-[10px] text-accent tracking-widest uppercase">Agent</p>
                    </div>
                    <p className="font-serif text-lg text-white leading-tight mb-1">{agent.name}</p>
                    <p className="text-xs text-sand-light/80 leading-relaxed">{agent.job}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process visualization */}
      <section className="bg-navy-deepest text-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="eyebrow mb-6">The process</p>
              <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
                Six stages. AI on one side, human judgment on the other.
              </h2>
              <p className="text-body-lg text-sand-light leading-relaxed">
                Each stage in an M&amp;A process has work that benefits from automation and work that requires
                judgment. We run both lanes in parallel - and keep them visibly separate so founders can see where each
                piece of the engagement is happening.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mb-16 rounded-2xl bg-white/[0.02] border border-white/5 p-8 md:p-12">
              <ProcessOverviewIllustration />
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" step={0.06}>
            {processStages.map((stage) => (
              <StaggerItem key={stage.slug}>
                <Link
                  to={`/process#${stage.slug}`}
                  className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-accent/40 transition-all duration-300"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-mono text-xs text-accent tracking-widest">{stage.number}</span>
                    <ArrowUpRight className="h-4 w-4 text-sand-dark group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3 leading-snug">{stage.title}</h3>
                  <p className="text-sm text-sand-light leading-relaxed mb-4">{stage.lead}</p>
                  <p className="text-xs text-accent font-mono tracking-wider">{stage.benefit}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Matched specialist */}
      <section className="bg-ink text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sand/5 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="eyebrow mb-6">Matched from day one</p>
              <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
                The right specialist for your deal, not the generalist on the rota.
              </h2>
              <p className="text-body-lg text-sand-light leading-relaxed">
                Mastella is deliberately small. Every engagement is led personally by someone senior who has done your
                kind of transaction before. No teams of junior analysts between you and the work that matters.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-6xl">
            {matchingSteps.map((card) => (
              <StaggerItem key={card.title} className="bg-ink p-8 md:p-10">
                <p className="font-mono text-xs text-accent tracking-widest mb-5">{card.eyebrow}</p>
                <h3 className="font-serif text-2xl text-white mb-4 leading-snug">{card.title}</h3>
                <p className="text-sand-light leading-relaxed text-sm">{card.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.2}>
            <p className="font-serif text-2xl md:text-3xl text-accent italic text-center mt-16 max-w-3xl mx-auto leading-snug text-balance">
              &ldquo;The AI is the leverage. The matched advisor is the difference.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why this matters for founders */}
      <section className="bg-sand-light py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="eyebrow mb-6 text-navy-light">Concrete impact</p>
              <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                What this means if you&apos;re thinking about selling.
              </h2>
              <p className="text-body-lg text-navy-light leading-relaxed">
                The numbers below are not promises. They describe how the work changes when the machinable parts of an
                M&amp;A process are actually machined. You will see them reflected in how we quote fees and how we plan
                timelines.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10 rounded-2xl overflow-hidden">
            {founderImpact.map((item) => (
              <StaggerItem
                key={item.label}
                className="bg-sand-light p-8 md:p-10 flex flex-col"
              >
                <p className="font-serif text-5xl md:text-6xl text-navy mb-6 leading-none tracking-tight">
                  {item.metric}
                </p>
                <p className="font-semibold text-navy mb-2">{item.label}</p>
                <p className="text-sm text-navy-light leading-relaxed">{item.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <p className="eyebrow mb-6 text-navy-light">The team</p>
                <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                  Deep advisory experience, sharpened by modern tools.
                </h2>
              </div>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent-dark transition-colors"
              >
                Meet the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamPreview.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group">
                  <div className="w-full h-80 md:h-[420px] overflow-hidden rounded-xl mb-5 bg-sand-light">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className={`block w-full h-full ${member.imageFit} transition-transform duration-700 group-hover:scale-105`}
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-navy mb-1">{member.name}</h3>
                  <p className="text-sm text-accent-dark font-medium mb-3 tracking-wide">{member.title}</p>
                  <p className="text-sm text-navy-light leading-relaxed">{member.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lead magnet */}
      <section className="bg-navy-deepest text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <FadeIn>
                <div className="inline-flex items-center gap-2 mb-6">
                  <Download className="h-4 w-4 text-accent" />
                  <span className="eyebrow">Free download</span>
                </div>
                <h2 className="font-serif text-display-md text-white mb-6 leading-tight text-balance">
                  The Exit Readiness Checklist.
                </h2>
                <p className="text-body-lg text-sand-light mb-8 leading-relaxed">
                  Twenty-five areas every founder should address before going to market. The same framework we run
                  against every new engagement.
                </p>
                <ul className="space-y-3 text-sand-light">
                  {[
                    'Financial preparation and reporting standards',
                    'Management team readiness and succession',
                    'Legal, IP, and compliance review',
                    'Valuation drivers and value enhancement',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <div className="md:col-span-2">
              <FadeIn delay={0.15}>
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8 backdrop-blur">
                  <LeadMagnetForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="eyebrow mb-6 text-navy-light">In their words</p>
              <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                What founders say after working with us.
              </h2>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <StaggerItem key={t.name + t.company}>
                <figure className="h-full border-l-2 border-accent pl-6 py-2">
                  <blockquote className="font-serif text-lg text-navy mb-6 italic leading-snug">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-sm text-navy-light">{t.company}</p>
                    <p className="text-xs text-accent-dark font-mono tracking-wider mt-2 uppercase">{t.context}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FAQSection />
    </PageLayout>
  );
}
