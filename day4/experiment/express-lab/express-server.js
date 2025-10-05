const express = require('express');
const app = express();
const PORT = 3000;

url = server_domian + path + parameter

app.get('/', (req, res) => {
  res.send('<h1>🚀 ยินดีต้อนรับสู่ API Server</h1>');
});


app.get('/', (req, res) => {
    res.send('<h1>หน้าแรก - Express.js</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>เกี่ยวกับเรา - Express.js</h1>');
});

app.listen(3001, () => {
    console.log('Express Server: http://localhost:3001');
});