// server.js
const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'สวัสดีจาก API (port 3000)',
    timestamp: new Date().toISOString()
  });
});

app.listen(3000, () => {
  console.log('🚀 API Server running at http://localhost:3000');
});
