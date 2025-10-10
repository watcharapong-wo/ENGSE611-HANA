@echo off
echo 🚀 Setting up all course projects...

REM Day 3: React Hello World
echo 📦 Installing Day 3 - React Hello World...
cd day3\experiment\hello-react
call npm install
cd ..\..\..

REM Day 4: Node.js Express
echo 📦 Installing Day 4 - Node.js Express...
cd day4\experiment\my-first-node-project
call npm install
cd ..\..\..

REM Day 5: React Hooks Lab
echo 📦 Installing Day 5 - React Hooks Lab...
cd day5\react-hooks-lab
call npm install
cd ..\..

REM Day 6: Movie Wishlist
echo 📦 Installing Day 6 - Movie Wishlist...
cd day6\movie-wishlist
call npm install
cd ..\..

REM Day 7: Restaurant Review App
echo 📦 Installing Day 7 - Restaurant Review App...
cd day7\restaurant-review-app\backend
call npm install
cd ..\frontend
call npm install
cd ..\..\..

echo ✅ All projects setup complete!
echo.
echo 🎯 Quick start commands:
echo Day 3: cd day3\experiment\hello-react ^&^& npm run dev
echo Day 4: cd day4\experiment\my-first-node-project ^&^& npm run dev
echo Day 5: cd day5\react-hooks-lab ^&^& npm run dev
echo Day 6: cd day6\movie-wishlist ^&^& npm run dev
echo Day 7: Open day7\restaurant-review-app\WORKING-APP.html

pause