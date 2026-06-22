import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type RelatedLink = { to: string; label: string; description?: string };

interface Props {
  heading?: string;
  links: RelatedLink[];
}

// Inline internal-link block used to surface 2–4 related niche / service /
// process pages from a landing page. Helps both human readers and SEO link
// equity flow within the new architecture.
export function RelatedLinks({ heading = 'Related pages', links }: Props) {
  if (!links.length) return null;
  return (
    <section className="py-14 border-t border-navy/5 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-6">{heading}</p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-navy/10 p-5 hover:border-accent/40 hover:shadow-md transition-all"
                >
                  <span>
                    <span className="block font-serif text-lg text-navy leading-snug">{l.label}</span>
                    {l.description && (
                      <span className="block text-sm text-navy-light leading-relaxed mt-1">{l.description}</span>
                    )}
                  </span>
                  <ArrowRight className="h-4 w-4 text-navy-light group-hover:text-accent-dark group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
