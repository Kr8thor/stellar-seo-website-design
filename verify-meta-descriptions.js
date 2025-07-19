// Meta Description Verification Script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { path: 'dist/index.html', name: 'Homepage' },
  { path: 'dist/about/index.html', name: 'About' },
  { path: 'dist/services/index.html', name: 'Services' },
  { path: 'dist/services-pricing/index.html', name: 'Services-Pricing' },
  { path: 'dist/portfolio/index.html', name: 'Portfolio' },
  { path: 'dist/blog/index.html', name: 'Blog' },
  { path: 'dist/contact/index.html', name: 'Contact' },
  { path: 'dist/app-building/index.html', name: 'App Building' },
  { path: 'dist/workflow-automation/index.html', name: 'Workflow Automation' },
  { path: 'dist/admin/index.html', name: 'Admin' },
  { path: 'dist/cart/index.html', name: 'Cart' },
  { path: 'dist/analytics-test/index.html', name: 'Analytics Test' }
];

console.log('🔍 VERIFYING META DESCRIPTIONS FOR ALL PAGES\n');

const descriptions = [];

pages.forEach(page => {
  try {
    const filePath = path.join(__dirname, page.path);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract meta description
    const match = content.match(/<meta name="description" content="([^"]*)"[^>]*>/);
    const description = match ? match[1] : 'NOT FOUND';
    
    console.log(`✅ ${page.name}:`);
    console.log(`   Description: "${description}"`);
    console.log(`   Length: ${description.length} characters`);
    console.log('');
    
    descriptions.push({ page: page.name, description, length: description.length });
  } catch (error) {
    console.log(`❌ Error reading ${page.name}: ${error.message}`);
  }
});

// Check for duplicates
console.log('🔍 CHECKING FOR DUPLICATE DESCRIPTIONS:\n');
const unique = new Set();
const duplicates = [];

descriptions.forEach(item => {
  if (unique.has(item.description)) {
    duplicates.push(item);
  } else {
    unique.add(item.description);
  }
});

if (duplicates.length === 0) {
  console.log('✅ SUCCESS: All meta descriptions are unique!');
} else {
  console.log('❌ DUPLICATES FOUND:');
  duplicates.forEach(dup => {
    console.log(`   ${dup.page}: "${dup.description}"`);
  });
}

console.log(`\n📊 SUMMARY:`);
console.log(`   Total Pages: ${descriptions.length}`);
console.log(`   Unique Descriptions: ${unique.size}`);
console.log(`   Duplicates: ${duplicates.length}`);
console.log(`   Average Length: ${Math.round(descriptions.reduce((sum, item) => sum + item.length, 0) / descriptions.length)} characters`);
