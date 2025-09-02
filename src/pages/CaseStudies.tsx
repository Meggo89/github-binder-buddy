import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Case Studies - Successful M&A Transactions"
        description="Explore our successful M&A transactions and case studies. See how Mastella Advisory has helped founders and business owners achieve their exit goals."
        canonical="https://mastellagroup.com/case-studies"
      />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://imgur.com/ijfbn8c.jpg" alt="Mastella Advisory" className="h-48 w-auto" />
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

          {/* Placeholder for case studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-sand-light p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-navy mb-4">Case studies coming soon...</h3>
              <p className="text-navy-light">
                We're preparing detailed case studies showcasing our successful M&A transactions. Please check back soon or contact us to discuss your specific requirements.
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