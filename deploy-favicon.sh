#!/bin/bash
# Quick favicon deployment script

echo "🚀 Building project with new favicon..."
npm run build

echo "✅ Build complete!"
echo ""
echo "📋 FAVICON CHECKLIST:"
echo "□ favicon.png saved in /public directory (512x512 recommended)"
echo "□ favicon.ico created and saved in /public directory"
echo "□ Deploy to production"
echo "□ Clear browser cache and test"
echo ""
echo "🔍 Test your favicon at:"
echo "- Your website in browser tab"
echo "- Bookmarks"  
echo "- Mobile home screen (if PWA enabled)"
echo ""
echo "💡 Tip: Clear browser cache (Ctrl+F5) to see changes immediately"
