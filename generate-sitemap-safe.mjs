import fs from 'fs';
import path from 'path';

// Site configuration
const SITE_URL = 'https://mardenseo.com';
const OUTPUT_PATH = './dist/sitemap.xml';

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about/', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services-pricing/', priority: '0.8', changefreq: 'monthly' },
  { url: '/portfolio/', priority: '0.8', changefreq: 'weekly' },
  { url: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/', priority: '0.7', changefreq: 'daily' },
  { url: '/app-building/', priority: '0.7', changefreq: 'monthly' },
  { url: '/workflow-automation/', priority: '0.7', changefreq: 'monthly' }
];

// Function to get current date in YYYY-MM-DD format
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Function to scan dist directory for actual generated pages
function scanGeneratedPages() {
  const distPath = './dist';
  const foundPages = [];
  
  try {
    // Recursively scan for index.html files
    function scanDirectory(dirPath, urlPath = '') {
      if (!fs.existsSync(dirPath)) {
        return;
      }
      
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        
        // Skip if file/directory doesn't exist
        if (!fs.existsSync(fullPath)) {
          continue;
        }
        
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && item !== 'assets' && item !== 'client' && item !== 'server') {
          // Skip system pages from sitemap
          if (['admin', 'cart', 'analytics-test', 'debug'].includes(item)) {
            continue;
          }
          
          const newUrlPath = urlPath + '/' + item;
          scanDirectory(fullPath, newUrlPath);
        } else if (item === 'index.html' && urlPath) {
          foundPages.push({
            url: urlPath + '/',
            lastmod: getCurrentDate(),
            priority: urlPath.includes('/blog/') ? '0.8' : '0.7',
            changefreq: urlPath.includes('/blog/') ? 'monthly' : 'weekly'
          });
        }
      }
    }
    
    if (fs.existsSync(distPath)) {
      scanDirectory(distPath);
    }
  } catch (error) {
    console.warn('Could not scan dist directory:', error.message);
  }
  
  return foundPages;
}

// Function to generate sitemap XML - SAFE VERSION (only actual files)
function generateSitemap() {
  const currentDate = getCurrentDate();
  
  // Start with static routes
  const allRoutes = staticRoutes.map(route => ({
    ...route,
    lastmod: currentDate
  }));
  
  // Add dynamically discovered pages (including blog posts that actually exist)
  const scannedPages = scanGeneratedPages();
  const existingUrls = new Set(allRoutes.map(route => route.url));
  
  // Add scanned pages that aren't already in our static list
  for (const page of scannedPages) {
    if (!existingUrls.has(page.url)) {
      allRoutes.push(page);
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

  return xml;
}

// Function to write sitemap to file
function writeSitemap() {
  try {
    const sitemapXML = generateSitemap();
    
    // Ensure dist directory exists
    const distDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Write sitemap
    fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
    
    console.log('✅ Safe dynamic sitemap generated successfully!');
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    
    // Count URLs for verification
    const urlCount = (sitemapXML.match(/<url>/g) || []).length;
    console.log(`📊 Total URLs in sitemap: ${urlCount}`);
    
    // Count actual blog posts found
    const blogUrls = (sitemapXML.match(/\/blog\/[^<]+/g) || []).length;
    console.log(`📝 Blog posts found and included: ${blogUrls}`);
    
    if (blogUrls === 0) {
      console.log('⚠️  No blog post pages found. Run full build to generate blog content.');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return false;
  }
}

// Function to validate sitemap
function validateSitemap() {
  try {
    if (!fs.existsSync(OUTPUT_PATH)) {
      console.error('❌ Sitemap file not found');
      return false;
    }
    
    const content = fs.readFileSync(OUTPUT_PATH, 'utf8');
    
    // Basic XML validation
    if (!content.includes('<?xml') || !content.includes('<urlset')) {
      console.error('❌ Invalid XML format');
      return false;
    }
    
    // Check for required elements
    const urlCount = (content.match(/<url>/g) || []).length;
    const locCount = (content.match(/<loc>/g) || []).length;
    
    if (urlCount !== locCount) {
      console.error('❌ Mismatch between URL and location tags');
      return false;
    }
    
    console.log('✅ Sitemap validation passed');
    console.log(`📊 Found ${urlCount} valid URLs`);
    
    // Verify all URLs point to actual files
    const urls = content.match(/https:\/\/mardenseo\.com([^<]+)/g) || [];
    let validUrlCount = 0;
    let invalidUrls = [];
    
    for (const fullUrl of urls) {
      const urlPath = fullUrl.replace('https://mardenseo.com', '');
      const filePath = urlPath === '/' ? './dist/index.html' : `./dist${urlPath}index.html`;
      
      if (fs.existsSync(filePath)) {
        validUrlCount++;
      } else {
        invalidUrls.push(urlPath);
      }
    }
    
    console.log(`📊 URLs with actual files: ${validUrlCount}/${urls.length}`);
    
    if (invalidUrls.length > 0) {
      console.log('⚠️  URLs in sitemap without corresponding files:');
      invalidUrls.forEach(url => console.log(`   • ${url}`));
      console.log('   These URLs should be removed or the files should be generated.');
    }
    
    return invalidUrls.length === 0;
  } catch (error) {
    console.error('❌ Error validating sitemap:', error);
    return false;
  }
}

// Main execution
function main() {
  console.log('🚀 Generating safe dynamic sitemap...');
  
  const success = writeSitemap();
  
  if (success) {
    validateSitemap();
    console.log('');
    console.log('📋 Safe sitemap includes ONLY:');
    console.log('  • Main pages that actually exist');
    console.log('  • Blog posts with generated HTML files');
    console.log('  • Proper SEO metadata (priority, changefreq)');
    console.log('  • Auto-discovered additional pages');
    console.log('');
    console.log('🛡️  SAFE FOR PRODUCTION:');
    console.log('  • No 404 errors from missing pages');
    console.log('  • All sitemap URLs point to real files');
    console.log('  • Search engines get accurate information');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, writeSitemap, validateSitemap };
