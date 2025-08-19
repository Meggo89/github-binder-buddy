import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true as these are essential
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made cookie choices
    const cookieChoices = localStorage.getItem('cookiePreferences');
    if (!cookieChoices) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(cookieChoices));
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-6 py-6">
        {showPreferences ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-navy mb-2">Cookie Preferences</h3>
                <p className="text-navy-light">Customize your cookie preferences below</p>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-navy-light hover:text-navy"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    id="necessary"
                    checked={preferences.necessary}
                    disabled
                    className="rounded border-gray-300 text-navy focus:ring-navy"
                  />
                </div>
                <div>
                  <label htmlFor="necessary" className="font-medium text-navy block">
                    Necessary Cookies
                  </label>
                  <p className="text-sm text-navy-light">
                    Essential cookies that enable basic functionality and security features.
                    These cannot be disabled.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    id="analytics"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="rounded border-gray-300 text-navy focus:ring-navy"
                  />
                </div>
                <div>
                  <label htmlFor="analytics" className="font-medium text-navy block">
                    Analytics Cookies
                  </label>
                  <p className="text-sm text-navy-light">
                    Help us understand how visitors interact with our website by collecting
                    and reporting anonymous information.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="rounded border-gray-300 text-navy focus:ring-navy"
                  />
                </div>
                <div>
                  <label htmlFor="marketing" className="font-medium text-navy block">
                    Marketing Cookies
                  </label>
                  <p className="text-sm text-navy-light">
                    Used to track visitors across websites to enable personalized
                    advertisements and content.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 border border-navy text-navy rounded-lg hover:bg-navy-light hover:text-white transition"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-navy mb-2">We Value Your Privacy</h3>
              <p className="text-navy-light">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-6 py-2 border border-navy text-navy rounded-lg hover:bg-navy-light hover:text-white transition"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition"
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}