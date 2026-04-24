import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FadeIn, Stagger, StaggerItem } from '../components/ui/motion';
import { articles } from '../content/insights';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Insights</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        Perspectives on M&amp;A, fundraising and the AI era.
      </h1>
      <p className="text-body-lg text-sand-light max-w-2xl leading-relaxed">
        Long-form analysis and field notes from the team. Written for founders, not other advisors.
      </p>
    </div>
  );
}

export default function Insights() {
  const [featured, ...rest] = articles;

  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Insights - M&A Perspectives for UK SME Owners"
        description="Long-form analysis on exits, fundraising and valuation for UK SME owners. Written by the Mastella team for founders, not other advisors."
        canonical="https://mastellagroup.com/insights"
      />

      {/* Featured article */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <Link
              to={`/insights/${featured.slug}`}
              className="group block max-w-6xl mx-auto"
            >
              <p className="eyebrow text-navy-light mb-6">Latest</p>
              <div className="grid md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-7 overflow-hidden rounded-xl aspect-[16/10]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-5">
                  <span className="inline-block bg-accent/10 text-accent-dark px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-5">
                    {featured.category}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight mb-5 text-balance group-hover:text-accent-dark transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-body-md text-navy-light leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-sm text-navy-light">
                    <span>{featured.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                  </div>
                  <p className="inline-flex items-center gap-2 text-navy font-medium mt-6 group-hover:text-accent-dark transition-colors">
                    Read the piece
                    <ArrowUpRight className="h-4 w-4" />
                  </p>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Rest of the grid */}
      <section className="bg-sand-light py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-6xl mx-auto mb-12">
              <p className="eyebrow text-navy-light">More writing</p>
            </div>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  to={`/insights/${post.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-navy/10 hover:border-accent/40 hover:shadow-xl transition-all duration-300"
                >
                  <article>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block text-xs font-mono tracking-widest uppercase text-accent-dark mb-4">
                        {post.category}
                      </span>
                      <h3 className="font-serif text-xl text-navy mb-3 leading-snug group-hover:text-accent-dark transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-navy-light leading-relaxed mb-5">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-navy-light">
                        <span>{post.author}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </PageLayout>
  );
}
