const { spawn } = require('child_process');
const path = require('path');

const projectDir = path.join(__dirname);
process.chdir(projectDir);

console.log('Working directory:', process.cwd());

const build = spawn('npm', ['run', 'build:comprehensive'], {
  cwd: projectDir,
  shell: true,
  stdio: 'pipe'
});

build.stdout.on('data', (data) => {
  console.log(`[BUILD]: ${data.toString()}`);
});

build.stderr.on('data', (data) => {
  console.error(`[ERROR]: ${data.toString()}`);
});

build.on('close', (code) => {
  console.log(`Build process exited with code ${code}`);
  if (code === 0) {
    console.log('✅ Build completed successfully!');
    
    // Check what was generated
    const fs = require('fs');
    const distBlogPath = path.join(projectDir, 'dist', 'blog');
    
    try {
      const blogContents = fs.readdirSync(distBlogPath);
      console.log('\n📁 Blog directory contents:');
      blogContents.forEach(item => {
        const itemPath = path.join(distBlogPath, item);
        const stats = fs.statSync(itemPath);
        console.log(`  ${stats.isDirectory() ? '[DIR]' : '[FILE]'} ${item}`);
      });
    } catch (err) {
      console.error('Failed to read blog directory:', err.message);
    }
  } else {
    console.log('❌ Build failed!');
  }
});
