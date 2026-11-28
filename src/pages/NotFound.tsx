import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

// Served by Netlify as /404.html, with a 404 status, for any URL that is not a page on the site.
// Unknown insight, sector, service and resource slugs render this too.
const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/insights/sector-reports/', label: 'Sector reports' },
  { to: '/insights/', label: 'Insights' },
  { to: '/contact/', label: 'Contact' },
];

function Hero() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-6 text-balance">Page not found</h1>
      <p className="text-lg text-sand-light leading-relaxed">This page does not exist or has moved.</p>
    </div>
  );
}

export default function NotFound() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid">
      <SEO title="Page not found" description="This page does not exist or has moved." noindex />
      <div className="container mx-auto px-6">
        <ul className="max-w-3xl space-y-4">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent-dark transition-colors">
                {l.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
