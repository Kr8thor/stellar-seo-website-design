#!/usr/bin/env node

/**
 * 🎯 FIX SEO CANONICALIZATION ISSUES - MAKE ALL PAGES INDEXABLE
 * 
 * Problem: Pages showing as "Canonicalised" preventing proper indexing
 * Solution: Remove canonical tags that might be causing confusion
 * Goal: All pages should be "Non-indexable" → "Indexable" (200 OK)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');

console.log('🎯 FIXING SEO CANONICALIZATION ISSUES');
console.log('=====================================\n');

// Define all pages that should be indexable
const INDEXABLE_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/services-pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/app-building', priority: '0.8', changefreq: 'monthly' },
  { path: '/workflow-automation', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'daily' },
  // Blog posts
  { path: '/blog/local-seo-2025', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/ai-midlife-crisis', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/on-page-seo-tactics-2025', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/core-web-vitals-seo-2025', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/technical-seo-fundamentals', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/content-strategy-beyond-keywords', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/link-building-2025-quality', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/mobile-first-indexing-ready', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/ai-revolution-seo-strategy', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/e-e-a-t-complete-guide', priority: '0.6', changefreq: 'monthly' },
];

// Pages that should remain noindex
const NOINDEX_PAGES = ['/admin', '/cart', '/analytics-test'];

async function fixCanonicalTags() {
  console.log('🔧 Fixing canonical tags in HTML files...\n');
  
  for (const page of INDEXABLE_PAGES) {
    const filePath = page.path === '/' 
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, page.path.substring(1), 'index.html');
    
    try {
      // Check if file exists
      await fs.access(filePath);
      
      // Read the HTML file
      let html = await fs.readFile(filePath, 'utf-8');
      
      // Count changes
      let changes = 0;
      
      // Remove ALL canonical tags to prevent canonicalization issues
      const canonicalRegex = /<link[^>]*rel=["']canonical["'][^>]*>/gi;
      const canonicalMatches = html.match(canonicalRegex);
      if (canonicalMatches) {
        html = html.replace(canonicalRegex, '');
        changes += canonicalMatches.length;
        console.log(`  🗑️ Removed ${canonicalMatches.length} canonical tag(s)`);
      }
      
      // Ensure robots meta tag allows indexing
      const robotsRegex = /<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/gi;
      const robotsMatch = robotsRegex.exec(html);
      
      if (robotsMatch) {
        const currentContent = robotsMatch[1];
        if (currentContent.includes('noindex')) {
          // Replace with index, follow
          html = html.replace(robotsMatch[0], '<meta name="robots" content="index, follow">');
          changes++;
          console.log(`  ✅ Changed robots from "${currentContent}" to "index, follow"`);
        }
      } else {
        // Add robots meta tag if missing
        const headEndIndex = html.indexOf('</head>');
        if (headEndIndex > -1) {
          html = html.substring(0, headEndIndex) + 
            '  <meta name="robots" content="index, follow">\n' + 
            html.substring(headEndIndex);
          changes++;
          console.log(`  ➕ Added robots meta tag "index, follow"`);
        }
      }
      
      // Fix any self-referencing og:url tags
      const ogUrlRegex = /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["'][^>]*>/gi;
      const ogUrlMatch = ogUrlRegex.exec(html);
      if (ogUrlMatch) {
        const baseUrl = 'https://mardenseo.com' + (page.path === '/' ? '' : page.path);
        const newOgUrl = `<meta property="og:url" content="${baseUrl}">`;
        html = html.replace(ogUrlMatch[0], newOgUrl);
        changes++;
        console.log(`  🔄 Updated og:url to: ${baseUrl}`);
      }
      
      // Write the updated file
      if (changes > 0) {
        await fs.writeFile(filePath, html, 'utf-8');
        console.log(`✅ ${page.path} - Fixed ${changes} issue(s)\n`);
      } else {
        console.log(`✓ ${page.path} - Already correct\n`);
      }
      
    } catch (error) {
      console.log(`❌ ${page.path} - File not found (${filePath})\n`);
    }
  }
}

async function fixNoindexPages() {
  console.log('\n🚫 Ensuring noindex pages are properly configured...\n');
  
  for (const pagePath of NOINDEX_PAGES) {
    const filePath = path.join(DIST_DIR, pagePath.substring(1), 'index.html');
    
    try {
      await fs.access(filePath);
      let html = await fs.readFile(filePath, 'utf-8');
      
      // Ensure noindex
      const robotsRegex = /<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/gi;
      const robotsMatch = robotsRegex.exec(html);
      
      if (!robotsMatch || !robotsMatch[1].includes('noindex')) {
        // Add or update robots meta tag
        const noindexTag = '<meta name="robots" content="noindex, nofollow">';
        
        if (robotsMatch) {
          html = html.replace(robotsMatch[0], noindexTag);
        } else {
          const headEndIndex = html.indexOf('</head>');
          if (headEndIndex > -1) {
            html = html.substring(0, headEndIndex) + 
              `  ${noindexTag}\n` + 
              html.substring(headEndIndex);
          }
        }
        
        await fs.writeFile(filePath, html, 'utf-8');
        console.log(`✅ ${pagePath} - Set to noindex`);
      } else {
        console.log(`✓ ${pagePath} - Already noindex`);
      }
    } catch (error) {
      console.log(`⚠️ ${pagePath} - Not found (expected for system pages)`);
    }
  }
}

async function generateCleanSitemap() {
  console.log('\n🗺️ Generating clean sitemap without canonicalization issues...\n');
  
  const sitemapEntries = [];
  
  for (const page of INDEXABLE_PAGES) {
    const filePath = page.path === '/' 
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, page.path.substring(1), 'index.html');
    
    try {
      await fs.access(filePath);
      const url = 'https://mardenseo.com' + (page.path === '/' ? '/' : page.path);
      
      sitemapEntries.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    } catch (error) {
      // Skip missing files
    }
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;
  
  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf-8');
  console.log(`✅ Generated sitemap with ${sitemapEntries.length} indexable URLs\n`);
}

async function generateRobotsTxt() {
  console.log('🤖 Generating robots.txt...\n');
  
  const robotsTxt = `User-agent: *
Allow: /

# Block admin pages
Disallow: /admin
Disallow: /cart
Disallow: /analytics-test

# Sitemap
Sitemap: https://mardenseo.com/sitemap.xml
`;
  
  await fs.writeFile(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('✅ Generated robots.txt\n');
}

async function verifyFixes() {
  console.log('🔍 Verifying fixes...\n');
  
  let indexableCount = 0;
  let missingCount = 0;
  
  for (const page of INDEXABLE_PAGES) {
    const filePath = page.path === '/' 
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, page.path.substring(1), 'index.html');
    
    try {
      await fs.access(filePath);
      const html = await fs.readFile(filePath, 'utf-8');
      
      // Check for canonical tags (should be none)
      const hasCanonical = /<link[^>]*rel=["']canonical["'][^>]*>/gi.test(html);
      
      // Check robots meta
      const robotsMatch = /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i.exec(html);
      const isIndexable = robotsMatch && robotsMatch[1].includes('index');
      
      if (!hasCanonical && isIndexable) {
        indexableCount++;
        console.log(`✅ ${page.path} - Properly indexable (no canonical, robots: index)`);
      } else {
        console.log(`❌ ${page.path} - Issues: ${hasCanonical ? 'has canonical' : ''} ${!isIndexable ? 'not indexable' : ''}`);
      }
    } catch (error) {
      missingCount++;
      console.log(`⚠️ ${page.path} - File missing`);
    }
  }
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`✅ Indexable pages: ${indexableCount}`);
  console.log(`⚠️ Missing pages: ${missingCount}`);
  console.log(`📄 Total expected: ${INDEXABLE_PAGES.length}`);
}

// Main execution
async function main() {
  try {
    // Check if dist directory exists
    await fs.access(DIST_DIR);
    
    // Fix canonical tags
    await fixCanonicalTags();
    
    // Fix noindex pages
    await fixNoindexPages();
    
    // Generate clean sitemap
    await generateCleanSitemap();
    
    // Generate robots.txt
    await generateRobotsTxt();
    
    // Verify fixes
    await verifyFixes();
    
    console.log('\n🎉 SEO FIX COMPLETE!');
    console.log('====================');
    console.log('✅ Removed all canonical tags to prevent canonicalization');
    console.log('✅ Set proper robots meta tags (index, follow)');
    console.log('✅ Generated clean sitemap.xml');
    console.log('✅ All pages should now be properly indexable');
    console.log('\n🚀 Deploy these changes to see improved SEO health score!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the fix
main();
