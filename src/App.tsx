import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BarChart3, Calculator, Handshake, Banknote, Menu, X } from 'lucide-react';
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
import mastellaLogo from './assets/mastella-logo.png';
import francisMartin from './assets/francis-martin.jpg';
import erikVynkier from './assets/erik-vynkier.jpg';

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
              Specialised M&A advisory for small to medium companies, combining expert guidance with advanced technology.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-sand-light">About Us</Link></li>
              <li><Link to="/services" className="hover:text-sand-light">Services</Link></li>
              <li><Link to="/process" className="hover:text-sand-light">Our Process</Link></li>
              <li><Link to="/team" className="hover:text-sand-light">Our Team</Link></li>
              <li><Link to="/insights" className="hover:text-sand-light">Insights</Link></li>
              <li><Link to="/case-studies" className="hover:text-sand-light">Case Studies</Link></li>
              <li><Link to="/executive-search" className="hover:text-sand-light">Executive Search</Link></li>
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
              <li><Link to="/privacy-policy" className="hover:text-sand-light">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-sand-light">Terms of Service</Link></li>
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
    <div 
      className={`fixed inset-0 bg-navy-dark/95 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-6">
        <button onClick={() => setIsOpen(false)} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-8 p-6">
        <Link 
          to="/" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/services" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Services
        </Link>
        <Link 
          to="/process" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Process
        </Link>
        <Link 
          to="/team" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Team
        </Link>
        <Link 
          to="/insights" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Insights
        </Link>
        <Link 
          to="/case-studies" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Case Studies
        </Link>
        <Link 
          to="/executive-search" 
          className="text-white text-xl hover:text-sand-light"
          onClick={() => setIsOpen(false)}
        >
          Executive Search
        </Link>
        <Link 
          to="/contact" 
          className="bg-sand text-navy px-6 py-3 rounded-lg font-semibold hover:bg-sand-light transition"
          onClick={() => setIsOpen(false)}
        >
          Contact Us
        </Link>
      </nav>
    </div>
  );
}

function NavigationBar({ isMobile = false, onMobileMenuClick }: { isMobile?: boolean; onMobileMenuClick?: () => void }) {
  return (
    <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
      <Link to="/" className="flex items-center space-x-2">
        <img src={mastellaLogo} alt="Mastella Advisory" className="h-48 w-auto" />
      </Link>
      <div className="hidden md:flex space-x-8">
        <Link to="/about" className="hover:text-sand-light">About</Link>
        <Link to="/services" className="hover:text-sand-light">Services</Link>
        <Link to="/process" className="hover:text-sand-light">Process</Link>
        <Link to="/team" className="hover:text-sand-light">Team</Link>
        <Link to="/insights" className="hover:text-sand-light">Insights</Link>
        <Link to="/case-studies" className="hover:text-sand-light">Case Studies</Link>
        <Link to="/executive-search" className="hover:text-sand-light">Executive Search</Link>
        <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
          Contact Us
        </Link>
      </div>
      {isMobile && (
        <button 
          className="md:hidden text-white"
          onClick={onMobileMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </nav>
  );
}

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80 z-10"></div>
        </div>

        <NavigationBar isMobile={true} onMobileMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <div className="container mx-auto px-6 py-24 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              M&A Excellence in the Lower Mid-Market
            </h1>
            <p className="text-lg md:text-xl mb-8 text-sand-light">
              M&A and capital raising services combined to help founders and business owners plan and achieve their exit for greater value and increased efficiency.
            </p>
            <div className="space-x-4">
              <Link to="/about" className="inline-block border-2 border-sand px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition">
                Learn More
              </Link>
              <Link to="/case-studies" className="inline-block border-2 border-sand px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition">
                Case Studies
              </Link>
              <Link to="/contact" className="inline-block bg-sand text-navy px-6 py-3 rounded-lg font-semibold hover:bg-sand-light transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Services Preview Section */}
      <section id="services" className="py-20 bg-sand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Services</h2>
            <Link to="/services" className="text-navy-light hover:text-navy transition">
              Explore our comprehensive M&A services →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Calculator className="h-8 w-8 text-navy" />,
                title: "M&A Advisory",
                description: "Expert guidance through the entire M&A process, from valuation to deal closure"
              },
              {
                icon: <Handshake className="h-8 w-8 text-navy" />,
                title: "Deal Structuring",
                description: "Strategic deal structuring to maximise value and optimise transaction terms"
              },
              {
                icon: <Banknote className="h-8 w-8 text-navy" />,
                title: "Fundraising",
                description: "Access to capital markets and strategic investors for growth and expansion"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-navy" />,
                title: "Technology Integration",
                description: "Advanced M&A tools and analytics to streamline the transaction process"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                {service.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-navy">{service.title}</h3>
                <p className="text-navy-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Process</h2>
            <Link to="/process" className="text-navy-light hover:text-navy transition">
              Learn more about our detailed M&A process →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Assessment",
                description: "Comprehensive M&A readiness evaluation and company valuation"
              },
              {
                step: "2",
                title: "Strategy Development",
                description: "Creating a tailored M&A approach and identifying potential buyers or investors"
              },
              {
                step: "3",
                title: "Deal Preparation",
                description: "Preparing documentation and optimising company presentation"
              },
              {
                step: "4",
                title: "Transaction Execution",
                description: "Managing negotiations and closing the optimal deal"
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
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className={`w-full h-64 object-cover ${member.imagePosition || ' object-center'}`}
                />
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

      <Footer />

      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </div>
  );
}

function App() {
  return (
    <>
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
