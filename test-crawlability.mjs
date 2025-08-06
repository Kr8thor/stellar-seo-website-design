#!/usr/bin/env node

import http from 'http';
import fs from 'fs/promises';

console.log('🔍 Testing Crawlability of Local Build\n');
console.log('=====================================\n');

const testCrawlability = () => {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:8090', (res) => {  // Changed to 8090
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', async () => {
        // Save the HTML for inspection
        await fs.writeFile('crawlable-test.html', data);
        
        console.log('📊 CRAWLABILITY TEST RESULTS:');
        console.log('==============================\n');
        
        // Check for actual content
        const hasH1 = data.includes('<h1>') && data.includes('</h1>');
        const hasContent = data.includes('Professional SEO Services');
        const hasNavigation = data.includes('href="/about"') && data.includes('href="/services"');
        const hasMetaDescription = data.includes('meta name="description"');
        const hasStructuredData = data.includes('application/ld+json');
        
        // Check for SEO content
        const h1Match = data.match(/<h1>(.*?)<\/h1>/);
        const h2Match = data.match(/<h2>(.*?)<\/h2>/);
        const contentLength = data.length;
        
        console.log('✅ SEO CONTENT CHECKS:');
        console.log(`  📝 H1 Tag: ${hasH1 ? '✅ Found' : '❌ Missing'}`);
        if (h1Match) console.log(`     Content: "${h1Match[1]}"`);
        
        console.log(`  📝 H2 Tag: ${h2Match ? '✅ Found' : '❌ Missing'}`);
        if (h2Match) console.log(`     Content: "${h2Match[1]}"`);
        
        console.log(`  📝 Main Content: ${hasContent ? '✅ Found' : '❌ Missing'}`);
        console.log(`  📝 Navigation Links: ${hasNavigation ? '✅ Found' : '❌ Missing'}`);
        console.log(`  📝 Meta Description: ${hasMetaDescription ? '✅ Found' : '❌ Missing'}`);
        console.log(`  📝 Structured Data: ${hasStructuredData ? '✅ Found' : '❌ Missing'}`);
        
        // Check for Google Analytics
        const hasGA = data.includes('G-C4RC6CSFG6');
        const hasGTM = data.includes('GTM-5R45LHS7');
        
        console.log('\n✅ ANALYTICS CHECKS:');
        console.log(`  📊 Google Analytics: ${hasGA ? '✅ Present' : '❌ Missing'}`);
        console.log(`  📊 Google Tag Manager: ${hasGTM ? '✅ Present' : '❌ Missing'}`);
        
        // Check if content is immediately visible
        const hasStaticContent = data.includes('Our Core Services') || 
                                data.includes('Technical SEO Optimization');
        const hasEmptyRoot = data.includes('<div id="root"><!--ssr-outlet--></div>');
        
        console.log('\n✅ CRAWLABILITY STATUS:');
        console.log(`  🕷️ Static Content Visible: ${hasStaticContent ? '✅ YES - Crawlable!' : '❌ NO - Not Crawlable'}`);
        console.log(`  🕷️ Empty React Root: ${hasEmptyRoot ? '⚠️ Yes (needs content)' : '✅ Has content'}`);
        console.log(`  📏 Page Size: ${contentLength} bytes ${contentLength > 5000 ? '✅' : '⚠️ Too small'}`);
        
        // Extract visible text content (remove tags)
        const textContent = data.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
        const wordCount = textContent.split(' ').filter(word => word.length > 2).length;
        
        console.log(`  📝 Word Count: ${wordCount} words ${wordCount > 300 ? '✅ Good for SEO' : '⚠️ Needs more content'}`);
        
        // Final verdict
        console.log('\n🎯 FINAL VERDICT:');
        if (hasContent && hasH1 && hasNavigation && hasGA) {
          console.log('✅ PAGE IS CRAWLABLE AND SEO-READY!');
          console.log('   Search engines can see your content');
          console.log('   Google Analytics is properly configured');
          console.log('   Ready for production deployment');
        } else {
          console.log('❌ PAGE HAS CRAWLABILITY ISSUES:');
          if (!hasContent) console.log('   - Missing main content');
          if (!hasH1) console.log('   - Missing H1 tag');
          if (!hasNavigation) console.log('   - Missing navigation');
          if (!hasGA) console.log('   - Missing Google Analytics');
        }
        
        console.log('\n📄 HTML saved to: crawlable-test.html');
        console.log('👀 View in browser: http://localhost:8090');
        
        resolve(data);
      });
    }).on('error', (err) => {
      console.error('Error:', err);
      reject(err);
    });
  });
};

testCrawlability().catch(console.error);
