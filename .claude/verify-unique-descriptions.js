// Quick verification that all meta descriptions are unique
import fs from 'fs';

// Read the SEO configs file
const configContent = fs.readFileSync('./src/data/comprehensiveSEOConfigs.ts', 'utf8');

// Extract all description values
const descriptions = [];
const lines = configContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('description:')) {
    // Extract the description text between quotes
    const match = line.match(/description:\s*['"`]([^'"`]+)['"`]/);
    if (match) {
      descriptions.push({
        line: i + 1,
        description: match[1]
      });
    }
  }
}

console.log('🔍 Found descriptions:');
descriptions.forEach((desc, index) => {
  console.log(`${index + 1}. Line ${desc.line}: "${desc.description.substring(0, 100)}..."`);
});

// Check for duplicates
const unique = new Set(descriptions.map(d => d.description));
console.log(`\n📊 Total descriptions: ${descriptions.length}`);
console.log(`📊 Unique descriptions: ${unique.size}`);

if (descriptions.length === unique.size) {
  console.log('✅ SUCCESS: All descriptions are unique!');
} else {
  console.log('❌ DUPLICATE FOUND: Some descriptions are identical!');
  
  // Find duplicates
  const seen = new Map();
  descriptions.forEach(desc => {
    if (seen.has(desc.description)) {
      console.log(`🔴 DUPLICATE: "${desc.description}" (Lines ${seen.get(desc.description)} and ${desc.line})`);
    } else {
      seen.set(desc.description, desc.line);
    }
  });
}
