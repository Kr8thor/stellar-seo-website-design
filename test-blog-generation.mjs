import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testBlogGeneration() {
  console.log('🔧 Testing blog post generation...\n');
  
  // First run the comprehensive build
  console.log('1️⃣ Running comprehensive build...');
  try {
    execSync('npm run build:comprehensive', { 
      stdio: 'inherit', 
      cwd: __dirname 
    });
  } catch (error) {
    console.error('Build failed:', error.message);
    return;
  }
  
  console.log('\n2️⃣ Checking what was generated...');
  
  // Check dist/blog directory
  const distBlogPath = path.join(__dirname, 'dist', 'blog');
  
  try {
    const entries = await fs.readdir(distBlogPath, { withFileTypes: true });
    console.log(`\n📁 Contents of ${distBlogPath}:`);
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        console.log(`  [DIR] ${entry.name}/`);
        
        // Check contents of subdirectory
        const subPath = path.join(distBlogPath, entry.name);
        const subEntries = await fs.readdir(subPath);
        for (const subEntry of subEntries) {
          console.log(`    - ${subEntry}`);
        }
      } else {
        console.log(`  [FILE] ${entry.name}`);
      }
    }
    
    // Also check if the expected blog posts exist
    console.log('\n3️⃣ Checking expected blog posts:');
    const expectedPosts = [
      'local-seo-2025',
      'ai-midlife-crisis',
      'eat-guide'
    ];
    
    for (const post of expectedPosts) {
      const postPath = path.join(distBlogPath, post, 'index.html');
      try {
        await fs.access(postPath);
        console.log(`  ✅ ${post}: EXISTS`);
      } catch {
        console.log(`  ❌ ${post}: MISSING`);
      }
    }
    
  } catch (error) {
    console.error('Error checking blog directory:', error.message);
  }
}

testBlogGeneration();
