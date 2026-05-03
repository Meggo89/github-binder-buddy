import { Linkedin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { StructuredData } from '../components/StructuredData';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { SITE, canonicalFor } from '../seo/site-meta';
import leoMeggitt from '../assets/leo-meggitt.jpg';
import erikVynkier from '../assets/erik-vynkier.jpg';

const members = [
  {
    name: 'Leo Meggitt',
    title: 'Managing Director',
    image: leoMeggitt,
    linkedin: 'https://www.linkedin.com/in/leomeggitt/',
    description:
      '20+ years experience in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies.',
  },
  {
    name: 'Erik Vynkier',
    title: 'Senior Advisor',
    image: erikVynkier,
    linkedin: 'https://www.linkedin.com/in/erikvynkier/',
    description:
      'Highly experienced in financial services, asset management and private equity. Has worked on deals across multiple sectors and geographies.',
  },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">The team</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Senior advisors. No junior teams in between.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Every engagement is led by one of the people below. No junior teams between you and the work that matters.
      </p>
    </div>
  );
}

export default function Team() {
  const personSchemas = members.map((m) => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.title,
    worksFor: { '@id': `${SITE.domain}/#organization` },
    url: m.linkedin,
    sameAs: [m.linkedin],
    image: `${SITE.domain}${m.image}`,
    description: m.description,
  }));

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Team', item: canonicalFor('/team') },
    ],
  };

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Our Team - Senior M&A Advisors"
        description="Meet the Mastella Advisory leadership team. Over 50 years of combined experience in M&A, fundraising, executive search, and strategic consulting."
        canonical="https://mastellagroup.com/team"
      />
      <StructuredData data={[...personSchemas, breadcrumb]} />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {members.map((member) => (
              <StaggerItem key={member.name}>
                <FadeIn>
                  <article className="group">
                    <div className="w-full aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-sand-light">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="block w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-navy mb-1 leading-tight">{member.name}</h2>
                    <p className="text-accent-dark font-medium tracking-wide text-sm mb-4">{member.title}</p>
                    <p className="text-navy-light leading-relaxed mb-5">{member.description}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-navy hover:text-accent-dark transition-colors font-medium"
                    >
                      <Linkedin className="h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  </article>
                </FadeIn>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The wider bench */}
      <section className="bg-sand-light py-24 md:py-32 border-t border-navy/5">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="eyebrow text-navy-light mb-6">The wider bench</p>
              <h2 className="font-serif text-display-md text-navy leading-tight text-balance">
                Matched to a named specialist for your deal.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-5 text-body-lg text-navy-light leading-relaxed">
              <p>
                We keep the resident team deliberately small. That is how we guarantee senior-only delivery. But no
                three-person team can cover every sector and deal type that founders in the lower mid-market need.
              </p>
              <p>
                So we run a vetted bench - senior practitioners with deep expertise across financial services,
                technology, consumer, industrials, infrastructure, healthcare and more. At engagement we match you with
                either a resident partner or the right bench specialist for your transaction.
              </p>
              <p className="text-navy font-medium">
                Tech plus the right specialist. That is the equation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
