import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  try {
    console.log('🚀 Starting build finalization...');
    
    // Copy client build to main dist
    const clientDistPath = path.resolve(__dirname, 'dist', 'client');
    const mainDistPath = path.resolve(__dirname, 'dist');
    
    // Ensure main dist exists
    if (!fs.existsSync(mainDistPath)) {
      fs.mkdirSync(mainDistPath, { recursive: true });
    }
    
    // Copy all files from client to main dist
    if (fs.existsSync(clientDistPath)) {
      copyRecursiveSync(clientDistPath, mainDistPath);
      console.log('✅ Client files copied to dist/');
    }
    
    // Ensure the index.html has proper structure for React
    const indexPath = path.resolve(mainDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, 'utf-8');
      
      // Make sure the root div exists for React
      if (!html.includes('<div id="root">')) {
        html = html.replace('<body>', '<body>\n    <div id="root"></div>');
      }
      
      fs.writeFileSync(indexPath, html, 'utf-8');
      console.log('✅ index.html verified');
    }
    
    console.log('✅ Build finalization complete!');
    
  } catch (error) {
    console.error('❌ Build finalization failed:', error);
    process.exit(1);
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      // Skip copying client directory to avoid recursion
      if (childItemName === 'client' || childItemName === 'server') return;
      
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Run the prerender function
prerender();