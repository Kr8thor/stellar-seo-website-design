// Meta Tag Verification Script
// This script will check if meta descriptions are unique across pages

import puppeteer from 'puppeteer';

const testPages = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/contact', name: 'Contact' },
  { path: '/app-building', name: 'App Building' },
  { path: '/workflow-automation', name: 'Workflow Automation' },
  { path: '/blog', name: 'Blog' },
  { path: '/portfolio', name: 'Portfolio' }
];

async function checkMetaDescriptions() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Checking meta descriptions on development server...\n');
  
  const results = [];
  
  for (const testPage of testPages) {
    try {
      const url = `http://localhost:8089${testPage.path}`;
      console.log(`Testing: ${testPage.name} (${url})`);
      
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
      
      // Extract meta description
      const metaDescription = await page.$eval('meta[name="description"]', 
        element => element.getAttribute('content'));
      
      // Extract title
      const title = await page.title();
      
      // Extract canonical URL
      const canonical = await page.$eval('link[rel="canonical"]', 
        element => element.getAttribute('href')).catch(() => 'Not found');
      
      results.push({
        page: testPage.name,
        url: url,
        title: title,
        description: metaDescription,
        canonical: canonical
      });
      
      console.log(`✅ ${testPage.name}: "${metaDescription?.substring(0, 80)}..."`);
      
    } catch (error) {
      console.log(`❌ ${testPage.name}: Error - ${error.message}`);
      results.push({
        page: testPage.name,
        url: `http://localhost:8089${testPage.path}`,
        title: 'ERROR',
        description: `Error: ${error.message}`,
        canonical: 'ERROR'
      });
    }
  }
  
  await browser.close();
  
  // Check for duplicates
  console.log('\n📊 DUPLICATE CHECK:');
  const descriptions = results.map(r => r.description).filter(d => d && !d.startsWith('Error:'));
  const unique = new Set(descriptions);
  
  console.log(`Total descriptions found: ${descriptions.length}`);
  console.log(`Unique descriptions: ${unique.size}`);
  
  if (descriptions.length === unique.size) {
    console.log('✅ SUCCESS: All meta descriptions are unique!');
  } else {
    console.log('❌ DUPLICATES FOUND:');
    const seen = new Map();
    results.forEach(result => {
      if (seen.has(result.description)) {
        console.log(`🔴 DUPLICATE: "${result.description}" found on both ${seen.get(result.description)} and ${result.page}`);
      } else {
        seen.set(result.description, result.page);
      }
    });
  }
  
  // Check canonicals
  console.log('\n🔗 CANONICAL CHECK:');
  results.forEach(result => {
    if (result.canonical === 'ERROR' || result.canonical === 'Not found') {
      console.log(`❌ ${result.page}: No canonical URL found`);
    } else if (result.canonical.endsWith(result.url.replace('http://localhost:8089', ''))) {
      console.log(`✅ ${result.page}: Canonical URL correct`);
    } else {
      console.log(`⚠️ ${result.page}: Canonical might be incorrect - ${result.canonical}`);
    }
  });
  
  return results;
}

checkMetaDescriptions()
  .then(results => {
    console.log('\n🎯 VERIFICATION COMPLETE');
    console.log('Results stored in variable: results');
  })
  .catch(error => {
    console.error('Script error:', error);
  });
