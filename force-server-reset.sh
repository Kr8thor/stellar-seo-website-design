#!/bin/bash
# Force reset server repository to match GitHub exactly
# This resolves merge conflicts by discarding server changes

echo "🔧 FORCE GIT RESET - Resolving server conflicts"
echo "⚠️  This will discard any local server changes"

# Set Git configuration
git config user.email "deploy@mardenseo.com"
git config user.name "cPanel Force Reset"

# Show current status
echo "📊 Current Git status:"
git status

# Stash any local changes (includes the problematic .htaccess)
echo "📦 Stashing local changes..."
git stash -u

# Force fetch and reset to match GitHub exactly
echo "🔄 Fetching from origin..."
git fetch origin

echo "🔨 Force reset to origin/main..."
git reset --hard origin/main

echo "🧹 Cleaning up any remaining files..."
git clean -fd

echo "✅ Server repository reset completed!"
echo "📋 Current commit:"
git log --oneline -1

echo "🎉 Ready for deployment!"
