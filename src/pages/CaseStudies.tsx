import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { TrendingUp, Building2, Leaf, Cpu, Truck, Wheat, GraduationCap, Landmark } from 'lucide-react';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

const caseStudies = [
  {
    icon: <Cpu className="h-6 w-6" />,
    tag: "Seed Funding",
    tagStyle: "bg-navy text-white",
    value: "£2m",
    title: "HR Tech Platform",
    sector: "Technology",
    challenge: "Early-stage HR technology company needed capital to scale its platform and expand into new markets, but lacked established revenue metrics typical investors require.",
    approach: "Structured a compelling investment narrative around product-market fit and user growth. Ran a targeted outreach to 40+ investors across VC, family office, and angel networks.",
    outcome: "Secured approximately £2m in seed funding from a diversified investor base, enabling the company to triple its engineering team and launch in two new verticals.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    tag: "Full Sale",
    tagStyle: "bg-accent text-navy",
    value: "Target price achieved",
    title: "Institutional Asset Manager",
    sector: "Financial Services",
    challenge: "Founder-led asset management firm with £500m+ AUM sought a full exit after 15 years. The business was highly dependent on the founder's relationships and reputation.",
    approach: "Conducted a structured sale process, identifying 12 strategic buyers. Worked closely with the founder to document key relationships and create a robust transition plan.",
    outcome: "Completed a full sale to a strategic acquirer at the founder's target valuation, with a structured earn-out that protected long-term client relationships.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    tag: "Majority Sale",
    tagStyle: "bg-navy-light text-white",
    title: "DFM Platform",
    sector: "Wealth Management",
    challenge: "A discretionary fund manager with strong performance but limited distribution sought a partner to accelerate growth while preserving its investment philosophy.",
    approach: "Identified PE-backed consolidators in the wealth management space. Ran a competitive process that attracted four serious offers, enabling the founders to negotiate from a position of strength.",
    outcome: "Majority sale to a PE-backed asset manager at a premium multiple, with founders retaining a meaningful minority stake to participate in future upside.",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    tag: "Seed Round",
    tagStyle: "bg-navy text-white",
    value: "£1.5m+",
    title: "Food Manufacturer",
    sector: "Consumer Goods",
    challenge: "Innovative food manufacturer with strong retail traction needed growth capital to expand production capacity and secure national supermarket listings.",
    approach: "Positioned the company's sustainability credentials and margin profile to attract impact-oriented investors. Structured the round to balance founder dilution with growth ambitions.",
    outcome: "Raised over £1.5m from family offices and HNW investors, funding a new production line and enabling the company to secure listings with two major UK supermarket chains.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    tag: "Series A & Sale",
    tagStyle: "bg-sand-dark text-white",
    status: "Current",
    title: "Human Capital AI",
    sector: "Artificial Intelligence",
    challenge: "An AI-powered platform for relational intelligence required successive funding rounds to scale its technology while exploring strategic minority sale options.",
    approach: "Advised across multiple capital events, building a phased funding strategy that aligned investor expectations with the company's rapid growth trajectory.",
    outcome: "Successfully closed two funding rounds from institutional and individual investors, with ongoing advisory on a strategic minority sale to a corporate partner.",
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    tag: "Capital Raise",
    tagStyle: "bg-navy text-white",
    title: "Alternative Fund Manager",
    sector: "Infrastructure",
    challenge: "An alternative fund manager pursuing a buy-and-build strategy in infrastructure needed to raise institutional capital to fund its acquisition pipeline.",
    approach: "Acted as placement agent, structuring the fund narrative around the team's track record and the infrastructure sector's resilient return profile. Targeted pension funds and institutional allocators.",
    outcome: "Secured institutional commitments enabling the fund to execute on its first three acquisitions in the UK infrastructure sector.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    tag: "Majority Sale",
    tagStyle: "bg-navy-light text-white",
    title: "Logistics Business",
    sector: "Transport & Logistics",
    challenge: "A family-owned logistics company with 30+ years of trading history sought an exit. The founders wanted to ensure continuity for long-standing employees and customers.",
    approach: "Guided the family through a structured sale process, prioritising buyers who would invest in the business long-term. Managed complex family dynamics and succession planning.",
    outcome: "Completed a majority sale to a respected PE investor who committed to preserving the company's culture, retaining all employees, and investing in fleet modernisation.",
  },
  {
    icon: <Wheat className="h-6 w-6" />,
    tag: "Buy-side Advisory",
    tagStyle: "bg-sand-dark text-white",
    status: "Ongoing",
    title: "Agricultural Group",
    sector: "Agriculture",
    challenge: "A global agricultural group needed to expand its UK and European footprint through targeted acquisitions, but lacked local market knowledge and deal origination capability.",
    approach: "Embedded within the group's corporate development team, mapping the UK and European market, identifying acquisition targets, and managing the full deal pipeline.",
    outcome: "Currently supporting the execution of targeted acquisitions, with two deals in advanced due diligence and a pipeline of 15+ qualified targets.",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    tag: "Series A",
    tagStyle: "bg-navy text-white",
    value: "£1m",
    title: "Edtech Platform",
    sector: "Education Technology",
    challenge: "An education technology platform with strong user engagement needed Series A capital to expand its content library and enter the corporate training market.",
    approach: "Crafted a growth narrative that combined B2C traction with B2B potential. Targeted VCs and HNW investors with sector expertise in education and workplace learning.",
    outcome: "Closed a £1m Series A round and continuing to advise on subsequent capital events as the company scales into corporate training.",
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    tag: "Series A",
    tagStyle: "bg-navy text-white",
    title: "Neobank",
    sector: "Fintech",
    challenge: "A challenger bank needed significant Series A funding to obtain regulatory approvals and build its technology platform ahead of a planned market launch.",
    approach: "Managed a complex fundraise involving VCs, family offices, and strategic investors, navigating regulatory requirements and structuring the round to meet FCA capital adequacy expectations.",
    outcome: "Secured a major Series A round, providing the capital needed for regulatory approval and platform build, positioning the neobank for a successful market entry.",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white page-enter">
      <SEO
        title="Case Studies - Successful Exit and M&A Transactions"
        description="Explore our successful exit advisory, M&A transactions, and capital raises. See how Mastella Advisory has helped founders achieve their goals."
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
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/about" className="hover:text-sand-light transition">About</Link>
            <Link to="/services" className="hover:text-sand-light transition">Services</Link>
            <Link to="/case-studies" className="hover:text-sand-light transition border-b-2 border-sand">Our Work</Link>
            <Link to="/team" className="hover:text-sand-light transition">Team</Link>
            <Link to="/insights" className="hover:text-sand-light transition">Insights</Link>
            <Link to="/contact" className="bg-accent text-navy px-4 py-2 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200">
              Contact Us
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-16 relative z-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Work</h1>
          <p className="text-lg md:text-xl text-sand-light max-w-2xl">
            Real outcomes for real founders. From seed raises to full exits, here is how we have helped business owners navigate complex transactions and achieve their goals.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="py-20">
        <div className="container mx-auto px-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { stat: "£50M+", label: "Transaction Value Advised" },
              { stat: "20+", label: "Deals Completed" },
              { stat: "8", label: "Sectors Covered" },
              { stat: "95%", label: "Client Retention" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <p className="text-3xl font-bold text-navy">{item.stat}</p>
                <p className="text-navy-light text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Case Studies Grid */}
          <h2 className="sr-only">Selected Transactions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white border border-sand rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                    <span className={`${study.tagStyle} px-3 py-1 rounded-full text-sm font-medium`}>{study.tag}</span>
                    {study.status && (
                      <span className="bg-navy-light text-white px-2 py-1 rounded text-xs">{study.status}</span>
                    )}
                  </div>
                  {study.value && (
                    <span className="text-accent-dark font-bold text-lg">{study.value}</span>
                  )}
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-navy transition-transform duration-300 group-hover:scale-110">
                    {study.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">{study.title}</h3>
                    <p className="text-navy-light text-sm">{study.sector}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-navy mb-1">Challenge</p>
                    <p className="text-navy-light">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-1">Our Approach</p>
                    <p className="text-navy-light">{study.approach}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-accent-dark mb-1">Outcome</p>
                    <p className="text-navy-light">{study.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 bg-sand-light rounded-2xl p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-4">Ready to plan your exit?</h2>
            <p className="text-navy-light mb-8 max-w-lg mx-auto">
              Every successful transaction starts with a conversation. Let us understand your goals and show you what is possible.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-accent text-navy px-8 py-4 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}