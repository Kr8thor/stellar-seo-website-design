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

// Blog posts data (keep this updated with your actual blog posts)
const blogPosts = [
  {
    slug: 'local-seo-2025',
    lastmod: '2025-01-20',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'ai-midlife-crisis',
    lastmod: '2025-01-18',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'on-page-seo-tactics-2025',
    lastmod: '2025-01-15',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'core-web-vitals-seo-2025',
    lastmod: '2025-01-12',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'technical-seo-fundamentals',
    lastmod: '2025-01-10',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'content-strategy-beyond-keywords',
    lastmod: '2025-01-08',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'link-building-2025-quality',
    lastmod: '2025-01-05',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'mobile-first-indexing-ready',
    lastmod: '2025-01-03',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    slug: 'ai-revolution-seo-strategy',
    lastmod: '2025-01-01',
    priority: '0.8',
    changefreq: 'monthly'
  }
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
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && item !== 'assets') {
          // Skip system pages from sitemap
          if (['admin', 'cart', 'analytics-test'].includes(item)) {
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

// Function to generate sitemap XML
function generateSitemap() {
  const currentDate = getCurrentDate();
  
  // Combine static routes with blog posts
  const allRoutes = [
    ...staticRoutes.map(route => ({
      ...route,
      lastmod: currentDate
    })),
    ...blogPosts.map(post => ({
      url: `/blog/${post.slug}/`,
      lastmod: post.lastmod,
      priority: post.priority,
      changefreq: post.changefreq
    }))
  ];
  
  // Also include any additional pages found in dist directory
  const scannedPages = scanGeneratedPages();
  const scannedUrls = new Set(scannedPages.map(page => page.url));
  const existingUrls = new Set(allRoutes.map(route => route.url));
  
  // Add scanned pages that aren't already in our list
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
    
    console.log('✅ Dynamic sitemap generated successfully!');
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    
    // Count URLs for verification
    const urlCount = (sitemapXML.match(/<url>/g) || []).length;
    console.log(`📊 Total URLs in sitemap: ${urlCount}`);
    
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
    
    return true;
  } catch (error) {
    console.error('❌ Error validating sitemap:', error);
    return false;
  }
}

// Main execution
function main() {
  console.log('🚀 Generating dynamic sitemap...');
  
  const success = writeSitemap();
  
  if (success) {
    validateSitemap();
    console.log('');
    console.log('📋 Sitemap includes:');
    console.log('  • All main pages (home, about, services, etc.)');
    console.log('  • All blog posts with individual URLs');
    console.log('  • Proper SEO metadata (priority, changefreq)');
    console.log('  • Auto-scanned additional pages');
    console.log('');
    console.log('🌐 Submit to search engines:');
    console.log(`  • Google: ${SITE_URL}/sitemap.xml`);
    console.log(`  • Bing: ${SITE_URL}/sitemap.xml`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, writeSitemap, validateSitemap };
