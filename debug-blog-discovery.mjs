import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function checkBlogPosts() {
  console.log('🔍 Checking blog post discovery...\n');
  
  try {
    const blogDataPath = path.join(__dirname, 'src', 'data', 'blogPosts.tsx');
    console.log('📄 Looking for blog data at:', blogDataPath);
    
    const exists = await fs.access(blogDataPath).then(() => true).catch(() => false);
    console.log('✓ File exists:', exists);
    
    if (exists) {
      const blogContent = await fs.readFile(blogDataPath, 'utf8');
      console.log('✓ File size:', blogContent.length, 'bytes');
      
      // Extract blog post IDs and titles from the file
      const blogPosts = [];
      const matches = blogContent.match(/id:\s*["'`]([^"'`]+)["'`][\s\S]*?title:\s*["'`]([^"'`]+)["'`]/g);
      
      console.log('\n📊 Regex matches found:', matches ? matches.length : 0);
      
      if (matches) {
        matches.forEach((match, index) => {
          const idMatch = match.match(/id:\s*["'`]([^"'`]+)["'`]/);
          const titleMatch = match.match(/title:\s*["'`]([^"'`]+)["'`]/);
          
          if (idMatch && titleMatch) {
            const id = idMatch[1];
            const title = titleMatch[1];
            blogPosts.push({ id, title });
            console.log(`  ${index + 1}. ID: "${id}" | Title: "${title}"`);
          }
        });
      }
      
      console.log('\n✅ Total blog posts found:', blogPosts.length);
      
      // Check dist/blog directory
      const distBlogPath = path.join(__dirname, 'dist', 'blog');
      console.log('\n📁 Checking dist/blog directory:', distBlogPath);
      
      try {
        const blogDirContents = await fs.readdir(distBlogPath);
        console.log('  Contents:', blogDirContents);
        
        // Check for subdirectories
        for (const item of blogDirContents) {
          const itemPath = path.join(distBlogPath, item);
          const stats = await fs.stat(itemPath);
          if (stats.isDirectory()) {
            console.log(`  [DIR] ${item}/`);
          }
        }
      } catch (err) {
        console.log('  ❌ Error reading blog directory:', err.message);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBlogPosts();
