import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 5,
    title: "Comprehensive Guide to Business Exits",
    excerpt: "A detailed exploration of business exit strategies, timing considerations, and key steps to maximise value during the exit process.",
    content: `
      <h2><strong>Comprehensive Guide to Business Exits</strong></h2>
      <p>Preparing for an exit is a critical phase for small to medium-sized companies (SMEs), as it can significantly impact the owner's financial future and the business's legacy. Exit strategies are diverse and may include selling to an outside buyer, transferring ownership to family members, or engaging in a management buyout. The choice of strategy is influenced by the owner's personal goals, the company's market position, and the overall economic landscape, making careful planning essential for a successful transition.</p>
      
      <p>Notably, the exit process requires thorough preparation, often taking several years. This involves assessing the current value of the business through various valuation methods—such as asset-based, income, and market approaches—and addressing operational efficiencies, management readiness, and legal considerations. Ensuring that financial statements are accurate and that key performance indicators are favourable can enhance the company's attractiveness to potential buyers and ultimately lead to a higher sale price.</p>
      
      <p>However, companies often face challenges during the exit process, including common pitfalls such as unclear exit goals, poor communication, and neglecting company culture. These missteps can jeopardize the business's valuation and create uncertainty among stakeholders, affecting morale and retention of key employees. Awareness of these challenges is crucial for SMEs to navigate the complexities of exit planning successfully.</p>
      
      <p>In summary, preparing for an exit involves a multifaceted approach that includes defining exit goals, strengthening management, optimizing operations, and engaging professional advisors. By proactively addressing these areas, SMEs can position themselves favourably for a successful transition, ensuring not only a profitable sale but also the continuity of the business's mission and values in the future.</p>

      <h3><strong>Types of Exit Strategies</strong></h3>
      <p>When planning an exit from a business, owners have several strategies to consider, each with its own advantages and challenges. The most common exit strategies include selling to an outside buyer, selling to an inside buyer, and passing the business on to a family member.</p>

      <h4><strong>Sale to an Outside Buyer</strong></h4>
      <p>Selling to an outside buyer is one of the most prevalent exit strategies. This option often allows for a broader market reach, potentially yielding a higher sale price, especially if the buyer is a competitor or someone within the same industry who recognizes the value of the business.</p>

      <p>However, it is critical for business owners to prepare thoroughly for this transition, as failing to address necessary issues can diminish the sale price and impede exit success. The preparation process can be time-consuming, often taking up to five years.</p>

      <h4><strong>Sale to an Inside Buyer</strong></h4>
      <p>Another common strategy is selling to an inside buyer, which typically involves selling the business to existing management or employees. This can facilitate a smoother transition, as the management team is already familiar with the company's operations and culture.</p>

      <p>A management buyout not only helps ensure continuity but also provides the management team with an opportunity to take ownership, aligning their interests with the business's future success.</p>

      <h4><strong>Passing the Business to a Family Member</strong></h4>
      <p>Passing a business to a family member is a popular exit strategy, particularly for family-owned enterprises. This approach allows for the continuity of the family legacy and can provide stability for employees and customers.</p>

      <p>However, it is essential to evaluate the family member's interest and ability to manage the business effectively. Additionally, owners must consider the potential impact on family dynamics, as financial and managerial decisions can complicate personal relationships.</p>

      <h3><strong>Assessing Current Business Value</strong></h3>
      <p>Assessing the current value of a business is a crucial step for small to medium enterprises (SMEs) preparing for an exit. Various methods can be employed depending on the business's nature and the specific purpose of the valuation.</p>

      <h4><strong>Valuation Methods</strong></h4>
      <ul>
        <li><strong>Asset-Based Approach:</strong> The asset-based approach involves calculating the net asset value of a company by subtracting its liabilities from its assets. This method provides a clear picture of the business's tangible worth at a given moment in time.</li>
        <li><strong>Income Approach:</strong> The income approach focuses on projecting future earnings and discounting them to their present value, which reflects the company's potential profitability. This approach is particularly valuable when evaluating businesses with stable cash flows.</li>
        <li><strong>Market Approach:</strong> The market approach entails comparing the business with similar companies that have recently been sold or are publicly traded. This method helps establish a market-driven valuation and can highlight how the business stacks up against competitors.</li>
      </ul>

      <h4><strong>Financial Adjustments</strong></h4>
      <p>To ensure a more accurate representation of the business's value, financial statements often require adjustments. This may include normalizing earnings or eliminating one-time expenses that do not reflect ongoing operations.</p>

      <h4><strong>Analysing Intangible Assets</strong></h4>
      <p>Intangible assets, such as brand reputation, customer relationships, and intellectual property, can significantly influence a business's value. These factors are particularly critical in formulating a business valuation exit strategy, as they can enhance perceived worth in the eyes of potential buyers.</p>

      <h3><strong>Legal and Regulatory Considerations</strong></h3>
      <p>When preparing for an exit, it is crucial for small to medium-sized companies to address various legal and regulatory factors that can impact the sale process. One of the primary considerations is the protection of intellectual property. Patents and trademarks are the most recognizable forms of protection, but it is essential to understand that intellectual property extends beyond just legally registered assets.</p>

      <p>Additionally, ensuring that all assets are legally protected before going to market is vital. Without adequate protection, the true value of these assets may be undermined, potentially leading to decreased sale prices or complications during negotiations.</p>

      <h3><strong>Common Pitfalls to Avoid</strong></h3>
      <ul>
        <li><strong>Lack of Clear Goals:</strong> Failing to define clear exit objectives and timelines</li>
        <li><strong>Poor Timing:</strong> Not considering market conditions and industry cycles</li>
        <li><strong>Inadequate Preparation:</strong> Rushing the process without proper planning</li>
        <li><strong>Unrealistic Valuations:</strong> Overestimating or underestimating business worth</li>
        <li><strong>Neglecting Key Relationships:</strong> Failing to maintain important stakeholder relationships</li>
        <li><strong>Insufficient Documentation:</strong> Poor record-keeping and incomplete financial data</li>
      </ul>

      <h3><strong>Conclusion</strong></h3>
      <p>A successful business exit requires careful planning, preparation, and execution. By understanding your options, timing the market correctly, enhancing business value, and managing the process effectively, you can maximise the chances of achieving your desired outcome. Professional guidance throughout the journey is essential to navigate the complexities and optimise results.</p>
    `,
    author: "Leo Meggitt",
    date: "March 25, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=2070",
    category: "Strategy"
  },
  {
    id: 4,
    title: "The Role of AI in Modern M&A Transactions",
    excerpt: "An in-depth analysis of how artificial intelligence is transforming the M&A landscape, from due diligence to post-merger integration.",
    content: `
      <h2>The Role of AI in Modern M&A Transactions</h2>
      <p>Artificial Intelligence (AI) is revolutionizing the way mergers and acquisitions are conducted, bringing unprecedented efficiency, accuracy, and insights to what has traditionally been a highly manual and time-intensive process.</p>
      
      <h3>1. AI in Due Diligence</h3>
      <p>One of the most significant applications of AI in M&A is during the due diligence phase. Advanced AI tools can now:</p>
      <ul>
        <li>Review thousands of contracts and legal documents in hours rather than weeks</li>
        <li>Identify potential risks and red flags automatically</li>
        <li>Extract and categorize key terms and obligations</li>
        <li>Analyse historical financial data for patterns and anomalies</li>
        <li>Assess regulatory compliance across multiple jurisdictions</li>
      </ul>
      <p>This technological advancement has reduced due diligence time by up to 50% while significantly improving accuracy and comprehensiveness.</p>
      
      <h3>2. Valuation and Pricing Analysis</h3>
      <p>AI-powered valuation tools are transforming how companies are valued in M&A transactions:</p>
      <ul>
        <li>Advanced market analysis using real-time data</li>
        <li>Predictive modeling for future performance</li>
        <li>Comparative analysis across thousands of similar transactions</li>
        <li>Risk assessment and scenario planning</li>
        <li>Synergy potential evaluation</li>
      </ul>
      <p>These capabilities enable more accurate and data-driven valuations, reducing the risk of overpayment or missed opportunities.</p>
      
      <h3>3. Deal Sourcing and Target Identification</h3>
      <p>AI algorithms are revolutionizing how potential M&A targets are identified and evaluated:</p>
      <ul>
        <li>Automated screening of potential targets based on multiple criteria</li>
        <li>Analysis of market trends and competitive landscapes</li>
        <li>Identification of emerging opportunities and threats</li>
        <li>Assessment of strategic fit and cultural alignment</li>
        <li>Prediction of successful acquisition outcomes</li>
      </ul>
      <p>This data-driven approach to deal sourcing has significantly improved the quality of potential targets and increased success rates.</p>

      <h3>4. Post-Merger Integration</h3>
      <p>AI tools are increasingly valuable in managing the complex process of post-merger integration:</p>
      <ul>
        <li>Automated workflow management and tracking</li>
        <li>Real-time monitoring of integration milestones</li>
        <li>Early warning systems for potential issues</li>
        <li>Cultural alignment analysis and recommendations</li>
        <li>Synergy realization tracking</li>
      </ul>
      <p>These capabilities help ensure smoother integrations and better realization of expected synergies.</p>

      <h3>5. Future Trends and Implications</h3>
      <p>Looking ahead, we can expect AI to play an even more significant role in M&A:</p>
      <ul>
        <li>Natural Language Processing for improved document analysis</li>
        <li>Machine Learning for better prediction models</li>
        <li>Automated negotiation support systems</li>
        <li>Real-time market intelligence and analytics</li>
        <li>Enhanced cybersecurity due diligence</li>
      </ul>
      <p>Organizations that embrace these AI capabilities will have a significant competitive advantage in executing successful M&A transactions.</p>

      <h3>Conclusion</h3>
      <p>AI is not just changing how M&A transactions are conducted; it's fundamentally transforming what's possible in terms of speed, accuracy, and insight. While human expertise remains crucial, the combination of experienced M&A professionals and advanced AI tools represents the future of successful M&A execution.</p>
    `,
    author: "Leo Meggitt",
    date: "March 20, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&q=80&w=2069",
    category: "Technology"
  },
  {
    id: 1,
    title: "The Future of M&A in the Technology Sector",
    excerpt: "An analysis of emerging trends and opportunities in technology sector M&A, including AI integration, cloud services, and cybersecurity considerations.",
    content: `
      <h2>The Future of M&A in the Technology Sector</h2>
      <p>The technology sector continues to be one of the most dynamic and active areas for mergers and acquisitions. As we move forward, several key trends are shaping the landscape of tech M&A, creating both opportunities and challenges for businesses looking to navigate this complex environment.</p>
      
      <h3>1. AI Integration and Machine Learning</h3>
      <p>Artificial Intelligence has become a crucial factor in tech M&A valuations. Companies with strong AI capabilities are particularly attractive targets, as they offer potential acquirers immediate access to advanced technology and skilled talent. The integration of AI capabilities can provide significant competitive advantages:</p>
      <ul>
        <li>Enhanced data analytics and decision-making capabilities</li>
        <li>Automation of complex business processes</li>
        <li>Improved customer experience and personalization</li>
        <li>Predictive maintenance and operational efficiency</li>
      </ul>
      <p>Valuations for AI-focused companies have seen a significant premium, often 20-30% higher than traditional software companies, reflecting the strategic importance of these capabilities.</p>
      
      <h3>2. Cloud Services and Infrastructure</h3>
      <p>The shift to cloud computing has created new opportunities for strategic acquisitions. Companies with established cloud infrastructure and services are seeing increased interest from traditional enterprises looking to accelerate their digital transformation. Key considerations in cloud-focused M&A include:</p>
      <ul>
        <li>Scalability and flexibility of the infrastructure</li>
        <li>Multi-cloud capabilities and vendor relationships</li>
        <li>Data center locations and geographic coverage</li>
        <li>Compliance with regional data protection regulations</li>
      </ul>
      <p>The cloud services market is expected to grow at a CAGR of 17.5% through 2025, driving continued M&A activity in this space. Companies with strong cloud capabilities are particularly attractive as they offer immediate scale and technical expertise.</p>
      
      <h3>3. Cybersecurity Considerations</h3>
      <p>As cyber threats continue to evolve, cybersecurity has become a critical factor in tech M&A due diligence. Companies with robust security measures and capabilities are commanding premium valuations. Key areas of focus include:</p>
      <ul>
        <li>Security architecture and infrastructure</li>
        <li>Incident response capabilities</li>
        <li>Compliance with industry standards (ISO 27001, SOC 2, etc.)</li>
        <li>Security team expertise and resources</li>
      </ul>
      <p>Recent high-profile security breaches have highlighted the importance of thorough cybersecurity due diligence in M&A transactions. Acquirers are increasingly focusing on security capabilities as a key value driver.</p>

      <h3>4. Digital Transformation Acceleration</h3>
      <p>The global pandemic has accelerated digital transformation initiatives across industries, leading to increased M&A activity in the technology sector. Companies are looking to acquire digital capabilities to:</p>
      <ul>
        <li>Enhance remote work capabilities</li>
        <li>Improve digital customer engagement</li>
        <li>Modernize legacy systems</li>
        <li>Enable data-driven decision making</li>
      </ul>
      <p>This trend is expected to continue as organizations seek to remain competitive in an increasingly digital business environment.</p>

      <h3>5. Regulatory Considerations</h3>
      <p>The technology sector faces increasing regulatory scrutiny, particularly around data privacy, competition, and national security. Key considerations for tech M&A include:</p>
      <ul>
        <li>Data protection and privacy compliance</li>
        <li>Antitrust considerations</li>
        <li>National security reviews</li>
        <li>Cross-border transaction requirements</li>
      </ul>
      <p>Successful navigation of these regulatory challenges requires careful planning and expertise in both technology and regulatory compliance.</p>
    `,
    author: "Leo Meggitt",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    category: "Technology"
  },
  {
    id: 2,
    title: "Key Considerations for SME Valuations",
    excerpt: "Understanding the nuances of valuing small to medium enterprises in today's market, including both traditional methods and modern approaches.",
    content: `
      <h2>Key Considerations for SME Valuations</h2>
      <p>Valuing small to medium enterprises requires a comprehensive approach that considers both traditional metrics and modern market dynamics. The complexity of today's business environment demands a nuanced understanding of various factors that can impact company value.</p>
      
      <h3>1. Traditional Valuation Methods</h3>
      <p>While EBITDA multiples and revenue-based valuations remain important, they must be adjusted for current market conditions and industry-specific factors. Key considerations include:</p>
      <ul>
        <li>Industry-specific multiples and benchmarks</li>
        <li>Historical financial performance</li>
        <li>Working capital requirements</li>
        <li>Capital expenditure needs</li>
        <li>Debt and liability structure</li>
      </ul>
      <p>These traditional metrics provide a foundation for valuation but must be contextualized within the current market environment and company-specific factors.</p>
      
      <h3>2. Technology Integration and Digital Maturity</h3>
      <p>The level of digital transformation and technology adoption can significantly impact valuations. Companies with modern tech stacks and digital capabilities often command higher multiples. Important factors include:</p>
      <ul>
        <li>Technology infrastructure and scalability</li>
        <li>Digital customer engagement capabilities</li>
        <li>Data analytics and business intelligence</li>
        <li>Automation and operational efficiency</li>
        <li>Cybersecurity measures and resilience</li>
      </ul>
      <p>Companies that have successfully integrated technology into their operations often see valuations 15-25% higher than their less digitally mature peers.</p>
      
      <h3>3. Market Position and Competitive Advantage</h3>
      <p>A company's competitive position, market share, and growth potential are crucial factors in determining its value in today's dynamic business environment. Key areas of analysis include:</p>
      <ul>
        <li>Market share and positioning</li>
        <li>Brand strength and recognition</li>
        <li>Customer relationships and retention</li>
        <li>Intellectual property and proprietary technology</li>
        <li>Barriers to entry and competitive moats</li>
      </ul>
      <p>Strong market positions and sustainable competitive advantages can justify premium valuations, particularly in high-growth sectors.</p>

      <h3>4. Management Team and Human Capital</h3>
      <p>The quality and depth of the management team and workforce are increasingly important factors in SME valuations. Consider:</p>
      <ul>
        <li>Management team experience and track record</li>
        <li>Key employee retention and succession planning</li>
        <li>Workforce skills and capabilities</li>
        <li>Company culture and employee engagement</li>
        <li>Training and development programs</li>
      </ul>
      <p>Strong management teams and engaged workforces can significantly enhance company value and reduce execution risk.</p>

      <h3>5. Growth Potential and Scalability</h3>
      <p>Future growth potential is often a key driver of valuation premiums. Important considerations include:</p>
      <ul>
        <li>Market expansion opportunities</li>
        <li>Product development pipeline</li>
        <li>Geographic expansion potential</li>
        <li>Acquisition opportunities</li>
        <li>Operational scalability</li>
      </ul>
      <p>Companies with clear growth strategies and proven ability to execute often command higher valuations.</p>
    `,
    author: "Francis Martin CBE",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    category: "Valuation"
  },
  {
    id: 3,
    title: "Post-Merger Integration Success Strategies",
    excerpt: "Essential strategies for successful post-merger integration, focusing on culture, systems, and operational efficiency.",
    content: `
      <h2>Post-Merger Integration Success Strategies</h2>
      <p>Successful post-merger integration requires careful planning and execution across multiple dimensions. The integration phase is critical to realizing the expected value from M&A transactions and requires a comprehensive approach to address various challenges.</p>
      
      <h3>1. Cultural Integration</h3>
      <p>Merging different corporate cultures requires sensitivity, clear communication, and a well-defined strategy for creating a unified company culture. Key considerations include:</p>
      <ul>
        <li>Cultural assessment and gap analysis</li>
        <li>Leadership alignment and communication</li>
        <li>Employee engagement and retention</li>
        <li>Change management programs</li>
        <li>Integration of work practices and policies</li>
      </ul>
      <p>Research shows that cultural misalignment is a leading cause of merger failures, making this aspect particularly critical for success.</p>
      
      <h3>2. Systems and Technology Integration</h3>
      <p>Technical integration of systems and processes must be carefully planned to minimize disruption while maximizing efficiency gains. Important areas include:</p>
      <ul>
        <li>IT infrastructure and architecture</li>
        <li>Data migration and security</li>
        <li>Business process alignment</li>
        <li>Application portfolio rationalization</li>
        <li>Digital transformation opportunities</li>
      </ul>
      <p>A well-executed technology integration can drive significant synergies and operational improvements.</p>
      
      <h3>3. Operational Efficiency and Synergy Realization</h3>
      <p>Identifying and realizing synergies while maintaining business continuity is crucial for achieving the expected benefits of the merger. Focus areas include:</p>
      <ul>
        <li>Cost optimization opportunities</li>
        <li>Process standardization and improvement</li>
        <li>Supply chain integration</li>
        <li>Resource allocation and optimization</li>
        <li>Performance measurement and tracking</li>
      </ul>
      <p>Successful operational integration can lead to 20-30% cost savings and significant efficiency improvements.</p>

      <h3>4. Customer Experience and Market Positioning</h3>
      <p>Maintaining and enhancing customer relationships during integration is critical. Key considerations include:</p>
      <ul>
        <li>Customer communication strategy</li>
        <li>Service level maintenance</li>
        <li>Brand integration and positioning</li>
        <li>Sales force integration</li>
        <li>Product portfolio optimization</li>
      </ul>
      <p>A customer-centric approach to integration helps preserve and grow revenue during the transition.</p>

      <h3>5. Governance and Risk Management</h3>
      <p>Establishing effective governance and risk management frameworks is essential for integration success:</p>
      <ul>
        <li>Integration management office structure</li>
        <li>Decision-making processes</li>
        <li>Risk assessment and mitigation</li>
        <li>Compliance and regulatory requirements</li>
        <li>Performance monitoring and reporting</li>
      </ul>
      <p>Strong governance ensures accountability and enables rapid issue resolution during integration.</p>
    `,
    author: "Leo Meggitt",
    date: "March 5, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    category: "Integration"
  }
];

export default function Insights() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

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
            <Link to="/insights" className="hover:text-sand-light">Insights</Link>
            <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
              Contact Us
            </Link>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-24 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              M&A Insights & Analysis
            </h1>
            <p className="text-lg md:text-xl mb-8 text-sand-light">
              Expert perspectives on mergers, acquisitions, and strategic business growth from our team of experienced advisors.
            </p>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>

          {selectedPost ? (
            <div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="mb-8 text-navy hover:text-navy-light flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Insights
              </button>
              
              <article className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <img 
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm text-navy-light mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {selectedPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedPost.date}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedPost.readTime}
                  </div>
                </div>

                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </article>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative h-48">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-sand text-navy px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-navy mb-3">
                      {post.title}
                    </h2>
                    <p className="text-navy-light mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-navy-light">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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