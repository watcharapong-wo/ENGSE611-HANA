const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหารจากไฟล์
const loadFoods = () => {
  try {
    const data = fs.readFileSync(FOODS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading foods:', error);
    return [];
  }
};

// ✅ GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
  try {
    let foods = loadFoods();
    const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;

    // 🔍 search
    if (search) {
      const keyword = search.toLowerCase();
      foods = foods.filter(
        f =>
          f.name.toLowerCase().includes(keyword) ||
          f.description.toLowerCase().includes(keyword)
      );
    }

    // 🍛 category
    if (category) {
      foods = foods.filter(f => f.category === category);
    }

    // 🌶 maxSpicy
    if (maxSpicy) {
      const max = Number(maxSpicy);
      foods = foods.filter(f => f.spicyLevel <= max);
    }

    // 🥦 vegetarian
    if (vegetarian !== undefined) {
      const boolVal = vegetarian === 'true';
      foods = foods.filter(f => f.vegetarian === boolVal);
    }

    // ✅ available
    if (available !== undefined) {
      const boolVal = available === 'true';
      foods = foods.filter(f => f.available === boolVal);
    }

    // 💰 maxPrice
    if (maxPrice) {
      const max = Number(maxPrice);
      foods = foods.filter(f => f.price <= max);
    }

    res.json({
      success: true,
      total: foods.length,
      data: foods,
      filters: {
        search: search || null,
        category: category || null,
        maxSpicy: maxSpicy || null,
        vegetarian: vegetarian || null,
        available: available || null,
        maxPrice: maxPrice || null
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching foods'
    });
  }
});

// ✅ GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const foods = loadFoods();
  const food = foods.find(f => f.id === id);

  if (!food) {
    return res.status(404).json({
      success: false,
      message: 'ไม่พบเมนูอาหารที่ระบุ'
    });
  }

  res.json({ success: true, data: food });
});

// ✅ GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const foods = loadFoods();
  const filtered = foods.filter(f => f.category === category);

  res.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
});

// ✅ GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
  const foods = loadFoods();
  const random = foods[Math.floor(Math.random() * foods.length)];
  res.json({
    success: true,
    data: random
  });
});

module.exports = router;
