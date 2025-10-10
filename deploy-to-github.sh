#!/bin/bash

echo "=================================================="
echo "  🚀 Deploying Restaurant Review App to GitHub"
echo "=================================================="
echo

# Navigate to project root
cd /home/labadmin/class/engse611-hana/engse611-hana

echo "📁 Current directory: $(pwd)"
echo

# Check git status
echo "🔍 Checking Git status..."
git status

echo
echo "📝 Adding all new and modified files..."
git add .

echo
echo "💾 Committing changes..."
git commit -m "✨ Complete Restaurant Review App with Static Data

Features:
- 🍽️ Restaurant listing with 6 restaurants
- 🔍 Search functionality 
- 📊 Filter by cuisine type and price range
- 🌙 Dark/Light mode toggle
- 🖼️ Unsplash images for restaurants
- 📱 Responsive design
- 📝 Review system
- 🎨 Modern UI with gradient backgrounds

Files added:
- WORKING-APP.html - Complete HTML version (works immediately)
- api-static.js - Static API for React app
- simple-server.js - Backup backend server
- FINAL-SOLUTION.md - User guide
- Various debugging and setup files

Technical improvements:
- Fixed PowerShell encoding issues
- Replaced corrupted api.js with static data
- Updated all components to use static API
- Added comprehensive documentation"

echo
echo "🌐 Pushing to GitHub..."
git push origin main

echo
echo "✅ Deployment completed!"
echo "🔗 Repository: https://github.com/watcharapong-wo/ENGSE611-HANA"
echo
echo "📂 Key files deployed:"
echo "   - day7/restaurant-review-app/WORKING-APP.html"
echo "   - day7/restaurant-review-app/frontend/ (React app)"
echo "   - day7/restaurant-review-app/backend/ (Express server)"
echo
echo "🎯 To run the app:"
echo "   1. Open WORKING-APP.html in browser (immediate)"
echo "   2. Or run 'npm run dev' in frontend folder"