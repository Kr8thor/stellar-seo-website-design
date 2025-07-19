/**
 * SEO Indexing Middleware
 * Ensures proper meta robots directives for all pages
 */

export const ensureIndexable = () => {
  // Remove any existing meta robots that might block indexing
  const existingMetaRobots = document.querySelectorAll('meta[name="robots"]');
  existingMetaRobots.forEach(meta => {
    // Only remove if it contains noindex
    if (meta.getAttribute('content')?.includes('noindex')) {
      meta.remove();
    }
  });

  // Add explicit indexing directive for main business pages
  const currentPath = window.location.pathname;
  const businessPages = ['/', '/about', '/services', '/portfolio', '/contact', '/app-building', '/workflow-automation', '/blog'];
  
  if (businessPages.includes(currentPath) || currentPath.startsWith('/blog/')) {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    document.head.appendChild(metaRobots);
  }
};

// Auto-execute when script loads
if (typeof window !== 'undefined') {
  // Run immediately
  ensureIndexable();
  
  // Also run after React hydration
  setTimeout(ensureIndexable, 100);
  
  // Monitor for route changes
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    setTimeout(ensureIndexable, 50);
  };
  
  const originalReplaceState = history.replaceState;
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    setTimeout(ensureIndexable, 50);
  };
  
  window.addEventListener('popstate', () => {
    setTimeout(ensureIndexable, 50);
  });
}
