#!/usr/bin/env node
import { exec } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const execPromise = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 DEBUG: Testing SSG Route Generation...')

// Test route generation directly
async function testDirectRouteGeneration() {
  console.log('\n🔧 Testing direct route HTML generation...')
  
  const routes = ['/', '/about', '/services']
  
  for (const route of routes) {
    try {
      console.log(`\n📍 Processing route: ${route}`)
      
      // Define route path
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
      const fullPath = path.join(__dirname, 'dist', routePath)
      
      console.log('📁 Target path:', fullPath)
      
      // Create directory if it doesn't exist
      const dir = path.dirname(fullPath)
      console.log('📂 Creating directory:', dir)
      await fs.mkdir(dir, { recursive: true })
      console.log('✅ Directory created successfully')
      
      // Read template
      const templatePath = path.join(__dirname, 'dist', 'index.html')
      console.log('📄 Reading template from:', templatePath)
      
      let html = await fs.readFile(templatePath, 'utf-8')
      console.log('✅ Template read, size:', html.length, 'characters')
      
      // Simple meta tag replacement for testing
      const routeMeta = {
        '/': { title: 'Home - Marden SEO', description: 'Professional SEO services' },
        '/about': { title: 'About - Marden SEO', description: 'Learn about our SEO team' },
        '/services': { title: 'Services - Marden SEO', description: 'Our SEO service offerings' }
      }
      
      const meta = routeMeta[route]
      console.log('🏷️ Using meta:', meta)
      
      // Replace title
      html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
      console.log('✅ Title replaced')
      
      // Add simple content to root div
      const simpleContent = `<div style="padding: 20px;"><h1>${meta.title}</h1><p>${meta.description}</p><p>This is route: ${route}</p></div>`
      html = html.replace(/<div id="root"><\/div>/, `<div id="root">${simpleContent}</div>`)
      console.log('✅ Content injected')
      
      // Write the file
      console.log('💾 Writing file to:', fullPath)
      await fs.writeFile(fullPath, html)
      console.log('✅ File written successfully')
      
      // Verify file
      const fileExists = await fs.access(fullPath).then(() => true).catch(() => false)
      console.log('🔍 File verification:', fileExists ? 'EXISTS' : 'MISSING')
      
      if (fileExists) {
        const content = await fs.readFile(fullPath, 'utf-8')
        console.log('📝 Written file size:', content.length, 'characters')
        console.log('🔍 Contains injected content:', content.includes(route))
      }
      
    } catch (error) {
      console.error(`❌ Error processing route ${route}:`, error.message)
      console.error('Stack:', error.stack)
    }
  }
}

// List final directory structure
async function listGeneratedFiles() {
  console.log('\n📂 Final directory structure:')
  
  try {
    const distPath = path.join(__dirname, 'dist')
    const items = await fs.readdir(distPath, { withFileTypes: true })
    
    for (const item of items) {
      if (item.isDirectory()) {
        console.log(`📁 ${item.name}/`)
        try {
          const subItems = await fs.readdir(path.join(distPath, item.name))
          for (const subItem of subItems) {
            console.log(`   📄 ${subItem}`)
          }
        } catch (e) {
          console.log(`   ❌ Could not read directory: ${e.message}`)
        }
      } else {
        console.log(`📄 ${item.name}`)
      }
    }
  } catch (error) {
    console.error('❌ Error listing files:', error.message)
  }
}

// Run the test
async function runTest() {
  await testDirectRouteGeneration()
  await listGeneratedFiles()
  console.log('\n🎉 Test completed!')
}

runTest().catch(console.error)
