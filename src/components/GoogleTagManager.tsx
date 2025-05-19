import { useEffect } from 'react';

const GTM_ID = 'GTM-P4KGF926';

/**
 * GoogleTagManager component for integrating Google Tag Manager with React
 * 
 * Note: This component is optional as GTM is already loaded in index.html,
 * but it's included for completeness and to support future dynamic configurations.
 */
const GoogleTagManager = () => {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Push standard events
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    
    // Note: Script injection is handled in index.html
    // This component can be used for additional dataLayer configuration
    
  }, []);
  
  return null; // No visual output - noscript tag is in index.html
};

export default GoogleTagManager;
