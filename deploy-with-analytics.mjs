#!/usr/bin/env node

/**
 * 🚀 DEPLOY TO PRODUCTION WITH ANALYTICS
 * This script prepares and guides the deployment
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 DEPLOYMENT PREPARATION WITH GOOGLE ANALYTICS\n');
console.log('================================================\n');

const deploy = async () => {
  try {
    // 1. Verify Analytics in build
    console.log('📊 Step 1: Verifying Google Analytics in build...');
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    const content = await fs.readFile(indexPath, 'utf-8');
    
    if (content.includes('GTM-5R45LHS7') && content.includes('G-C4RC6CSFG6')) {
      console.log('✅ Google Analytics tags found in build!\n');
    } else {
      console.log('❌ ERROR: Google Analytics missing from build!');
      console.log('Run: npm run build:comprehensive');
      process.exit(1);
    }
    
    // 2. Show git status
    console.log('📝 Step 2: Checking Git status...');
    try {
      const status = execSync('git status --short', { encoding: 'utf-8' });
      if (status) {
        console.log('Files changed:\n' + status);
      } else {
        console.log('✅ No uncommitted changes\n');
      }
    } catch (e) {
      console.log('⚠️  Could not check git status\n');
    }
    
    // 3. Deployment instructions
    console.log('🎯 Step 3: DEPLOYMENT INSTRUCTIONS');
    console.log('=====================================\n');
    
    console.log('📦 Option A: Deploy via GitHub + cPanel\n');
    console.log('1. Commit and push to GitHub:');
    console.log('   git add -A');
    console.log('   git commit -m "FIX: Deploy with Google Analytics tracking enabled"');
    console.log('   git push origin main\n');
    
    console.log('2. In cPanel Terminal, run:');
    console.log('   cd ~/stellar-seo-website-design');
    console.log('   git pull origin main');
    console.log('   npm install');
    console.log('   npm run build:comprehensive');
    console.log('   rm -rf ~/public_html/*');
    console.log('   cp -r dist/* ~/public_html/');
    console.log('   chmod -R 755 ~/public_html/\n');
    
    console.log('📤 Option B: Direct FTP Upload\n');
    console.log('1. Connect to your server via FTP');
    console.log('2. Navigate to public_html folder');
    console.log('3. Delete all existing files');
    console.log('4. Upload entire contents of dist/ folder');
    console.log('5. Ensure all files are uploaded including:');
    console.log('   - index.html (with Analytics)');
    console.log('   - /assets/ folder');
    console.log('   - All page folders\n');
    
    console.log('✅ VERIFICATION AFTER DEPLOYMENT');
    console.log('==================================\n');
    console.log('1. Visit https://mardenseo.com');
    console.log('2. View Page Source (Ctrl+U)');
    console.log('3. Search for "GTM-5R45LHS7" - should be found');
    console.log('4. Open Google Analytics Real-Time reports');
    console.log('5. You should see your visit immediately\n');
    
    console.log('🔍 QUICK TEST COMMAND:');
    console.log('curl -s https://mardenseo.com | grep -E "GTM-5R45LHS7|G-C4RC6CSFG6"\n');
    
    console.log('💡 IMPORTANT NOTES:');
    console.log('===================');
    console.log('• The current LIVE site does NOT have Analytics');
    console.log('• Every hour without deployment = lost visitor data');
    console.log('• Deploy ASAP to start tracking');
    console.log('• After deployment, data appears in GA4 within 5 minutes\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

deploy();
