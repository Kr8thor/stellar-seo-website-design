#!/usr/bin/env node

console.log('Testing SSG script execution...');

try {
  console.log('Starting test...');
  
  // Test if we can run the comprehensive SSG script
  const { spawn } = require('child_process');
  
  const child = spawn('node', ['build-comprehensive-static-ssg.mjs'], {
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  child.on('close', (code) => {
    console.log(`SSG build process exited with code ${code}`);
  });
  
  child.on('error', (error) => {
    console.error('Error running SSG build:', error);
  });
  
} catch (error) {
  console.error('Test failed:', error);
}
