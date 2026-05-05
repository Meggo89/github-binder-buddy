import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { SITE, canonicalFor } from '../seo/site-meta';
import leoMeggitt from '../assets/leo-meggitt.jpg';

// ============================================================================
// TREATMENT 1 - "Principal-led"
// Layout-first mock. All content is placeholder for review.
// Final copy will come from bio-drafts.md once placeholders are filled.
// ============================================================================

const PRINCIPAL = {
  name: 'Leo Meggitt',
  title: 'Founder & Principal',
  image: leoMeggitt,
  linkedin: 'https://www.linkedin.com/in/leomeggitt/',
  email: 'leo@mastellagroup.com',
  lead:
    'I built Mastella to do M&A advisory the way owners actually need it done - senior-led from first call to completion, off-market wherever possible, with proprietary technology doing the work that used to take weeks of analyst time.',
};

const STATS = [
  { value: '15', label: 'Years in M&A' },
  { value: '£400M+', label: 'Transaction value advised' },
  { value: '30+', label: 'Completed transactions' },
  { value: '10', label: 'Sectors' },
];

// Function areas covered by the in-house support team. Function-led, no
// names, no individual titles - so there is nothing to look up on LinkedIn.
const SUPPORT_AREAS = [
  {
    area: 'Financial work',
    detail: 'Valuation, financial normalisation, IM drafting, comparable transactions analysis.',
  },
  {
    area: 'Buyer research',
    detail: 'Sector benchmarking, market mapping, buyer universe construction.',
  },
  {
    area: 'Process coordination',
    detail: 'Data-room organisation, diligence Q&A tracking, status reporting.',
  },
];

// Placeholder bio sections - swap with the long bio from bio-drafts.md
const BIO_SECTIONS = [
  {
    eyebrow: 'Why Mastella',
    body:
      'After two decades in lower mid-market M&A I kept seeing the same pattern: senior advisors win the mandate, juniors deliver the work, the senior advisor reappears at closing. Owner-managed businesses deserve better. A modern delivery model - proprietary technology handling the structured work, the principal still leading every conversation - finally makes that possible without compromising rigour or coverage.',
  },
  {
    eyebrow: 'How I work with you',
    body:
      'When you engage Mastella, you engage me. I run the readiness work, lead every conversation with potential buyers, manage the negotiation, and sign alongside you on completion day. Behind me, a small in-house analyst team and our proprietary technology layer handle the analysis, buyer mapping, data-room orchestration and term-sheet benchmarking. Faster than traditional analyst-only delivery, more rigorous because of the technology, but senior-led on every decision and every conversation.',
  },
  {
    eyebrow: 'Background',
    body:
      'Trained in corporate finance and M&A. Built and scaled businesses across recruitment, corporate finance and interim management before founding Mastella. Investor and advisor to a number of early-stage UK companies. Sector experience spans financial services, technology, consumer, industrials, infrastructure, education and agriculture.',
  },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Principal</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-6 text-balance">
        {PRINCIPAL.name}
      </h1>
      <p className="font-mono text-xs text-accent tracking-widest uppercase mb-8">{PRINCIPAL.title}</p>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">{PRINCIPAL.lead}</p>
    </div>
  );
}

export default function Team() {
  const personSchema = {
    '@type': 'Person',
    name: PRINCIPAL.name,
    jobTitle: PRINCIPAL.title,
    worksFor: { '@id': `${SITE.domain}/#organization` },
    url: PRINCIPAL.linkedin,
    sameAs: [PRINCIPAL.linkedin],
    image: `${SITE.domain}${PRINCIPAL.image}`,
    description: PRINCIPAL.lead,
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Principal', item: canonicalFor('/team') },
    ],
  };

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Leo Meggitt - Principal | Mastella Advisory"
        description="Leo Meggitt, founder of Mastella Advisory. 20+ years advising UK SME owners on sell-side M&A, fundraising and exit readiness."
        canonical="https://mastellagroup.com/team"
      />
      <StructuredData data={[personSchema, breadcrumb]} />

      {/* Bio panel: portrait left, bio sections right */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Sticky portrait + contact card */}
            <div className="md:col-span-5">
              <div className="md:sticky md:top-24">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-sand-light mb-8">
                  <img
                    src={PRINCIPAL.image}
                    alt={PRINCIPAL.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="bg-sand-light rounded-xl p-6 border border-navy/10">
                  <p className="font-mono text-xs text-navy-light tracking-widest uppercase mb-4">Direct contact</p>
                  <div className="space-y-3 text-sm">
                    <a
                      href={`mailto:${PRINCIPAL.email}`}
                      className="flex items-center gap-3 text-navy hover:text-accent-dark transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {PRINCIPAL.email}
                    </a>
                    <a
                      href={PRINCIPAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-navy hover:text-accent-dark transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio sections */}
            <div className="md:col-span-7">
              <Stagger className="space-y-12">
                {BIO_SECTIONS.map((section) => (
                  <StaggerItem key={section.eyebrow}>
                    <div>
                      <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-4">
                        {section.eyebrow}
                      </p>
                      <p className="text-body-lg text-navy-light leading-relaxed">{section.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility stats band */}
      <section className="bg-ink text-white py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-ink p-8 md:p-10 text-center">
                    <p className="font-serif text-4xl md:text-5xl text-accent mb-3 leading-none">{stat.value}</p>
                    <p className="text-sm text-sand-light">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* In-house support team - function areas, no named individuals */}
      <section className="bg-white py-20 md:py-24 border-t border-navy/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="max-w-3xl mb-12">
                <p className="eyebrow text-navy-light mb-6">Behind the principal</p>
                <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
                  A small in-house support team.
                </h2>
                <p className="text-body-lg text-navy-light leading-relaxed">
                  A focused team handles the structured work between conversations - the kind that benefits from
                  time and rigour rather than seniority on every line. Leo, or an approved senior advisor, stays
                  involved at every decision and every conversation that matters.
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-3 gap-5">
              {SUPPORT_AREAS.map((a) => (
                <StaggerItem key={a.area}>
                  <div className="bg-sand-light rounded-xl p-6 border border-navy/10 h-full">
                    <p className="font-serif text-xl text-navy leading-snug mb-3">{a.area}</p>
                    <p className="text-sm text-navy-light leading-relaxed">{a.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Specialist network */}
      <section className="bg-sand-light py-24 md:py-32 border-t border-navy/5">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <FadeIn>
                <p className="eyebrow text-navy-light mb-6">The specialist network</p>
                <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                  A vetted network of specialists.
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-7 space-y-5 text-body-lg text-navy-light leading-relaxed">
              <FadeIn delay={0.1}>
                <p>
                  For sectors and deal types outside our resident coverage, we draw on a vetted network of senior
                  practitioners we have worked with on prior transactions. You are told upfront who is on your
                  engagement and why.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-navy font-medium">
                  The principal stays involved throughout.
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
              <p className="eyebrow mb-6">Next step</p>
              <h2 className="font-serif text-display-md text-white leading-tight mb-6 text-balance">
                Start with a confidential discussion.
              </h2>
              <p className="text-body-lg text-sand-light mb-10 leading-relaxed">
                Forty-five minutes, no obligation. A short discussion to decide whether Mastella is the right firm
                for what you&apos;re thinking about.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-navy-deepest px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-0.5"
              >
                Book a confidential discussion
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
