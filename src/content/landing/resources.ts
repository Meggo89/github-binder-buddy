import type { ResourceLanding } from './types';

export const RESOURCES: ResourceLanding[] = [
  {
    slug: 'business-broker-vs-m-a-advisor',
    name: 'Business broker vs M&A advisor',
    title: 'Business Broker vs M&A Advisor: What\'s the Difference?',
    metaDescription:
      'Business broker or M&A advisor? Senior-led explainer for UK owners worth £5–50M. Models, fees, buyer pools and outcomes compared honestly.',
    h1: 'Business broker vs M&A advisor: what is the difference?',
    intro:
      'Two very different models, often confused. Which one fits depends almost entirely on what your business is worth — and the gap in outcomes is bigger than most owners realise.',
    faqs: [
      {
        q: 'What is the headline difference between a broker and an M&A advisor?',
        a: 'Brokers run database-driven listings. They post your business (anonymised) on broker networks, take incoming enquiries, and earn a commission on completion. M&A advisors run off-market processes — direct approaches to a curated list of strategic and PE buyers under NDA, with active management of competitive dynamics. The two models attract different buyer pools and produce different outcomes.',
      },
      {
        q: 'Which model is right for my business?',
        a: 'A simple rule of thumb: businesses worth under £2–3M are typically best served by a broker. Businesses worth £5M+ are typically best served by an M&A advisor. Between £3–5M the answer depends on sector, growth profile and the buyer pool likely to engage.',
      },
      {
        q: 'How do the fee models compare?',
        a: 'Brokers typically charge a small upfront fee plus a back-end commission (3–10% of deal value, often with tiered scales). M&A advisors typically charge a higher monthly retainer plus a performance fee. The retainer funds genuinely senior-led work; the commission model in broker firms typically funds junior delivery.',
      },
      {
        q: 'Will more buyers see my business with a broker?',
        a: 'Often more enquiries — but from a smaller and lower-quality buyer pool (smaller acquirers, search-fund hopefuls, time-wasters). An M&A advisor will typically contact a smaller number of buyers (40–80) but each one is curated for genuine fit and capability.',
      },
      {
        q: 'How does confidentiality differ between the two models?',
        a: 'Broker listings are anonymised, but enough detail typically appears (sector, location, revenue band) that staff or competitors can sometimes identify the business. Off-market M&A advisor processes contact buyers individually under NDA — no public listing, far stronger confidentiality.',
      },
      {
        q: 'Why do M&A advisor outcomes typically come out higher?',
        a: 'Curated buyer pools (often including strategic acquirers brokers do not reach), competitive process management, senior-led negotiation, and properly structured deal terms (working capital, indemnity caps, earn-out mechanics). The headline price difference is often material, and the structuring difference often matters more.',
      },
    ],
    contentTodos: [
      { heading: 'When a broker is the right choice', cover: ['Honest framing of where brokers add genuine value'] },
      { heading: 'When an M&A advisor is the right choice', cover: ['Off-market process explanation', 'Buyer pool quality', 'Structuring depth'] },
      { heading: 'What to ask any advisor before signing a mandate', cover: ['Who actually does the work', 'How buyers are identified', 'Fee structure', 'Past transactions in your sector'] },
      { heading: 'Mastella\'s model', cover: ['Senior-led delivery', 'Off-market by default', 'High monthly retainer rationale'] },
    ],
  },
];

export const RESOURCES_BY_SLUG = new Map(RESOURCES.map((r) => [r.slug, r]));

export function getResource(slug: string): ResourceLanding | undefined {
  return RESOURCES_BY_SLUG.get(slug);
}
