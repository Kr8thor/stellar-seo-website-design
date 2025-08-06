import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function verboseBuildTest() {
  console.log('🔍 Running verbose build test...\n');
  
  // Step 1: Load and parse the build script
  const buildScriptPath = path.join(__dirname, 'build-comprehensive-static-ssg.mjs');
  console.log('📄 Loading build script from:', buildScriptPath);
  
  // Step 2: Import and run the discoverBlogPosts function
  try {
    const module = await import(buildScriptPath);
    console.log('✅ Build script loaded successfully');
    console.log('Available exports:', Object.keys(module));
  } catch (error) {
    console.error('❌ Failed to load build script:', error.message);
  }
  
  // Step 3: Manually discover blog posts
  console.log('\n📊 Manually discovering blog posts...');
  
  try {
    const blogDataPath = path.join(__dirname, 'src', 'data', 'blogPosts.tsx');
    const blogContent = await fs.readFile(blogDataPath, 'utf8');
    
    const blogPosts = [];
    const matches = blogContent.match(/id:\s*["'`]([^"'`]+)["'`][\s\S]*?title:\s*["'`]([^"'`]+)["'`]/g);
    
    if (matches) {
      matches.forEach(match => {
        const idMatch = match.match(/id:\s*["'`]([^"'`]+)["'`]/);
        const titleMatch = match.match(/title:\s*["'`]([^"'`]+)["'`]/);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          const blogPost = {
            id,
            slug: id,
            title,
            path: `/blog/${id}`,
            priority: 0.6,
            changefreq: 'monthly'
          };
          blogPosts.push(blogPost);
          console.log(`  Found: ${blogPost.path}`);
        }
      });
    }
    
    console.log(`\n✅ Total blog posts found: ${blogPosts.length}`);
    
    // Step 4: Try to generate one blog post manually
    if (blogPosts.length > 0) {
      console.log('\n🔨 Attempting to generate first blog post manually...');
      const firstPost = blogPosts[0];
      const outputDir = path.join(__dirname, 'dist', 'blog', firstPost.slug);
      const outputPath = path.join(outputDir, 'index.html');
      
      console.log(`  Creating directory: ${outputDir}`);
      await fs.mkdir(outputDir, { recursive: true });
      
      const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${firstPost.title}</title>
</head>
<body>
  <h1>${firstPost.title}</h1>
  <p>Test blog post page for: ${firstPost.id}</p>
</body>
</html>`;
      
      console.log(`  Writing HTML to: ${outputPath}`);
      await fs.writeFile(outputPath, testHtml, 'utf8');
      
      // Verify it was created
      const exists = await fs.access(outputPath).then(() => true).catch(() => false);
      console.log(`  ✅ File created successfully: ${exists}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verboseBuildTest();
