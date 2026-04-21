import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import londonSkyline from '../../assets/london-skyline.jpg';

interface PageLayoutProps {
  hero?: ReactNode;
  children: ReactNode;
  mainClassName?: string;
  heroImage?: string;
}

export function PageLayout({
  hero,
  children,
  mainClassName = 'py-20',
  heroImage = londonSkyline,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white page-enter">
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-navy/50 z-10"></div>
          <img src={heroImage} alt="London skyline" className="w-full h-full object-cover object-center" />
        </div>
        <Navigation />
        {hero && (
          <div className="container mx-auto px-6 py-16 relative z-20">{hero}</div>
        )}
      </header>
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
