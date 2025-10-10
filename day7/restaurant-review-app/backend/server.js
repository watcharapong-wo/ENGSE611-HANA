const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const { readJsonFile } = require('./utils/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Restaurant Review API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// GET /api/stats - ดึงสถิติทั้งหมด
app.get('/api/stats', async (req, res) => {
  try {
    // อ่านข้อมูล restaurants.json และ reviews.json
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');
    
    // คำนวณสถิติ
    const totalRestaurants = restaurants.length;
    const totalReviews = reviews.length;
    
    // คำนวณคะแนนเฉลี่ยของร้านทั้งหมด
    const restaurantsWithRating = restaurants.filter(r => r.averageRating > 0);
    const averageRating = restaurantsWithRating.length > 0 
      ? restaurantsWithRating.reduce((sum, r) => sum + r.averageRating, 0) / restaurantsWithRating.length
      : 0;
    
    // หาร้าน 5 อันดับแรกที่มี rating สูงสุด
    const topRatedRestaurants = restaurants
      .filter(r => r.averageRating > 0) // เฉพาะร้านที่มีรีวิว
      .sort((a, b) => b.averageRating - a.averageRating) // เรียงจากสูงสุดไปต่ำสุด
      .slice(0, 5) // เอาแค่ 5 อันดับแรก
      .map(r => ({
        id: r.id,
        name: r.name,
        category: r.category,
        averageRating: r.averageRating,
        totalReviews: r.totalReviews
      }));
    
    res.json({
      success: true,
      data: {
        totalRestaurants,
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        topRatedRestaurants
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
    });
  }
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});