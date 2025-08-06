#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Verifying Google Analytics in all pages...\n');

const checkAnalytics = async () => {
  const distPath = path.join(__dirname, 'dist');
  
  // Pages to check
  const pages = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'services-pricing/index.html',
    'contact/index.html',
    'portfolio/index.html',
    'blog/index.html',
    'app-building/index.html',
    'workflow-automation/index.html'
  ];
  
  let allHaveAnalytics = true;
  let allHaveGTM = true;
  
  for (const page of pages) {
    const filePath = path.join(distPath, page);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const hasGA = content.includes('G-C4RC6CSFG6');
      const hasGTM = content.includes('GTM-5R45LHS7');
      
      console.log(`📄 ${page}:`);
      console.log(`   GA4: ${hasGA ? '✅' : '❌'} | GTM: ${hasGTM ? '✅' : '❌'}`);
      
      if (!hasGA) allHaveAnalytics = false;
      if (!hasGTM) allHaveGTM = false;
      
    } catch (err) {
      console.log(`📄 ${page}: ⚠️ File not found`);
    }
  }
  
  console.log('\n📊 SUMMARY:');
  console.log('=================');
  if (allHaveAnalytics && allHaveGTM) {
    console.log('✅ ALL PAGES have Google Analytics properly configured!');
    console.log('✅ Ready for deployment!');
  } else {
    console.log('❌ Some pages are missing Analytics tags');
    console.log('⚠️  Need to fix before deployment');
  }
};

checkAnalytics().catch(console.error);
