import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Team() {
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
            <Link to="/team" className="hover:text-sand-light">Team</Link>
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
          
          <h1 className="text-4xl font-bold text-navy mb-12">Our Leadership Team</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                name: "Leo Meggitt",
                title: "Managing Director",
                image: "/lovable-uploads/5a8b577b-26fe-4020-b9c9-cecef8f4f735.png",
                imagePosition: "object-[center_5%]",
                description: "20+ years experience in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies."
              },
              {
                name: "Francis Martin CBE",
                title: "Director",
                image: "https://imgur.com/c4ZQ4xf.jpg",
                imagePosition: "object-[center_35%]",
                description: "Distinguished advisor with 25+ years in strategic consulting. Former President of British Chambers of Commerce and recipient of Commander of the British Empire."
              },
              {
                name: "Erik Vynkier",
                title: "Senior Advisor",
                image: "https://imgur.com/XNXxtRV.jpg",
                description: "Highly experienced in financial services, asset management and private equity. Has worked on deals across multiple sectors and geograhies."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className={`w-full h-64 object-cover ${member.imagePosition || 'object-center'}`}
                />
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-navy">{member.name}</h3>
                    <p className="text-navy-light font-medium">{member.title}</p>
                  </div>
                  <p className="text-navy-light">{member.description}</p>
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
                <img src="https://imgur.com/ijfbn8c.jpg" alt="Mastella Advisory" className="h-32 w-auto" />
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