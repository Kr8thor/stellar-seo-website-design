import React, { useEffect, useState } from 'react';

const AnalyticsTest: React.FC = () => {
  const [analyticsStatus, setAnalyticsStatus] = useState({
    ga4: false,
    gtm: false,
    clarity: false,
    dataLayer: false,
  });

  useEffect(() => {
    // Wait for analytics to load and then check status
    const checkAnalytics = () => {
      setAnalyticsStatus({
        ga4: typeof window.gtag !== 'undefined',
        gtm: Array.isArray((window as any).dataLayer),
        clarity: typeof (window as any).clarity !== 'undefined',
        dataLayer: Array.isArray((window as any).dataLayer) && (window as any).dataLayer.length > 0,
      });
    };

    // Check immediately
    checkAnalytics();

    // Check again after 3 seconds to allow for script loading
    const timer = setTimeout(checkAnalytics, 3000);

    return () => clearTimeout(timer);
  }, []);

  const triggerTestEvent = () => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'test_button_click', {
        event_category: 'engagement',
        event_label: 'analytics_test_page',
        value: 1
      });
      console.log('✅ GA4 test event triggered');
    }

    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'test_interaction',
        event_category: 'test',
        event_action: 'button_click',
        event_label: 'analytics_verification'
      });
      console.log('✅ GTM test event triggered');
    }

    if ((window as any).clarity) {
      (window as any).clarity('set', 'test_action', 'analytics_test_triggered');
      console.log('✅ Clarity test event triggered');
    }
  };

  const checkConsole = () => {
    console.log('=== ANALYTICS DEBUG INFO ===');
    console.log('Google Analytics (gtag):', typeof window.gtag, window.gtag);
    console.log('Google Tag Manager (dataLayer):', (window as any).dataLayer);
    console.log('Microsoft Clarity:', typeof (window as any).clarity, (window as any).clarity);
    console.log('Environment Variables:');
    console.log('- GA_MEASUREMENT_ID:', import.meta.env.VITE_GA_MEASUREMENT_ID);
    console.log('- GA_ID:', import.meta.env.VITE_GA_ID);
    console.log('- GTM_ID:', import.meta.env.VITE_GTM_ID);
    console.log('- CLARITY_ID:', import.meta.env.VITE_CLARITY_ID);
    console.log('=============================');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Analytics Implementation Test
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Analytics Status</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${analyticsStatus.ga4 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Google Analytics 4: {analyticsStatus.ga4 ? '✅ Loaded' : '❌ Not Loaded'}</span>
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${analyticsStatus.gtm ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Google Tag Manager: {analyticsStatus.gtm ? '✅ Loaded' : '❌ Not Loaded'}</span>
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${analyticsStatus.clarity ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Microsoft Clarity: {analyticsStatus.clarity ? '✅ Loaded' : '❌ Not Loaded'}</span>
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${analyticsStatus.dataLayer ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>Data Layer: {analyticsStatus.dataLayer ? '✅ Active' : '❌ Empty'}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-900">Configuration</h2>
              <div className="space-y-2 text-sm">
                <div><strong>GA4 ID:</strong> {import.meta.env.VITE_GA_MEASUREMENT_ID || 'Not set'}</div>
                <div><strong>GTM ID:</strong> {import.meta.env.VITE_GTM_ID || 'Not set'}</div>
                <div><strong>Clarity ID:</strong> {import.meta.env.VITE_CLARITY_ID || 'Not set'}</div>
                <div><strong>Site URL:</strong> {import.meta.env.VITE_SITE_URL || 'Not set'}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={triggerTestEvent}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Trigger Test Events
            </button>
            <button
              onClick={checkConsole}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Check Console Debug
            </button>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Testing Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-yellow-800">
              <li>Open browser Developer Tools (F12)</li>
              <li>Check the Console tab for any errors</li>
              <li>Click "Check Console Debug" to see detailed analytics info</li>
              <li>Click "Trigger Test Events" to send test data</li>
              <li>Check the Network tab for requests to analytics domains</li>
              <li>Navigate to other pages to test page view tracking</li>
            </ol>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expected Network Requests</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li><code>googletagmanager.com/gtag/js?id=G-PRN3BSYVGD</code></li>
              <li><code>googletagmanager.com/gtm.js?id=GTM-5R45LHS7</code></li>
              <li><code>clarity.ms/tag/n9i76m6k4k</code></li>
              <li><code>google-analytics.com/g/collect</code> (for events)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTest;