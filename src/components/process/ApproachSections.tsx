import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '../ui/motion';
import { AIHumanSplit } from '../home/AIHumanSplit';
import { processStages } from '../../content/process-stages';

// How Mastella works: the shift in M&A delivery, the in-house agents, the six stages and how an
// advisor is matched. Moved from the home page to /process/ in November 2026.

const matchingSteps = [
  {
    eyebrow: 'Step 01',
    title: 'We match you',
    body: 'On first conversation we pair you with a sector-specialist advisor chosen for your transaction type, stage, and buyer universe.',
  },
  {
    eyebrow: 'Leo or the bench',
    title: 'One named advisor leads',
    body: 'Either Leo Meggitt or a vetted specialist from our wider bench of senior practitioners across sectors and deal types.',
  },
  {
    eyebrow: 'Plus the AI layer',
    title: 'Tech does the rest',
    body: 'Financial normalisation, buyer mapping, IM drafting, data-room orchestration, term benchmarking, handled in the background at machine speed.',
  },
];

export function ProcessApproachSections() {
  return (
    <>
    {/* Positioning - why traditional M&A is being disrupted */}
    <section className="bg-sand-light py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/10 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <FadeIn>
              <p className="eyebrow mb-6 text-navy-light">The shift</p>
              <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                Traditional M&amp;A has been slow to change. Adjacent professional services haven&apos;t.
              </h2>
            </FadeIn>
          </div>
          <div className="md:col-span-7 space-y-6 text-body-lg text-navy-light leading-relaxed">
            <FadeIn delay={0.1}>
              <p>
                Most M&amp;A firms still do the work the way it has always been done: sifting through spreadsheets by
                hand, drafting information memoranda over six to eight weeks, cold-calling a rolodex of buyers,
                tracking diligence in email chains.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                That work is now partly automatable. Financial normalisation, comparable transaction analysis,
                IM drafting, buyer mapping, data-room orchestration, term benchmarking: all of it can be done faster
                and more rigorously with AI than without it.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-navy font-medium">
                Mastella is built around that insight. We use AI to do the work that used to consume weeks, so
                experienced advisors can spend their time on what still requires judgement: positioning, relationships,
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

        {/* AI/Human ratio bar - auto-cycling through the tasks */}
        <FadeIn delay={0.4}>
          <div className="mt-12">
            <AIHumanSplit />
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
              Six stages. AI on one side, human judgement on the other.
            </h2>
            <p className="text-body-lg text-sand-light leading-relaxed">
              Each stage in an M&amp;A process has work that benefits from automation and work that requires
              judgement. We run both lanes in parallel, and keep them visibly separate so founders can see where each
              piece of the engagement is happening.
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" step={0.06}>
          {processStages.map((stage) => (
            <StaggerItem key={stage.slug}>
              <Link
                // The readiness stage is now a product in its own right; the rest go to the process page.
                to={stage.slug === 'exit-readiness' ? '/services/exit-readiness-assessment/' : `/process/#${stage.slug}`}
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
              The right specialist for your deal.
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
    </>
  );
}
