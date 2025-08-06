// UPDATE COMPREHENSIVE BUILD TO USE COMPLETE DYNAMIC SITEMAP
// Add this function to replace the existing generateSitemap function

function generateCompleteDynamicSitemap(allRoutes) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Ensure all blog posts are included
  const ALL_BLOG_POSTS = [
    'local-seo-2025',
    'ai-midlife-crisis', 
    'on-page-seo-tactics-2025',
    'core-web-vitals-seo-2025',
    'technical-seo-fundamentals',
    'content-strategy-beyond-keywords',
    'link-building-2025-quality',
    'mobile-first-indexing-ready',
    'ai-revolution-seo-strategy'
  ];
  
  // Create a complete route list
  const completeRoutes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/services', priority: 0.9, changefreq: 'weekly' },
    { path: '/about', priority: 0.9, changefreq: 'monthly' },
    { path: '/services-pricing', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/portfolio', priority: 0.8, changefreq: 'weekly' },
    { path: '/app-building', priority: 0.9, changefreq: 'weekly' },
    { path: '/workflow-automation', priority: 0.9, changefreq: 'weekly' },
    { path: '/blog', priority: 0.7, changefreq: 'daily' }
  ];
  
  // Add all blog posts
  ALL_BLOG_POSTS.forEach(slug => {
    completeRoutes.push({
      path: `/blog/${slug}`,
      priority: 0.7,
      changefreq: 'monthly'
    });
  });
  
  // Generate sitemap entries
  const sitemapEntries = completeRoutes
    .map(route => {
      return `  <url>
    <loc>https://mardenseo.com${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
}

// To implement in build-comprehensive-static-ssg.mjs:
// Replace line ~1040:
// const sitemapContent = generateSitemap(allRoutes);
// With:
// const sitemapContent = generateCompleteDynamicSitemap(allRoutes);
