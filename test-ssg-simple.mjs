#!/usr/bin/env node

/**
 * SIMPLE SSG TEST - Debug version
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Simple SSG Test...');
console.log('Current directory:', __dirname);

async function testBuild() {
  try {
    console.log('Step 1: Testing file write...');
    
    const testContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Professional SEO Services & App Development | Boost Rankings Now - Marden SEO</title>
  <meta name="description" content="Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://mardenseo.com/">
</head>
<body>
  <!-- STATIC CONTENT: Visible immediately for search engines -->
  <div id="static-content">
    <h1>Professional SEO Services That Drive Results</h1>
    <h2>Boost your search rankings with data-driven strategies that increase organic traffic and conversions</h2>
    
    <p>Transform your online presence with expert SEO services that deliver measurable results. We help businesses increase organic traffic, improve search rankings, and drive sustainable growth through data-driven strategies.</p>
    
    <h3>Our Core Services</h3>
    <ul>
      <li><a href="/services">Technical SEO Optimization</a> - Complete website optimization including Core Web Vitals and structured data</li>
      <li><a href="/services">Content Strategy & Creation</a> - Data-driven content that targets high-value keywords</li>
      <li><a href="/services-pricing">SEO Packages & Pricing</a> - Transparent pricing for measurable results</li>
      <li><a href="/app-building">Custom App Development</a> - React and modern web applications</li>
      <li><a href="/workflow-automation">Workflow Automation</a> - n8n automation solutions for business efficiency</li>
    </ul>
    
    <h3>Proven Results</h3>
    <p>Our clients see an average 150% increase in organic traffic within 6 months. We focus on sustainable, white-hat SEO strategies that deliver long-term results.</p>
    <p><a href="/portfolio">View Our Case Studies</a> to see real client success stories and measurable results.</p>
    
    <h3>Ready to Get Started?</h3>
    <p><a href="/contact">Contact us today</a> for a free SEO consultation and discover how we can help your business dominate search rankings.</p>
  </div>
  
  <!-- REACT HYDRATION TARGET -->
  <div id="root"></div>
  
  <!-- LOAD REACT APP FOR INTERACTIVE FEATURES -->
  <script type="module" src="/assets/index.js"></script>
</body>
</html>`;

    const outputPath = path.join(__dirname, 'dist', 'index.html');
    console.log('Writing to:', outputPath);
    
    await fs.writeFile(outputPath, testContent, 'utf8');
    console.log('✅ File written successfully!');
    
    // Verify the file was written
    const stats = await fs.stat(outputPath);
    console.log('File size:', stats.size, 'bytes');
    console.log('Modified:', stats.mtime);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testBuild();
