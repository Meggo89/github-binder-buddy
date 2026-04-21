import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import londonSkyline from '../../assets/london-skyline.jpg';

type HeroTone = 'image' | 'solid' | 'ink';

interface PageLayoutProps {
  hero?: ReactNode;
  children: ReactNode;
  mainClassName?: string;
  heroImage?: string;
  heroTone?: HeroTone;
}

const heroToneClasses: Record<HeroTone, string> = {
  image: 'bg-gradient-to-br from-navy-deepest via-navy-dark to-navy text-white',
  solid: 'bg-gradient-to-br from-navy-deepest to-navy-dark text-white',
  ink: 'bg-gradient-to-br from-ink via-ink-light to-navy-deepest text-white',
};

export function PageLayout({
  hero,
  children,
  mainClassName = 'py-24',
  heroImage = londonSkyline,
  heroTone = 'image',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white page-enter">
      <header className={`${heroToneClasses[heroTone]} relative overflow-hidden`}>
        {heroTone === 'image' && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-deepest/80 via-navy-dark/70 to-navy/60 z-10"></div>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-70"
            />
          </div>
        )}
        {(heroTone === 'solid' || heroTone === 'ink') && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-navy-light/10 blur-3xl"></div>
          </div>
        )}
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
