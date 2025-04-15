import React from 'react';
import { ArrowLeft, Calculator, Handshake, BarChart3, Banknote, FileText, Users, Target, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80 z-10"></div>
          <img 
            src="https://imgur.com/4asBOEH.jpg" 
            alt="Business background" 
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://imgur.com/ijfbn8c.jpg" alt="Mastella Advisory" className="h-48 w-auto" />
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
          
          <h1 className="text-4xl font-bold text-navy mb-12">Our Services</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-4">Comprehensive M&A Solutions</h2>
              <p className="text-navy-light mb-6">
                We provide end-to-end M&A advisory services tailored for small to medium-sized enterprises. Our approach combines traditional expertise with innovative technology to deliver optimal outcomes for our clients.
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
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Tailored solutions for SMEs</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Technology-driven approach</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Experienced advisory team</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-navy mt-1">•</span>
                  <p className="text-navy-light">Proven track record</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              {
                icon: <Calculator className="h-8 w-8 text-navy" />,
                title: "M&A Advisory",
                description: "Comprehensive guidance through the entire M&A process, from valuation to deal closure.",
                features: [
                  "Business valuation",
                  "Market analysis",
                  "Deal structuring",
                  "Negotiation support"
                ]
              },
              {
                icon: <Handshake className="h-8 w-8 text-navy" />,
                title: "Deal Structuring",
                description: "Strategic deal structuring to maximize value and optimize transaction terms.",
                features: [
                  "Tax-efficient structures",
                  "Risk mitigation",
                  "Terms optimization",
                  "Regulatory compliance"
                ]
              },
              {
                icon: <Banknote className="h-8 w-8 text-navy" />,
                title: "Fundraising",
                description: "Access to capital markets and strategic investors for growth and expansion.",
                features: [
                  "Equity financing",
                  "Debt financing",
                  "Investor matching",
                  "Pitch preparation"
                ]
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-navy" />,
                title: "Technology Integration",
                description: "Advanced M&A tools and analytics to streamline the transaction process.",
                features: [
                  "Data analytics",
                  "Process automation",
                  "Digital due diligence",
                  "Real-time reporting"
                ]
              }
            ].map((service, index) => (
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
            {[
              {
                icon: <Target className="h-8 w-8 text-navy" />,
                title: "Strategic Planning",
                description: "Development of comprehensive M&A strategies aligned with your business objectives."
              },
              {
                icon: <Users className="h-8 w-8 text-navy" />,
                title: "Post-Merger Integration",
                description: "Expert guidance for smooth integration and synergy realization after the deal."
              },
              {
                icon: <Briefcase className="h-8 w-8 text-navy" />,
                title: "Transaction Support",
                description: "Full-service support throughout the entire transaction lifecycle."
              }
            ].map((service, index) => (
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
      </main>

      <footer className="bg-navy-dark text-sand py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="https://imgur.com/ijfbn8c.jpg" alt="Mastella Advisory" className="h-32 w-auto" />
                <span className="text-lg font-bold text-white">Mastella Advisory</span>
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