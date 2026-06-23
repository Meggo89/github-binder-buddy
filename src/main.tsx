import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { initAnalytics } from './utils/analytics';
import './index.css';

// Fire GA on every page load. Cookie banner can upgrade or revoke later,
// but data flows from the first visit either way.
initAnalytics();

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Prod: prerender.ts injects SSR'd content into #root, so hydrateRoot
// takes over the existing DOM. Dev: vite serves the bare shell, so #root
// is empty and we createRoot fresh. hasChildNodes() handles both cases
// without flag-based branching.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
