require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const RESTAURANTS_PATH = path.join(DATA_DIR, 'restaurants.json');
const REVIEWS_PATH = path.join(DATA_DIR, 'reviews.json');

// Fallback sample data (used to auto-repair broken files)
const SAMPLE_RESTAURANTS = [
  { id: '1', name: 'ร้านก๋วยเตี๋ยวเรือ', type: 'อาหารไทย', address: '123 ถนนหลัก กรุงเทพฯ', image: 'image.png' },
  { id: '2', name: 'Pizza House', type: 'อาหารอิตาเลียน', address: '456 ถนนรอง เชียงใหม่', image: 'image-1.png' }
];

const SAMPLE_REVIEWS = [];

function ensureJsonArray(filePath, fallbackArray) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(fallbackArray, null, 2));
      return fallbackArray;
    }
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Not an array');
    return parsed;
  } catch (e) {
    // Auto-repair corrupted file
    fs.writeFileSync(filePath, JSON.stringify(fallbackArray, null, 2));
    return fallbackArray;
  }
}

// Root
app.get('/', (req, res) => {
  res.json({ message: '🍜 Restaurant Review API', version: '1.0.0' });
});

// Restaurants
app.get('/api/restaurants', (req, res) => {
  let restaurants = ensureJsonArray(RESTAURANTS_PATH, SAMPLE_RESTAURANTS);
  
  // Apply filters
  const { search, category, priceRange, rating } = req.query;
  
  if (search) {
    restaurants = restaurants.filter(r => 
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (category) {
    restaurants = restaurants.filter(r => r.cuisine === category);
  }
  
  if (priceRange) {
    restaurants = restaurants.filter(r => r.priceRange === priceRange);
  }
  
  if (rating) {
    const minRating = parseFloat(rating);
    restaurants = restaurants.filter(r => r.rating >= minRating);
  }
  
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurants = ensureJsonArray(RESTAURANTS_PATH, SAMPLE_RESTAURANTS);
  const restaurant = restaurants.find(r => String(r.id) === String(req.params.id));
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  res.json(restaurant);
});

// Reviews
app.get('/api/reviews/:restaurantId', (req, res) => {
  const reviews = ensureJsonArray(REVIEWS_PATH, SAMPLE_REVIEWS);
  const filtered = reviews.filter(r => String(r.restaurantId) === String(req.params.restaurantId));
  res.json(filtered);
});

app.post('/api/reviews', (req, res) => {
  const { restaurantId, name, rating, comment } = req.body || {};
  if (!restaurantId || !name || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const reviews = ensureJsonArray(REVIEWS_PATH, SAMPLE_REVIEWS);
  const newReview = {
    id: String(Date.now()),
    restaurantId: String(restaurantId),
    name: String(name).trim(),
    rating: Number(rating),
    comment: String(comment).trim(),
    date: new Date().toISOString()
  };
  reviews.push(newReview);
  fs.writeFileSync(REVIEWS_PATH, JSON.stringify(reviews, null, 2));
  res.status(201).json(newReview);
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});