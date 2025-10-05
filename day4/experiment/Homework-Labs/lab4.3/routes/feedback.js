// routes/feedback.js
const express = require('express');
const router = express.Router();
const { validateFeedback } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// ✅ POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
  try {
    const savedData = await appendToJsonFile('feedback.json', req.body);
    if (!savedData) {
      return res.status(500).json({
        success: false,
        message: 'ไม่สามารถบันทึกความคิดเห็นได้ กรุณาลองใหม่'
      });
    }

    res.json({
      success: true,
      message: 'บันทึกความคิดเห็นเรียบร้อย ✅',
      data: savedData
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    });
  }
});

// ✅ GET /api/feedback/stats - ดึงสถิติความคิดเห็น
router.get('/stats', async (req, res) => {
  try {
    const feedbackList = await readJsonFile('feedback.json');
    const total = feedbackList.length;

    let avgRating = 0;
    if (total > 0) {
      const sum = feedbackList.reduce((acc, item) => acc + Number(item.rating), 0);
      avgRating = (sum / total).toFixed(2);
    }

    res.json({
      success: true,
      totalFeedback: total,
      averageRating: Number(avgRating),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงสถิติความคิดเห็นได้'
    });
  }
});

module.exports = router;
