import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

type HeroTone = 'image' | 'solid' | 'ink';

interface PageLayoutProps {
  hero?: ReactNode;
  children: ReactNode;
  mainClassName?: string;
  // Kept for compatibility; heroes no longer show a background image.
  heroImage?: string;
  heroTone?: HeroTone;
}

// Every hero now sits on warm paper; the tone is kept in the API so pages need no changes.
const heroToneClasses: Record<HeroTone, string> = {
  image: 'paper-scope bg-paper text-navy border-b border-accent/40',
  solid: 'paper-scope bg-paper text-navy border-b border-accent/40',
  ink: 'paper-scope bg-paper text-navy border-b border-accent/40',
};

export function PageLayout({
  hero,
  children,
  mainClassName = 'py-24',
  heroTone = 'image',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      <header className={`${heroToneClasses[heroTone]} relative overflow-hidden`}>
        <div className="relative z-20">
          <Navigation />
          {hero && <div className="container mx-auto px-6 py-20 md:py-28">{hero}</div>}
        </div>
      </header>
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
