# PowerShell Favicon Deployment Script
Write-Host "🚀 Building project with new favicon..." -ForegroundColor Green
npm run build

Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 FAVICON CHECKLIST:" -ForegroundColor Yellow
Write-Host "□ favicon.png saved in /public directory (512x512 recommended)"
Write-Host "□ favicon.ico created and saved in /public directory"  
Write-Host "□ Deploy to production"
Write-Host "□ Clear browser cache and test"
Write-Host ""
Write-Host "🔍 Test your favicon at:" -ForegroundColor Cyan
Write-Host "- Your website in browser tab"
Write-Host "- Bookmarks"
Write-Host "- Mobile home screen (if PWA enabled)"
Write-Host ""
Write-Host "💡 Tip: Clear browser cache (Ctrl+F5) to see changes immediately" -ForegroundColor Blue

# Check if favicon files exist
$publicPath = ".\public"
$faviconPng = Join-Path $publicPath "favicon.png"
$faviconIco = Join-Path $publicPath "favicon.ico"

Write-Host ""
Write-Host "📁 FILE STATUS:" -ForegroundColor Magenta
if (Test-Path $faviconPng) {
    Write-Host "✅ favicon.png found" -ForegroundColor Green
} else {
    Write-Host "❌ favicon.png missing - Please save your logo as favicon.png" -ForegroundColor Red
}

if (Test-Path $faviconIco) {
    Write-Host "✅ favicon.ico found" -ForegroundColor Green  
} else {
    Write-Host "⚠️ favicon.ico missing - Recommended for better browser compatibility" -ForegroundColor Yellow
    Write-Host "   Create at: https://favicon.io/favicon-converter/" -ForegroundColor Yellow
}
