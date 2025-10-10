# 🍜 Restaurant Review App - Installation Guide

## Prerequisites
Before running this project, make sure you have the following installed:

### Required Software
1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### For WSL Users
If you're using Windows Subsystem for Linux (WSL), install Node.js in WSL:

```bash
# Update package manager
sudo apt update

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

## Installation Steps

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The backend will run on `http://localhost:3000`

### 2. Frontend Setup
Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Verification

### Backend API Testing
Open your browser or use curl to test these endpoints:

1. **Basic API Info**
   ```
   GET http://localhost:3000
   ```

2. **Get All Restaurants**
   ```
   GET http://localhost:3000/api/restaurants
   ```

3. **Search Restaurants**
   ```
   GET http://localhost:3000/api/restaurants?search=ส้มตำ
   ```

4. **Filter by Category**
   ```
   GET http://localhost:3000/api/restaurants?category=อาหารไทย
   ```

5. **Get Restaurant Details**
   ```
   GET http://localhost:3000/api/restaurants/1
   ```

6. **Add Review (POST)**
   ```bash
   curl -X POST http://localhost:3000/api/reviews \
     -H "Content-Type: application/json" \
     -d '{
       "restaurantId": 1,
       "userName": "ผู้ทดสอบ",
       "rating": 5,
       "comment": "อร่อยมากครับ บรรยากาศดี แนะนำเลยครับ"
     }'
   ```

### Frontend Testing
1. Open `http://localhost:5173` in your browser
2. You should see the restaurant list
3. Try searching and filtering
4. Click on a restaurant to see details
5. Try adding a review

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
**Error**: `EADDRINUSE :::3000`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env file
PORT=3001
```

#### 2. CORS Error
**Error**: `Access to fetch blocked by CORS policy`

**Solution**: Make sure the backend has CORS enabled (already included in server.js)

#### 3. Module Not Found
**Error**: `Cannot find module`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Permission Denied
**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

## Development Tips

### Hot Reload
Both frontend and backend have hot reload enabled:
- Backend: Uses `nodemon` for automatic restart on file changes
- Frontend: Uses Vite's hot module replacement (HMR)

### API Testing Tools
- **Browser**: For GET requests
- **Postman**: For comprehensive API testing
- **curl**: For command-line testing
- **Thunder Client**: VS Code extension

### Debugging
1. **Backend**: Check terminal for server logs
2. **Frontend**: Open browser DevTools → Console
3. **Network**: Monitor API calls in DevTools → Network tab

## File Structure Overview

```
restaurant-review-app/
├── backend/                 # Express.js API server
│   ├── data/               # JSON data files
│   ├── routes/             # API route handlers
│   ├── middleware/         # Express middleware
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service functions
│   │   ├── App.jsx         # Main app component
│   │   └── App.css         # Styles
│   └── index.html          # HTML template
│
└── README.md               # Project documentation
```

## Next Steps

1. **Start Coding**: Both servers should now be running
2. **Explore Features**: Test all the functionality
3. **Customize**: Add your own features or modifications
4. **Deploy**: Consider deploying to platforms like Vercel, Netlify, or Heroku

## Support

If you encounter any issues:
1. Check the console/terminal for error messages
2. Verify all dependencies are installed
3. Ensure both servers are running
4. Check the network tab in browser DevTools
5. Refer to the main README.md for detailed documentation

Happy coding! 🚀