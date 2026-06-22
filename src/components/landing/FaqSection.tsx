import { Helmet } from 'react-helmet-async';
import type { FaqQA } from '../../content/landing';
import { FadeIn, Stagger, StaggerItem } from '../ui/motion';

interface Props {
  faqs: FaqQA[];
  heading?: string;
  eyebrow?: string;
}

// Renders the FAQ block and emits a FAQPage JSON-LD payload for AEO/SEO.
export function FaqSection({ faqs, heading = 'Frequently asked questions', eyebrow = 'FAQ' }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="bg-white py-20 md:py-24 border-t border-navy/5">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-navy-light mb-4">{eyebrow}</p>
            <h2 className="font-serif text-display-md text-navy leading-tight mb-12 text-balance">{heading}</h2>
          </FadeIn>
          <Stagger className="divide-y divide-navy/10 border-y border-navy/10">
            {faqs.map((f) => (
              <StaggerItem key={f.q}>
                <details className="group py-6">
                  <summary className="flex justify-between items-start gap-6 cursor-pointer list-none">
                    <h3 className="font-serif text-xl text-navy leading-snug">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="font-mono text-navy-light text-xl flex-shrink-0 group-open:rotate-45 transition-transform"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-body-lg text-navy-light leading-relaxed mt-4">{f.a}</p>
                </details>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
