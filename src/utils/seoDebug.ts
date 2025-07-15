// SEO Debug Utility
// Use this to verify SEO implementation is working correctly

export const debugSEO = () => {
  console.log('🔍 SEO Debug Information:');
  
  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  console.log('📍 Canonical URL:', canonical?.getAttribute('href'));
  
  // Check meta description
  const description = document.querySelector('meta[name="description"]');
  console.log('📝 Meta Description:', description?.getAttribute('content'));
  
  // Check robots meta
  const robots = document.querySelector('meta[name="robots"]');
  console.log('🤖 Robots Meta:', robots?.getAttribute('content'));
  
  // Check page title
  console.log('📖 Page Title:', document.title);
  
  // Check Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  
  console.log('📱 Open Graph:');
  console.log('  - Title:', ogTitle?.getAttribute('content'));
  console.log('  - Description:', ogDescription?.getAttribute('content'));
  console.log('  - URL:', ogUrl?.getAttribute('content'));
  
  // Check for duplicate meta tags
  const allMetaTags = document.querySelectorAll('meta');
  const metaNames = new Map();
  
  allMetaTags.forEach(meta => {
    const name = meta.getAttribute('name') || meta.getAttribute('property');
    if (name) {
      if (metaNames.has(name)) {
        console.warn('⚠️ Duplicate meta tag found:', name);
      } else {
        metaNames.set(name, true);
      }
    }
  });
  
  // Check current URL
  console.log('🌐 Current URL:', window.location.href);
  
  // Verify structured data
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  console.log('📊 Structured Data Scripts:', scripts.length);
  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent || '');
      console.log(`  - Script ${index + 1}:`, data['@type']);
    } catch (e) {
      console.error(`  - Script ${index + 1}: Invalid JSON`);
    }
  });
};

// Run debug in console: window.debugSEO()
if (typeof window !== 'undefined') {
  (window as any).debugSEO = debugSEO;
}
