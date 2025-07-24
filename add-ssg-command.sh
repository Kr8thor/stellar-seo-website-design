#!/bin/bash
# Update package.json with the new SSG build command

cd C:\Users\Leo\stellar-seo-website-design

# Add the new build command to package.json
echo "Adding build:ssg-final command to package.json..."

# Create a simple script to update package.json
cat > update-package.js << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add the new build command
packageJson.scripts['build:ssg-final'] = 'node build-ssg-final-fix.mjs';
packageJson.scripts['test:ssg-final'] = 'npm run build:ssg-final && npx serve dist-ssg-final -p 8092';

// Write back
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json updated with SSG Final Fix commands');
EOF

node update-package.js
rm update-package.js

echo "✅ Done!"
