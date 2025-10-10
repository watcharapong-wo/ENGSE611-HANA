@echo off@echo off

echo ========================================echo Starting Restaurant Review App Backend...

echo    Restaurant Review Backend Servercd /d "\\wsl.localhost\Ubuntu-24.04\home\labadmin\class\engse611-hana\engse611-hana\day7\restaurant-review-app\backend"

echo ========================================wsl cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/backend && node server.js
echo.

cd /d "%~dp0"

echo ✅ Starting Simple Backend Server...
echo.
echo Server will run on: http://localhost:3001
echo API endpoint: http://localhost:3001/api/restaurants
echo Test endpoint: http://localhost:3001/test
echo.
echo Press Ctrl+C to stop the server
echo.

node simple-server.js

pause