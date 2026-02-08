#!/bin/bash

echo "🚀 Setting up for Render deployment..."

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules backend/node_modules frontend/node_modules

# Install all dependencies
echo "📦 Installing dependencies..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Test build
echo "🔨 Testing build..."
cd frontend && npm run build && cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Ready for Render deployment:"
echo "1. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Render'"
echo "   git push origin main"
echo "2. Go to https://render.com"
echo "3. Create new Web Service"
echo "4. Use build command:"
echo "   npm install && cd frontend && npm install && cd ../backend && npm install && cd ../frontend && npm run build"
echo "5. Use start command:"
echo "   node backend/server.js"