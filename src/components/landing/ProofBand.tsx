import { FadeIn } from '../ui/motion';

// Quantified proof band used across every landing page so the social proof
// reads consistently with the rest of the site (Home stats, Team stats,
// Case studies stats). Numbers are pulled once from here.
const PROOF_STATS = [
  { stat: '15+', label: 'Years in M&A' },
  { stat: '£400M+', label: 'Transaction value advised' },
  { stat: '30+', label: 'Completed transactions' },
  { stat: '10', label: 'Sectors' },
];

export function ProofBand() {
  return (
    <section className="bg-sand-light py-16 md:py-20 border-y border-navy/5">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {PROOF_STATS.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-navy mb-2 tracking-tight">{item.stat}</p>
                <p className="font-mono text-xs text-navy-light tracking-widest uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
