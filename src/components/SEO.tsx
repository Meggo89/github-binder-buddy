import { Helmet } from 'react-helmet-async';
import { SITE, fullTitle } from '../seo/site-meta';
import { markdownPathFor } from '../seo/markdown';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  // Use `title` exactly as given, without the " | Mastella Advisory" suffix.
  exactTitle?: boolean;
  // Named author for articles; defaults to the firm.
  author?: string;
}

export function SEO({
  title = SITE.defaultTitle,
  description = SITE.defaultDescription,
  canonical = SITE.domain,
  type = 'website',
  image = SITE.defaultOgImage,
  exactTitle = false,
  author = SITE.name,
}: SEOProps) {
  const siteTitle = exactTitle ? title : fullTitle(title);
  const markdownPath = markdownPathFor(canonical);

  return (
    <Helmet>
      {/* Basic */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {markdownPath && <link rel="alternate" type="text/markdown" href={`${SITE.domain}${markdownPath}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional */}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="London" />
    </Helmet>
  );
}
