#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Complete URL structure with proper SEO priorities and changefreq
const urlStructure = {
  // Primary Pages (Highest Priority)
  homepage: {
    path: '/',
    priority: 1.0,
    changefreq: 'daily',
    category: 'Core'
  },
  
  // Core Business Pages (Very High Priority)
  services: {
    path: '/services/',
    priority: 0.9,
    changefreq: 'weekly',
    category: 'Services'
  },
  servicesPricing: {
    path: '/services-pricing/',
    priority: 0.9,
    changefreq: 'weekly',
    category: 'Services'
  },
  appBuilding: {
    path: '/app-building/',
    priority: 0.9,
    changefreq: 'weekly',
    category: 'Services'
  },
  workflowAutomation: {
    path: '/workflow-automation/',
    priority: 0.9,
    changefreq: 'weekly',
    category: 'Services'
  },
  
  // Company Pages (High Priority)
  about: {
    path: '/about/',
    priority: 0.8,
    changefreq: 'monthly',
    category: 'Company'
  },
  contact: {
    path: '/contact/',
    priority: 0.8,
    changefreq: 'monthly',
    category: 'Company'
  },
  portfolio: {
    path: '/portfolio/',
    priority: 0.8,
    changefreq: 'weekly',
    category: 'Company'
  },
  
  // Content Hub (Medium-High Priority)
  blog: {
    path: '/blog/',
    priority: 0.7,
    changefreq: 'daily',
    category: 'Content'
  },

  // Legal Pages (Lower Priority - Still Indexed)
  termsOfService: {
    path: '/terms-of-service/',
    priority: 0.3,
    changefreq: 'yearly',
    category: 'Legal'
  },
  privacyPolicy: {
    path: '/privacy-policy/',
    priority: 0.3,
    changefreq: 'yearly',
    category: 'Legal'
  },
  refundPolicy: {
    path: '/refund-policy/',
    priority: 0.3,
    changefreq: 'yearly',
    category: 'Legal'
  }
};

// Blog posts with proper SEO priorities based on content value
const blogPosts = [
  // Featured/Cornerstone Content (Highest Blog Priority)
  {
    path: '/blog/local-seo-2025/',
    priority: 0.8,
    changefreq: 'weekly',
    category: 'Blog - Featured',
    title: 'Local SEO in 2025: How to Dominate the Map Pack'
  },
  {
    path: '/blog/ai-midlife-crisis/',
    priority: 0.8,
    changefreq: 'weekly',
    category: 'Blog - Featured',
    title: 'From Google Whisperer to AI Prophet: An SEO\'s Midlife Crisis'
  },
  
  // Technical SEO Guides (High Priority)
  {
    path: '/blog/core-web-vitals-seo-2025/',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Blog - Technical',
    title: 'Core Web Vitals Are Still Running Your SEO Life in 2025'
  },
  {
    path: '/blog/technical-seo-fundamentals/',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Blog - Technical',
    title: 'Technical SEO Fundamentals: Complete Guide'
  },
  {
    path: '/blog/on-page-seo-tactics-2025/',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Blog - Technical',
    title: '10 On-Page SEO Tactics That Still Work in 2025'
  },
  
  // Strategy & Planning Content (Medium Priority)
  {
    path: '/blog/eat-guide/',
    priority: 0.6,
    changefreq: 'monthly',
    category: 'Blog - Strategy',
    title: 'Complete Guide to E-E-A-T'
  },
  {
    path: '/blog/content-strategy-beyond-keywords/',
    priority: 0.6,
    changefreq: 'monthly',
    category: 'Blog - Strategy',
    title: 'Content Strategy: Beyond Keywords'
  },
  {
    path: '/blog/ai-revolution-seo-strategy/',
    priority: 0.6,
    changefreq: 'monthly',
    category: 'Blog - Strategy',
    title: 'The AI Revolution in SEO Strategy'
  },
  
  // Tactical Guides (Medium Priority)
  {
    path: '/blog/link-building-2025-quality/',
    priority: 0.6,
    changefreq: 'monthly',
    category: 'Blog - Tactics',
    title: 'Link Building in 2025: Quality Over Quantity'
  },
  {
    path: '/blog/mobile-first-indexing-ready/',
    priority: 0.6,
    changefreq: 'monthly',
    category: 'Blog - Tactics',
    title: 'Mobile-First Indexing: Is Your Site Ready?'
  }
];

async function checkFileExists(filePath) {
  try {
    await fs.access(path.join(__dirname, 'dist', filePath.replace(/^\//, ''), 'index.html'));
    return true;
  } catch {
    return false;
  }
}

async function generateOptimizedSitemap() {
  console.log('🗺️  Generating Optimized SEO Sitemap...\n');
  
  // Combine all URLs
  const allUrls = [
    ...Object.values(urlStructure),
    ...blogPosts
  ];
  
  // Check which files actually exist
  const existingUrls = [];
  const missingUrls = [];
  
  for (const url of allUrls) {
    const exists = await checkFileExists(url.path);
    if (exists) {
      existingUrls.push(url);
    } else {
      missingUrls.push(url);
    }
  }
  
  // Generate XML with proper formatting and organization
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Add comment about generation
  xml += `
  <!-- Generated: ${today} -->
  <!-- Total URLs: ${existingUrls.length} -->
`;

  // Group URLs by category
  const categories = {
    'Core': [],
    'Services': [],
    'Company': [],
    'Content': [],
    'Blog - Featured': [],
    'Blog - Technical': [],
    'Blog - Strategy': [],
    'Blog - Tactics': []
  };
  
  existingUrls.forEach(url => {
    const category = url.category || 'Other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(url);
  });
  
  // Add URLs by category with comments
  for (const [category, urls] of Object.entries(categories)) {
    if (urls.length === 0) continue;
    
    xml += `
  <!-- ${category} (${urls.length} ${urls.length === 1 ? 'page' : 'pages'}) -->`;
    
    for (const url of urls) {
      // Ensure trailing slash for directories (except homepage)
      let loc = `https://mardenseo.com${url.path}`;
      if (!url.path.endsWith('/') && url.path !== '/' && !url.path.includes('.')) {
        loc = `https://mardenseo.com${url.path}/`;
      }
      
      xml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;
      
      // Add title as comment for blog posts
      if (url.title) {
        xml += `
    <!-- ${url.title} -->`;
      }
      
      xml += `
  </url>`;
    }
  }
  
  xml += `

</urlset>`;
  
  // Write sitemap
  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  await fs.writeFile(sitemapPath, xml, 'utf8');
  
  // Generate report
  console.log('✅ Sitemap Generated Successfully!\n');
  console.log('📊 Sitemap Statistics:');
  console.log('─'.repeat(50));
  
  for (const [category, urls] of Object.entries(categories)) {
    if (urls.length > 0) {
      console.log(`${category}: ${urls.length} ${urls.length === 1 ? 'URL' : 'URLs'}`);
    }
  }
  
  console.log('─'.repeat(50));
  console.log(`Total URLs: ${existingUrls.length}`);
  
  if (missingUrls.length > 0) {
    console.log(`\n⚠️  Missing Pages (${missingUrls.length}):`);
    missingUrls.forEach(url => {
      console.log(`  - ${url.path}${url.title ? ` (${url.title})` : ''}`);
    });
  }
  
  console.log(`\n📍 Sitemap saved to: ${sitemapPath}`);
  console.log('🌐 Submit to: https://search.google.com/search-console');
  console.log('🔍 Submit to: https://www.bing.com/webmasters');
  
  return { existingUrls, missingUrls };
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateOptimizedSitemap().catch(console.error);
}

export default generateOptimizedSitemap;