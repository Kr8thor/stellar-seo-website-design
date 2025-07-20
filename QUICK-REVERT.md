# 🔄 QUICK REVERT INSTRUCTIONS
**Emergency rollback for Marden SEO SSG implementation**

## 🚨 **IF SOMETHING GOES WRONG**

### **Option 1: Revert to Previous Commit (Recommended)**
```bash
# This will undo the SSG implementation completely
cd "C:\Users\Leo\stellar-seo-website-design"
git reset --hard backup-before-ssg-commit-2025-07-20-1039
git push origin main --force
```

### **Option 2: Revert Just the SSG Build (Keep other changes)**
```bash
# This reverts just the SSG while keeping other improvements
cd "C:\Users\Leo\stellar-seo-website-design"
git revert 668d7091 --no-edit
git push origin main
```

### **Option 3: Remove Static Files Only (Keep Scripts)**
```bash
# Remove the generated static directories but keep build scripts
cd "C:\Users\Leo\stellar-seo-website-design"
rm -rf dist/about dist/services dist/blog dist/contact dist/portfolio dist/app-building dist/workflow-automation dist/services-pricing
git add .
git commit -m "Remove static SSG files - back to React-only"
git push origin main
```

### **Option 4: Switch to Backup Branch**
```bash
# Work from the backup branch temporarily
cd "C:\Users\Leo\stellar-seo-website-design"
git checkout backup-before-ssg-commit-2025-07-20-1039
# Make any needed changes
# When ready, merge back to main
```

## 📋 **WHAT WAS ADDED (for reference)**

**New Files Added:**
- `build-working-ssg.mjs` - Working SSG build script
- `build-comprehensive-static-ssg-fixed.mjs` - Alternative build script
- `dist/about/index.html` - About page static HTML
- `dist/services/index.html` - Services page static HTML
- `dist/services-pricing/index.html` - Pricing page static HTML
- `dist/contact/index.html` - Contact page static HTML
- `dist/portfolio/index.html` - Portfolio page static HTML
- `dist/app-building/index.html` - App development page static HTML
- `dist/workflow-automation/index.html` - Automation page static HTML
- `dist/blog/index.html` - Blog listing page static HTML
- `dist/blog/local-seo-2025/index.html` - Individual blog post
- `dist/blog/ai-midlife-crisis/index.html` - Individual blog post
- `dist/blog/on-page-seo-tactics-2025/index.html` - Individual blog post
- `dist/blog/core-web-vitals-seo-2025/index.html` - Individual blog post
- `dist/blog/technical-seo-fundamentals/index.html` - Individual blog post
- `dist/blog/content-strategy-beyond-keywords/index.html` - Individual blog post
- `dist/blog/link-building-2025-quality/index.html` - Individual blog post
- `dist/blog/mobile-first-indexing-ready/index.html` - Individual blog post
- `dist/blog/ai-revolution-seo-strategy/index.html` - Individual blog post

**Modified Files:**
- `package.json` - Added build:working and test:working scripts
- `build-working-ssg.mjs` - Updated SSG build script
- `dist/index.html` - Updated with better static content
- `dist/sitemap.xml` - Updated with proper blog post URLs

## 🚀 **TO RE-ENABLE SSG AFTER REVERT**
```bash
cd "C:\Users\Leo\stellar-seo-website-design"
npm run build:working  # Regenerate all static files
npm run test:working   # Test at http://localhost:8098
```

---

**🛡️ SAFETY FIRST: The backup branch `backup-before-ssg-commit-2025-07-20-1039` contains your exact state before SSG implementation. Use Option 1 for the safest, most complete revert.**
