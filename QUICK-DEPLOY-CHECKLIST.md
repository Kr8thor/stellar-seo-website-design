# ⚡ QUICK DEPLOYMENT CHECKLIST

## 🎯 **CRITICAL COMMANDS FOR CPANEL TERMINAL**

```bash
# 1. Navigate to web directory
cd public_html/

# 2. Create backup
mkdir backup_$(date +%Y%m%d_%H%M)
cp -r * backup_$(date +%Y%m%d_%H%M)/

# 3. Clear old files
rm -rf assets/ *.html *.xml *.txt *.json *.ico *.png *.webmanifest

# 4. Upload /dist contents via File Manager
# (Upload ALL contents of local /dist/ folder)

# 5. Set permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod 644 .htaccess

# 6. Test deployment
curl -I https://mardenseo.com/about
```

## 📋 **VERIFICATION CHECKLIST**

- [ ] All pages return 200 OK (not 301)
- [ ] .htaccess file uploaded and active
- [ ] Screaming Frog shows "Indexable" not "Canonicalised"
- [ ] SEO health score improved to 90+
- [ ] Website loads without redirect delays

## 🚀 **EXPECTED RESULT**
**SEO Health Score: 33/100 → 90+/100**

✅ **CANONICALIZATION CRISIS RESOLVED!**
