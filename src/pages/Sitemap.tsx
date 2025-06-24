import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Set document title for this route
    document.title = 'Sitemap - Marden SEO';
    
    // Update the URL without navigation
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      window.history.replaceState(null, 'Sitemap', '/sitemap.xml');
    }
    
    // Set meta content type
    const metaTag = document.querySelector('meta[http-equiv="Content-Type"]');
    if (metaTag) {
      metaTag.setAttribute('content', 'application/xml; charset=UTF-8');
    } else {
      const newMetaTag = document.createElement('meta');
      newMetaTag.setAttribute('http-equiv', 'Content-Type');
      newMetaTag.setAttribute('content', 'application/xml; charset=UTF-8');
      document.head.appendChild(newMetaTag);
    }
  }, []);

  // Raw XML content without any HTML wrapper
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
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

</urlset>`;

  return (
    <pre 
      style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        fontSize: '14px',
        lineHeight: '1.2',
        background: 'transparent',
        border: 'none'
      }}
      dangerouslySetInnerHTML={{ __html: xmlContent }}
    />
  );
};

export default Sitemap;