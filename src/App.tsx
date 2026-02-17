import { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link } from 'react-router-dom';
import { BarChart3, Calculator, Handshake, Banknote, Menu, X, Users, Download, CheckCircle2, ChevronDown } from 'lucide-react';
import { SEO } from './components/SEO';
import About from './pages/About';
import Process from './pages/Process';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Insights from './pages/Insights';
import CaseStudies from './pages/CaseStudies';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ExecutiveSearch from './pages/ExecutiveSearch';
import { CookieConsent } from './components/CookieConsent';
import { useScrollTracking } from './hooks/useScrollTracking';
import { trackCTA } from './utils/trackCTA';
import mastellaLogo from './assets/mastella-logo.png';
import francisMartin from './assets/francis-martin.jpg';
import erikVynkier from './assets/erik-vynkier.jpg';
import londonSkyline from './assets/london-skyline.jpg';

function Footer() {
  return (
    <footer className="bg-navy-dark text-sand py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={mastellaLogo} alt="Mastella Advisory" className="h-32 w-auto" />
            </div>
            <p className="text-sm">
              Strategic exit and M&A advisory for founders building companies worth £5M to £50M.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-sand-light transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-sand-light transition">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-sand-light transition">Our Work</Link></li>
              <li><Link to="/team" className="hover:text-sand-light transition">Our Team</Link></li>
              <li><Link to="/insights" className="hover:text-sand-light transition">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>leo@mastellagroup.com</li>
              <li>+44 (0)20 7123 4567</li>
              <li>International House<br />101 King's Cross Rd<br />London, WC1X 9LP</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-sand-light transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-light mt-12 pt-8 text-sm text-center">
          © {new Date().getFullYear()} Mastella Advisory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function MobileNav({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu panel */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-navy-dark z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-sand transition p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 p-6 pt-4">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/services', label: 'Services' },
            { to: '/case-studies', label: 'Our Work' },
            { to: '/team', label: 'Team' },
            { to: '/insights', label: 'Insights' },
          ].map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              onClick={() => setIsOpen(false)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 w-full">
            <Link
              to="/contact"
              className="block w-full text-center bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Book a Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

function NavigationBar({ isMobile = false, onMobileMenuClick }: { isMobile?: boolean; onMobileMenuClick?: () => void }) {
  return (
    <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
      <Link to="/" className="flex items-center space-x-2">
        <img src={mastellaLogo} alt="Mastella Advisory" className="h-48 w-auto" />
      </Link>
      <div className="hidden md:flex space-x-8 items-center">
        <Link to="/about" className="hover:text-sand-light transition">About</Link>
        <Link to="/services" className="hover:text-sand-light transition">Services</Link>
        <Link to="/case-studies" className="hover:text-sand-light transition">Our Work</Link>
        <Link to="/team" className="hover:text-sand-light transition">Team</Link>
        <Link to="/insights" className="hover:text-sand-light transition">Insights</Link>
        <Link to="/contact" className="bg-accent text-navy px-4 py-2 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200">
          Contact Us
        </Link>
      </div>
      {isMobile && (
        <button
          className="md:hidden text-white"
          onClick={onMobileMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </nav>
  );
}

function LeadMagnetForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend/CRM
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-3" />
        <p className="text-white font-semibold mb-2">Thank you!</p>
        <p className="text-sand-light text-sm">Your checklist is on its way to your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-white font-semibold text-center mb-2">Get your free copy</p>
      <div>
        <label htmlFor="lead-name" className="sr-only">Your name</label>
        <input
          type="text"
          id="lead-name"
          placeholder="Your name"
          required
          className="w-full px-4 py-3 rounded-lg bg-navy border border-sand/30 text-white placeholder-sand-dark focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="lead-email" className="sr-only">Work email</label>
        <input
          type="email"
          id="lead-email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-navy border border-sand/30 text-white placeholder-sand-dark focus:outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200"
      >
        Download Checklist
      </button>
      <p className="text-sand-dark text-xs text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useScrollTracking();

  return (
    <div className="min-h-screen bg-white page-enter">
      <SEO
        title="Exit Advisory & M&A for Growth Companies"
        description="Strategic exit and M&A advisory for founders building companies worth £5M to £50M. Expert guidance from first conversation to final signature."
        canonical="https://mastellagroup.com"
      />
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-navy/50 z-10"></div>
          <img
            src={londonSkyline}
            alt="London skyline"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <NavigationBar isMobile={true} onMobileMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <div className="container mx-auto px-6 py-16 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Plan Your Exit. Maximise Your Value.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-sand-light">
              Strategic exit and M&A advisory for founders building companies worth £5M to £50M. Expert guidance from first conversation to final signature.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/contact" onClick={() => trackCTA('Book a Consultation', 'hero')} className="inline-block bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                Book a Consultation
              </Link>
              <Link to="/case-studies" onClick={() => trackCTA('View Our Work', 'hero')} className="inline-block border-2 border-sand text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200">
                View Our Work
              </Link>
            </div>

            {/* Trust Badges */}
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
        </div>
      </header>

      <main id="main-content">
      {/* Services Preview Section */}
      <section id="services" className="py-20 bg-sand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">How We Help You Exit</h2>
            <p className="text-navy-light max-w-2xl mx-auto">
              From initial valuation to final signature, we guide founders through every stage of their exit journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: <Calculator className="h-8 w-8 text-navy" />,
                title: "Exit Planning",
                description: "Strategic guidance to prepare your business for sale and maximise your exit value"
              },
              {
                icon: <Handshake className="h-8 w-8 text-navy" />,
                title: "Deal Execution",
                description: "End-to-end transaction management from buyer identification to deal closure"
              },
              {
                icon: <Banknote className="h-8 w-8 text-navy" />,
                title: "Fundraising",
                description: "Access to capital markets and strategic investors for growth before exit"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-navy" />,
                title: "Valuation",
                description: "Data-driven business valuations to help you understand your true worth"
              },
              {
                icon: <Users className="h-8 w-8 text-navy" />,
                title: "Exit Team",
                description: "Strategic leadership placement to strengthen your business before sale"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-sand/30 hover:border-accent hover:-translate-y-1 group">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-navy">{service.title}</h3>
                <p className="text-navy-light">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" onClick={() => trackCTA('View All Services', 'services-section')} className="inline-block border-2 border-navy text-navy px-6 py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-all duration-200 hover:shadow-lg">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Your Exit Journey</h2>
            <p className="text-navy-light max-w-2xl mx-auto">
              A proven four-stage process that takes you from initial assessment to successful exit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Assessment",
                description: "We evaluate your exit readiness and establish your business valuation"
              },
              {
                step: "2",
                title: "Strategy",
                description: "We develop your exit strategy and identify the right buyers or investors"
              },
              {
                step: "3",
                title: "Preparation",
                description: "We prepare your documentation and position your business for sale"
              },
              {
                step: "4",
                title: "Execution",
                description: "We manage negotiations and close the deal on your terms"
              }
            ].map((phase, index) => (
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

      {/* Team Section */}
      <section id="team" className="py-20 bg-sand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Leadership Team</h2>
            <Link to="/team" className="text-navy-light hover:text-navy transition">
              Learn more about our team →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                name: "Leo Meggitt",
                title: "Managing Director",
                image: "/lovable-uploads/5a8b577b-26fe-4020-b9c9-cecef8f4f735.png",
                imagePosition: "object-[center_30%]",
                description: "20+ years experience in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies."
              },
              {
                name: "Francis Martin CBE",
                title: "Director",
                image: francisMartin,
                imagePosition: "object-[center_35%]",
                description: "Distinguished advisor with 25+ years in strategic consulting. Former President of British Chambers of Commerce and recipient of Commander of the British Empire."
              },
              {
                name: "Erik Vynkier",
                title: "Senior Advisor",
                image: erikVynkier,
                description: "Highly experienced in financial services, asset management and private equity. Has worked on deals across multiple sectors and geographies."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
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

      {/* Lead Magnet Section */}
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
                Are you ready to sell your business? Our comprehensive checklist covers the 25 critical areas every founder should address before going to market.
              </p>
              <ul className="space-y-2 text-sand-light text-sm mb-6">
                {[
                  "Financial preparation and reporting standards",
                  "Management team readiness and succession",
                  "Legal, IP, and compliance review",
                  "Valuation drivers and value enhancement tips",
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">What Our Clients Say</h2>
            <p className="text-navy-light max-w-2xl mx-auto">
              Founders and business owners share their experience of working with Mastella Advisory.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Mastella guided us through a complex exit process with professionalism and deep market knowledge. They secured a buyer who truly valued what we had built.",
                name: "CEO",
                company: "Financial Services Firm",
                context: "Full sale, founder exit"
              },
              {
                quote: "Their fundraising expertise was exceptional. They connected us with the right investors and structured a round that gave us the capital to scale without excessive dilution.",
                name: "Founder",
                company: "Technology Company",
                context: "Seed funding, £2m raised"
              },
              {
                quote: "What set Mastella apart was their ability to manage the entire process while keeping us focused on running the business. We felt supported at every stage.",
                name: "Managing Director",
                company: "Logistics Business",
                context: "Majority sale to PE"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-sand-light rounded-xl p-8 relative">
                <div className="text-accent text-5xl font-serif leading-none mb-4">"</div>
                <p className="text-navy-light mb-6 italic">
                  {testimonial.quote}
                </p>
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

      {/* FAQ Section */}
      <FAQSection />
      </main>

      <Footer />

      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </div>
  );
}

const faqData = [
  {
    question: "How long does a typical business exit take?",
    answer: "Most exits take between 6 and 18 months from initial preparation to completion. The timeline depends on the complexity of the business, market conditions, and the type of transaction. We recommend founders begin planning at least 12 to 24 months before their target exit date."
  },
  {
    question: "What size of business do you work with?",
    answer: "We specialise in small to medium enterprises with revenues between £2m and £50m, or valuations in the £5m to £50m range. This includes founder-led businesses, family-owned companies, and PE-backed firms seeking an exit or capital raise."
  },
  {
    question: "How do you charge for your services?",
    answer: "Our fee structure typically combines a modest retainer with a success fee tied to the completion of the transaction. This aligns our incentives with yours and means the majority of our compensation is contingent on achieving a successful outcome."
  },
  {
    question: "Do I need to have my financials in perfect order before engaging you?",
    answer: "No. Part of our exit planning process involves identifying gaps in your financial reporting and helping you address them. We work with your accountants and advisors to ensure your financials are presented in the best possible light for potential buyers or investors."
  },
  {
    question: "What makes Mastella different from other M&A advisors?",
    answer: "We combine deep sector expertise with a founder-first approach. Our team has over 50 years of combined experience, and we work exclusively in the lower mid-market where we understand the personal and professional dynamics of owner-managed businesses. We are hands-on, accessible, and committed to achieving the best outcome for each client."
  },
  {
    question: "Can you help with fundraising as well as exits?",
    answer: "Yes. We advise on seed rounds, Series A, growth capital, and pre-exit funding. Many of our clients engage us initially for a capital raise and later return for exit advisory as their business matures."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-sand-light">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
          <p className="text-navy-light max-w-2xl mx-auto">
            Common questions from founders considering an exit or capital raise.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-sand overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
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

function App() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-accent focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold">
        Skip to main content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/team" element={<Team />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/executive-search" element={<ExecutiveSearch />} />
      </Routes>
      <CookieConsent />
    </>
  );
}

export default App;
