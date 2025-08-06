import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  try {
    console.log('🚀 Starting pre-rendering process...');
    
    // Step 1: Locate the client-built index.html template
    const templatePath = path.resolve(__dirname, 'dist', 'index.html');
    
    // Check if the template exists
    if (!fs.existsSync(templatePath)) {
      // Try the client directory
      const clientTemplatePath = path.resolve(__dirname, 'dist', 'client', 'index.html');
      if (fs.existsSync(clientTemplatePath)) {
        // Copy it to the root dist directory first
        fs.copyFileSync(clientTemplatePath, templatePath);
      } else {
        throw new Error('index.html template not found in dist or dist/client');
      }
    }
    
    let template = fs.readFileSync(templatePath, 'utf-8');
    
    // Step 2: Dynamically import the render function from the server build
    const { render } = await import('./dist/server/entry-server.js');
    
    // Step 3: Execute the render function to get the application's HTML
    console.log('📦 Rendering application...');
    const { html } = await render('/');
    
    // Step 4: Replace the placeholder with the rendered HTML string
    const placeholder = '<div id="root"><!--ssr-outlet--></div>';
    if (!template.includes(placeholder)) {
      throw new Error('Placeholder <!--ssr-outlet--> not found in template');
    }
    
    const finalHtml = template.replace(placeholder, `<div id="root">${html}</div>`);
    
    // Step 5: Write the final HTML back to dist/index.html
    fs.writeFileSync(templatePath, finalHtml, 'utf-8');
    console.log('✅ Pre-rendering complete! HTML written to:', templatePath);
    
    // Copy assets from client build to root dist if needed
    const clientAssetsPath = path.resolve(__dirname, 'dist', 'client', 'assets');
    const distAssetsPath = path.resolve(__dirname, 'dist', 'assets');
    
    if (fs.existsSync(clientAssetsPath) && !fs.existsSync(distAssetsPath)) {
      copyRecursiveSync(clientAssetsPath, distAssetsPath);
      console.log('✅ Assets copied to dist/assets');
    }
    
  } catch (error) {
    console.error('❌ Pre-rendering failed:', error);
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