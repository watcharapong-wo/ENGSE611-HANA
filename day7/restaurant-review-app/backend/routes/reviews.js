const express = require('express');
const router = express.Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileManager');
const { validateReview } = require('../middleware/validation');

// GET /api/reviews/:restaurantId - ดึงรีวิวทั้งหมดของร้านนั้น
router.get('/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await readJsonFile('reviews.json');
    
    // กรองรีวิวเฉพาะร้านนี้
    const restaurantReviews = reviews.filter(r => r.restaurantId === parseInt(restaurantId));
    
    // เรียงจากใหม่สุดไปเก่าสุด
    restaurantReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      data: restaurantReviews,
      total: restaurantReviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรีวิว'
    });
  }
});

// POST /api/reviews - เพิ่มรีวิวใหม่
router.post('/', validateReview, async (req, res) => {
  try {
    const { restaurantId, userName, rating, comment, visitDate } = req.body;
    
    // อ่านข้อมูลปัจจุบัน
    const reviews = await readJsonFile('reviews.json');
    const restaurants = await readJsonFile('restaurants.json');
    
    // ตรวจสอบว่า restaurant ID มีอยู่จริงไหม
    const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบร้านอาหารนี้'
      });
    }
    
    // สร้างรีวิวใหม่
    const newReview = {
      id: Date.now(),
      restaurantId: parseInt(restaurantId),
      userName: userName.trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
      visitDate: visitDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    // เพิ่มรีวิวเข้าไปใน array และบันทึก
    reviews.push(newReview);
    await writeJsonFile('reviews.json', reviews);
    
    // อัพเดท averageRating และ totalReviews ของร้าน
    // กรองรีวิวทั้งหมดของร้านนี้ (รวมรีวิวใหม่ที่เพิ่งเพิ่ม)
    const restaurantReviews = reviews.filter(r => r.restaurantId === parseInt(restaurantId));
    
    // คำนวณค่าเฉลี่ย
    const totalRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAverageRating = totalRating / restaurantReviews.length;
    
    // หา index ของร้าน (ไม่ใช่ object!)
    const restaurantIndex = restaurants.findIndex(r => r.id === parseInt(restaurantId));
    
    // อัพเดทค่าใน array
    restaurants[restaurantIndex].averageRating = Math.round(newAverageRating * 10) / 10;
    restaurants[restaurantIndex].totalReviews = restaurantReviews.length;
    
    // บันทึกไฟล์
    await writeJsonFile('restaurants.json', restaurants);
    
    // ส่งข้อมูลกลับ
    res.status(201).json({
      success: true,
      message: 'เพิ่มรีวิวสำเร็จ',
      data: newReview,
      restaurant: {
        id: restaurants[restaurantIndex].id,
        name: restaurants[restaurantIndex].name,
        averageRating: restaurants[restaurantIndex].averageRating,
        totalReviews: restaurants[restaurantIndex].totalReviews
      }
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเพิ่มรีวิว'
    });
  }
});

module.exports = router;