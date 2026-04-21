import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';
import francisMartin from '../assets/francis-martin.jpg';
import erikVynkier from '../assets/erik-vynkier.jpg';

const members = [
  {
    name: 'Leo Meggitt',
    title: 'Managing Director',
    image: '/lovable-uploads/5a8b577b-26fe-4020-b9c9-cecef8f4f735.png',
    imagePosition: 'object-[center_30%]',
    linkedin: 'https://www.linkedin.com/in/leomeggitt/',
    description:
      '20+ years experience in M&A, fundraising, executive search and leadership consulting. Investor and advisor to early-stage companies.',
  },
  {
    name: 'Francis Martin CBE',
    title: 'Director',
    image: francisMartin,
    imagePosition: 'object-[center_35%]',
    linkedin: 'https://www.linkedin.com/in/francis-martin-cbe-54aborb/',
    description:
      'Distinguished advisor with 25+ years in strategic consulting. Former President of British Chambers of Commerce and recipient of Commander of the British Empire.',
  },
  {
    name: 'Erik Vynkier',
    title: 'Senior Advisor',
    image: erikVynkier,
    linkedin: 'https://www.linkedin.com/in/erikvynkier/',
    description:
      'Highly experienced in financial services, asset management and private equity. Has worked on deals across multiple sectors and geographies.',
  },
];

export default function Team() {
  return (
    <PageLayout>
      <SEO
        title="Our Team - Experienced M&A Advisors"
        description="Meet the Mastella Advisory leadership team. Over 50 years of combined experience in M&A, fundraising, executive search, and strategic consulting."
        canonical="https://mastellagroup.com/team"
      />
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-navy mb-12">Our Team</h1>
        <h2 className="sr-only">Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className={`w-full h-64 object-cover ${member.imagePosition || 'object-center'}`}
              />
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-navy">{member.name}</h3>
                  <p className="text-navy-light font-medium">{member.title}</p>
                </div>
                <p className="text-navy-light mb-4">{member.description}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-navy hover:text-navy-light transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
