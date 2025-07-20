#!/usr/bin/env node

/**
 * 🔍 DEPLOYMENT VERIFICATION SCRIPT
 * Verifies that all components are properly deployed and ready
 */

import fs from 'fs/promises';
import path from 'path';

async function verifyDeployment() {
  console.log('🔍 MARDEN SEO DEPLOYMENT VERIFICATION');
  console.log('=====================================\n');

  const checks = [];

  // Check core build files
  const coreFiles = [
    'package.json',
    'build-comprehensive-static-ssg.mjs',
    'src/App.tsx',
    'src/data/blogPosts.tsx',
    'dist/index.html',
    'dist/assets'
  ];

  for (const file of coreFiles) {
    try {
      const stats = await fs.stat(file);
      checks.push(`✅ ${file} - ${stats.isDirectory() ? 'Directory' : 'File'} exists`);
    } catch (error) {
      checks.push(`❌ ${file} - Missing`);
    }
  }

  // Check package.json scripts
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const hasComprehensiveBuild = packageJson.scripts['build:comprehensive'];
    const hasComprehensiveTest = packageJson.scripts['test:comprehensive'];
    
    checks.push(`${hasComprehensiveBuild ? '✅' : '❌'} build:comprehensive script`);
    checks.push(`${hasComprehensiveTest ? '✅' : '❌'} test:comprehensive script`);
  } catch (error) {
    checks.push('❌ Could not read package.json');
  }

  // Check blog posts data
  try {
    const blogData = await fs.readFile('src/data/blogPosts.tsx', 'utf8');
    const postCount = (blogData.match(/id:\s*\d+/g) || []).length;
    checks.push(`✅ Blog posts data - ${postCount} posts found`);
  } catch (error) {
    checks.push('❌ Blog posts data not accessible');
  }

  // Print results
  console.log('📋 VERIFICATION RESULTS:');
  console.log('========================');
  checks.forEach(check => console.log(check));

  const passed = checks.filter(c => c.startsWith('✅')).length;
  const total = checks.length;
  
  console.log(`\n📊 SUMMARY: ${passed}/${total} checks passed`);
  
  if (passed === total) {
    console.log('\n🎉 ALL SYSTEMS READY FOR DEPLOYMENT!');
    console.log('\n🚀 To deploy:');
    console.log('   npm run build:comprehensive  # Generate all static pages');
    console.log('   npm run test:comprehensive   # Test locally');
    console.log('   git push origin main         # Deploy to production');
  } else {
    console.log('\n⚠️  Some issues need to be resolved before deployment');
  }
}

verifyDeployment().catch(console.error);
