#!/bin/bash

# 🚀 Marden SEO Website - Build Validation Script
# This script validates that the website builds correctly and is ready for deployment

echo "🔍 MARDEN SEO WEBSITE - BUILD VALIDATION"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Check if we're in the right directory
echo "1. Checking project structure..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found. Please run this script from the project root directory.${NC}"
    exit 1
fi

if [ ! -f "vite.config.ts" ]; then
    echo -e "${RED}❌ vite.config.ts not found. This doesn't appear to be a Vite project.${NC}"
    exit 1
fi

print_status 0 "Project structure is correct"
echo ""

# Check Node.js version
echo "2. Checking Node.js version..."
NODE_VERSION=$(node --version)
print_info "Node.js version: $NODE_VERSION"

# Check if node_modules exists
echo ""
echo "3. Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_status 0 "Dependencies installed successfully"
    else
        print_status 1 "Failed to install dependencies"
        exit 1
    fi
else
    print_status 0 "Dependencies already installed"
fi

# Check TypeScript compilation
echo ""
echo "4. Checking TypeScript compilation..."
npx tsc --noEmit --skipLibCheck
TS_CHECK=$?
print_status $TS_CHECK "TypeScript type checking"

# Run ESLint
echo ""
echo "5. Running linter..."
npm run lint > /dev/null 2>&1
LINT_CHECK=$?
if [ $LINT_CHECK -eq 0 ]; then
    print_status 0 "No linting errors"
else
    print_warning "Linting warnings/errors found (not critical for build)"
fi

# Build the project
echo ""
echo "6. Building production bundle..."
npm run build
BUILD_CHECK=$?
print_status $BUILD_CHECK "Production build"

if [ $BUILD_CHECK -ne 0 ]; then
    echo -e "${RED}Build failed! Please check the error messages above.${NC}"
    exit 1
fi

# Check build output
echo ""
echo "7. Validating build output..."
if [ -d "dist" ]; then
    print_status 0 "dist directory created"
    
    # Check for essential files
    if [ -f "dist/index.html" ]; then
        print_status 0 "index.html generated"
    else
        print_status 1 "index.html missing"
    fi
    
    if [ -d "dist/assets" ]; then
        print_status 0 "assets directory created"
    else
        print_status 1 "assets directory missing"
    fi
    
    if [ -f "dist/.htaccess" ]; then
        print_status 0 ".htaccess file copied"
    else
        print_status 1 ".htaccess file missing"
    fi
    
    if [ -f "dist/robots.txt" ]; then
        print_status 0 "robots.txt file copied"
    else
        print_status 1 "robots.txt file missing"
    fi
    
    # Check bundle sizes
    echo ""
    echo "8. Bundle size analysis..."
    JS_FILES=$(find dist/assets -name "*.js" | wc -l)
    CSS_FILES=$(find dist/assets -name "*.css" | wc -l)
    
    print_info "JavaScript bundles: $JS_FILES"
    print_info "CSS bundles: $CSS_FILES"
    
    # Check for largest files
    echo ""
    echo "Largest bundle files:"
    find dist/assets -type f \( -name "*.js" -o -name "*.css" \) -exec ls -lh {} \; | sort -k5 -hr | head -5 | awk '{print "  📦 " $9 " (" $5 ")"}'
    
else
    print_status 1 "dist directory not created"
    exit 1
fi

# Final deployment readiness check
echo ""
echo "9. Final deployment readiness check..."

TOTAL_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
print_info "Total build size: $TOTAL_SIZE"

# Check if sitemap component exists
if [ -f "src/pages/Sitemap.tsx" ]; then
    print_status 0 "Sitemap component exists"
else
    print_status 1 "Sitemap component missing"
fi

# Check if apollo client is in correct location
if [ -f "src/lib/apolloClient.ts" ]; then
    print_status 0 "Apollo Client in correct location"
else
    print_status 1 "Apollo Client missing or in wrong location"
fi

echo ""
echo "========================================="
if [ $BUILD_CHECK -eq 0 ] && [ $TS_CHECK -eq 0 ]; then
    echo -e "${GREEN}🎉 BUILD VALIDATION SUCCESSFUL!${NC}"
    echo ""
    echo -e "${GREEN}✅ Your Marden SEO website is ready for deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Upload the contents of the 'dist' folder to your Namecheap hosting"
    echo "2. Ensure files are uploaded to the public_html directory"
    echo "3. Test the site at https://mardenseo.com"
    echo "4. Verify sitemap at https://mardenseo.com/sitemap.xml"
    echo ""
    echo "For detailed deployment instructions, see DEPLOYMENT-GUIDE.md"
else
    echo -e "${RED}❌ BUILD VALIDATION FAILED!${NC}"
    echo ""
    echo "Please fix the issues above before deploying."
    exit 1
fi