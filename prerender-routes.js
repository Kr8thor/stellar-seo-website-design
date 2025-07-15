#!/usr/bin/env node

/**
 * Static Site Generation for SEO Optimization
 * Generates static HTML files for all routes to ensure crawlers see complete content
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/about',
  '/services', 
  '/services-pricing',
  '/portfolio',
  '/blog',
  '/contact',
  '/app-building',
  '/workflow-automation',
  // Dynamic blog routes - using proper slugs
  '/blog/local-seo-2025',
  '/blog/ai-midlife-crisis',
  '/blog/eat-guide',
  // Case study routes
  '/case-study/ecommerce-seo',
  '/case-study/saas-growth',
  '/case-study/local-business'
];

const distDir = './dist';

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('Building project first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Create directory structure for all routes
routes.forEach(route => {
  if (route === '/') return; // Skip root, already handled
  
  const routePath = path.join(distDir, route);
  const indexPath = path.join(routePath, 'index.html');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }
  
  // Copy main index.html to route directory
  const mainIndexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(mainIndexPath)) {
    fs.copyFileSync(mainIndexPath, indexPath);
    console.log(`✅ Generated: ${route}`);
  }
});

console.log('🎉 Static site generation complete!');
console.log('📄 All routes now have static HTML files for SEO crawlers');
