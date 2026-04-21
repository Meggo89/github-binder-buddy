import { Link } from 'react-router-dom';
import {
  BarChart3,
  Calculator,
  Handshake,
  Banknote,
  Users,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import { FAQSection } from '../components/FAQSection';
import { LeadMagnetForm } from '../components/forms/LeadMagnetForm';
import { useScrollTracking } from '../hooks/useScrollTracking';
import { trackCTA } from '../utils/trackCTA';
import francisMartin from '../assets/francis-martin.jpg';
import erikVynkier from '../assets/erik-vynkier.jpg';

const services = [
  {
    icon: <Calculator className="h-8 w-8 text-navy" />,
    title: 'Exit Planning',
    description: 'Strategic guidance to prepare your business for sale and maximise your exit value',
  },
  {
    icon: <Handshake className="h-8 w-8 text-navy" />,
    title: 'Deal Execution',
    description: 'End-to-end transaction management from buyer identification to deal closure',
  },
  {
    icon: <Banknote className="h-8 w-8 text-navy" />,
    title: 'Fundraising',
    description: 'Access to capital markets and strategic investors for growth before exit',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-navy" />,
    title: 'Valuation',
    description: 'Data-driven business valuations to help you understand your true worth',
  },
  {
    icon: <Users className="h-8 w-8 text-navy" />,
    title: 'Exit Team',
    description: 'Strategic leadership placement to strengthen your business before sale',
  },
];

const processPhases = [
  { step: '1', title: 'Assessment', description: 'We evaluate your exit readiness and establish your business valuation' },
  { step: '2', title: 'Strategy', description: 'We develop your exit strategy and identify the right buyers or investors' },
  { step: '3', title: 'Preparation', description: 'We prepare your documentation and position your business for sale' },
  { step: '4', title: 'Execution', description: 'We manage negotiations and close the deal on your terms' },
];

const teamPreview = [
  {
    name: 'Leo Meggitt',
    title: 'Managing Director',
    image: '/lovable-uploads/5a8b577b-26fe-4020-b9c9-cecef8f4f735.png',
    imagePosition: 'object-[center_30%]',
    description:
      '20+ years experience in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies.',
  },
  {
    name: 'Francis Martin CBE',
    title: 'Director',
    image: francisMartin,
    imagePosition: 'object-[center_35%]',
    description:
      'Distinguished advisor with 25+ years in strategic consulting. Former President of British Chambers of Commerce and recipient of Commander of the British Empire.',
  },
  {
    name: 'Erik Vynkier',
    title: 'Senior Advisor',
    image: erikVynkier,
    description:
      'Highly experienced in financial services, asset management and private equity. Has worked on deals across multiple sectors and geographies.',
  },
];

const testimonials = [
  {
    quote:
      'Mastella guided us through a complex exit process with professionalism and deep market knowledge. They secured a buyer who truly valued what we had built.',
    name: 'CEO',
    company: 'Financial Services Firm',
    context: 'Full sale, founder exit',
  },
  {
    quote:
      'Their fundraising expertise was exceptional. They connected us with the right investors and structured a round that gave us the capital to scale without excessive dilution.',
    name: 'Founder',
    company: 'Technology Company',
    context: 'Seed funding, £2m raised',
  },
  {
    quote:
      'What set Mastella apart was their ability to manage the entire process while keeping us focused on running the business. We felt supported at every stage.',
    name: 'Managing Director',
    company: 'Logistics Business',
    context: 'Majority sale to PE',
  },
];

function Hero() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Exit. Maximise Your Value.</h1>
      <p className="text-lg md:text-xl mb-8 text-sand-light">
        Strategic exit and M&amp;A advisory for founders building companies worth £5M to £50M. Expert guidance from first
        conversation to final signature.
      </p>
      <div className="flex flex-wrap gap-4 mb-12">
        <Link
          to="/contact"
          onClick={() => trackCTA('Book a Consultation', 'hero')}
          className="inline-block bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          Book a Consultation
        </Link>
        <Link
          to="/case-studies"
          onClick={() => trackCTA('View Our Work', 'hero')}
          className="inline-block border-2 border-sand text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
        >
          View Our Work
        </Link>
      </div>
      <div className="border-t border-sand/30 pt-8">
        <p className="text-sand-light text-sm mb-4">Trusted by founders across sectors</p>
        <div className="flex flex-wrap gap-8 items-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">£50M+</p>
            <p className="text-sand-light text-sm">Transactions Advised</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">20+</p>
            <p className="text-sand-light text-sm">Successful Exits</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-sand-light text-sm">Years Combined Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useScrollTracking();

  return (
    <PageLayout hero={<Hero />} mainClassName="">
      <SEO
        title="Exit Advisory & M&A for Growth Companies"
        description="Strategic exit and M&A advisory for founders building companies worth £5M to £50M. Expert guidance from first conversation to final signature."
        canonical="https://mastellagroup.com"
      />

      {/* Services preview */}
      <section id="services" className="py-20 bg-sand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">How We Help You Exit</h2>
            <p className="text-navy-light max-w-2xl mx-auto">
              From initial valuation to final signature, we guide founders through every stage of their exit journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-sand/30 hover:border-accent hover:-translate-y-1 group"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-navy">{service.title}</h3>
                <p className="text-navy-light">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              onClick={() => trackCTA('View All Services', 'services-section')}
              className="inline-block border-2 border-navy text-navy px-6 py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-all duration-200 hover:shadow-lg"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Your Exit Journey</h2>
            <p className="text-navy-light max-w-2xl mx-auto">
              A proven four-stage process that takes you from initial assessment to successful exit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processPhases.map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy">{phase.title}</h3>
                <p className="text-navy-light">{phase.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/process" className="text-navy-light hover:text-navy transition font-medium">
              Learn more about our process →
            </Link>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section id="team" className="py-20 bg-sand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Leadership Team</h2>
            <Link to="/team" className="text-navy-light hover:text-navy transition">
              Learn more about our team →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {teamPreview.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className={`w-full h-64 object-cover ${member.imagePosition || 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-navy">{member.name}</h3>
                    <p className="text-navy-light font-medium">{member.title}</p>
                  </div>
                  <p className="text-navy-light">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section id="lead-magnet" className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Download className="h-6 w-6 text-accent" />
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Free Download</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Exit Readiness Checklist</h2>
              <p className="text-sand-light mb-6">
                Are you ready to sell your business? Our comprehensive checklist covers the 25 critical areas every
                founder should address before going to market.
              </p>
              <ul className="space-y-2 text-sand-light text-sm mb-6">
                {[
                  'Financial preparation and reporting standards',
                  'Management team readiness and succession',
                  'Legal, IP, and compliance review',
                  'Valuation drivers and value enhancement tips',
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-80 bg-navy-light rounded-xl p-8">
              <LeadMagnetForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">What Our Clients Say</h2>
            <p className="text-navy-light max-w-2xl mx-auto">
              Founders and business owners share their experience of working with Mastella Advisory.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-sand-light rounded-xl p-8 relative">
                <div className="text-accent text-5xl font-serif leading-none mb-4">"</div>
                <p className="text-navy-light mb-6 italic">{testimonial.quote}</p>
                <div className="border-t border-sand pt-4">
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-navy-light text-sm">{testimonial.company}</p>
                  <p className="text-accent-dark text-xs mt-1">{testimonial.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />
    </PageLayout>
  );
}
