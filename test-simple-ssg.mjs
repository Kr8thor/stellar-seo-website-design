#!/usr/bin/env node

/**
 * Simple SSG Test - to verify the basic approach works
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Simple SSG Test...');

async function testSSG() {
  try {
    console.log('1. Creating test static HTML...');
    
    // Simple test HTML
    const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Static Page</title>
</head>
<body>
  <h1>Static HTML Generated Successfully!</h1>
  <p>This is a test static HTML page.</p>
</body>
</html>`;

    // Ensure dist directory exists
    await fs.mkdir('dist', { recursive: true });
    
    // Write test file
    await fs.writeFile('dist/test-static.html', testHTML);
    
    console.log('✅ Test static HTML created successfully!');
    console.log('📁 Check: dist/test-static.html');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testSSG();
