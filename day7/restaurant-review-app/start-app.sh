#!/bin/bash

echo "🚀 Starting Restaurant Review App..."

# Start backend in background
echo "📡 Starting Backend Server..."
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/backend
node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Test if backend is running
echo "🔍 Testing Backend..."
if curl -s http://localhost:3001/api/restaurants > /dev/null; then
    echo "✅ Backend is running on port 3001"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID
    exit 1
fi

# Start frontend
echo "🎨 Starting Frontend Server..."
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/frontend
npm run dev

# Cleanup when script exits
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID" EXIT