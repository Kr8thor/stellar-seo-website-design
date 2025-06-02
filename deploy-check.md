
# Deployment Checklist for mardenseo.com

## Pre-deployment Steps:
1. Run `npm run build` to create the dist folder
2. Verify that `dist/.htaccess` exists
3. Verify that `dist/index.html` contains the GPT Engineer script

## Post-deployment Verification:
1. Check file permissions on server:
   - Directories: 755
   - Files: 644
   - .htaccess: 644

2. Test these URLs:
   - https://mardenseo.com (should load main site)
   - https://mardenseo.com/about (should not 404)
   - https://mardenseo.com/services (should not 404)

## Manual Fix if Still Getting 403:
1. Access cPanel File Manager
2. Navigate to public_html
3. Right-click .htaccess → Permissions → Set to 644
4. Right-click index.html → Permissions → Set to 644
5. Check that all directories are 755

## Emergency Minimal .htaccess:
If the current .htaccess still causes issues, replace with:
```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . /index.html [L]
```
