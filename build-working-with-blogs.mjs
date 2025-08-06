import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 WORKING SSG BUILD WITH BLOG POSTS\n');

async function buildWithBlogPosts() {
  try {
    // Step 1: Build React app
    console.log('1️⃣ Building React app...');
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ React build complete\n');
    
    // Step 2: Discover blog posts
    console.log('2️⃣ Discovering blog posts...');
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
            title: titleMatch[1],
            path: `/blog/${idMatch[1]}`
          });
        }
      });
    }
    
    console.log(`✅ Found ${blogPosts.length} blog posts\n`);
    
    // Step 3: Create blog post directories
    console.log('3️⃣ Creating blog post pages...');
    
    for (const post of blogPosts) {
      const postDir = path.join(__dirname, 'dist', 'blog', post.id);
      await fs.mkdir(postDir, { recursive: true });
      
      // Copy the main index.html and modify it
      const mainIndexPath = path.join(__dirname, 'dist', 'index.html');
      const mainHtml = await fs.readFile(mainIndexPath, 'utf8');
      
      // Update title and meta tags
      let postHtml = mainHtml
        .replace(/<title>.*?<\/title>/, `<title>${post.title} - Marden SEO</title>`)
        .replace(/(<meta name="description" content=")([^"]*)(")/, 
          `$1${post.title} - Expert SEO insights and strategies from Marden SEO.$3`)
        .replace(/(<meta property="og:title" content=")([^"]*)(")/, 
          `$1${post.title} - Marden SEO$3`)
        .replace(/(<meta property="twitter:title" content=")([^"]*)(")/, 
          `$1${post.title} - Marden SEO$3`);
      
      await fs.writeFile(path.join(postDir, 'index.html'), postHtml, 'utf8');
      console.log(`  ✅ Created: ${post.path}`);
    }
    
    console.log('\n4️⃣ Generating sitemap...');
    try {
      execSync('node generate-production-sitemap.cjs', { stdio: 'inherit', cwd: __dirname });
    } catch (error) {
      console.log('  ⚠️ Sitemap generation failed, continuing...');
    }
    
    console.log('\n✅ BUILD COMPLETE!\n');
    console.log('📊 Summary:');
    console.log(`  - Main pages: 9`);
    console.log(`  - Blog posts: ${blogPosts.length}`);
    console.log(`  - Total pages: ${9 + blogPosts.length}`);
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildWithBlogPosts();
