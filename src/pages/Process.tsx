import { ArrowRight, Cpu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn } from '../components/ui/motion';
import { ProcessOverviewIllustration } from '../components/illustrations';
import { processStages } from '../content/process-stages';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">The process</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        How the work actually gets done.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Six stages from initial readiness assessment to completion. At each stage we are explicit about what AI is
        doing and what a senior advisor is doing - because the split is where the advantage comes from.
      </p>
    </div>
  );
}

export default function Process() {
  return (
    <PageLayout hero={<Hero />} heroTone="ink" mainClassName="">
      <SEO
        title="Our AI-Enabled M&A Process"
        description="Six stages from readiness to completion. We are explicit at every stage about what AI does and what senior advisors do - from automated financial normalisation to human-led negotiation."
        canonical="https://mastellagroup.com/process"
      />

      {/* Overview */}
      <section className="bg-navy-deepest text-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-8 md:p-12 mb-12">
              <ProcessOverviewIllustration />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-sm">
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-mono text-xs text-accent tracking-widest mb-1">AI LANE</p>
                  <p className="text-sand-light leading-relaxed">
                    Our own M&amp;A agents - analysis, drafting, tracking, benchmarking. Built specifically for the
                    lower mid-market, not bolted on.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-sand mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-mono text-xs text-sand tracking-widest mb-1">HUMAN LANE</p>
                  <p className="text-sand-light leading-relaxed">
                    Positioning, relationships, negotiation - everything that still genuinely requires judgement.
                  </p>
                </div>
              </div>
              <div className="text-sand-light leading-relaxed">
                The split is explicit. You always know which lane a piece of work is in, and why.
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Per-stage deep dives */}
      <div className="bg-white">
        {processStages.map((stage, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              key={stage.slug}
              id={stage.slug}
              className={`py-24 md:py-32 scroll-mt-24 ${isEven ? 'bg-white' : 'bg-sand-light'}`}
            >
              <div className="container mx-auto px-6">
                <FadeIn>
                  <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
                    <div className="md:col-span-5">
                      <p className="font-mono text-xs text-accent-dark tracking-widest mb-6">
                        STAGE {stage.number}
                      </p>
                      <h2 className="font-serif text-display-md text-navy leading-[1.1] mb-6 text-balance">
                        {stage.title}
                      </h2>
                      <p className="text-body-lg text-navy-light leading-relaxed mb-10">{stage.lead}</p>

                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Cpu className="h-4 w-4 text-accent-dark" />
                            <p className="font-mono text-xs text-accent-dark tracking-widest">AI CAPABILITY</p>
                          </div>
                          <p className="text-navy-light leading-relaxed pl-6 border-l-2 border-accent/30">
                            {stage.aiCapability}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <User className="h-4 w-4 text-navy" />
                            <p className="font-mono text-xs text-navy tracking-widest">HUMAN TOUCHPOINT</p>
                          </div>
                          <p className="text-navy-light leading-relaxed pl-6 border-l-2 border-navy/30">
                            {stage.humanTouchpoint}
                          </p>
                        </div>
                      </div>

                      <div className="mt-10 bg-ink text-white rounded-xl p-6 flex items-start gap-5">
                        <p className="font-serif text-4xl text-accent leading-none flex-shrink-0">
                          {stage.benefitMetric}
                        </p>
                        <div>
                          <p className="font-mono text-xs text-accent tracking-widest mb-2">BENEFIT</p>
                          <p className="text-sand-light leading-relaxed">{stage.benefit}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      <div className="rounded-2xl bg-ink p-6 md:p-10 sticky top-24">
                        {stage.illustration}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          );
        })}
      </div>

      {/* Close */}
      <section className="bg-navy-deepest text-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="eyebrow mb-6">Next step</p>
              <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
                A short confidential conversation is the best way to see whether we&apos;re the right fit.
              </h2>
              <p className="text-body-lg text-sand-light mb-10 leading-relaxed">
                Forty-five minutes. No obligation. You leave with a clearer view of what an exit process would look
                like for your specific business and where the leverage points are.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/20"
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
