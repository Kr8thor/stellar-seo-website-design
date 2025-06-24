import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Set the document content type to XML
    document.contentType = 'application/xml';
    
    // Set the page title to indicate this is a sitemap
    document.title = 'Sitemap - Marden SEO';
    
    // Try to set response headers (limited in client-side React)
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      // This helps with some hosting setups
      window.history.replaceState(null, 'Sitemap', '/sitemap.xml');
    }
  }, []);

  // Return XML content as JSX
  // Note: React will render this as HTML, but search engines can still parse it
  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0, padding: 0 }}>
      {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://mardenseo.com/</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Core Business Pages - High Priority -->
  <url>
    <loc>https://mardenseo.com/services</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/about</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/contact</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Service Pages - High Priority -->
  <url>
    <loc>https://mardenseo.com/app-building</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/workflow-automation</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Portfolio and Content Pages -->
  <url>
    <loc>https://mardenseo.com/portfolio</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/blog</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Sample Blog Posts - These would typically be generated dynamically -->
  <url>
    <loc>https://mardenseo.com/blog/seo-best-practices-2025</loc>
    <lastmod>2025-06-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/blog/react-seo-optimization</loc>
    <lastmod>2025-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/blog/workflow-automation-guide</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/blog/app-development-trends</loc>
    <lastmod>2025-06-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/blog/schema-markup-guide</loc>
    <lastmod>2025-06-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Sample Case Studies - These would typically be generated dynamically -->
  <url>
    <loc>https://mardenseo.com/case-study/ecommerce-seo-success</loc>
    <lastmod>2025-06-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/case-study/saas-app-development</loc>
    <lastmod>2025-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/case-study/automation-workflow-implementation</loc>
    <lastmod>2025-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/case-study/local-business-seo</loc>
    <lastmod>2025-06-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>`}
    </div>
  );
};

export default Sitemap;