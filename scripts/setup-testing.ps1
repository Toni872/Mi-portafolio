# PowerShell script for Windows
Write-Host "🔧 Setting up testing infrastructure..." -ForegroundColor Cyan

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Setup Husky
Write-Host "🐕 Setting up Husky..." -ForegroundColor Yellow
npx husky install

# Run initial validation
Write-Host "✅ Running initial validation..." -ForegroundColor Yellow
npm run validate

Write-Host ""
Write-Host "🎉 Testing infrastructure setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  npm test              - Run tests"
Write-Host "  npm run validate      - Run full validation"
Write-Host "  npm run check-deps    - Check for dependency updates"
Write-Host "  npm run update-deps   - Update dependencies automatically"
Write-Host ""







