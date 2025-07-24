#!/usr/bin/env node

/**
 * 🔍 PRODUCTION READINESS CHECK
 * 
 * This script verifies that your dynamic sitemap system is ready for production deployment.
 * Run this before pushing to live site to avoid SEO issues.
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 PRODUCTION READINESS CHECK - Marden SEO\n');

let allChecks = [];
let issues = [];

// Check 1: Generator files exist
console.log('📁 Checking sitemap generator files...');
const generators = [
  'generate-sitemap-safe.mjs',
  'generate-robots.mjs'
];

for (const file of generators) {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
    allChecks.push(true);
  } else {
    console.log(`   ❌ MISSING: ${file}`);
    issues.push(`Missing generator file: ${file}`);
    allChecks.push(false);
  }
}

// Check 2: Build configuration
console.log('\n⚙️ Checking build configuration...');
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const buildIntegrated = packageJson.scripts['build:integrated'];
  
  if (buildIntegrated && buildIntegrated.includes('build-comprehensive-static-ssg.mjs')) {
    console.log('   ✅ Production build uses comprehensive SSG');
    allChecks.push(true);
  } else {
    console.log('   ❌ Production build not using comprehensive SSG');
    console.log(`   📄 Current: ${buildIntegrated}`);
    issues.push('Production build not configured for comprehensive content generation');
    allChecks.push(false);
  }
} else {
  console.log('   ❌ package.json not found');
  issues.push('package.json missing');
  allChecks.push(false);
}

// Check 3: Verify current sitemap safety
console.log('\n🗺️ Checking current sitemap safety...');
const sitemapPath = './dist/sitemap.xml';
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urls = content.match(/https:\/\/mardenseo\.com([^<]+)/g) || [];
  
  let validUrls = 0;
  let invalidUrls = [];
  
  for (const fullUrl of urls) {
    const urlPath = fullUrl.replace('https://mardenseo.com', '');
    const filePath = urlPath === '/' ? './dist/index.html' : `./dist${urlPath}index.html`;
    
    if (fs.existsSync(filePath)) {
      validUrls++;
    } else {
      invalidUrls.push(urlPath);
    }
  }
  
  console.log(`   📊 URLs in sitemap: ${urls.length}`);
  console.log(`   ✅ Valid URLs (files exist): ${validUrls}`);
  console.log(`   ❌ Invalid URLs (404s): ${invalidUrls.length}`);
  
  if (invalidUrls.length === 0) {
    console.log('   🎉 All sitemap URLs point to existing files!');
    allChecks.push(true);
  } else {
    console.log('   ⚠️  These URLs will cause 404 errors:');
    invalidUrls.slice(0, 5).forEach(url => console.log(`      • ${url}`));
    if (invalidUrls.length > 5) {
      console.log(`      ... and ${invalidUrls.length - 5} more`);
    }
    issues.push(`${invalidUrls.length} URLs in sitemap point to non-existent files`);
    allChecks.push(false);
  }
} else {
  console.log('   ❌ Sitemap not found');
  issues.push('Sitemap.xml missing - run build first');
  allChecks.push(false);
}

// Check 4: Critical pages exist
console.log('\n📄 Checking critical pages exist...');
const criticalPages = [
  { path: './dist/index.html', name: 'Home page' },
  { path: './dist/about/index.html', name: 'About page' },
  { path: './dist/services/index.html', name: 'Services page' },
  { path: './dist/contact/index.html', name: 'Contact page' },
  { path: './dist/blog/index.html', name: 'Blog listing' }
];

for (const page of criticalPages) {
  if (fs.existsSync(page.path)) {
    console.log(`   ✅ ${page.name}`);
    allChecks.push(true);
  } else {
    console.log(`   ❌ MISSING: ${page.name}`);
    issues.push(`Missing critical page: ${page.name}`);
    allChecks.push(false);
  }
}

// Check 5: Content quality
console.log('\n📝 Checking content quality...');
if (fs.existsSync('./dist/index.html')) {
  const homeContent = fs.readFileSync('./dist/index.html', 'utf8');
  if (homeContent.includes('<h1>') && homeContent.length > 5000) {
    console.log('   ✅ Home page has substantial pre-rendered content');
    allChecks.push(true);
  } else {
    console.log('   ⚠️  Home page appears to have minimal content');
    console.log(`   📊 Content length: ${homeContent.length} characters`);
    issues.push('Home page may not have enough pre-rendered content');
    allChecks.push(false);
  }
}

// Check 6: Blog posts status
console.log('\n📝 Checking blog content...');
const blogDir = './dist/blog';
if (fs.existsSync(blogDir)) {
  const items = fs.readdirSync(blogDir);
  const blogDirs = items.filter(item => {
    const fullPath = path.join(blogDir, item);
    return fs.statSync(fullPath).isDirectory();
  });
  
  console.log(`   📁 Blog post directories: ${blogDirs.length}`);
  
  if (blogDirs.length >= 3) {
    console.log('   ✅ Good number of blog posts generated');
    allChecks.push(true);
  } else if (blogDirs.length > 0) {
    console.log('   ⚠️  Few blog posts found - may need full content generation');
    allChecks.push(true);
  } else {
    console.log('   ⚠️  No blog post directories found');
    issues.push('No blog post content generated');
    allChecks.push(false);
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 PRODUCTION READINESS SUMMARY');
console.log('='.repeat(60));

const passedChecks = allChecks.filter(Boolean).length;
const totalChecks = allChecks.length;

if (issues.length === 0) {
  console.log('🎉 ALL CHECKS PASSED! Ready for production deployment.');
  console.log(`✅ ${passedChecks}/${totalChecks} checks successful`);
  console.log('\n🚀 DEPLOYMENT STEPS:');
  console.log('1. Commit and push your changes');
  console.log('2. GitHub Actions will run build:integrated');
  console.log('3. Your sitemap will be automatically updated');
  console.log('4. All blog posts will be properly indexed');
} else {
  console.log(`⚠️  ${issues.length} ISSUES FOUND - Fix before production deployment`);
  console.log(`📊 ${passedChecks}/${totalChecks} checks passed\n`);
  
  console.log('🔧 ISSUES TO FIX:');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
  
  console.log('\n💡 RECOMMENDED ACTIONS:');
  console.log('1. Run: npm run build:comprehensive');
  console.log('2. Run: node generate-sitemap-safe.mjs');
  console.log('3. Re-run this check: node production-readiness-check.mjs');
  console.log('4. Only deploy when all checks pass');
}

console.log('\n📞 Need help? Check the verification results above.');

// Exit with appropriate code
process.exit(issues.length === 0 ? 0 : 1);
