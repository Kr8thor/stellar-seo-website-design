import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-C4RC6CSFG6';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll send page views manually
      });
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

// Utility function for tracking events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Common event tracking functions
export const trackContactFormSubmission = (formType: string) => {
  trackEvent('generate_lead', {
    form_type: formType,
    page_location: window.location.pathname,
  });
};

export const trackServiceClick = (serviceName: string) => {
  trackEvent('service_click', {
    service_name: serviceName,
    page_location: window.location.pathname,
  });
};

export const trackPortfolioView = (projectName: string) => {
  trackEvent('view_portfolio_item', {
    project_name: projectName,
    page_location: window.location.pathname,
  });
};