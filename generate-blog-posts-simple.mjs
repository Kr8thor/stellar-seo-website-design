import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 SIMPLE BLOG POST GENERATOR\n');

async function generateBlogPosts() {
  try {
    // Step 1: Copy client build to dist
    console.log('1️⃣ Copying client build to dist...');
    const clientDir = path.join(__dirname, 'dist', 'client');
    const distDir = path.join(__dirname, 'dist');
    
    // Copy all files from client to dist
    const files = await fs.readdir(clientDir);
    for (const file of files) {
      const src = path.join(clientDir, file);
      const dest = path.join(distDir, file);
      const stats = await fs.stat(src);
      
      if (stats.isDirectory()) {
        // Skip if it's a directory (like assets)
        if (file !== 'assets') {
          await fs.cp(src, dest, { recursive: true });
        }
      } else {
        await fs.copyFile(src, dest);
      }
    }
    
    // Ensure assets directory exists in dist
    const assetsDir = path.join(distDir, 'assets');
    await fs.mkdir(assetsDir, { recursive: true });
    
    // Copy assets
    const clientAssetsDir = path.join(clientDir, 'assets');
    if (await fs.access(clientAssetsDir).then(() => true).catch(() => false)) {
      await fs.cp(clientAssetsDir, assetsDir, { recursive: true });
    }
    
    console.log('✅ Client files copied\n');
    
    // Step 2: Create main pages
    console.log('2️⃣ Creating main page directories...');
    const mainPages = [
      'about', 'services', 'services-pricing', 'contact', 
      'portfolio', 'app-building', 'workflow-automation', 'blog'
    ];
    
    for (const page of mainPages) {
      const pageDir = path.join(distDir, page);
      await fs.mkdir(pageDir, { recursive: true });
      
      // Copy index.html to each directory
      const indexPath = path.join(distDir, 'index.html');
      const pageIndexPath = path.join(pageDir, 'index.html');
      await fs.copyFile(indexPath, pageIndexPath);
      console.log(`  ✅ Created: /${page}/`);
    }
    
    // Step 3: Discover and create blog posts
    console.log('\n3️⃣ Discovering and creating blog posts...');
    const blogDataPath = path.join(__dirname, 'src', 'data', 'blogPosts.tsx');
    const blogContent = await fs.readFile(blogDataPath, 'utf8');
    
    const blogPosts = [];
    const matches = blogContent.match(/id:\s*["'`]([^"'`]+)["'`][\s\S]*?title:\s*["'`]([^"'`]+)["'`]/g);
    
    if (matches) {
      matches.forEach(match => {
        const idMatch = match.match(/id:\s*["'`]([^"'`]+)["'`]/);
        const titleMatch = match.match(/title:\s*["'`]([^"'`]+)["'`]/);
        
        if (idMatch && titleMatch) {
          blogPosts.push({
            id: idMatch[1],
            title: titleMatch[1]
          });
        }
      });
    }
    
    console.log(`  Found ${blogPosts.length} blog posts\n`);
    
    // Create blog post directories
    for (const post of blogPosts) {
      const postDir = path.join(distDir, 'blog', post.id);
      await fs.mkdir(postDir, { recursive: true });
      
      // Copy and modify index.html
      const indexPath = path.join(distDir, 'index.html');
      const html = await fs.readFile(indexPath, 'utf8');
      
      // Update meta tags for blog post
      const modifiedHtml = html
        .replace(/<title>.*?<\/title>/, `<title>${post.title} - Marden SEO</title>`)
        .replace(/(<meta name="description" content=")([^"]*)(")/, 
          `$1${post.title} - Expert SEO insights and strategies.$3`);
      
      await fs.writeFile(path.join(postDir, 'index.html'), modifiedHtml, 'utf8');
      console.log(`  ✅ Created: /blog/${post.id}/`);
    }
    
    // Step 4: Generate sitemap
    console.log('\n4️⃣ Generating sitemap...');
    try {
      execSync('node generate-production-sitemap.cjs', { 
        stdio: 'inherit', 
        cwd: __dirname 
      });
    } catch (error) {
      console.log('  ⚠️ Sitemap generation failed, continuing...');
    }
    
    console.log('\n✅ BUILD COMPLETE!\n');
    
    // Verify what was created
    console.log('📊 Verification:');
    const distBlogDir = path.join(distDir, 'blog');
    const blogDirs = await fs.readdir(distBlogDir, { withFileTypes: true });
    const blogPostDirs = blogDirs.filter(d => d.isDirectory());
    
    console.log(`  - Main pages: ${mainPages.length}`);
    console.log(`  - Blog posts: ${blogPostDirs.length}`);
    console.log(`  - Total pages: ${mainPages.length + blogPostDirs.length + 1}`); // +1 for home
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

generateBlogPosts();
