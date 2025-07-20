#!/usr/bin/env node

console.log('🚀 Testing build script execution...');

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('📂 Current directory:', __dirname);

// Test 1: Check if dist exists
try {
  const distExists = await fs.access(path.join(__dirname, 'dist'));
  console.log('✅ dist directory exists');
} catch (error) {
  console.log('❌ dist directory does not exist');
}

// Test 2: Try to create a test directory
try {
  const testDir = path.join(__dirname, 'dist', 'test-about');
  await fs.mkdir(testDir, { recursive: true });
  await fs.writeFile(path.join(testDir, 'index.html'), '<h1>Test</h1>', 'utf8');
  console.log('✅ Successfully created test directory and file');
} catch (error) {
  console.log('❌ Failed to create test directory:', error.message);
}

console.log('🏁 Test completed');
