// ACCURATE DYNAMIC SITEMAP GENERATOR
// Automatically discovers actual blog posts instead of hardcoding

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateAccurateDynamicSitemap() {
  console.log('🗺️ Generating accurate dynamic sitemap...');
  
  const currentDate = new Date().toISOString().split('T')[0];
  const siteUrl = 'https://mardenseo.com';
  
  // Core static routes
  const staticRoutes = [
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
  
  // Discover actual blog posts
  const blogDir = path.join(__dirname, 'dist', 'blog');
  let blogPosts = [];
  
  try {
    const items = await fs.readdir(blogDir);
    
    for (const item of items) {
      const itemPath = path.join(blogDir, item);
      const stat = await fs.stat(itemPath);
      
      // Check if it's a directory (blog post) and not index.html
      if (stat.isDirectory()) {
        // Verify it has an index.html file
        const indexPath = path.join(itemPath, 'index.html');
        try {
          await fs.access(indexPath);
          blogPosts.push({
            path: `/blog/${item}`,
            priority: 0.7,
            changefreq: 'monthly'
          });
          console.log(`  ✅ Found blog post: /blog/${item}`);
        } catch {
          console.log(`  ⚠️ Skipping ${item} - no index.html found`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error reading blog directory:', error);
  }
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...blogPosts];
  
  // Generate sitemap XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of allRoutes) {
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

  // Write sitemap
  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  
  try {
    await fs.writeFile(sitemapPath, xml, 'utf8');
    console.log('\n✅ Accurate dynamic sitemap generated!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${allRoutes.length}`);
    console.log(`📝 Blog posts found: ${blogPosts.length}`);
    console.log(`📅 Last modified: ${currentDate}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error writing sitemap:', error);
    return false;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAccurateDynamicSitemap();
}

export default generateAccurateDynamicSitemap;
