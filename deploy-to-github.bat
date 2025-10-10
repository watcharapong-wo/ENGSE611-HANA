@echo off
echo ==================================================
echo   🚀 Deploying Restaurant Review App to GitHub
echo ==================================================
echo.

cd /d "\\wsl.localhost\Ubuntu-24.04\home\labadmin\class\engse611-hana\engse611-hana"

echo 📁 Current directory: %CD%
echo.

echo 🔍 Checking Git status...
git status

echo.
echo 📝 Adding all new and modified files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "✨ Complete Restaurant Review App with Static Data - Features: Restaurant listing, Search, Filter, Dark/Light mode, Responsive design, Review system"

echo.
echo 🌐 Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment completed!
echo 🔗 Repository: https://github.com/watcharapong-wo/ENGSE611-HANA
echo.
echo 📂 Key files deployed:
echo    - day7/restaurant-review-app/WORKING-APP.html
echo    - day7/restaurant-review-app/frontend/ (React app)
echo    - day7/restaurant-review-app/backend/ (Express server)
echo.
echo 🎯 To run the app:
echo    1. Open WORKING-APP.html in browser (immediate)
echo    2. Or run 'npm run dev' in frontend folder

pause