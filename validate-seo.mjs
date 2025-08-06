#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

async function checkFile(filePath) {
  try {
    await fs.access(path.join(__dirname, 'dist', filePath));
    return true;
  } catch {
    return false;
  }
}

async function readFile(filePath) {
  try {
    return await fs.readFile(path.join(__dirname, 'dist', filePath), 'utf8');
  } catch {
    return null;
  }
}

async function validateSEO() {
  console.log(`${colors.cyan}${colors.bright}
╔═══════════════════════════════════════════════╗
║      🔍 MARDEN SEO - SEO VALIDATION CHECK     ║
╚═══════════════════════════════════════════════╝${colors.reset}
`);

  const results = {
    passed: [],
    warnings: [],
    failed: []
  };

  // 1. Check Sitemap
  console.log(`${colors.bright}📍 Checking Sitemap...${colors.reset}`);
  const sitemapExists = await checkFile('sitemap.xml');
  if (sitemapExists) {
    const sitemap = await readFile('sitemap.xml');
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    const hasProperNamespaces = sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    
    if (hasProperNamespaces && urlCount > 0) {
      results.passed.push(`✅ Sitemap exists with ${urlCount} URLs and proper XML namespaces`);
      
      // Check for important URLs
      const criticalUrls = [
        'https://mardenseo.com/',
        'https://mardenseo.com/services/',
        'https://mardenseo.com/contact/',
        'https://mardenseo.com/blog/'
      ];
      
      criticalUrls.forEach(url => {
        if (sitemap.includes(url)) {
          results.passed.push(`✅ Critical URL found: ${url}`);
        } else {
          results.warnings.push(`⚠️ Critical URL missing: ${url}`);
        }
      });
    } else {
      results.failed.push('❌ Sitemap is malformed or empty');
    }
  } else {
    results.failed.push('❌ Sitemap.xml not found');
  }

  // 2. Check Robots.txt
  console.log(`\n${colors.bright}🤖 Checking Robots.txt...${colors.reset}`);
  const robotsExists = await checkFile('robots.txt');
  if (robotsExists) {
    const robots = await readFile('robots.txt');
    
    if (robots.includes('Sitemap: https://mardenseo.com/sitemap.xml')) {
      results.passed.push('✅ Robots.txt includes sitemap reference');
    } else {
      results.warnings.push('⚠️ Robots.txt missing sitemap reference');
    }
    
    if (robots.includes('User-agent: *') && robots.includes('Allow: /')) {
      results.passed.push('✅ Robots.txt allows all crawlers');
    } else {
      results.warnings.push('⚠️ Robots.txt may be too restrictive');
    }
    
    if (robots.includes('Googlebot') && robots.includes('Bingbot')) {
      results.passed.push('✅ Specific rules for major search engines');
    }
  } else {
    results.failed.push('❌ Robots.txt not found');
  }

  // 3. Check Core Pages
  console.log(`\n${colors.bright}📄 Checking Core Pages...${colors.reset}`);
  const corePages = [
    { path: 'index.html', name: 'Homepage' },
    { path: 'services/index.html', name: 'Services' },
    { path: 'services-pricing/index.html', name: 'Pricing' },
    { path: 'about/index.html', name: 'About' },
    { path: 'contact/index.html', name: 'Contact' },
    { path: 'portfolio/index.html', name: 'Portfolio' },
    { path: 'blog/index.html', name: 'Blog' },
    { path: 'app-building/index.html', name: 'App Building' },
    { path: 'workflow-automation/index.html', name: 'Workflow Automation' }
  ];

  for (const page of corePages) {
    if (await checkFile(page.path)) {
      const content = await readFile(page.path);
      
      // Check for meta tags
      const hasTitle = content && content.includes('<title>');
      const hasDescription = content && content.includes('name="description"');
      const hasOG = content && content.includes('property="og:');
      const hasCanonical = content && content.includes('rel="canonical"');
      
      if (hasTitle && hasDescription) {
        results.passed.push(`✅ ${page.name}: Has title and meta description`);
      } else {
        results.warnings.push(`⚠️ ${page.name}: Missing essential meta tags`);
      }
      
      if (!hasCanonical) {
        results.warnings.push(`⚠️ ${page.name}: Missing canonical tag`);
      }
      
      if (!hasOG) {
        results.warnings.push(`⚠️ ${page.name}: Missing Open Graph tags`);
      }
    } else {
      results.failed.push(`❌ ${page.name} page not found (${page.path})`);
    }
  }

  // 4. Check Blog Posts
  console.log(`\n${colors.bright}📝 Checking Blog Posts...${colors.reset}`);
  const blogPosts = [
    { path: 'blog/local-seo-2025/index.html', name: 'Local SEO 2025' },
    { path: 'blog/ai-midlife-crisis/index.html', name: 'AI Midlife Crisis' },
    { path: 'blog/eat-guide/index.html', name: 'E-A-T Guide' }
  ];

  let blogCount = 0;
  for (const post of blogPosts) {
    if (await checkFile(post.path)) {
      blogCount++;
    }
  }
  
  if (blogCount > 0) {
    results.passed.push(`✅ ${blogCount} blog posts found and accessible`);
  } else {
    results.warnings.push('⚠️ No blog posts found');
  }

  // 5. Check Assets
  console.log(`\n${colors.bright}🎨 Checking Assets...${colors.reset}`);
  const assetsExist = await checkFile('assets');
  if (assetsExist) {
    results.passed.push('✅ Assets directory exists');
  } else {
    results.failed.push('❌ Assets directory missing');
  }

  // Print Results
  console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}📊 VALIDATION RESULTS${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════${colors.reset}\n`);

  // Passed
  if (results.passed.length > 0) {
    console.log(`${colors.green}${colors.bright}✅ PASSED (${results.passed.length})${colors.reset}`);
    results.passed.forEach(item => console.log(`  ${item}`));
  }

  // Warnings
  if (results.warnings.length > 0) {
    console.log(`\n${colors.yellow}${colors.bright}⚠️  WARNINGS (${results.warnings.length})${colors.reset}`);
    results.warnings.forEach(item => console.log(`  ${item}`));
  }

  // Failed
  if (results.failed.length > 0) {
    console.log(`\n${colors.red}${colors.bright}❌ FAILED (${results.failed.length})${colors.reset}`);
    results.failed.forEach(item => console.log(`  ${item}`));
  }

  // Overall Score
  const totalChecks = results.passed.length + results.warnings.length + results.failed.length;
  const score = Math.round((results.passed.length / totalChecks) * 100);
  
  console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}🏆 OVERALL SEO SCORE: ${score >= 80 ? colors.green : score >= 60 ? colors.yellow : colors.red}${score}%${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════${colors.reset}`);

  // Recommendations
  console.log(`\n${colors.magenta}${colors.bright}💡 RECOMMENDATIONS:${colors.reset}`);
  
  if (results.failed.length > 0) {
    console.log(`${colors.red}  1. Fix critical issues first (red items)${colors.reset}`);
  }
  
  if (results.warnings.length > 5) {
    console.log(`${colors.yellow}  2. Address warnings to improve SEO score${colors.reset}`);
  }
  
  console.log(`  3. Submit sitemap to Google Search Console`);
  console.log(`  4. Submit sitemap to Bing Webmaster Tools`);
  console.log(`  5. Monitor Core Web Vitals in PageSpeed Insights`);
  
  if (score < 80) {
    console.log(`\n${colors.yellow}  ⚠️ Run 'npm run build:comprehensive' to generate missing pages${colors.reset}`);
  }
  
  if (score >= 90) {
    console.log(`\n${colors.green}${colors.bright}  🎉 Excellent! Your site is well-optimized for SEO!${colors.reset}`);
  }

  console.log('\n');
  
  return { score, results };
}

// Run validation
validateSEO().catch(console.error);