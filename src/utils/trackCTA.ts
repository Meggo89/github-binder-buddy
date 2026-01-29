/**
 * Track CTA button clicks via Google Analytics.
 * Call this onClick for key conversion buttons.
 */
export function trackCTA(label: string, location: string) {
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'conversion',
      event_label: label,
      cta_location: location,
      page_path: window.location.pathname,
    });
  }
}
