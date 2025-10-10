#!/bin/bash
echo "========================================"
echo "    Deploying to GitHub Repository"
echo "========================================"
echo

# Navigate to project root
cd ../../

# Check git status
echo "Checking git status..."
git status

echo
echo "========================================"
echo "Adding all files to git..."
git add .

echo
echo "========================================"
echo "Committing changes..."
git commit -m "✨ Complete Restaurant Review App

Features:
- 🍽️ Restaurant listing with 6 restaurants  
- 🔍 Search and filter functionality
- 🌙 Dark/Light mode toggle
- 📱 Responsive design
- 🖼️ Unsplash images
- ⭐ Review system

Files:
- WORKING-APP.html (immediate use)
- React app with static API
- Complete documentation
- Multiple deployment options"

echo
echo "========================================"
echo "Pushing to GitHub..."
git push origin main

echo
echo "========================================"
echo "✅ Deployment completed!"
echo "🌐 Check your repository at:"
echo "https://github.com/watcharapong-wo/ENGSE611-HANA"
echo "========================================"