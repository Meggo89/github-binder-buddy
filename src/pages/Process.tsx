
import { ArrowLeft, Calculator, LineChart, FileText, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

export default function Process() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-navy/50 z-10"></div>
          <img 
            src={londonSkyline} 
            alt="London skyline" 
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src={mastellaLogo} alt="Mastella Advisory" className="h-48 w-auto" />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-sand-light">Home</Link>
            <Link to="/about" className="hover:text-sand-light">About</Link>
            <Link to="/services" className="hover:text-sand-light">Services</Link>
            <Link to="/process" className="hover:text-sand-light">Process</Link>
            <Link to="/#team" className="hover:text-sand-light">Team</Link>
            <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-navy mb-12">Our M&A Process</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-4">Strategic Approach to M&A</h2>
              <p className="text-navy-light mb-6">
                Our comprehensive M&A process is designed to maximise value while minimising risks for our clients. We combine traditional advisory expertise with cutting-edge technology to ensure efficient and successful transactions.
              </p>
              <p className="text-navy-light">
                Each step is carefully managed by our experienced team, ensuring thorough evaluation, strategic positioning, and optimal execution of your M&A transaction.
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
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Comprehensive valuation and market analysis</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Strategic buyer identification and matching</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Efficient due diligence process</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Expert negotiation support</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-16">
            {[
              {
                icon: <Calculator className="h-12 w-12 text-navy" />,
                step: "1",
                title: "Initial Assessment",
                description: "We begin with a comprehensive evaluation of your business, including financial analysis, market positioning, and growth potential. This phase establishes the foundation for a successful M&A strategy.",
                details: [
                  "Business valuation",
                  "Market analysis",
                  "Growth potential assessment",
                  "Risk evaluation"
                ]
              },
              {
                icon: <LineChart className="h-12 w-12 text-navy" />,
                step: "2",
                title: "Strategy Development",
                description: "Based on the initial assessment, we develop a tailored M&A strategy that aligns with your objectives. This includes identifying potential buyers or investors and creating a compelling value proposition.",
                details: [
                  "Target market identification",
                  "Buyer profiling",
                  "Value proposition development",
                  "Transaction timeline planning"
                ]
              },
              {
                icon: <FileText className="h-12 w-12 text-navy" />,
                step: "3",
                title: "Deal Preparation",
                description: "We prepare comprehensive documentation and optimise your company's presentation to potential buyers. This phase ensures you're fully prepared for due diligence and negotiations.",
                details: [
                  "Information memorandum creation",
                  "Due diligence preparation",
                  "Financial modeling",
                  "Management presentation development"
                ]
              },
              {
                icon: <Handshake className="h-12 w-12 text-navy" />,
                step: "4",
                title: "Transaction Execution",
                description: "Our team manages the entire transaction process, from initial buyer outreach to final closing. We ensure optimal terms and conditions while maintaining confidentiality throughout.",
                details: [
                  "Buyer negotiations",
                  "Due diligence management",
                  "Deal structuring",
                  "Transaction closing"
                ]
              }
            ].map((phase, index) => (
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
      </main>

      <footer className="bg-navy-dark text-sand py-12 mt-20">
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
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>info@mastellagroup.com</li>
                <li>+44 (0)20 7123 4567</li>
                <li>International House<br />101 King's Cross Rd<br />London, WC1X 9LP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-light mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} Mastella Advisory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}