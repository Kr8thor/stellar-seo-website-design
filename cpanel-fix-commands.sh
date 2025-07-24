#!/bin/bash
# cPanel Terminal Commands to Fix Git Deployment

# 1. Navigate to your repository directory
cd /home/marddium/repositories/stellar-seo-website-design

# 2. Check current status
echo "=== Current Git Status ==="
git status

# 3. Fetch latest changes from GitHub
echo "=== Fetching from GitHub ==="
git fetch origin main

# 4. Pull the latest changes
echo "=== Pulling latest changes ==="
git pull origin main

# 5. Verify the .cpanel.yml file exists
echo "=== Checking .cpanel.yml ==="
ls -la .cpanel.yml

# 6. Check current HEAD commit
echo "=== Current HEAD commit ==="
git log --oneline -1

# 7. If needed, force reset to match GitHub (use with caution)
# git reset --hard origin/main

# 8. Manual deployment commands (if automatic deploy still fails)
echo "=== Manual Deployment ==="
export DEPLOYPATH=/home/marddium/public_html/

# Remove old files (be careful with this!)
rm -rf $DEPLOYPATH/*

# Copy new files
cp -R dist/* $DEPLOYPATH

# Copy .htaccess if it exists
if [ -f "dist/.htaccess" ]; then 
    cp dist/.htaccess $DEPLOYPATH
fi

# Set proper permissions
find $DEPLOYPATH -type d -exec chmod 755 {} \;
find $DEPLOYPATH -type f -exec chmod 644 {} \;

# Set .htaccess permissions specifically
if [ -f "$DEPLOYPATH/.htaccess" ]; then
    chmod 644 $DEPLOYPATH/.htaccess
fi

echo "=== Deployment Complete ==="