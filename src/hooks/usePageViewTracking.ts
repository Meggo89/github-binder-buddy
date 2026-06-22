import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

// Fires a GA4 page_view event on initial mount and on every SPA route change.
// Paired with `send_page_view: false` in initAnalytics()'s config call so we
// own the lifecycle of every page_view (no auto-fire-then-manual duplication).
//
// document.title can lag behind the route by one paint because react-helmet
// updates the title via a side-effect after the route's component renders.
// A microtask defer is enough to capture the new title in nearly every case.
export function usePageViewTracking() {
  const location = useLocation();

  useEffect(() => {
    const handle = window.setTimeout(() => {
      trackPageView();
    }, 0);
    return () => window.clearTimeout(handle);
  }, [location.pathname, location.search]);
}
