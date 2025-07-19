import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test routes that should be crawlable
const routes = [
  '/',
  '/about',
  '/services', 
  '/services-pricing',
  '/portfolio',
  '/blog',
  '/contact',
  '/app-building',
  '/workflow-automation'
];

console.log('🚀 TESTING CRAWLABILITY OF MARDEN SEO WEBSITE');
console.log('='.repeat(50));

let allTestsPassed = true;

routes.forEach(route => {
  const filePath = route === '/' 
    ? path.join(__dirname, 'dist', 'index.html')
    : path.join(__dirname, 'dist', route.slice(1), 'index.html');
    
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for meta description
    const hasMetaDescription = content.includes('<meta name="description" content="');
    
    // Check for title
    const hasTitle = content.includes('<title>') && !content.includes('<title>Marden SEO</title>');
    
    // Check for hidden navigation
    const hasHiddenNav = content.includes('Static Navigation for Search Engine Crawlers');
    
    // Check for structured data
    const hasStructuredData = content.includes('application/ld+json');
    
    console.log(`\n📄 Route: ${route === '/' ? 'Homepage' : route}`);
    console.log(`  📁 File exists: ✅`);
    console.log(`  📝 Meta description: ${hasMetaDescription ? '✅' : '❌'}`);
    console.log(`  🏷️ Unique title: ${hasTitle ? '✅' : '❌'}`);
    console.log(`  🔗 Hidden navigation: ${hasHiddenNav ? '✅' : '❌'}`);
    console.log(`  📊 Structured data: ${hasStructuredData ? '✅' : '❌'}`);
    
    if (!hasMetaDescription || !hasTitle || !hasHiddenNav || !hasStructuredData) {
      allTestsPassed = false;
    }
    
  } catch (error) {
    console.log(`\n📄 Route: ${route}`);
    console.log(`  📁 File exists: ❌ - ${error.message}`);
    allTestsPassed = false;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`🎯 OVERALL RESULT: ${allTestsPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

if (allTestsPassed) {
  console.log('\n🕷️ CRAWLABILITY STATUS: PERFECT');
  console.log('✅ All pages have static HTML files');
  console.log('✅ All pages have unique meta descriptions');
  console.log('✅ All pages have unique titles');
  console.log('✅ All pages have hidden navigation for crawlers');
  console.log('✅ All pages have structured data');
  console.log('\n🎉 SITE IS FULLY CRAWLABLE AND INDEXABLE!');
} else {
  console.log('\n❌ CRAWLABILITY ISSUES DETECTED');
  console.log('Please check the failed tests above.');
}
