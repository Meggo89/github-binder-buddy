import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Minus } from 'lucide-react';

export type FAQItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQ: FAQItem[] = [
  {
    question: 'How does AI actually change the advisory relationship?',
    answer:
      'Your day-to-day contact is still a senior advisor. In the background, a set of agents we have built ourselves (purpose-built for lower mid-market M&A, not off-the-shelf) handles the structured work: financial normalisation, buyer mapping, IM drafting, diligence tracking, term benchmarking. Work that used to take weeks of analyst time happens much faster, so senior time is spent on positioning, relationships and negotiation rather than production.',
  },
  {
    question: 'What size of business do you work with?',
    answer:
      'UK owner-managed SMEs with £5M–£50M turnover. Founder-led businesses, family-owned companies, and PE-backed firms seeking an exit or capital raise.',
  },
  {
    question: 'How long does a typical exit take?',
    answer:
      'Most exits run 6–12 months from engagement to completion, shorter than the traditional 9–18 month range - primarily because readiness gaps are surfaced earlier and IM production is faster. We recommend starting exit planning 12–24 months before target completion so remediation time is on your side.',
  },
  {
    question: 'How do you charge?',
    answer:
      'Fees are agreed upfront in our first conversation, tuned to your specific situation. Traditional advisors typically charge high monthly retainer fees that reflect the manual nature of how the work has always been done — and how most M&A firms still do it. Our delivery model is different.',
  },
  {
    question: 'Do I need my financials in perfect order before engaging?',
    answer:
      'No. Identifying and closing the gaps in your financial reporting is part of the engagement. We work with your accountants and advisors to get financials into the form acquirers expect.',
  },
  {
    question: 'Can you help with fundraising as well as exits?',
    answer:
      'Yes. We advise on seed, Series A, growth capital, and pre-exit funding. Many clients engage us first for a capital raise and return for exit advisory as the business matures.',
  },
];

interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  items = DEFAULT_FAQ,
  title = 'Founder questions we hear most often.',
  subtitle = 'Direct answers, no hedging.',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-sand-light py-24 md:py-32">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow text-navy-light mb-6">FAQ</p>
          <h2 className="font-serif text-display-md text-navy leading-tight mb-4 text-balance">{title}</h2>
          <p className="text-body-lg text-navy-light">{subtitle}</p>
        </div>
        <div className="max-w-3xl divide-y divide-navy/10 border-t border-b border-navy/10">
          {items.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="w-full flex items-start justify-between py-6 text-left gap-6 group"
                  aria-expanded={open}
                >
                  <span className="font-serif text-lg md:text-xl text-navy group-hover:text-accent-dark transition-colors">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-1 text-navy-light group-hover:text-accent-dark transition-colors">
                    {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    open ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-navy-light leading-relaxed pr-12">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
