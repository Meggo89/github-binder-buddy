import { ArrowLeft, Calculator, Handshake, BarChart3, Banknote, Users, Target, Briefcase, UserSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

const coreServices = [
  {
    icon: <Calculator className="h-8 w-8 text-navy" />,
    title: 'M&A Advisory',
    description: 'Comprehensive guidance through the entire M&A process, from valuation to deal closure.',
    features: ['Business valuation', 'Market analysis', 'Deal structuring', 'Negotiation support'],
  },
  {
    icon: <Handshake className="h-8 w-8 text-navy" />,
    title: 'Deal Structuring',
    description: 'Strategic deal structuring to maximise value and optimise transaction terms.',
    features: ['Tax-efficient structures', 'Risk mitigation', 'Terms optimization', 'Regulatory compliance'],
  },
  {
    icon: <Banknote className="h-8 w-8 text-navy" />,
    title: 'Fundraising',
    description: 'Access to capital markets and strategic investors for growth and expansion.',
    features: ['Equity financing', 'Debt financing', 'Investor matching', 'Pitch preparation'],
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-navy" />,
    title: 'Technology Integration',
    description: 'Advanced M&A tools and analytics to streamline the transaction process.',
    features: ['Data analytics', 'Process automation', 'Digital due diligence', 'Real-time reporting'],
  },
  {
    icon: <UserSearch className="h-8 w-8 text-navy" />,
    title: 'Executive Search & Interim Solutions',
    description: 'Strategic leadership placement and interim management for companies pre and post exit.',
    features: ['C-suite recruitment', 'Interim management', 'Pre-exit leadership', 'Post-exit integration'],
  },
];

const supportingServices = [
  {
    icon: <Target className="h-8 w-8 text-navy" />,
    title: 'Strategic Planning',
    description: 'Development of comprehensive M&A strategies aligned with your business objectives.',
  },
  {
    icon: <Users className="h-8 w-8 text-navy" />,
    title: 'Post-Merger Integration',
    description: 'Expert guidance for smooth integration and synergy realization after the deal.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-navy" />,
    title: 'Transaction Support',
    description: 'Full-service support throughout the entire transaction lifecycle.',
  },
];

export default function Services() {
  return (
    <PageLayout>
      <SEO
        title="Our Services - M&A Advisory, Fundraising & Valuations"
        description="End-to-end M&A advisory, fundraising, business valuations, deal structuring, and executive search services tailored for SMEs across the UK."
        canonical="https://mastellagroup.com/services"
      />
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-navy mb-12">Our Services</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-4">Comprehensive M&amp;A Solutions</h2>
            <p className="text-navy-light mb-6">
              We provide end-to-end M&amp;A advisory services tailored for small to medium-sized enterprises. Our approach combines traditional expertise with innovative technology to deliver optimal outcomes for our clients.
            </p>
            <p className="text-navy-light">
              Each service is delivered by our experienced team of professionals, ensuring the highest quality of execution and attention to detail throughout the entire process.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition inline-block">
                Schedule a Consultation
              </Link>
            </div>
          </div>

          <div className="bg-sand-light p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-navy mb-4">Why Choose Our Services</h2>
            <ul className="space-y-4">
              {['Tailored solutions for SMEs', 'Technology-driven approach', 'Experienced advisory team', 'Proven track record'].map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {coreServices.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4 mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
              </div>
              <p className="text-navy-light mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sand rounded-full"></div>
                    <span className="text-navy-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {supportingServices.map((service, index) => (
            <div key={index} className="bg-sand-light p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                {service.icon}
                <h3 className="text-lg font-semibold text-navy">{service.title}</h3>
              </div>
              <p className="text-navy-light">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
