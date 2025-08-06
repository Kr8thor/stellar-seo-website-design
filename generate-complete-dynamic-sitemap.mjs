// COMPLETE DYNAMIC SITEMAP GENERATOR WITH ALL BLOG POSTS
// This ensures ALL content is included in the sitemap

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Complete list of all blog posts (from comprehensive build)
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

async function generateCompleteDynamicSitemap() {
  console.log('🗺️ Generating COMPLETE dynamic sitemap with ALL content...');
  
  const currentDate = new Date().toISOString().split('T')[0];
  const siteUrl = 'https://mardenseo.com';
  
  // Define all routes with proper priorities and changefreq
  const routes = [
    // Homepage
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    
    // Core business pages
    { path: '/services', priority: 0.9, changefreq: 'weekly' },
    { path: '/about', priority: 0.9, changefreq: 'monthly' },
    { path: '/services-pricing', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/portfolio', priority: 0.8, changefreq: 'weekly' },
    
    // Specialized services
    { path: '/app-building', priority: 0.9, changefreq: 'weekly' },
    { path: '/workflow-automation', priority: 0.9, changefreq: 'weekly' },
    
    // Blog listing
    { path: '/blog', priority: 0.7, changefreq: 'daily' }
  ];
  
  // Add ALL blog posts
  ALL_BLOG_POSTS.forEach(slug => {
    routes.push({
      path: `/blog/${slug}`,
      priority: 0.7,
      changefreq: 'monthly'
    });
  });
  
  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of routes) {
    xml += `
  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  // Write to dist directory
  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  
  try {
    await fs.writeFile(sitemapPath, xml, 'utf8');
    console.log('✅ Complete dynamic sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${routes.length}`);
    console.log(`📝 Blog posts included: ${ALL_BLOG_POSTS.length}`);
    console.log(`📅 Last modified: ${currentDate}`);
    
    // Log all included routes
    console.log('\n📋 All routes included:');
    routes.forEach(route => {
      console.log(`  • ${route.path} (priority: ${route.priority})`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return false;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCompleteDynamicSitemap();
}

export default generateCompleteDynamicSitemap;
