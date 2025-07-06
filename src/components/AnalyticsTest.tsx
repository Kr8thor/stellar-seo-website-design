import React, { useEffect } from 'react';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';

const AnalyticsTest = () => {
  const analytics = useAnalyticsContext();

  useEffect(() => {
    console.log('Analytics Test Component Mounted');
    console.log('Analytics Context:', analytics);
    
    // Check if analytics scripts are loaded
    setTimeout(() => {
      console.log('Checking analytics after 2 seconds:');
      console.log('Google Analytics (gtag):', typeof window.gtag);
      console.log('Google Tag Manager (dataLayer):', window.dataLayer);
      console.log('Microsoft Clarity:', typeof window.clarity);
    }, 2000);
  }, [analytics]);

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Analytics Test</h2>
      <div className="space-y-2">
        <p>Analytics Enabled: {analytics.isEnabled ? '✅ Yes' : '❌ No'}</p>
        <p>GA ID: {analytics.gaId || 'Not set'}</p>
        <p>Clarity ID: {analytics.clarityId || 'Not set'}</p>
        <p>GTM ID: {analytics.gtmId || 'Not set'}</p>
        <p className="text-sm text-gray-600 mt-4">Check browser console for detailed analytics info</p>
      </div>
    </div>
  );
};

export default AnalyticsTest;