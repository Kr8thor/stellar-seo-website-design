// SIMPLE HTTP SERVER WITH PROPER SPA SUPPORT
// This ensures all routes serve the correct HTML files

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 8099;

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes - serve the appropriate HTML file
app.get('*', (req, res) => {
  const requestPath = req.path;
  
  // Try to serve the specific HTML file first
  const possiblePaths = [
    path.join(__dirname, 'dist', requestPath, 'index.html'),
    path.join(__dirname, 'dist', requestPath.slice(1), 'index.html'),
    path.join(__dirname, 'dist', 'index.html')
  ];
  
  for (const filePath of possiblePaths) {
    try {
      if (require('fs').existsSync(filePath)) {
        res.sendFile(filePath);
        return;
      }
    } catch (err) {
      // Continue to next path
    }
  }
  
  // Default to root index.html for client-side routing
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
  console.log('📋 All routes will serve proper HTML files for crawlers');
});
