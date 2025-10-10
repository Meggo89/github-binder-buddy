import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Case Studies - Successful M&A Transactions"
        description="Explore our successful M&A transactions and case studies. See how Mastella Advisory has helped founders and business owners achieve their exit goals."
        canonical="https://mastellagroup.com/case-studies"
      />
      
      {/* Header */}
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
            <Link to="/about" className="hover:text-sand-light">About</Link>
            <Link to="/services" className="hover:text-sand-light">Services</Link>
            <Link to="/process" className="hover:text-sand-light">Process</Link>
            <Link to="/team" className="hover:text-sand-light">Team</Link>
            <Link to="/insights" className="hover:text-sand-light">Insights</Link>
            <Link to="/case-studies" className="hover:text-sand-light border-b-2 border-sand">Case Studies</Link>
            <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
              Contact Us
            </Link>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-lg md:text-xl text-sand-light max-w-2xl">
            Discover how we've helped founders and business owners successfully navigate complex M&A transactions and achieve their strategic objectives.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Successful Transactions</h2>
            <p className="text-navy-light text-lg">
              Our track record of delivering value for our clients across various industries and transaction types.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* HR Tech – Seed Funding */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">Seed Funding</span>
                <span className="text-sand-dark font-semibold">£2m</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">HR Tech Platform</h3>
              <p className="text-navy-light">
                Sourced ~£2m of seed capital from VC, family office, and angel investors for a fast-growing HR technology platform.
              </p>
            </div>

            {/* Institutional Asset Manager – Full Sale */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-sand text-navy px-3 py-1 rounded-full text-sm font-medium">Full Sale</span>
                <span className="text-navy font-semibold">✓</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Institutional Asset Manager</h3>
              <p className="text-navy-light">
                Led the full sale process, securing a strategic buyer and delivering a successful exit for the founder at the target valuation.
              </p>
            </div>

            {/* DFM Platform – Majority Sale */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy-light text-white px-3 py-1 rounded-full text-sm font-medium">Majority Sale</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">DFM Platform</h3>
              <p className="text-navy-light">
                Acted as lead advisors on the majority sale of a successful discretionary fund manager to a larger, PE-backed asset manager.
              </p>
            </div>

            {/* Food Manufacturer – Seed Round */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">Seed Round</span>
                <span className="text-sand-dark font-semibold">£1.5m+</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Food Manufacturer</h3>
              <p className="text-navy-light">
                Raised £1.5m+ from family offices and HNW investors to fuel the company's growth.
              </p>
            </div>

            {/* Relational Intelligence AI – Series A & Minority Sale */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-sand-dark text-white px-3 py-1 rounded-full text-sm font-medium">Series A & Sale</span>
                <span className="bg-navy-light text-white px-2 py-1 rounded text-xs">Current</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Human Capital AI</h3>
              <p className="text-navy-light">
                Advised across two successful raises, securing backing from institutional and individual investors.
              </p>
            </div>

            {/* Alternative Fund Manager – Capital Raise */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">Capital Raise</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Alternative Fund Manager</h3>
              <p className="text-navy-light">
                Advisor and placement agent on a buy-and-build strategy, securing institutional capital for acquisitions in the infrastructure sector.
              </p>
            </div>

            {/* Logistics Business – Majority Sale */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy-light text-white px-3 py-1 rounded-full text-sm font-medium">Majority Sale</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Logistics Business</h3>
              <p className="text-navy-light">
                Guided a long-established family business through a majority sale to a respected private equity investor.
              </p>
            </div>

            {/* Agricultural Group – Buy-side Advisory */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-sand-dark text-white px-3 py-1 rounded-full text-sm font-medium">Buy-side Advisory</span>
                <span className="bg-navy-light text-white px-2 py-1 rounded text-xs">Ongoing</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Agricultural Group</h3>
              <p className="text-navy-light">
                Supporting a global group with its buy-side strategy, identifying and executing targeted acquisitions.
              </p>
            </div>

            {/* Edtech – Series A */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">Series A</span>
                <span className="text-sand-dark font-semibold">£1m</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Edtech Platform</h3>
              <p className="text-navy-light">
                Advised on a £1m Series A raise from VCs and HNW investors, continuing to support on future capital events.
              </p>
            </div>

            {/* Neobank – Series A */}
            <div className="bg-white border border-sand rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">Series A</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Neobank</h3>
              <p className="text-navy-light">
                Advised on a major VC and family office Series A funding round.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-navy mb-6">Ready to start your M&A journey?</h3>
            <Link 
              to="/contact" 
              className="inline-block bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-light transition"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}