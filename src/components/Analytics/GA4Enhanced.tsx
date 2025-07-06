import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: any;
  }
}

export const GA4Enhanced = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views with enhanced data
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
        send_to: import.meta.env.VITE_GA_ID || 'G-YOUR_MEASUREMENT_ID'
      });
    }
  }, [location]);

  useEffect(() => {
    if (typeof window.gtag === 'undefined') return;

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          window.gtag('event', 'scroll', {
            percent_scrolled: scrollPercent,
            page_location: window.location.href
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, []);

  return null;
};
