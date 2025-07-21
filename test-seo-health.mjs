#!/usr/bin/env node

/**
 * 🔍 TEST SEO HEALTH - Verify all fixes are working properly
 * Tests URLs without redirects to match production behavior
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 8091;

// Expected URLs that should return 200 OK
const EXPECTED_URLS = [
  '/',
  '/about',
  '/services', 
  '/services-pricing',
  '/contact',
  '/portfolio',
  '/app-building',
  '/workflow-automation',
  '/blog',
  '/blog/local-seo-2025',
  '/blog/ai-midlife-crisis',
  '/blog/on-page-seo-tactics-2025'
];

/**
 * Create a simple HTTP server that serves static files like production
 */
function createServer() {
  return http.createServer((req, res) => {
    let url = req.url;
    
    // Remove query string
    url = url.split('?')[0];
    
    // Handle root
    if (url === '/') {
      return serveFile(res, path.join(DIST_DIR, 'index.html'));
    }
    
    // Handle static files (assets, sitemap, robots, etc.)
    if (url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|xml|txt|webmanifest|mp4)$/)) {
      return serveFile(res, path.join(DIST_DIR, url));
    }
    
    // Handle page routes - serve the index.html from the directory
    const pagePath = path.join(DIST_DIR, url, 'index.html');
    if (fs.existsSync(pagePath)) {
      return serveFile(res, pagePath);
    }
    
    // 404 for everything else
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  });
}

function serveFile(res, filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.xml') contentType = 'application/xml';
    else if (ext === '.txt') contentType = 'text/plain';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.ico') contentType = 'image/x-icon';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
    
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
}

/**
 * Test all URLs to verify they return 200 OK
 */
async function testUrls() {
  console.log('🔍 Testing URL health...\n');
  
  const results = [];
  
  for (const url of EXPECTED_URLS) {
    try {
      const response = await fetch(`http://localhost:${PORT}${url}`);
      const status = response.status;
      const canonical = await extractCanonical(response);
      
      results.push({
        url,
        status,
        canonical,
        success: status === 200
      });
      
      const statusIcon = status === 200 ? '✅' : '❌';
      console.log(`${statusIcon} ${url} → ${status} (canonical: ${canonical})`);
      
    } catch (error) {
      results.push({
        url,
        status: 'ERROR',
        canonical: 'N/A',
        success: false
      });
      console.log(`❌ ${url} → ERROR: ${error.message}`);
    }
  }
  
  return results;
}

async function extractCanonical(response) {
  try {
    const html = await response.text();
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    return canonicalMatch ? canonicalMatch[1] : 'NOT FOUND';
  } catch {
    return 'ERROR';
  }
}

/**
 * Main test function
 */
async function runTests() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Please run build first.');
    process.exit(1);
  }
  
  const server = createServer();
  
  // Start server
  await new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`🚀 Test server running at http://localhost:${PORT}`);
      console.log('📊 This server simulates production behavior (no redirects)\n');
      resolve();
    });
  });
  
  // Test URLs
  const results = await testUrls();
  
  // Generate report
  console.log('\n📊 SEO HEALTH REPORT');
  console.log('===================');
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  const healthScore = Math.round((successful / total) * 100);
  
  console.log(`✅ Successful: ${successful}/${total}`);
  console.log(`📈 Health Score: ${healthScore}%`);
  
  if (healthScore === 100) {
    console.log('🎉 PERFECT SEO HEALTH - All URLs return 200 OK!');
  } else {
    console.log('⚠️ Issues found - check failed URLs above');
  }
  
  console.log('\n🔧 Test Commands:');
  console.log(`   • Visit: http://localhost:${PORT}`);
  console.log(`   • Sitemap: http://localhost:${PORT}/sitemap.xml`);
  console.log(`   • Robots: http://localhost:${PORT}/robots.txt`);
  console.log('\n💡 Use this server for SEO testing instead of the dev server');
  console.log('   (This server matches production behavior)\n');
  
  // Keep server running
  console.log('⏸️ Server will keep running for testing. Press Ctrl+C to stop.');
}

// Run tests
runTests().catch(console.error);
