import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { articles } from '../content/insights';

function Hero() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">M&amp;A Insights &amp; Analysis</h1>
      <p className="text-lg md:text-xl mb-8 text-sand-light">
        Expert perspectives on mergers, acquisitions, and strategic business growth from our team of experienced advisors.
      </p>
    </div>
  );
}

export default function Insights() {
  return (
    <PageLayout hero={<Hero />}>
      <SEO
        title="M&A Insights & Analysis"
        description="Expert perspectives on mergers, acquisitions, business exits, and strategic growth from Mastella Advisory's team of experienced M&A advisors."
        canonical="https://mastellagroup.com/insights"
      />
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((post) => (
            <Link
              key={post.slug}
              to={`/insights/${post.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              aria-label={`Read article: ${post.title}`}
            >
              <article>
                <div className="relative h-48">
                  <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-sand text-navy px-3 py-1 rounded-full text-sm font-medium">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-navy mb-3">{post.title}</h2>
                  <p className="text-navy-light mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-navy-light">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
