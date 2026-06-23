import type { ResourceLanding } from "./types";

export const RESOURCES: ResourceLanding[] = [
  {
    slug: "business-broker-vs-m-a-advisor",
    name: "Business broker vs M&A advisor",
    title: "Business Broker vs M&A Advisor: What's the Difference?",
    metaDescription:
      "Business broker or M&A advisor? Senior-led explainer for UK owners worth £5–50M. Models, fees, buyer pools and outcomes compared honestly.",
    h1: "Business broker vs M&A advisor: what is the difference?",
    intro:
      "Two very different models, often confused. Which one fits depends almost entirely on what your business is worth — and the gap in outcomes is bigger than most owners realise.",
    faqs: [
      {
        q: "What is the headline difference between a broker and an M&A advisor?",
        a: "Brokers run database-driven listings. They post your business (anonymised) on broker networks, take incoming enquiries, and earn a commission on completion. M&A advisors run off-market processes — direct approaches to a curated list of strategic and PE buyers under NDA, with active management of competitive dynamics. The two models attract different buyer pools and produce different outcomes.",
      },
      {
        q: "Which model is right for my business?",
        a: "A simple rule of thumb: businesses worth under £2–3M are typically best served by a broker. Businesses worth £5M+ are typically best served by an M&A advisor. Between £3–5M the answer depends on sector, growth profile and the buyer pool likely to engage.",
      },
      {
        q: "How do the fee models compare?",
        a: "Brokers typically charge a small upfront fee plus a back-end commission (3–10% of deal value, often with tiered scales). M&A advisors typically charge a higher monthly retainer plus a performance fee. The retainer funds genuinely senior-led work; the commission model in broker firms typically funds junior delivery.",
      },
      {
        q: "Will more buyers see my business with a broker?",
        a: "Often more enquiries — but from a smaller and lower-quality buyer pool (smaller acquirers, search-fund hopefuls, time-wasters). An M&A advisor will typically contact a smaller number of buyers (40–80) but each one is curated for genuine fit and capability.",
      },
      {
        q: "How does confidentiality differ between the two models?",
        a: "Broker listings are anonymised, but enough detail typically appears (sector, location, revenue band) that staff or competitors can sometimes identify the business. Off-market M&A advisor processes contact buyers individually under NDA — no public listing, far stronger confidentiality.",
      },
      {
        q: "Why do M&A advisor outcomes typically come out higher?",
        a: "Curated buyer pools (often including strategic acquirers brokers do not reach), competitive process management, senior-led negotiation, and properly structured deal terms (working capital, indemnity caps, earn-out mechanics). The headline price difference is often material, and the structuring difference often matters more.",
      },
    ],
    contentTodos: [
      {
        heading: "When a broker is the right choice",
        cover: ["Honest framing of where brokers add genuine value"],
        body: [
          "There is a real and valuable role for business brokers. The honest version: at the lower end of the UK SME market, a quality broker network typically serves owners better than a senior-led M&A firm can or will. This is not a hedge — it is a structural observation about how each model works economically.",
          "Brokers serve businesses worth roughly £200,000 to £3M well. At that scale, the buyer pool is typically owner-operator individuals, smaller acquirers, search-fund principals, and family operators looking for a lifestyle or platform business. Reaching this pool requires breadth — broker listings on the established networks (BusinessesForSale, Daltons, the regional broker websites) are the right channel. The commission model works at that scale because deal values are small enough that a 5-10% commission on completion produces enough fee to fund the broker's work.",
          "Brokers also serve well for highly time-sensitive sales where the owner needs liquidity quickly and is willing to accept a wide buyer pool, including buyers willing to pay below where a structured process might land. Distressed sales, retirement-driven sales with health constraints, and tax-driven sales sometimes fit this profile.",
          "A good broker at this end of the market knows their buyer database, manages the listing thoughtfully, structures the deal reasonably, and gets the transaction across the line in three to nine months. There is genuine value here and we will happily refer owners to brokers we trust where that fits the situation better than what Mastella offers.",
        ],
      },
      {
        heading: "When an M&A advisor is the right choice",
        cover: [
          "Off-market process explanation",
          "Buyer pool quality",
          "Structuring depth",
        ],
        body: [
          "M&A advisors serve businesses worth roughly £5M to £100M+ in enterprise value. The buyer pool at this scale is different and reachable through different channels. Three structural differences matter.",
          "The buyer pool. At £5M+ EV, the buyers who pay properly are typically PE-backed consolidators executing buy-and-build strategies, larger strategic acquirers seeking capability or geographic expansion, and (for larger deals) direct PE houses pursuing platform investments. Few of these buyers source from broker listings. They source from advisor relationships, sector data, market intelligence, and direct approaches under NDA. The broker network simply does not reach them. We typically contact 40 to 80 curated buyers across these pools for a sell-side mandate, each individually under NDA, with structured competitive process management thereafter.",
          "The competitive process. Brokers manage incoming enquiries; M&A advisors manage outgoing competitive dynamics. The difference matters substantially. A genuine competitive process — multiple interested buyers, structured bidding, disciplined exclusivity granted at the right point — consistently produces materially better outcomes than the strongest single bilateral negotiation. The headline price difference is typically meaningful and the structuring difference (working capital mechanism, earn-out terms, indemnity caps) is often larger than the headline.",
          "Structuring depth. At the £5M+ level the structuring of the deal is comparable in commercial importance to the headline price. Tax structuring (often started 12 months before sale), earn-out design, working capital normalisation, completion accounts mechanics, indemnity caps, restrictive covenants — each can materially affect realised net proceeds. M&A advisors at this scale do structuring as core work; brokers typically rely on the lawyers to handle structuring after a broker has agreed a headline price, which is the wrong sequence.",
          "Off-market process means we do not list your business on broker networks or M&A databases. We approach the curated buyer list directly under NDA. For owner-managed businesses where staff, customers and competitors are typically reachable through the same trade channels, this is the only credible way to run a genuinely confidential process.",
        ],
      },
      {
        heading: "What to ask any advisor before signing a mandate",
        cover: [
          "Who actually does the work",
          "How buyers are identified",
          "Fee structure",
          "Past transactions in your sector",
        ],
        body: [
          "Whether you are choosing between brokers, between M&A advisors, or between the two models, the questions below separate firms that match what they pitch from firms that do not. We would expect any owner to ask these questions, and we would be straight in answering them ourselves.",
          "Who will actually do the work? Not who is in the meeting today — who is in every meeting through the mandate. In the traditional UK lower mid-market M&A firm, senior advisors win mandates and then delegate substantive delivery to junior teams. If the firm cannot tell you which named senior person will be in every buyer meeting, and run every negotiation conversation, the model is not what is being sold. Ask explicitly.",
          "How will buyers be identified? Database listings (broker model). Database search and outreach to known buyers (mid-tier advisor model). Curated buyer mapping with proprietary market intelligence supported by direct senior-led approach under NDA (senior-led advisor model). The three produce very different outcomes. Ask which model the firm is going to run for your specific business and what their proprietary buyer mapping looks like.",
          "How are fees structured? Fully understand the fee structure, including upfront, monthly retainer, success fee, work fees, expenses, and any minimum charges. A commission-only structure economically pushes firms to take any deal that closes — even at a price below what a structured process would produce — because the commission is what funds the work. A retainer-led structure aligns the advisor to running the process properly through to the best deal, not just the quickest one.",
          "What past transactions have you run in this sector? Specific completed transactions, not generic capability slides. If the firm cannot point to recent completed work in your sector or in directly adjacent sectors, the sector knowledge that drives buyer mapping, diligence anticipation, and structuring decisions may not be there.",
          "What are the three to five things that consistently move outcomes in this sector? A good test of sector knowledge. A senior advisor who actually works in the sector should be able to answer this in concrete terms within two minutes. A generalist firm will give you generic process language.",
        ],
      },
      {
        heading: "Mastella's model",
        cover: [
          "Senior-led delivery",
          "Off-market by default",
          "High monthly retainer rationale",
        ],
        body: [
          "We are an M&A advisor, not a broker. Mastella is structured around three things that distinguish our model from both the broker model and the traditional UK lower mid-market M&A advisor model.",
          "Senior-led delivery. Every conversation that matters runs through the principal (Leo Meggitt). Buyer mapping, financial normalisation, IM drafting, the negotiation, completion mechanics — none of these are delegated. A small in-house team and a proprietary technology layer for surfacing acquirer signals from licensed market data support the senior delivery rather than substitute for it.",
          "Off-market by default. We do not list businesses on broker networks or M&A databases. Every sell-side mandate runs as a structured approach to a curated list of strategic and PE buyers individually under NDA. For owner-managed businesses where confidentiality is commercially important — which is almost always — this is the only credible model.",
          "High monthly retainer rationale. We work on a high monthly retainer model. The retainer funds genuinely senior time across the mandate and economically supports a model where junior delivery is not necessary to make the unit economics work. We share the full fee structure transparently in the first conversation. The structure is aligned to deliver owner outcomes, not commission on any deal that closes.",
          "We work with UK businesses worth £5M to £50M in enterprise value across six sectors: [business services](/sectors/business-services/), [healthcare services](/sectors/healthcare-services/), [light industrials](/sectors/light-industrials/), [logistics and distribution](/sectors/logistics-and-distribution/), [professional services](/sectors/professional-services/), and [tech-enabled services](/sectors/tech-enabled-services/). For businesses below £5M EV we will happily refer you to a small set of brokers we trust rather than take a mandate that is not the right fit.",
          "If you are weighing up which model fits your situation, [book a confidential conversation](/contact/). Forty-five minutes, no obligation. We will be straight about whether what you want to achieve fits Mastella's model or fits a different one — and either way you will leave with a clearer view of how to think about it.",
        ],
      },
    ],
  },
];

export const RESOURCES_BY_SLUG = new Map(RESOURCES.map((r) => [r.slug, r]));

export function getResource(slug: string): ResourceLanding | undefined {
  return RESOURCES_BY_SLUG.get(slug);
}
