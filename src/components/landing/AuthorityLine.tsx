import { Link } from 'react-router-dom';

// Expertise / author signal placed near the top of each landing page body.
// Helps human readers and AI/AEO crawlers attribute the content to a named
// authority within the firm.
export function AuthorityLine() {
  return (
    <p className="text-sm font-mono text-navy-light tracking-wide mb-8">
      <span className="text-accent-dark">Advised by </span>
      <Link to="/team/" className="text-navy hover:text-accent-dark underline-offset-4 hover:underline">
        Leo Meggitt
      </Link>
      <span className="text-navy">, Managing Director, Mastella Advisory</span>
    </p>
  );
}
