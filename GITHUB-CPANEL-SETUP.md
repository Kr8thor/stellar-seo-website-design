# 🚀 GitHub → cPanel Git Deployment Setup

## 📋 **OVERVIEW**
This guide sets up **GitHub → cPanel Git integration** for automatic deployment without FTP. Much cleaner and more professional!

**How it works:**
1. **Code changes pushed** → GitHub Actions builds files
2. **Built files committed** → Triggers cPanel Git deployment  
3. **cPanel pulls from GitHub** → Automatically deploys via `.cpanel.yml`
4. **Website updated** → Zero manual intervention needed

---

## 🔧 **STEP 1: CONFIGURE CPANEL GIT DEPLOYMENT**

### **Access cPanel Git Manager:**

1. **Login to cPanel**
   - Visit: `mardenseo.com/cpanel` or `mardenseo.com:2083`
   - Use your hosting credentials

2. **Find Git Version Control**
   - Look for "Git™ Version Control" in cPanel
   - Usually under "Files" section

3. **Create Git Repository**
   - Click **"Create"**
   - **Repository Name**: `stellar-seo-website-design`
   - **Clone URL**: `https://github.com/Kr8thor/stellar-seo-website-design.git`
   - **Repository Path**: `/home/marddium/repositories/stellar-seo-website-design`
   - Click **"Create"**

### **Configure Deployment Settings:**

4. **Set Deployment Branch**
   - **Branch**: `main`
   - **Auto-Deploy**: ✅ **Enabled**
   - **Deployment Path**: `/home/marddium/public_html`

5. **Add Deploy Key (if required)**
   - cPanel may generate a deploy key
   - Add this key to GitHub repository if prompted
   - Go to GitHub Settings → Deploy Keys → Add Key

---

## 🔐 **STEP 2: GITHUB REPOSITORY CONFIGURATION**

### **If cPanel Requires Deploy Key:**

1. **Copy Deploy Key from cPanel**
   - cPanel Git section will show a public key
   - Copy the entire key (starts with `ssh-rsa`)

2. **Add to GitHub:**
   - Go to: https://github.com/Kr8thor/stellar-seo-website-design/settings/keys
   - Click **"Add deploy key"**
   - **Title**: `cPanel Deployment Key`
   - **Key**: Paste the key from cPanel
   - ✅ **Allow write access** (important!)
   - Click **"Add key"**

### **Webhook Configuration (Recommended):**

1. **Get Webhook URL from cPanel**
   - cPanel Git section shows webhook URL
   - Usually: `https://mardenseo.com:2083/cpsess.../git-webhook`

2. **Add to GitHub:**
   - Go to: https://github.com/Kr8thor/stellar-seo-website-design/settings/hooks
   - Click **"Add webhook"**
   - **Payload URL**: Paste webhook URL from cPanel
   - **Content Type**: `application/json`
   - **Events**: Select "Just the push event"
   - Click **"Add webhook"**

---

## 🧪 **STEP 3: TEST THE DEPLOYMENT**

### **Trigger Test Deployment:**

1. **Manual GitHub Actions Run:**
   - Go to: https://github.com/Kr8thor/stellar-seo-website-design/actions
   - Click **"🚀 Build & Deploy via cPanel Git"**
   - Click **"Run workflow"** → **"Run workflow"**

2. **Watch the Process:**
   - ✅ Build completes
   - ✅ Files committed to repo
   - ✅ Push triggers cPanel
   - ✅ cPanel deploys automatically

### **Verify in cPanel:**

3. **Check cPanel Git Manager:**
   - Should show recent deployment
   - Check deployment logs for success
   - Verify files copied to `public_html`

4. **Test Website:**
   - Visit: https://mardenseo.com
   - Check: https://mardenseo.com/sitemap.xml (clean XML)
   - Verify: https://mardenseo.com/assets/index-CQl0KpYd.js (not 404)

---

## 🔍 **STEP 4: TROUBLESHOOTING**

### **Common Issues & Solutions:**

#### **Problem: cPanel Git not pulling from GitHub**
**Solution:**
- Verify deploy key is added to GitHub with write access
- Check webhook URL is correct
- Ensure repository URL in cPanel is exact GitHub URL

#### **Problem: Authentication failed**
**Solution:**
- Regenerate deploy key in cPanel
- Remove old key from GitHub, add new one
- Ensure "Allow write access" is checked

#### **Problem: Files not appearing in public_html**
**Solution:**
- Check `.cpanel.yml` file exists in repository
- Verify deployment path: `/home/marddium/public_html/`
- Check cPanel deployment logs for errors

#### **Problem: Still getting 404 errors**
**Solution:**
- Verify `dist/` folder is committed to repository
- Check GitHub Actions builds successfully
- Clear browser cache after deployment

---

## 🚀 **STEP 5: ENABLE AUTOMATIC DEPLOYMENTS**

### **How Automatic Deployment Works:**

1. **Code Changes** → Push to `main` branch
2. **GitHub Actions** → Builds production files
3. **Commits Built Files** → Updates repository with dist/
4. **Triggers cPanel** → Webhook or polling detects changes
5. **cPanel Deploys** → Runs `.cpanel.yml` script automatically
6. **Website Updated** → Live within 2-3 minutes

### **What Gets Deployed:**
- ✅ Optimized JavaScript bundles
- ✅ CSS and static assets  
- ✅ Clean XML sitemap (no script injection)
- ✅ SEO-optimized HTML
- ✅ Proper file permissions
- ✅ All static files (robots.txt, favicons, etc.)

---

## ⚙️ **STEP 6: ADVANCED CONFIGURATION**

### **Custom Deploy Script Enhancement:**

The `.cpanel.yml` already includes:
- ✅ Git conflict resolution
- ✅ Clean repository sync
- ✅ Proper file permissions
- ✅ Deployment verification
- ✅ Error handling

### **Monitoring & Alerts:**

- **GitHub Actions** provides build/deploy status
- **cPanel logs** show deployment details
- **Website monitoring** via GitHub Actions verification
- **Automatic rollback** if deployment fails

---

## 🎯 **WHAT TO EXPECT**

### **Deployment Timeline:**
- **Build Time**: 1-2 minutes (GitHub Actions)
- **Push Time**: 10-30 seconds
- **cPanel Sync**: 30-60 seconds  
- **File Copy**: 10-30 seconds
- **Total**: 2-4 minutes from code push to live website

### **Success Indicators:**
- ✅ GitHub Actions shows green checkmarks
- ✅ cPanel Git shows recent deployment
- ✅ Website loads without errors
- ✅ New bundle files accessible (no 404s)
- ✅ Sitemap clean (no script injection)

---

## 📞 **SUPPORT & NEXT STEPS**

### **If You Need Help:**

1. **Check cPanel Git Logs** for deployment errors
2. **Review GitHub Actions** logs for build issues
3. **Verify webhook** is receiving GitHub events
4. **Contact hosting support** for cPanel Git configuration help

### **Once Working:**

- ✅ **Push any code change** → automatic deployment
- ✅ **Zero manual work** needed for deployments
- ✅ **Professional Git workflow** 
- ✅ **Clean, reliable deployments** every time

**The GitHub → cPanel integration is the most professional deployment method - worth setting up properly!** 🚀

---

## 🎉 **IMMEDIATE ACTION PLAN**

1. **Configure cPanel Git** (10 minutes)
2. **Add deploy key to GitHub** (2 minutes)  
3. **Test deployment** (5 minutes)
4. **Verify website works** (2 minutes)

**Total setup: ~20 minutes for permanent automation!**
