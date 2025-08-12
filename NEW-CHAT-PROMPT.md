# PROMPT FOR NEW CHAT: Fix Marden SEO React Routing & Footer Issues

I have a Marden SEO website (React/Vite) with Wyoming LLC updates that has critical routing issues. The build process is creating static HTML files instead of proper hybrid React/static content, causing 404 errors on all pages and missing footer content.

## Current Problem:
1. **404 Errors**: All pages including /terms-of-service, /checkout, /payment-success return 404
2. **Missing Footer**: Footer with LLC information not displaying  
3. **React App Not Loading**: Static HTML generated instead of React SPA
4. **Build Script Issue**: `build-comprehensive-static-ssg.mjs` creating wrong output format

## Project Details:
- **Location**: C:\Users\Leo\stellar-seo-website-design
- **Technology**: React 18 + Vite + TypeScript + Tailwind CSS
- **Expected**: Dual-mode system (static HTML for crawlers, React SPA for users)
- **Current**: Only static HTML, no React functionality

## What Should Work:
1. **Static Files**: HTML files exist for SEO crawlers with meta tags
2. **React Router**: React app should handle all client-side routing  
3. **Footer**: Should show "Marden SEO, LLC" and "Wyoming Registered Entity"
4. **Legal Pages**: /terms-of-service, /privacy-policy, /refund-policy should load
5. **Payment Pages**: /checkout, /payment-success should load

## Build System:
- **Main Build**: `npm run build:comprehensive` (runs build-comprehensive-static-ssg.mjs)
- **Expected Output**: React bundle + static HTML files with proper meta tags
- **Current Output**: Static HTML without React functionality

## Key Files:
- `src/App.tsx` - React routes (all properly defined)
- `src/components/layout/Footer.tsx` - Updated with LLC info  
- `build-comprehensive-static-ssg.mjs` - Build script (may have issues)
- `dist/` - Output folder with static files
- `.htaccess` - Server config for SPA routing

## Specific Issues to Fix:
1. **Build Process**: Make build script generate hybrid React/static content
2. **React Loading**: Ensure React app mounts and handles routing
3. **Footer Display**: Footer component should render with LLC information
4. **Route Handling**: All routes should work without 404s
5. **Development Server**: Test with proper SPA configuration

## Testing Requirements:
- Test server: `npx serve dist -p 8099 --single` 
- Verify React routing works for all legal/payment pages
- Confirm footer displays LLC information
- Check that static HTML exists for SEO

Please analyze the build system, fix the hybrid React/static generation, and ensure all routes work properly with the Wyoming LLC updates visible in the footer.
