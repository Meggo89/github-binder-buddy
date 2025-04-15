import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
}

export function SEO({
  title = 'Mastella Advisory | M&A Excellence in the Lower Mid-Market',
  description = 'Expert M&A advisory services for SMEs, combining traditional expertise with innovative technology. Specialising in business exits, valuations, and strategic acquisitions across the UK.',
  canonical = 'https://mastellagroup.com',
  type = 'website',
  image = 'https://mastellagroup.com/og-image.jpg',
}: SEOProps) {
  const siteTitle = title.includes('Mastella Advisory') ? title : `${title} | Mastella Advisory`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mastella Advisory" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Mastella Advisory" />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="London" />
    </Helmet>
  );
}