#!/usr/bin/env node

/**
 * 🚨 CRITICAL SEO FIX: Eliminate Canonicalization Issues
 * 
 * PROBLEM: .htaccess file causing 301 redirects instead of serving pages with 200 OK
 * SOLUTION: Simplified .htaccess that serves pages directly without redirects
 * 
 * ISSUE ANALYSIS:
 * - Screaming Frog shows pages as "Canonicalised" instead of "Indexable"
 * - Pages returning 301 redirects instead of 200 OK
 * - Over-aggressive redirect rules in .htaccess
 * 
 * FIX: Clean .htaccess with minimal redirects, focus on serving content directly
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// FIXED .HTACCESS CONFIGURATION
// =============================================================================

const fixedHtaccess = `# Marden SEO - SEO-Optimized .htaccess (Zero Canonicalization Issues)
# Purpose: Serve pages with 200 OK status, eliminate unnecessary 301s

<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Force HTTPS only (essential security)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  
  # Serve static HTML files for directories (no redirects)
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)/?$ $1/index.html [L]
  
  # Handle root directory
  DirectoryIndex index.html
  
  # Fallback to React router for SPA functionality
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  
  # Prevent directory listing
  Options -Indexes
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE image/x-icon
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # Web fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  
  # HTML (no cache for dynamic content)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# MIME Types
<IfModule mod_mime.c>
  AddType application/javascript js
  AddType text/css css
  AddType image/svg+xml svg svgz
  AddType font/woff2 woff2
  AddType font/woff woff
  AddType application/vnd.ms-fontobject eot
  AddType font/ttf ttf
  AddType font/otf otf
</IfModule>

# Protect sensitive files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>

# Block access to backup files
<FilesMatch "\\.(bak|config|sql|fla|psd|ini|log|sh|inc|swp|dist)$">
  Order allow,deny
  Deny from all
</FilesMatch>`;

// =============================================================================
// CANONICAL URL FIX FUNCTION
// =============================================================================

async function fixCanonicalizationIssues() {
  console.log('🚨 FIXING CRITICAL CANONICALIZATION ISSUES...\n');
  
  try {
    // Step 1: Backup current .htaccess
    console.log('📁 Backing up current .htaccess...');
    const distHtaccessPath = path.join(__dirname, 'dist', '.htaccess');
    const backupPath = path.join(__dirname, 'dist', '.htaccess.backup');
    
    try {
      const currentHtaccess = await fs.readFile(distHtaccessPath, 'utf8');
      await fs.writeFile(backupPath, currentHtaccess, 'utf8');
      console.log('✅ Backup created: .htaccess.backup\n');
    } catch (error) {
      console.log('ℹ️ No existing .htaccess to backup\n');
    }
    
    // Step 2: Write fixed .htaccess
    console.log('🔧 Installing SEO-optimized .htaccess...');
    await fs.writeFile(distHtaccessPath, fixedHtaccess, 'utf8');
    console.log('✅ Fixed .htaccess installed\n');
    
    // Step 3: Copy to public directory for future builds
    console.log('📋 Updating public directory .htaccess...');
    const publicHtaccessPath = path.join(__dirname, 'public', '.htaccess');
    await fs.writeFile(publicHtaccessPath, fixedHtaccess, 'utf8');
    console.log('✅ Public .htaccess updated\n');
    
    // Step 4: Verification
    console.log('🔍 WHAT WAS FIXED:');
    console.log('   ❌ REMOVED: Trailing slash removal (causing 301s)');
    console.log('   ❌ REMOVED: .html extension removal (causing 301s)');
    console.log('   ❌ REMOVED: Complex directory handling (causing redirects)');
    console.log('   ✅ KEPT: HTTPS enforcement (essential)');
    console.log('   ✅ KEPT: Security headers and compression');
    console.log('   ✅ ADDED: Direct static file serving (200 OK)\n');
    
    console.log('🎯 EXPECTED RESULTS:');
    console.log('   • All pages will return 200 OK (not 301)');
    console.log('   • Canonical tags will point to themselves');
    console.log('   • Screaming Frog will show "Indexable" not "Canonicalised"');
    console.log('   • Zero unnecessary redirects');
    console.log('   • Clean SEO health score improvement\n');
    
    console.log('⚡ NEXT STEPS:');
    console.log('   1. npm run test:comprehensive (test locally)');
    console.log('   2. Deploy to production');
    console.log('   3. Re-run Screaming Frog audit');
    console.log('   4. Verify all pages show as "Indexable"\n');
    
    console.log('🚀 CANONICALIZATION FIX COMPLETE!');
    
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  }
}

// Run the fix
if (import.meta.url === `file://${process.argv[1]}`) {
  fixCanonicalizationIssues();
}

export default fixCanonicalizationIssues;
