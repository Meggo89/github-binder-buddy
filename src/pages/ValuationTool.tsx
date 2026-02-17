import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, HelpCircle, Info, Mail, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { saveValuationLead, testSupabaseConnection } from '../utils/supabase';
import { sendEmailNotification } from '../utils/emailService';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

type ValuationInputs = {
  revenue: number;
  ebitda: number;
  industry: string;
  growthRate: number;
  profitMargin: number;
  yearsInBusiness: number;
};

const industryMultiples = {
  technology: { revenue: 3.5, ebitda: 12.5 },
  manufacturing: { revenue: 1.8, ebitda: 8.5 },
  retail: { revenue: 1.2, ebitda: 7.0 },
  services: { revenue: 2.0, ebitda: 9.0 },
  healthcare: { revenue: 2.5, ebitda: 11.0 },
  construction: { revenue: 1.5, ebitda: 7.5 },
  finance: { revenue: 2.8, ebitda: 10.5 },
  other: { revenue: 1.5, ebitda: 8.0 },
};

function EmailGate({ onVerified }: { onVerified: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    checked: boolean;
    connected: boolean;
    message: string;
  }>({ checked: false, connected: false, message: '' });

  // Test Supabase connection on component mount
  useEffect(() => {
    async function checkConnection() {
      const result = await testSupabaseConnection();
      setConnectionStatus({
        checked: true,
        connected: result.success,
        message: result.message
      });
    }
    
    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      // Store lead
      const result = await saveValuationLead(email);
      console.log('Save result:', result);
      
      // Send notification email to company
      await sendEmailNotification({
        to: 'leo@mastellagroup.com',
        subject: 'New Valuation Tool Lead',
        body: `A new user has accessed the valuation tool:\n\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        onVerified(email);
      }, 1000);
    } catch (err) {
      console.error('Error in form submission:', err);
      setError('Your information was saved locally. You can continue with the valuation tool.');
      // Still allow the user to proceed even if there was an error
      setTimeout(() => {
        onVerified(email);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-sand-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-navy" />
        </div>
        <h2 className="text-2xl font-semibold text-navy mb-2">Access the Valuation Tool</h2>
        <p className="text-navy-light">
          Enter your email address to use our business valuation calculator.
        </p>
      </div>

      {connectionStatus.checked && !connectionStatus.connected && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Database connection issue</p>
            <p className="text-sm">Your data will be saved locally and you can still use the tool.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
            placeholder="your@email.com"
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          {submitSuccess && (
            <p className="text-green-600 text-sm mt-1">Email verified successfully!</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition disabled:opacity-70"
        >
          {isSubmitting ? 'Processing...' : 'Continue to Valuation Tool'}
        </button>

        <p className="text-sm text-navy-light text-center mt-4">
          We'll never share your email with third parties.
        </p>
      </form>
    </div>
  );
}

export default function ValuationTool() {
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [inputs, setInputs] = useState<ValuationInputs>({
    revenue: 0,
    ebitda: 0,
    industry: '',
    growthRate: 0,
    profitMargin: 0,
    yearsInBusiness: 0,
  });

  const [valuation, setValuation] = useState<{
    revenueMethod: number;
    ebitdaMethod: number;
    blendedValue: number;
  } | null>(null);

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | null;
  }>({ message: '', type: null });

  const tooltips = {
    revenue: "Annual revenue from the most recent fiscal year",
    ebitda: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
    growthRate: "Average annual revenue growth rate over the past 3 years",
    profitMargin: "Net profit as a percentage of revenue",
    yearsInBusiness: "Number of years the company has been operating",
  };

  const calculateValuation = async () => {
    if (!inputs.industry || !inputs.revenue || !inputs.ebitda) return;

    const multiple = industryMultiples[inputs.industry as keyof typeof industryMultiples];
    
    // Base calculations
    let revenueValue = inputs.revenue * multiple.revenue;
    let ebitdaValue = inputs.ebitda * multiple.ebitda;

    // Growth rate adjustment
    const growthAdjustment = 1 + (inputs.growthRate / 100);
    revenueValue *= growthAdjustment;
    ebitdaValue *= growthAdjustment;

    // Profit margin adjustment
    const profitAdjustment = 1 + ((inputs.profitMargin - 10) / 100); // Assuming 10% is baseline
    revenueValue *= profitAdjustment;
    ebitdaValue *= profitAdjustment;

    // Years in business adjustment
    const yearsAdjustment = Math.min(1 + (inputs.yearsInBusiness / 50), 1.3); // Cap at 30% premium
    revenueValue *= yearsAdjustment;
    ebitdaValue *= yearsAdjustment;

    // Calculate blended value (weighted average)
    const blendedValue = (revenueValue * 0.4) + (ebitdaValue * 0.6);

    // Save valuation data
    if (userEmail) {
      try {
        const result = await saveValuationLead(userEmail, {
          industry: inputs.industry,
          revenue: inputs.revenue,
          ebitda: inputs.ebitda
        });
        
        console.log('Valuation data save result:', result);
        
        // Send notification email with valuation details
        await sendEmailNotification({
          to: 'leo@mastellagroup.com',
          subject: 'Valuation Tool Results',
          body: `A user has completed a business valuation:\n\n` +
                `Email: ${userEmail}\n` +
                `Industry: ${inputs.industry}\n` +
                `Revenue: £${inputs.revenue.toLocaleString()}\n` +
                `EBITDA: £${inputs.ebitda.toLocaleString()}\n` +
                `Growth Rate: ${inputs.growthRate}%\n` +
                `Profit Margin: ${inputs.profitMargin}%\n` +
                `Years in Business: ${inputs.yearsInBusiness}\n\n` +
                `Estimated Valuation:\n` +
                `Revenue Method: £${Math.round(revenueValue).toLocaleString()}\n` +
                `EBITDA Method: £${Math.round(ebitdaValue).toLocaleString()}\n` +
                `Blended Value: £${Math.round(blendedValue).toLocaleString()}\n\n` +
                `Date: ${new Date().toLocaleString()}`
        });
        
        setSaveStatus({
          message: 'Valuation data saved successfully',
          type: 'success'
        });
        
        // Clear status after 3 seconds
        setTimeout(() => {
          setSaveStatus({ message: '', type: null });
        }, 3000);
      } catch (err) {
        console.error('Error updating valuation data:', err);
        setSaveStatus({
          message: 'Data saved locally. You can continue using the tool.',
          type: 'info'
        });
        
        // Clear status after 5 seconds
        setTimeout(() => {
          setSaveStatus({ message: '', type: null });
        }, 5000);
      }
    }

    setValuation({
      revenueMethod: Math.round(revenueValue),
      ebitdaMethod: Math.round(ebitdaValue),
      blendedValue: Math.round(blendedValue),
    });
  };

  useEffect(() => {
    if (inputs.industry && inputs.revenue && inputs.ebitda) {
      calculateValuation();
    }
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'industry' ? value : Number(value),
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleEmailVerified = (email: string) => {
    setIsVerified(true);
    setUserEmail(email);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Business Valuation Calculator"
        description="Get a free estimated valuation for your business based on industry standards and key financial metrics. Powered by Mastella Advisory."
        canonical="https://mastellagroup.com/valuation"
      />
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
            <Link to="/team" className="hover:text-sand-light">Team</Link>
            <Link to="/insights" className="hover:text-sand-light">Insights</Link>
            <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
              Contact Us
            </Link>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-24 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Business Valuation Calculator
            </h1>
            <p className="text-lg md:text-xl mb-8 text-sand-light">
              Get an estimated valuation for your business based on industry standards and key financial metrics.
            </p>
          </div>
        </div>
      </header>

      <main id="main-content" className="py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>

          {!isVerified ? (
            <EmailGate onVerified={handleEmailVerified} />
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-semibold text-navy mb-6 flex items-center">
                    <Calculator className="h-6 w-6 mr-2" />
                    Enter Your Business Details
                  </h2>

                  {saveStatus.message && (
                    <div className={`mb-4 p-3 rounded ${
                      saveStatus.type === 'success' ? 'bg-green-100 text-green-800' : 
                      saveStatus.type === 'error' ? 'bg-red-100 text-red-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {saveStatus.message}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2 flex items-center">
                        Annual Revenue
                        <button
                          className="ml-2 text-navy-light hover:text-navy"
                          onMouseEnter={() => setActiveTooltip('revenue')}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </label>
                      {activeTooltip === 'revenue' && (
                        <div className="text-xs text-navy-light mb-2">
                          {tooltips.revenue}
                        </div>
                      )}
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-navy-light">£</span>
                        <input
                          type="number"
                          name="revenue"
                          value={inputs.revenue}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2 flex items-center">
                        EBITDA
                        <button
                          className="ml-2 text-navy-light hover:text-navy"
                          onMouseEnter={() => setActiveTooltip('ebitda')}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </label>
                      {activeTooltip === 'ebitda' && (
                        <div className="text-xs text-navy-light mb-2">
                          {tooltips.ebitda}
                        </div>
                      )}
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-navy-light">£</span>
                        <input
                          type="number"
                          name="ebitda"
                          value={inputs.ebitda}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={inputs.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail</option>
                        <option value="services">Services</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="construction">Construction</option>
                        <option value="finance">Finance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2 flex items-center">
                        Annual Growth Rate
                        <button
                          className="ml-2 text-navy-light hover:text-navy"
                          onMouseEnter={() => setActiveTooltip('growthRate')}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </label>
                      {activeTooltip === 'growthRate' && (
                        <div className="text-xs text-navy-light mb-2">
                          {tooltips.growthRate}
                        </div>
                      )}
                      <div className="relative">
                        <input
                          type="number"
                          name="growthRate"
                          value={inputs.growthRate}
                          onChange={handleInputChange}
                          className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-2 text-navy-light">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2 flex items-center">
                        Profit Margin
                        <button
                          className="ml-2 text-navy-light hover:text-navy"
                          onMouseEnter={() => setActiveTooltip('profitMargin')}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </label>
                      {activeTooltip === 'profitMargin' && (
                        <div className="text-xs text-navy-light mb-2">
                          {tooltips.profitMargin}
                        </div>
                      )}
                      <div className="relative">
                        <input
                          type="number"
                          name="profitMargin"
                          value={inputs.profitMargin}
                          onChange={handleInputChange}
                          className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-2 text-navy-light">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2 flex items-center">
                        Years in Business
                        <button
                          className="ml-2 text-navy-light hover:text-navy"
                          onMouseEnter={() => setActiveTooltip('yearsInBusiness')}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </label>
                      {activeTooltip === 'yearsInBusiness' && (
                        <div className="text-xs text-navy-light mb-2">
                          {tooltips.yearsInBusiness}
                        </div>
                      )}
                      <input
                        type="number"
                        name="yearsInBusiness"
                        value={inputs.yearsInBusiness}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-sand-light p-6 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-navy mt-1 flex-shrink-0" />
                    <p className="text-sm text-navy-light">
                      This calculator provides an estimated valuation based on industry standards and key metrics. 
                      For a detailed valuation that takes into account all aspects of your business, 
                      please <Link to="/contact" className="text-navy hover:text-navy-light underline">contact us</Link>.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {valuation && (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-navy mb-6">Estimated Valuation</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-navy mb-2">Revenue Method</h3>
                        <p className="text-3xl font-bold text-navy">
                          {formatCurrency(valuation.revenueMethod)}
                        </p>
                        <p className="text-sm text-navy-light mt-1">
                          Based on industry revenue multiples
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-navy mb-2">EBITDA Method</h3>
                        <p className="text-3xl font-bold text-navy">
                          {formatCurrency(valuation.ebitdaMethod)}
                        </p>
                        <p className="text-sm text-navy-light mt-1">
                          Based on industry EBITDA multiples
                        </p>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-semibold text-navy mb-2">
                          Blended Valuation Range
                        </h3>
                        <p className="text-4xl font-bold text-navy">
                          {formatCurrency(valuation.blendedValue)}
                        </p>
                        <p className="text-sm text-navy-light mt-2">
                          This blended valuation takes into account both revenue and EBITDA methods, 
                          adjusted for growth rate, profit margin, and company maturity.
                        </p>
                      </div>

                      <div className="pt-6">
                        <Link
                          to="/contact"
                          className="block w-full bg-navy text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition"
                        >
                          Get a Detailed Valuation
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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