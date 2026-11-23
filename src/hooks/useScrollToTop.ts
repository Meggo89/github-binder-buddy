import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Start every newly opened page at the top. A link to a section on a page (#id) goes to
// that section instead. Back and forward keep the browser's remembered position.
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') return;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash, navigationType]);
}
