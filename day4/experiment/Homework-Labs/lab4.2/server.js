const express = require('express');
const cors = require('cors');
const path = require('path');

// ✅ Import logger และ routes
const logger = require('./middleware/logger');
const foodRoutes = require('./routes/foods');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware พื้นฐาน
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ✅ Logger middleware (บันทึกทุก request)
app.use(logger);

// ✅ Route: หน้าแรก
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Welcome to Food API!',
    version: '1.0.0',
    endpoints: {
      foods: '/api/foods',
      search: '/api/foods?search=ผัด',
      category: '/api/foods?category=แกง',
      spicy: '/api/foods?maxSpicy=3',
      vegetarian: '/api/foods?vegetarian=true',
      documentation: '/api/docs'
    }
  });
});

// ✅ ใช้งาน routes สำหรับ /api/foods
app.use('/api/foods', foodRoutes);

// ✅ Route: เอกสาร API (HTML)
app.get('/api/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ✅ Route: API สถิติ
app.get('/api/stats', (req, res) => {
  const foods = require('./data/foods.json');
  const total = foods.length;

  // นับจำนวนเมนูในแต่ละหมวด
  const byCategory = foods.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  const vegetarianCount = foods.filter(f => f.vegetarian).length;
  const availableCount = foods.filter(f => f.available).length;

  res.json({
    success: true,
    total,
    byCategory,
    vegetarianCount,
    availableCount
  });
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    requestedUrl: req.originalUrl
  });
});
// ✅ /api/docs - ส่งหน้า HTML ที่อยู่ใน public/index.html
app.get('/api/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ✅ /api/stats - ส่งสถิติเกี่ยวกับเมนูอาหาร
app.get('/api/stats', (req, res) => {
  const foods = require('./data/foods.json');
  const total = foods.length;

  // จำนวนเมนูในแต่ละหมวดหมู่
  const byCategory = foods.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  // จำนวนเมนูที่เป็นมังสวิรัติ
  const vegetarianCount = foods.filter(f => f.vegetarian).length;

  // จำนวนเมนูที่พร้อมเสิร์ฟ
  const availableCount = foods.filter(f => f.available).length;

  res.json({
    success: true,
    total,
    byCategory,
    vegetarianCount,
    availableCount
  });
});


// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});
