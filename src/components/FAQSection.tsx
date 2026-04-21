import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';

export type FAQItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQ: FAQItem[] = [
  {
    question: 'How long does a typical business exit take?',
    answer:
      'Most exits take between 6 and 18 months from initial preparation to completion. The timeline depends on the complexity of the business, market conditions, and the type of transaction. We recommend founders begin planning at least 12 to 24 months before their target exit date.',
  },
  {
    question: 'What size of business do you work with?',
    answer:
      'We specialise in small to medium enterprises with revenues between £2m and £50m, or valuations in the £5m to £50m range. This includes founder-led businesses, family-owned companies, and PE-backed firms seeking an exit or capital raise.',
  },
  {
    question: 'How do you charge for your services?',
    answer:
      'Our fee structure typically combines a modest retainer with a success fee tied to the completion of the transaction. This aligns our incentives with yours and means the majority of our compensation is contingent on achieving a successful outcome.',
  },
  {
    question: 'Do I need to have my financials in perfect order before engaging you?',
    answer:
      'No. Part of our exit planning process involves identifying gaps in your financial reporting and helping you address them. We work with your accountants and advisors to ensure your financials are presented in the best possible light for potential buyers or investors.',
  },
  {
    question: 'What makes Mastella different from other M&A advisors?',
    answer:
      'We combine deep sector expertise with a founder-first approach. Our team has over 50 years of combined experience, and we work exclusively in the lower mid-market where we understand the personal and professional dynamics of owner-managed businesses. We are hands-on, accessible, and committed to achieving the best outcome for each client.',
  },
  {
    question: 'Can you help with fundraising as well as exits?',
    answer:
      'Yes. We advise on seed rounds, Series A, growth capital, and pre-exit funding. Many of our clients engage us initially for a capital raise and later return for exit advisory as their business matures.',
  },
];

interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  items = DEFAULT_FAQ,
  title = 'Frequently Asked Questions',
  subtitle = 'Common questions from founders considering an exit or capital raise.',
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
    <section id="faq" className="py-20 bg-sand-light">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">{title}</h2>
          <p className="text-navy-light max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-sand overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-navy pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-navy-light flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="px-6 text-navy-light">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
