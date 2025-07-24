const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8090;
const DIST_DIR = path.join(__dirname, 'dist-spa-temp');

// Serve static files
app.use(express.static(DIST_DIR));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  
  // Check if the requested file exists (for assets, images, etc.)
  const requestedPath = path.join(DIST_DIR, req.path);
  
  if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
    // If it's a real file, serve it
    res.sendFile(requestedPath);
  } else {
    // Otherwise, serve index.html for React Router to handle
    res.sendFile(indexPath);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Marden SEO React App running at http://localhost:${PORT}/`);
  console.log('✅ SPA routing enabled - page refresh will work on all routes');
});
