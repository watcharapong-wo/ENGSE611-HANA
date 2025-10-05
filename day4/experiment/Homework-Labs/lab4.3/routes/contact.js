// routes/contact.js
const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// ✅ POST /api/contact - บันทึกข้อมูลติดต่อ
router.post('/', validateContact, async (req, res) => {
  try {
    const savedData = await appendToJsonFile('contacts.json', req.body);
    if (!savedData) {
      return res.status(500).json({
        success: false,
        message: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่'
      });
    }

    res.json({
      success: true,
      message: 'บันทึกข้อมูลติดต่อเรียบร้อย ✅',
      data: savedData
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    });
  }
});

// ✅ GET /api/contact?page=&limit= - ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const contacts = await readJsonFile('contacts.json');

    // คำนวณข้อมูลหน้า
    const total = contacts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = contacts.slice(startIndex, endIndex);

    res.json({
      success: true,
      total,
      page,
      totalPages,
      limit,
      data: paginatedData
    });
  } catch (error) {
    console.error('Error reading contacts:', error);
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลได้'
    });
  }
});

module.exports = router;
