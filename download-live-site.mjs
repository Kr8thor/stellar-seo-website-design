#!/usr/bin/env node

import https from 'https';
import fs from 'fs/promises';

console.log('📥 Downloading complete live site HTML...\n');

const downloadLiveSite = () => {
  return new Promise((resolve, reject) => {
    https.get('https://mardenseo.com', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', async () => {
        // Save to file
        await fs.writeFile('live-site-content.html', data);
        console.log('✅ Live site HTML saved to: live-site-content.html');
        console.log(`📏 Total size: ${data.length} bytes`);
        
        resolve(data);
      });
    }).on('error', (err) => {
      console.error('Error:', err);
      reject(err);
    });
  });
};

downloadLiveSite().catch(console.error);
