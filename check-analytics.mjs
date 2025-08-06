#!/usr/bin/env node

import https from 'https';

console.log('🔍 Checking Google Analytics Configuration on Live Site...\n');

const checkLiveSite = () => {
  return new Promise((resolve, reject) => {
    https.get('https://mardenseo.com', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('📊 Live Site Analysis (https://mardenseo.com):');
        console.log('=========================================');
        
        // Check for Google Analytics
        const hasGA4 = data.includes('G-C4RC6CSFG6');
        const hasGTM = data.includes('GTM-5R45LHS7');
        const hasGtagScript = data.includes('googletagmanager.com/gtag/js');
        const hasGTMScript = data.includes('googletagmanager.com/gtm.js');
        
        console.log(`✅ Google Analytics 4 ID (G-C4RC6CSFG6): ${hasGA4 ? 'FOUND' : '❌ NOT FOUND'}`);
        console.log(`✅ Google Tag Manager ID (GTM-5R45LHS7): ${hasGTM ? 'FOUND' : '❌ NOT FOUND'}`);
        console.log(`✅ Gtag.js Script: ${hasGtagScript ? 'LOADED' : '❌ NOT LOADED'}`);
        console.log(`✅ GTM Script: ${hasGTMScript ? 'LOADED' : '❌ NOT LOADED'}`);
        
        // Check for CSP that might block analytics
        const cspMatch = data.match(/Content-Security-Policy['"]\s*content=['"](.*?)['"]/i);
        if (cspMatch) {
          const csp = cspMatch[1];
          const allowsGA = csp.includes('google-analytics.com') || csp.includes('googletagmanager.com');
          console.log(`\n🔒 Content Security Policy: ${allowsGA ? 'ALLOWS Analytics' : '❌ MAY BLOCK Analytics'}`);
        }
        
        // Check HTML structure
        const hasRoot = data.includes('id="root"');
        const hasSsrOutlet = data.includes('<!--ssr-outlet-->');
        const hasReactScript = data.includes('/assets/main-') || data.includes('/src/main.tsx');
        
        console.log(`\n📄 HTML Structure:`);
        console.log(`  - React Root Div: ${hasRoot ? 'FOUND' : '❌ NOT FOUND'}`);
        console.log(`  - SSR Outlet: ${hasSsrOutlet ? 'FOUND' : 'NOT FOUND (Normal for SPA)'}`);
        console.log(`  - React Script: ${hasReactScript ? 'LOADED' : '❌ NOT LOADED'}`);
        
        // Check page size to see if content is being rendered
        const htmlLength = data.length;
        console.log(`\n📏 Page Size: ${htmlLength} bytes`);
        if (htmlLength < 2000) {
          console.log('  ⚠️ Page seems too small - might be missing content');
        } else if (htmlLength < 5000) {
          console.log('  ⚠️ Page is small - might be missing SSR content');
        } else {
          console.log('  ✅ Page size looks normal');
        }
        
        // Extract first 500 chars to check structure
        console.log('\n📝 First 500 characters of response:');
        console.log(data.substring(0, 500));
        
        resolve(data);
      });
    }).on('error', (err) => {
      console.error('Error fetching site:', err);
      reject(err);
    });
  });
};

// Run the check
checkLiveSite().catch(console.error);
