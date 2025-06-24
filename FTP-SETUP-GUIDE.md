# 🚀 FTP Credentials & Testing Guide

## 📋 **QUICK FTP SETUP FOR MARDEN SEO**

### **Step 1: Get Your FTP Credentials**

**Most Likely Settings:**
```
FTP_HOST: mardenseo.com
FTP_USERNAME: marddium  
FTP_PASSWORD: [Your cPanel login password]
```

**Alternative Settings (if above doesn't work):**
```
FTP_HOST: ftp.mardenseo.com
FTP_USERNAME: marddium@mardenseo.com
FTP_PASSWORD: [Your cPanel login password]  
```

### **Step 2: Find FTP Info in cPanel**

1. **Login to cPanel** (usually `mardenseo.com/cpanel` or `mardenseo.com:2083`)
2. **Look for "FTP Accounts"**
3. **Main account shows:**
   - Server: Usually your domain name
   - Username: Usually your primary account name
   - Directory: Should be `public_html` or `/home/username/public_html`

### **Step 3: Test FTP Connection (Optional)**

**Windows Command Prompt Test:**
```cmd
ftp mardenseo.com
# Enter username: marddium
# Enter password: [your-password]
# If successful, type: ls
# You should see public_html folder
# Type: quit
```

**Online FTP Test Tools:**
- Use any online FTP tester with your credentials
- Should connect to see `public_html` folder

---

## 🔧 **ADD TO GITHUB SECRETS**

**Go to:** https://github.com/Kr8thor/stellar-seo-website-design/settings/secrets/actions

**Add these 3 secrets:**

1. **Secret Name:** `FTP_HOST`  
   **Value:** `mardenseo.com`

2. **Secret Name:** `FTP_USERNAME`  
   **Value:** `marddium`

3. **Secret Name:** `FTP_PASSWORD`  
   **Value:** `[Your actual cPanel password]`

---

## ✅ **TEST DEPLOYMENT**

After adding secrets:

1. **Go to Actions:** https://github.com/Kr8thor/stellar-seo-website-design/actions
2. **Click:** "🚀 Direct Deploy to Hosting"  
3. **Click:** "Run workflow" → "Run workflow"
4. **Watch:** Green checkmarks should appear
5. **Check:** https://mardenseo.com should work perfectly

---

## 🎯 **EXPECTED RESULTS**

**After successful deployment:**
- ✅ https://mardenseo.com loads normally
- ✅ https://mardenseo.com/assets/index-CQl0KpYd.js returns JavaScript (not 404)  
- ✅ https://mardenseo.com/sitemap.xml shows clean XML (no script tags)
- ✅ All website features work perfectly

**Deployment takes 2-4 minutes total.**

---

## 🚨 **IF FTP FAILS**

**Try these alternatives:**

1. **Different FTP Host:**
   - `ftp.mardenseo.com`
   - `mardenseo.com`
   - Check cPanel for exact FTP server name

2. **Different Username Format:**
   - `marddium`
   - `marddium@mardenseo.com`  
   - Full path with domain

3. **Contact Hosting Support:**
   - Ask for "FTP access details for GitHub deployment"
   - Mention you need "programmatic FTP access"

---

## 📞 **NAMECHEAP SUPPORT INFO**

If you need help finding FTP details:

**Contact Namecheap Support:**
- Say: "I need FTP credentials for automated deployment to my website"
- Domain: mardenseo.com
- Need: Server, Username, Password for FTP access to public_html

They'll provide exact details for your hosting setup.
