import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { getArticle } from '../content/insights';

export default function InsightArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const canonical = `https://mastellagroup.com/insights/${article.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Mastella Advisory',
      url: 'https://mastellagroup.com',
    },
    datePublished: article.date,
    articleSection: article.category,
  };

  return (
    <PageLayout>
      <SEO title={article.title} description={article.excerpt} canonical={canonical} type="article" image={article.image} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-6">
        <Link to="/insights" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Insights
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img src={article.image} alt={article.title} loading="lazy" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="flex items-center justify-between text-sm text-navy-light mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {article.date}
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime}
            </div>
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </div>
    </PageLayout>
  );
}
