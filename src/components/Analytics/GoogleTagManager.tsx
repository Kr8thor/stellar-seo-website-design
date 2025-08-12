import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Tag Manager Configuration
const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-5R45LHS7';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const GoogleTagManager = () => {
  const location = useLocation();

  useEffect(() => {
    // GTM is already loaded in the HTML template for all visitors
    // This component now only handles React-specific events
    
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Track React app initialization
      window.dataLayer.push({
        'event': 'react_app_initialized',
        'react_version': '18.3.1',
        'app_type': 'spa',
        'initial_path': location.pathname
      });
    }
  }, []);

  // Track route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Push route change event to dataLayer
      window.dataLayer.push({
        'event': 'react_route_change',
        'page_path': location.pathname,
        'page_location': window.location.href,
        'page_title': document.title
      });

      // Also track as a virtual pageview
      window.dataLayer.push({
        'event': 'virtual_pageview',
        'virtual_page_path': location.pathname,
        'virtual_page_title': document.title,
        'virtual_page_location': window.location.href
      });
    }
  }, [location]);

  return null;
};