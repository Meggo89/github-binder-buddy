// Google Analytics 4, fired on every page load. Consent Mode v2 defaults to
// analytics_storage=granted (so pageview data flows) and ad_storage=denied
// (so no advertising cookies). The cookie banner can still upgrade or revoke
// these later, but data flows from the first visit, which is what we need.
//
// Privacy posture: anonymize_ip is on. No advertising cookies. No PII goes
// into the dataLayer from this firm-side code. UK ICO position on GA4 with
// IP anonymisation + analytics-only consent is broadly accepted for B2B
// sites of this kind, but talk to your DPO if you want a stricter default.

const GA_MEASUREMENT_ID = 'G-WQSRQFBCPC';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (window.gtag) return; // already loaded

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // Canonical Google snippet form: push the Arguments object, not a rest-array.
  // gtag.js internally inspects entries for Arguments-like behaviour; some
  // builds of the library have been observed to no-op silently when the queue
  // contains plain Arrays instead. ~10% candidate root cause for the silent
  // /collect drop, free defensive fix to match the official reference exactly.
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown as IArguments[]).push(arguments);
  }
  window.gtag = gtag as unknown as (...args: unknown[]) => void;

  // Consent Mode v2 default. Analytics on, advertising off.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  window.gtag('js', new Date());
  // send_page_view: false so the initial config command does NOT auto-fire
  // a page_view. usePageViewTracking() in src/hooks/usePageViewTracking.ts
  // owns every page_view event (initial mount + every SPA route change).
  // Without this, fixing the underlying transmission issue would cause a
  // duplicate page_view on first load.
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
}

// Fire a page_view event manually. Used by usePageViewTracking on every
// initial mount + SPA route change.
export function trackPageView() {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}

// Called by CookieConsent when the visitor explicitly rejects analytics.
// Doesn't unload the script (that would require a reload), just signals the
// data layer to stop storing cookies on subsequent events.
export function revokeAnalyticsConsent() {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
  });
}

export function grantAnalyticsConsent() {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}
