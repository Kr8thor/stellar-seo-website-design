import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendMetrics = (metrics: PerformanceMetrics) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', metrics);
      }
      
      // In production, send to analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to Google Analytics 4
        if (typeof gtag !== 'undefined') {
          Object.entries(metrics).forEach(([metric, value]) => {
            if (value !== undefined) {
              gtag('event', metric, {
                value: Math.round(value),
                custom_parameter_1: 'core_web_vitals'
              });
            }
          });
        }
      }
    };

    // Measure Core Web Vitals
    const measureCoreWebVitals = () => {
      // First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            sendMetrics({ fcp: entry.startTime });
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        sendMetrics({ lcp: lastEntry.startTime });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          sendMetrics({ fid: entry.processingStart - entry.startTime });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        sendMetrics({ cls: clsValue });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Time to First Byte
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const navEntry = entry as PerformanceNavigationTiming;
          const ttfb = navEntry.responseStart - navEntry.requestStart;
          sendMetrics({ ttfb });
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      // Cleanup function
      return () => {
        observer.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        navigationObserver.disconnect();
      };
    };

    // Only run if PerformanceObserver is supported
    if ('PerformanceObserver' in window) {
      const cleanup = measureCoreWebVitals();
      return cleanup;
    }
  }, []);

  // Function to manually report custom metrics
  const reportCustomMetric = (name: string, value: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Custom Metric - ${name}:`, value);
    }
    
    if (process.env.NODE_ENV === 'production' && typeof gtag !== 'undefined') {
      gtag('event', 'custom_metric', {
        custom_parameter_1: name,
        value: Math.round(value)
      });
    }
  };

  return { reportCustomMetric };
};

// Global performance monitoring utility
export const trackPageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      // Measure page load time
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Page Load Time:', loadTime + 'ms');
      }
      
      if (process.env.NODE_ENV === 'production' && typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          value: loadTime,
          custom_parameter_1: 'performance'
        });
      }
    });
  }
};