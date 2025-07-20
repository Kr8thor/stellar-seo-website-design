#!/usr/bin/env node

/**
 * 🚀 MINIMALLY WORKING SSG GENERATOR
 * Creates static HTML for the most important pages
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 MINIMAL WORKING SSG GENERATOR');
console.log('================================');

// Build React app first
async function buildReactApp() {
  console.log('\n📦 Building React app...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ React build completed');
  } catch (error) {
    console.error('❌ React build failed:', error.message);
    process.exit(1);
  }
}

// Core routes that MUST have static HTML
const routes = [
  {
    path: '/',
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    h1: 'Professional SEO Services That Drive Results'
  },
  {
    path: '/about',
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    h1: 'Expert SEO Team & Proven Methodology'
  },
  {
    path: '/services',
    title: 'Professional SEO Services & Solutions | Comprehensive SEO Packages - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and link building. Custom packages for businesses of all sizes.',
    h1: 'Professional SEO Services & Solutions'
  },
  {
    path: '/services-pricing',
    title: 'SEO Services & Pricing Packages | Transparent SEO Pricing - Marden SEO',
    description: 'Transparent SEO pricing packages for businesses of all sizes. From starter SEO to enterprise solutions. Get measurable results with our proven SEO strategies.',
    h1: 'SEO Services & Pricing Packages'
  },
  {
    path: '/contact',
    title: 'Contact Marden SEO | Free SEO Consultation & Quote - Marden SEO',
    description: 'Contact our SEO experts for a free consultation and custom quote. Get personalized SEO strategies that drive results for your business. Call or email today.',
    h1: 'Contact Our SEO Experts'
  }
];

function generateHTML(route) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${route.title}</title>
  <meta name="description" content="${route.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://mardenseo.com${route.path}">
  
  <!-- Load styles -->
  <link rel="stylesheet" href="/assets/index.css">
</head>
<body>
  <!-- Static Content for Crawlers -->
  <div id="static-content">
    <nav style="padding: 1rem; background: #f8f9fa;">
      <a href="/" style="margin-right: 1rem;">Home</a>
      <a href="/about" style="margin-right: 1rem;">About</a>
      <a href="/services" style="margin-right: 1rem;">Services</a>
      <a href="/services-pricing" style="margin-right: 1rem;">Pricing</a>
      <a href="/contact" style="margin-right: 1rem;">Contact</a>
    </nav>
    <main style="padding: 2rem;">
      <h1>${route.h1}</h1>
      <p>Professional SEO services and app development solutions.</p>
      <p><a href="/contact">Contact us today</a> for a free consultation.</p>
    </main>
  </div>
  
  <div id="root"></div>
  <script src="/assets/index.js"></script>
</body>
</html>`;
}

async function main() {
  try {
    console.log('\n🏗️ Starting minimal SSG build...');
    
    // Step 1: Build React app
    await buildReactApp();
    
    // Step 2: Create static pages
    console.log(`\n📄 Generating ${routes.length} static pages...\n`);
    
    for (const route of routes) {
      console.log(`  ⚡ Generating: ${route.path}`);
      
      const html = generateHTML(route);
      
      let outputPath;
      if (route.path === '/') {
        outputPath = path.join(__dirname, 'dist', 'index.html');
      } else {
        const routePath = route.path.replace(/^\//, '');
        outputPath = path.join(__dirname, 'dist', routePath, 'index.html');
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
      }
      
      await fs.writeFile(outputPath, html, 'utf8');
      console.log(`    ✅ Created: ${outputPath.replace(__dirname + '\\dist\\', '')}`);
    }
    
    console.log('\n🎉 MINIMAL SSG BUILD COMPLETE!');
    console.log('===============================');
    console.log(`✅ Generated ${routes.length} static HTML pages`);
    console.log('✅ All pages have unique meta tags');
    console.log('✅ Static content visible to crawlers');
    console.log('✅ React app preserved for users\n');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
