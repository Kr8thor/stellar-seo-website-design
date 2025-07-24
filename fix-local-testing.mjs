#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔧 Fixing pages for local SEO testing...\n');

// Function to remove canonical tags from HTML files
function removeCanonicalTags(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove canonical link tags
    content = content.replace(/<link[^>]*rel="canonical"[^>]*>/gi, '');
    
    // Also check for any other potential blocking
    // Ensure robots meta is set to index,follow
    if (!content.includes('name="robots"')) {
      // Add robots meta if missing
      content = content.replace('</title>', '</title>\n  <meta name="robots" content="index, follow" />');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Process all HTML files in dist directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip assets directory
      if (file !== 'assets' && file !== 'server' && file !== 'client' && file !== 'lovable-uploads') {
        processDirectory(filePath);
      }
    } else if (file.endsWith('.html')) {
      removeCanonicalTags(filePath);
    }
  });
}

// Start processing
const distPath = path.join(__dirname, 'dist');
console.log(`Processing HTML files in: ${distPath}\n`);

processDirectory(distPath);

console.log('\n✅ Local testing fix complete!');
console.log('📝 Note: This removes canonical tags for local testing only.');
console.log('⚠️  DO NOT deploy these files to production!');
