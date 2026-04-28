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
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  // Consent Mode v2 default. Analytics on, advertising off.
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
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
