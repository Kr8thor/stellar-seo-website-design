#!/usr/bin/env node

/**
 * 🧪 LOCAL TESTING CANONICAL FIX
 * 
 * PROBLEM: Screaming Frog shows "Canonicalised" on localhost because 
 * canonical URLs point to production domain (https://mardenseo.com)
 * 
 * SOLUTION: Temporarily replace canonical URLs with localhost URLs for testing
 * 
 * USAGE:
 * 1. npm run test:local-canonicals  (build + fix canonicals + serve)
 * 2. Test with Screaming Frog on localhost
 * 3. Pages should show as "Indexable" instead of "Canonicalised"
 * 
 * NOTE: This is ONLY for local testing. Production should use mardenseo.com URLs.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// CONFIGURATION
// =============================================================================

const PRODUCTION_DOMAIN = 'https://mardenseo.com';
const LOCAL_DOMAIN = 'http://localhost:57368'; // Update if port changes

// =============================================================================
// CANONICAL URL REPLACEMENT
// =============================================================================

async function replaceCanonicalUrls(mode = 'local') {
  const distPath = path.join(__dirname, 'dist');
  
  console.log(`🔄 ${mode === 'local' ? 'Setting localhost' : 'Restoring production'} canonical URLs...`);
  
  try {
    // Find all HTML files in dist directory
    const htmlFiles = await findHtmlFiles(distPath);
    console.log(`📁 Found ${htmlFiles.length} HTML files to process`);
    
    let filesModified = 0;
    
    for (const filePath of htmlFiles) {
      const content = await fs.readFile(filePath, 'utf8');
      let newContent;
      
      if (mode === 'local') {
        // Replace production URLs with localhost URLs
        newContent = content.replace(
          new RegExp(`${PRODUCTION_DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
          LOCAL_DOMAIN
        );
      } else {
        // Restore production URLs
        newContent = content.replace(
          new RegExp(`${LOCAL_DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
          PRODUCTION_DOMAIN
        );
      }
      
      if (newContent !== content) {
        await fs.writeFile(filePath, newContent, 'utf8');
        filesModified++;
        console.log(`  ✅ Updated: ${path.relative(distPath, filePath)}`);
      }
    }
    
    console.log(`📊 Modified ${filesModified} files`);
    console.log(`✅ Canonical URLs ${mode === 'local' ? 'localized' : 'restored'} successfully!`);
    
  } catch (error) {
    console.error('❌ Failed to update canonical URLs:', error);
    process.exit(1);
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

async function findHtmlFiles(dir) {
  const htmlFiles = [];
  
  async function scanDirectory(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.name.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  
  await scanDirectory(dir);
  return htmlFiles;
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  const mode = process.argv[2] || 'local';
  
  if (!['local', 'production'].includes(mode)) {
    console.error('❌ Usage: node fix-local-canonicals.mjs [local|production]');
    process.exit(1);
  }
  
  console.log(`🎯 Canonical URL Fix - ${mode.toUpperCase()} MODE`);
  console.log(`📍 ${mode === 'local' ? 'Setting' : 'Restoring'} canonical URLs for ${mode === 'local' ? LOCAL_DOMAIN : PRODUCTION_DOMAIN}\n`);
  
  await replaceCanonicalUrls(mode);
  
  if (mode === 'local') {
    console.log('\n🧪 LOCAL TESTING READY:');
    console.log('   • All canonical URLs now point to localhost');
    console.log('   • Screaming Frog should show pages as "Indexable"');
    console.log('   • Test at: http://localhost:57368/');
    console.log('\n⚠️  IMPORTANT: Run with "production" mode before deploying!');
  } else {
    console.log('\n🚀 PRODUCTION READY:');
    console.log('   • All canonical URLs restored to mardenseo.com');
    console.log('   • Ready for production deployment');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default replaceCanonicalUrls;
