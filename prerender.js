import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  try {
    // Read the client-built index.html
    const templatePath = path.resolve(__dirname, 'dist/client/index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');
    
    // Import the server render function
    const { render } = await import('./dist/server/entry-server.js');
    
    // Render the app to static HTML
    const { html } = await render('/');
    
    // Replace the placeholder with rendered HTML
    const finalHtml = template.replace(
      '<div id="root"><!--ssr-outlet--></div>',
      `<div id="root">${html}</div>`
    );
    
    // Write the final HTML back to dist/client
    fs.writeFileSync(templatePath, finalHtml);
    
    // Create a copy in the main dist folder for deployment
    const distPath = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath);
    }
    
    // Copy all client files to main dist
    const clientDistPath = path.resolve(__dirname, 'dist/client');
    copyRecursiveSync(clientDistPath, distPath);
    
    console.log('✅ Pre-rendering complete!');
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
      fs.mkdirSync(dest);
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

prerender();