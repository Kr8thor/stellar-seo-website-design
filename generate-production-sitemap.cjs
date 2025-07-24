// Simple, working sitemap generator for production
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://mardenseo.com';
const OUTPUT_PATH = './dist/sitemap.xml';

// Function to get current date
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Function to recursively scan directories
function scanDirectory(dirPath, urlPath = '') {
  const foundPages = [];
  
  try {
    if (!fs.existsSync(dirPath)) {
      return foundPages;
    }
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      
      if (!fs.existsSync(fullPath)) {
        continue;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'assets' && item !== 'client' && item !== 'server') {
        // Skip system pages
        if (['admin', 'cart', 'analytics-test', 'debug'].includes(item)) {
          continue;
        }
        
        const newUrlPath = urlPath + '/' + item;
        
        // Check if this directory has an index.html
        const indexPath = path.join(fullPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          foundPages.push({
            url: newUrlPath + '/',
            lastmod: getCurrentDate(),
            priority: newUrlPath.includes('/blog/') ? '0.8' : 
                     newUrlPath === '/services' || newUrlPath === '/about' ? '0.9' :
                     newUrlPath === '/' ? '1.0' : '0.7',
            changefreq: newUrlPath.includes('/blog/') ? 'monthly' : 
                       newUrlPath === '/' ? 'weekly' : 
                       newUrlPath === '/blog' ? 'daily' : 'monthly'
          });
        }
        
        // Recursively scan subdirectories
        foundPages.push(...scanDirectory(fullPath, newUrlPath));
      }
    }
  } catch (error) {
    console.warn('Error scanning directory:', error.message);
  }
  
  return foundPages;
}

// Main function
function generateSitemap() {
  console.log('🚀 Generating production-safe sitemap...');
  
  const currentDate = getCurrentDate();
  
  // Always include home page
  const allRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate }
  ];
  
  // Scan for actual pages
  const scannedPages = scanDirectory('./dist');
  
  // Add scanned pages, avoiding duplicates
  const existingUrls = new Set(['/']);
  
  for (const page of scannedPages) {
    if (!existingUrls.has(page.url)) {
      allRoutes.push(page);
      existingUrls.add(page.url);
    }
  }
  
  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of allRoutes) {
    xml += `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  // Write sitemap
  try {
    const distDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
    
    console.log('✅ Production sitemap generated successfully!');
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Total URLs: ${allRoutes.length}`);
    
    // Log what was found
    console.log('\n📋 Pages included:');
    allRoutes.forEach(route => {
      console.log(`  • ${route.url} (${route.priority})`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return false;
  }
}

// Run the generator
generateSitemap();
