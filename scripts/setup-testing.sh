#!/bin/bash

echo "🔧 Setting up testing infrastructure..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup Husky
echo "🐕 Setting up Husky..."
npx husky install

# Make scripts executable
echo "🔐 Making scripts executable..."
chmod +x scripts/check-dependencies.js
chmod +x scripts/update-dependencies.js
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

# Run initial validation
echo "✅ Running initial validation..."
npm run validate

echo ""
echo "🎉 Testing infrastructure setup complete!"
echo ""
echo "Available commands:"
echo "  npm test              - Run tests"
echo "  npm run validate      - Run full validation"
echo "  npm run check-deps    - Check for dependency updates"
echo "  npm run update-deps   - Update dependencies automatically"
echo ""







