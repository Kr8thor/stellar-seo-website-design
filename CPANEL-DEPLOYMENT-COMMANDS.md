# 🚀 CPANEL TERMINAL DEPLOYMENT COMMANDS
**Deploy Fixed Website to Production**

## 📋 **DEPLOYMENT OVERVIEW**
- **Source:** Local `/dist` folder (canonicalization fix applied)
- **Target:** Production server `public_html/`
- **Method:** cPanel Terminal + File Upload
- **Expected Result:** SEO health score 33 → 90+

---

## 🔑 **CPANEL ACCESS**
- **URL:** https://server900.web-hosting.com:2083/
- **Domain:** mardenseo.com
- **Path:** `/home/username/public_html/`

---

## 💻 **CPANEL TERMINAL COMMANDS**

### **Step 1: Access Terminal**
```bash
# Login to cPanel → Terminal
# Navigate to public_html directory
cd public_html/
```

### **Step 2: Backup Current Site**
```bash
# Create backup of current site
mkdir backup_$(date +%Y%m%d_%H%M)
cp -r * backup_$(date +%Y%m%d_%H%M)/
echo "✅ Backup created"
```

### **Step 3: Clear Current Files**
```bash
# Remove old files (keep backups)
rm -rf assets/
rm -f *.html
rm -f *.xml
rm -f *.txt
rm -f *.json
rm -f *.ico
rm -f *.png
rm -f *.webmanifest
echo "✅ Old files cleared"
```

### **Step 4: Upload New Files**
```bash
# Files to upload via cPanel File Manager:
# - All contents from local /dist/ folder
# - Including the fixed .htaccess file
echo "📁 Upload /dist contents via File Manager"
```

### **Step 5: Verify Upload**
```bash
# Check critical files exist
ls -la
echo "✅ Verify these files exist:"
echo "  - index.html (homepage)"
echo "  - .htaccess (SEO fix)"
echo "  - sitemap.xml"
echo "  - robots.txt"
echo "  - assets/ folder"
echo "  - about/, services/, blog/ etc."
```

### **Step 6: Set Permissions**
```bash
# Set correct permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod 644 .htaccess
echo "✅ Permissions set"
```

### **Step 7: Test Deployment**
```bash
# Test homepage loads
curl -I https://mardenseo.com/
echo "✅ Should return: HTTP/1.1 200 OK"

# Test about page (our fixed example)
curl -I https://mardenseo.com/about
echo "✅ Should return: HTTP/1.1 200 OK (not 301)"
```

---

## 📂 **FILES TO UPLOAD (CHECKLIST)**

### **✅ Root Files:**
- `index.html` (Homepage)
- `.htaccess` ⭐ **CRITICAL SEO FIX**
- `sitemap.xml`
- `robots.txt`
- `favicon.ico`
- `favicon.png`
- `site.webmanifest`

### **✅ Page Directories:**
- `about/index.html`
- `services/index.html`
- `services-pricing/index.html`
- `contact/index.html`
- `portfolio/index.html`
- `blog/index.html`
- `app-building/index.html`
- `workflow-automation/index.html`

### **✅ Blog Posts:**
- `blog/e-e-a-t-complete-guide/index.html`
- `blog/on-page-seo-tactics-2025/index.html`
- `blog/core-web-vitals-seo-2025/index.html`
- `blog/ai-revolution-seo-strategy/index.html`
- `blog/local-seo-mastery/index.html`
- `blog/mobile-first-indexing-ready/index.html`
- `blog/content-strategy-beyond-keywords/index.html`
- `blog/technical-seo-fundamentals/index.html`
- `blog/link-building-2025-quality/index.html`

### **✅ System Pages:**
- `admin/index.html` (noindex)
- `cart/index.html` (noindex)
- `analytics-test/index.html` (noindex)

### **✅ Assets:**
- `assets/` (entire folder with CSS/JS bundles)

---

## 🧪 **POST-DEPLOYMENT TESTING**

### **Immediate Tests:**
```bash
# Test all main pages return 200 OK
curl -I https://mardenseo.com/
curl -I https://mardenseo.com/about
curl -I https://mardenseo.com/services
curl -I https://mardenseo.com/contact
curl -I https://mardenseo.com/blog
curl -I https://mardenseo.com/portfolio
curl -I https://mardenseo.com/app-building
curl -I https://mardenseo.com/workflow-automation
```

### **Expected Results:**
```
✅ HTTP/1.1 200 OK (all pages)
❌ No HTTP/1.1 301 Moved Permanently
✅ Canonical tags point to correct URLs
✅ .htaccess serving files directly
```

---

## 📊 **SCREAMING FROG VERIFICATION**

### **Run Complete Audit:**
1. **Start Screaming Frog**
2. **Enter:** `https://mardenseo.com`
3. **Crawl** entire website
4. **Check Results:**

### **Expected Improvements:**
```
BEFORE DEPLOYMENT:
❌ Health Score: 33/100
❌ 18 Errors (canonicalization issues)
❌ Pages showing "Canonicalised"
❌ 301 redirects throughout site

AFTER DEPLOYMENT:
✅ Health Score: 90+/100
✅ 0-2 Errors maximum
✅ All pages showing "Indexable"
✅ Clean 200 OK responses
```

---

## 🚨 **CRITICAL SUCCESS INDICATORS**

### **✅ Must Verify These:**
1. **Homepage loads:** https://mardenseo.com
2. **About page:** Returns 200 OK (was problematic)
3. **All pages:** Show "Indexable" in Screaming Frog
4. **No redirects:** Zero 301s in audit
5. **Canonical tags:** Point to correct URLs
6. **Sitemap:** Clean XML without errors

### **🎯 SEO Health Score:**
- **Target:** 90+ out of 100
- **Critical:** Zero canonicalization errors
- **Bonus:** Faster page loads (no redirect chains)

---

## 📞 **SUPPORT CONTACTS**

### **If Issues Occur:**
- **Hosting Support:** Namecheap cPanel assistance
- **Emergency Rollback:** Restore from backup folder
- **DNS Issues:** Check domain pointing to server900.web-hosting.com

---

## 🎉 **DEPLOYMENT SUCCESS CRITERIA**

### **✅ Complete When:**
- All files uploaded successfully
- .htaccess fix is active (no 301 redirects)
- Screaming Frog shows all pages as "Indexable"
- SEO health score shows 90+ (up from 33)
- Website loads faster (no redirect delays)

---

## 🚀 **EXECUTE DEPLOYMENT**

**Run the commands above in cPanel Terminal and upload the /dist folder contents via File Manager. The canonicalization crisis will be resolved and your SEO health score will dramatically improve!**

**Expected Outcome: SEO Health Score 33/100 → 90+/100** 🎯
