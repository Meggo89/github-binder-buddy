import { Routes, Route } from 'react-router-dom';
import { CookieConsent } from './components/CookieConsent';
import { usePageViewTracking } from './hooks/usePageViewTracking';

// Eager imports across all 16 page components. Previously these were
// lazy() / React.lazy code-split, but SSR + hydration + lazy is a deep
// rabbit hole (Suspense boundaries SSR to fallbacks, lazy chunks must
// preload before hydrateRoot, mismatches reset the whole tree). Eager
// imports add ~80KB gzipped to the main bundle and remove all of that
// complexity — acceptable trade for clean SSR.
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Process from './pages/Process';
import Team from './pages/Team';
import Insights from './pages/Insights';
import InsightArticle from './pages/InsightArticle';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ExecutiveSearch from './pages/ExecutiveSearch';
import SectorsHub from './pages/SectorsHub';
import SectorPillar from './pages/SectorPillar';
import NicheLanding from './pages/NicheLanding';
import ServiceLanding from './pages/ServiceLanding';
import ResourceLanding from './pages/ResourceLanding';

export default function App() {
  usePageViewTracking();
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-accent focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/team" element={<Team />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightArticle />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/executive-search" element={<ExecutiveSearch />} />
        <Route path="/sectors" element={<SectorsHub />} />
        <Route path="/sectors/:slug" element={<SectorPillar />} />
        <Route path="/sectors/:pillarSlug/:slug" element={<NicheLanding />} />
        <Route path="/services/:slug" element={<ServiceLanding />} />
        <Route path="/resources/:slug" element={<ResourceLanding />} />
      </Routes>
      <CookieConsent />
    </>
  );
}
