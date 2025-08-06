import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 Running comprehensive build with detailed output...\n');

const build = spawn('node', ['build-comprehensive-static-ssg.mjs'], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let errorOutput = '';

build.stdout.on('data', (data) => {
  const text = data.toString();
  output += text;
  process.stdout.write(text);
});

build.stderr.on('data', (data) => {
  const text = data.toString();
  errorOutput += text;
  process.stderr.write(text);
});

build.on('close', (code) => {
  console.log(`\n\n📊 Build completed with code: ${code}`);
  
  if (errorOutput) {
    console.log('\n❌ Error output:');
    console.log(errorOutput);
  }
  
  // Analyze the output
  console.log('\n📈 Output analysis:');
  
  // Check if blog posts were discovered
  const blogPostMatch = output.match(/Found (\d+) blog posts/);
  if (blogPostMatch) {
    console.log(`  ✅ Blog posts discovered: ${blogPostMatch[1]}`);
  } else {
    console.log('  ❌ No blog post discovery message found');
  }
  
  // Check for generation messages
  const generationMatches = output.match(/Generating: (\/blog\/[^\s]+)/g);
  if (generationMatches) {
    console.log(`  ✅ Blog generation attempts: ${generationMatches.length}`);
    generationMatches.forEach(match => {
      console.log(`    - ${match}`);
    });
  } else {
    console.log('  ❌ No blog generation messages found');
  }
  
  // Look for skipping messages
  const skipMatches = output.match(/No metadata found for (\/blog\/[^,]+), skipping/g);
  if (skipMatches) {
    console.log(`  ⚠️ Skipped routes: ${skipMatches.length}`);
    skipMatches.forEach(match => {
      console.log(`    - ${match}`);
    });
  }
});
