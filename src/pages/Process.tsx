import { ArrowLeft, Calculator, LineChart, FileText, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

const phases = [
  {
    icon: <Calculator className="h-12 w-12 text-navy" />,
    step: '1',
    title: 'Initial Assessment',
    description:
      'We begin with a comprehensive evaluation of your business, including financial analysis, market positioning, and growth potential. This phase establishes the foundation for a successful M&A strategy.',
    details: ['Business valuation', 'Market analysis', 'Growth potential assessment', 'Risk evaluation'],
  },
  {
    icon: <LineChart className="h-12 w-12 text-navy" />,
    step: '2',
    title: 'Strategy Development',
    description:
      'Based on the initial assessment, we develop a tailored M&A strategy that aligns with your objectives. This includes identifying potential buyers or investors and creating a compelling value proposition.',
    details: ['Target market identification', 'Buyer profiling', 'Value proposition development', 'Transaction timeline planning'],
  },
  {
    icon: <FileText className="h-12 w-12 text-navy" />,
    step: '3',
    title: 'Deal Preparation',
    description:
      "We prepare comprehensive documentation and optimise your company's presentation to potential buyers. This phase ensures you're fully prepared for due diligence and negotiations.",
    details: ['Information memorandum creation', 'Due diligence preparation', 'Financial modeling', 'Management presentation development'],
  },
  {
    icon: <Handshake className="h-12 w-12 text-navy" />,
    step: '4',
    title: 'Transaction Execution',
    description:
      'Our team manages the entire transaction process, from initial buyer outreach to final closing. We ensure optimal terms and conditions while maintaining confidentiality throughout.',
    details: ['Buyer negotiations', 'Due diligence management', 'Deal structuring', 'Transaction closing'],
  },
];

export default function Process() {
  return (
    <PageLayout>
      <SEO
        title="Our M&A Process - From Assessment to Completion"
        description="A proven four-stage M&A process: initial assessment, strategy development, deal preparation, and transaction execution. Maximise value while minimising risk."
        canonical="https://mastellagroup.com/process"
      />
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-navy mb-12">Our M&amp;A Process</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-4">Strategic Approach to M&amp;A</h2>
            <p className="text-navy-light mb-6">
              Our comprehensive M&amp;A process is designed to maximise value while minimising risks for our clients. We combine traditional advisory expertise with cutting-edge technology to ensure efficient and successful transactions.
            </p>
            <p className="text-navy-light">
              Each step is carefully managed by our experienced team, ensuring thorough evaluation, strategic positioning, and optimal execution of your M&amp;A transaction.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition inline-block">
                Discuss Your Project
              </Link>
            </div>
          </div>

          <div className="bg-sand-light p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-navy mb-4">Key Benefits</h2>
            <ul className="space-y-4">
              {[
                'Comprehensive valuation and market analysis',
                'Strategic buyer identification and matching',
                'Efficient due diligence process',
                'Expert negotiation support',
              ].map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-16">
          {phases.map((phase, index) => (
            <div key={index} className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-12 h-12 bg-sand-light rounded-full flex items-center justify-center text-navy font-bold text-xl">
                  {phase.step}
                </div>
              </div>
              <div className="md:col-span-11 bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center space-x-4 mb-4">
                  {phase.icon}
                  <h3 className="text-2xl font-semibold text-navy">{phase.title}</h3>
                </div>
                <p className="text-navy-light mb-6">{phase.description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {phase.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-sand rounded-full"></div>
                      <span className="text-navy-light">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
