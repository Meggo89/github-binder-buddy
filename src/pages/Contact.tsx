import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitContactRequest, ContactRequest } from '../utils/contactService';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

export default function Contact() {
  const [formData, setFormData] = useState<ContactRequest>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message || !formData.interest || !formData.company) {
      setFormStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: 'Please fill in all required fields'
      });
      return;
    }
    
    setFormStatus({
      submitted: false,
      submitting: true,
      error: false,
      message: 'Submitting your request...'
    });
    
    try {
      // Submit the contact request
      const result = await submitContactRequest(formData);
      
      if (result.success) {
        // Show success message
        setFormStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: result.message
        });
        
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          interest: '',
          message: ''
        });
      } else {
        // Show error message
        setFormStatus({
          submitted: false,
          submitting: false,
          error: true,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: 'An unexpected error occurred. Please try again later.'
      });
    }
  };

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
          </div>
        </nav>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl font-bold text-navy mb-6">Book a Consultation</h1>
              <p className="text-navy-light mb-8">
                Schedule a confidential consultation with our M&A experts to discuss your company's potential and explore strategic opportunities.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-navy mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy">Email</h3>
                    <p className="text-navy-light">leo@mastellagroup.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-navy mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy">Phone</h3>
                    <p className="text-navy-light">+44 (0)20 7123 4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-navy mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy">Address</h3>
                    <p className="text-navy-light">
                      International House<br />
                      101 King's Cross Rd<br />
                      London, WC1X 9LP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              {formStatus.submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Message Sent!</h3>
                  <p className="text-navy-light mb-6">{formStatus.message}</p>
                  <button
                    onClick={() => setFormStatus(prev => ({ ...prev, submitted: false }))}
                    className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus.error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                      {formStatus.message}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-navy mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-navy mb-1">
                      Area of Interest *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                    >
                      <option value="">Select an option</option>
                      <option value="M&A Advisory">M&A Advisory</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="Business Valuation">Business Valuation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                      placeholder="Please briefly describe your requirements"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition disabled:opacity-70 flex items-center justify-center"
                  >
                    {formStatus.submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </div>
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
                <li>leo@mastellagroup.com</li>
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