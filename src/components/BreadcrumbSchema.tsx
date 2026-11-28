import { Helmet } from 'react-helmet-async';
import { canonicalFor } from '../seo/site-meta';

// BreadcrumbList JSON-LD for a page. Items run from the home page down to the page itself.
export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: canonicalFor(it.path) })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
