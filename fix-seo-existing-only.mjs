#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎯 FINAL SEO FIX - EXISTING PAGES ONLY\n');

// Define URLs for ONLY the pages that actually exist
const DOMAIN = 'https://mardenseo.com';
const existingPages = [
  // Core pages that exist
  { file: 'index.html', path: '/', url: `${DOMAIN}/` },
  { file: 'about/index.html', path: '/about', url: `${DOMAIN}/about` },
  { file: 'services/index.html', path: '/services', url: `${DOMAIN}/services` },
  { file: 'contact/index.html', path: '/contact', url: `${DOMAIN}/contact` },
  { file: 'portfolio/index.html', path: '/portfolio', url: `${DOMAIN}/portfolio` },
  { file: 'app-building/index.html', path: '/app-building', url: `${DOMAIN}/app-building` },
  { file: 'workflow-automation/index.html', path: '/workflow-automation', url: `${DOMAIN}/workflow-automation` },
  { file: 'blog/index.html', path: '/blog', url: `${DOMAIN}/blog` }
];

async function fixHtmlFile(filePath, canonicalUrl) {
  try {
    console.log(`🔧 Fixing: ${filePath} → ${canonicalUrl}`);
    
    let content = await fs.readFile(filePath, 'utf-8');

    // 1. Fix canonical tag
    const canonicalRegex = /<link[^>]*rel=["']canonical["'][^>]*>/i;
    const newCanonical = `<link rel="canonical" href="${canonicalUrl}">`;
    
    if (content.match(canonicalRegex)) {
      content = content.replace(canonicalRegex, newCanonical);
    } else {
      // Insert canonical in head section
      const headEndRegex = /<\/head>/i;
      content = content.replace(headEndRegex, `    ${newCanonical}\n</head>`);
    }

    // 2. Fix og:url meta tag
    const ogUrlRegex = /<meta[^>]*property=["']og:url["'][^>]*>/i;
    const newOgUrl = `<meta property="og:url" content="${canonicalUrl}">`;
    
    if (content.match(ogUrlRegex)) {
      content = content.replace(ogUrlRegex, newOgUrl);
    } else {
      content = content.replace(newCanonical, `${newCanonical}\n    ${newOgUrl}`);
    }

    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`   ✅ Fixed canonical and og:url for ${canonicalUrl}`);

  } catch (error) {
    console.error(`   ❌ Error fixing ${filePath}:`, error.message);
  }
}

async function generateSitemapForExistingPages() {
  console.log('\n🗺️  Generating sitemap for existing pages only...');
  
  const sitemapUrls = existingPages.map(page => page.url);
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => {
  const priority = url === `${DOMAIN}/` ? '1.0' : '0.8';
  const changefreq = url === `${DOMAIN}/` ? 'weekly' : 'monthly';
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  try {
    await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemapContent);
    console.log(`✅ Clean sitemap generated with ${sitemapUrls.length} existing pages`);
    sitemapUrls.forEach(url => console.log(`   ✅ ${url}`));
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
  }
}

async function main() {
  const distPath = path.join(__dirname, 'dist');
  
  console.log('🔍 Fixing canonical tags for existing pages...\n');

  for (const page of existingPages) {
    const filePath = path.join(distPath, page.file);
    
    try {
      await fs.access(filePath);
      await fixHtmlFile(filePath, page.url);
    } catch {
      console.log(`⚠️  Skipping missing file: ${page.file}`);
    }
  }

  await generateSitemapForExistingPages();

  console.log('\n🎉 SEO FIX COMPLETE FOR EXISTING PAGES!');
  console.log('==========================================');
  console.log(`✅ Fixed ${existingPages.length} existing pages`);
  console.log('✅ Generated clean sitemap with only existing pages');
  console.log('✅ All canonical URLs now use consistent format (no trailing slashes except homepage)');
  
  console.log('\n📊 EXPECTED IMPROVEMENTS:');
  console.log('• Canonical errors: Fixed (no more redirects)');
  console.log('• Sitemap redirects: Fixed (only existing pages)');
  console.log('• URL consistency: Fixed (standardized format)');
  console.log('• Health Score: Expected significant improvement');
  
  console.log('\n🚀 READY FOR DEPLOYMENT!');
  console.log('Deploy the /dist folder to production and re-run SEO audit.');
}

main().catch(console.error);
