import { readFile } from 'fs/promises';
import { join } from 'path';

const distPath = 'C:\\Users\\Leo\\stellar-seo-website-design\\dist';

const mainPages = [
  { path: 'index.html', name: 'Home' },
  { path: 'about/index.html', name: 'About' },
  { path: 'services/index.html', name: 'Services' },
  { path: 'services-pricing/index.html', name: 'Services & Pricing' },
  { path: 'portfolio/index.html', name: 'Portfolio' },
  { path: 'contact/index.html', name: 'Contact' },
  { path: 'blog/index.html', name: 'Blog' },
  { path: 'app-building/index.html', name: 'App Building' },
  { path: 'workflow-automation/index.html', name: 'Workflow Automation' }
];

console.log('🔍 Checking indexability of all main pages...\n');

for (const page of mainPages) {
  try {
    const fullPath = join(distPath, page.path);
    const html = await readFile(fullPath, 'utf-8');
    
    // Check for noindex
    const hasNoindex = html.includes('noindex');
    
    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'NO TITLE FOUND';
    
    // Extract description
    const descMatch = html.match(/<meta name="description" content="(.*?)"/);
    const description = descMatch ? descMatch[1] : 'NO DESCRIPTION FOUND';
    
    // Check for canonical
    const canonicalMatch = html.match(/<meta property="og:url" content="(.*?)"/);
    const canonical = canonicalMatch ? canonicalMatch[1] : 'NO CANONICAL';
    
    console.log(`📄 ${page.name} (${page.path})`);
    console.log(`   ✅ Indexable: ${!hasNoindex ? 'YES' : 'NO (has noindex)'}`);
    console.log(`   📝 Title: ${title}`);
    console.log(`   📋 Description: ${description.substring(0, 60)}...`);
    console.log(`   🔗 Canonical: ${canonical}`);
    console.log('');
    
  } catch (error) {
    console.log(`❌ ${page.name}: ERROR - ${error.message}\n`);
  }
}

console.log('✅ Indexability check complete!');
