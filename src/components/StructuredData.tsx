import { Helmet } from 'react-helmet-async';

type JsonLd = Record<string, unknown>;

interface Props {
  data: JsonLd | JsonLd[];
}

// Thin wrapper that injects a JSON-LD <script> via react-helmet-async.
// Accepts either a single schema object or an array (rendered as one @graph).
export function StructuredData({ data }: Props) {
  const body = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(body)}</script>
    </Helmet>
  );
}
