#!/usr/bin/env node
import { exec } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const execPromise = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 DEBUG: Starting SSG debug script...')
console.log('📍 Working directory:', __dirname)

// Test basic file operations
async function testBasicOperations() {
  console.log('\n🔍 Testing basic file operations...')
  
  try {
    // Check if dist exists
    const distPath = path.join(__dirname, 'dist')
    console.log('📁 Checking dist directory:', distPath)
    
    const distStats = await fs.stat(distPath)
    console.log('✅ Dist directory exists:', distStats.isDirectory())
    
    // List dist contents
    const distContents = await fs.readdir(distPath)
    console.log('📂 Dist contents:', distContents)
    
    // Check if index.html exists
    const indexPath = path.join(distPath, 'index.html')
    const indexExists = await fs.access(indexPath).then(() => true).catch(() => false)
    console.log('📄 index.html exists:', indexExists)
    
    if (indexExists) {
      const indexContent = await fs.readFile(indexPath, 'utf-8')
      console.log('📝 index.html size:', indexContent.length, 'characters')
      console.log('🔍 Contains div#root:', indexContent.includes('<div id="root">'))
    }
    
  } catch (error) {
    console.error('❌ Basic operations error:', error.message)
  }
}

// Test route generation
async function testRouteGeneration() {
  console.log('\n🔧 Testing route generation...')
  
  const routes = ['/', '/about', '/services']
  
  for (const route of routes) {
    try {
      console.log(`\n📍 Testing route: ${route}`)
      
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
      const fullPath = path.join(__dirname, 'dist', routePath)
      
      console.log('📁 Target path:', fullPath)
      console.log('📂 Target directory:', path.dirname(fullPath))
      
      // Create directory if it doesn't exist
      const dir = path.dirname(fullPath)
      await fs.mkdir(dir, { recursive: true })
      console.log('✅ Directory created/verified')
      
      // Test writing a simple file
      const testContent = `<!DOCTYPE html><html><head><title>Test ${route}</title></head><body><h1>Test content for ${route}</h1></body></html>`
      await fs.writeFile(fullPath, testContent)
      console.log('✅ Test file written')
      
      // Verify file exists
      const fileExists = await fs.access(fullPath).then(() => true).catch(() => false)
      console.log('🔍 File exists after write:', fileExists)
      
      if (fileExists) {
        const content = await fs.readFile(fullPath, 'utf-8')
        console.log('📝 File size:', content.length, 'characters')
      }
      
    } catch (error) {
      console.error(`❌ Route ${route} error:`, error.message)
    }
  }
}

// Test Vite build
async function testViteBuild() {
  console.log('\n🏗️ Testing Vite build...')
  
  try {
    console.log('📦 Running npm run build...')
    const { stdout, stderr } = await execPromise('npm run build')
    
    if (stdout) {
      console.log('✅ Build stdout:', stdout.slice(0, 500) + (stdout.length > 500 ? '...' : ''))
    }
    if (stderr) {
      console.log('⚠️ Build stderr:', stderr.slice(0, 500) + (stderr.length > 500 ? '...' : ''))
    }
    
    console.log('✅ Vite build completed successfully')
    
  } catch (error) {
    console.error('❌ Vite build failed:', error.message)
    if (error.stdout) console.log('stdout:', error.stdout)
    if (error.stderr) console.log('stderr:', error.stderr)
  }
}

// Main debug function
async function runDebug() {
  await testBasicOperations()
  await testViteBuild()
  await testBasicOperations() // Check again after build
  await testRouteGeneration()
  
  console.log('\n🎉 Debug script completed!')
}

runDebug().catch(console.error)
