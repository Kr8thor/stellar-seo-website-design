#!/usr/bin/env node

/**
 * BUILD TRUE CRAWLABLE SSG
 * This creates REAL static HTML with visible content for crawlers
 * Based on the "Final Fix" requirements document
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Building TRUE Crawlable SSG Version...\n');

async function buildCrawlableSSG() {
  try {
    // Step 1: Build the React app first
    console.log('📦 Step 1: Building React application...');
    execSync('npm run build:client', { stdio: 'inherit', cwd: __dirname });
    
    // Step 2: Build the server bundle
    console.log('\n📦 Step 2: Building server bundle...');
    execSync('npm run build:server', { stdio: 'inherit', cwd: __dirname });
    
    // Step 3: Pre-render the content
    console.log('\n📦 Step 3: Pre-rendering static content...');
    
    // Import the server render function
    const { render } = await import('./dist/server/entry-server.js');
    
    // Read the client HTML template
    const templatePath = path.join(__dirname, 'dist', 'client', 'index.html');
    let template = await fs.readFile(templatePath, 'utf-8');
    
    // Render the React app to static HTML
    const { html: appHtml } = await render('/');
    
    // Replace the empty root with pre-rendered content
    template = template.replace(
      '<div id="root"><!--ssr-outlet--></div>',
      `<div id="root">${appHtml}</div>`
    );
    
    // Write the final HTML with both static content AND React
    const outputPath = path.join(__dirname, 'dist', 'index.html');
    await fs.writeFile(outputPath, template);
    
    console.log('\n✅ Crawlable build complete!');
    console.log('📄 Output: dist/index.html');
    console.log('🕷️ Content is immediately visible to crawlers');
    console.log('⚛️ React app hydrates for interactivity');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildCrawlableSSG();
