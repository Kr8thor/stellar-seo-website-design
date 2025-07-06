/**
 * Core Web Vitals & Performance Optimization
 * Monitors and optimizes website performance metrics
 */

// Core Web Vitals monitoring
export const measureCoreWebVitals = () => {
  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  };

  // First Input Delay (FID)
  const observeFID = () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  };

  observeLCP();
  observeFID();
  observeCLS();
};

// Image optimization utilities
export const optimizeImages = () => {
  // Lazy load images that are not in viewport
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/fonts/inter-var.woff2',
    '/images/hero-bg.webp',
    '/css/critical.css'
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.includes('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resource.includes('.webp') || resource.includes('.jpg')) {
      link.as = 'image';
    } else if (resource.includes('.css')) {
      link.as = 'style';
    }
    
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Run on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      measureCoreWebVitals();
      optimizeImages();
      preloadCriticalResources();
    });
  } else {
    measureCoreWebVitals();
    optimizeImages();
    preloadCriticalResources();
  }
};

export default initPerformanceOptimizations;