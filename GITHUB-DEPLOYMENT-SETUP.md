# 🚀 GitHub Actions Auto-Deployment Setup Guide

## 📋 **OVERVIEW**
This guide sets up **direct GitHub → hosting deployment** that bypasses unreliable cPanel Git automation.

**Benefits:**
- ✅ **Reliable**: Direct FTP deployment, no cPanel dependencies
- ✅ **Fast**: 2-3 minute deployment time
- ✅ **Automatic**: Triggers on every push to main branch
- ✅ **Verified**: Built-in deployment validation
- ✅ **SEO-Safe**: Checks for sitemap script injection

---

## 🔧 **STEP 1: SETUP GITHUB SECRETS**

You need to add FTP credentials to your GitHub repository secrets:

### **Required Secrets:**
1. **FTP_HOST** - Your hosting FTP server
2. **FTP_USERNAME** - Your FTP username  
3. **FTP_PASSWORD** - Your FTP password

### **How to Add Secrets:**

1. **Go to GitHub Repository:**
   - Visit: https://github.com/Kr8thor/stellar-seo-website-design

2. **Access Settings:**
   - Click **Settings** tab (top of repository)
   - Click **Secrets and variables** → **Actions** (left sidebar)

3. **Add Each Secret:**
   - Click **New repository secret**
   - Add these one by one:

   ```
   Name: FTP_HOST
   Value: [Your FTP server - get from cPanel/hosting provider]
   
   Name: FTP_USERNAME  
   Value: [Your FTP username - usually your main account]
   
   Name: FTP_PASSWORD
   Value: [Your FTP password - same as cPanel login]
   ```

---

## 📡 **STEP 2: GET FTP CREDENTIALS**

### **From Namecheap cPanel:**

1. **Login to cPanel**
2. **Find FTP Details:**
   - Look for "FTP Accounts" or "File Manager"
   - FTP Server is usually: `your-domain.com` or `ftp.your-domain.com`
   - Username is usually: `marddium` (your main account)
   - Password: Same as your cPanel password

### **Common FTP Settings:**
```
FTP_HOST: mardenseo.com (or ftp.mardenseo.com)
FTP_USERNAME: marddium
FTP_PASSWORD: [Your cPanel password]
```

---

## 🧪 **STEP 3: TEST DEPLOYMENT**

Once secrets are added:

### **Automatic Trigger:**
- Any push to `main` branch will trigger deployment
- GitHub Actions will run automatically

### **Manual Trigger:**
1. Go to **Actions** tab in GitHub
2. Click **🚀 Direct Deploy to Hosting**
3. Click **Run workflow**
4. Select **main** branch
5. Click **Run workflow**

### **Monitor Progress:**
- Watch the deployment in **Actions** tab
- Check for green checkmarks ✅
- Review logs for any errors

---

## 🔍 **STEP 4: VERIFICATION**

After deployment completes:

### **Check These URLs:**
- **Main Site**: https://mardenseo.com
- **JavaScript Bundle**: https://mardenseo.com/assets/index-CQl0KpYd.js
- **Sitemap**: https://mardenseo.com/sitemap.xml
- **Robots**: https://mardenseo.com/robots.txt

### **Sitemap Validation:**
- Sitemap should be **clean XML** (no `<script>` tags)
- GitHub Actions will automatically verify this

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues:**

**1. FTP Connection Failed:**
- Double-check FTP credentials
- Try `ftp.mardenseo.com` instead of `mardenseo.com`
- Verify FTP is enabled in cPanel

**2. Permission Denied:**
- Ensure FTP username has write access to `public_html`
- Check if hosting has FTP restrictions

**3. Files Not Updating:**
- Clear browser cache
- Check if CDN/caching is enabled
- Verify files actually uploaded via cPanel File Manager

---

## ⚙️ **WORKFLOW FEATURES**

### **What It Does:**
1. **Builds** your React app from source
2. **Verifies** critical files exist (index.html, assets, sitemap)
3. **Checks** sitemap for script injection
4. **Deploys** directly via FTP to `public_html`
5. **Validates** deployment worked correctly
6. **Reports** success/failure with details

### **When It Runs:**
- Every push to `main` branch
- When you change any source files (`src/`, `public/`, etc.)
- Manual trigger from GitHub Actions tab
- **NOT** on draft commits or other branches

### **Deploy Time:**
- **Total**: 2-4 minutes
- **Build**: 1-2 minutes  
- **Upload**: 30-60 seconds
- **Verification**: 30 seconds

---

## 🎯 **NEXT STEPS**

1. **Add the FTP secrets** to GitHub (Step 1)
2. **Test manual deployment** (Step 3)
3. **Verify website works** (Step 4)
4. **Push a small change** to test automatic deployment

Once working, every time you push code changes, your website will automatically update within 2-4 minutes! 🚀

---

## 📞 **SUPPORT**

If you encounter issues:
1. Check GitHub Actions logs for error details
2. Verify FTP credentials in cPanel
3. Test FTP connection manually if needed
4. Check hosting provider documentation for FTP details

**GitHub Actions Path**: Repository → Actions tab → "🚀 Direct Deploy to Hosting" workflow
