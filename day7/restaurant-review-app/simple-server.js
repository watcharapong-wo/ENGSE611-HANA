const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test data - simplified
const restaurants = [
  {
    id: "1",
    name: "ร้านก๋วยเตี๋ยวเรือ",
    cuisine: "อาหารไทย",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
    rating: 4.5,
    priceRange: "$$",
    description: "ก๋วยเตี๋ยวเรือแท้ๆ รสชาติเข้มข้น"
  },
  {
    id: "2", 
    name: "Pizza House",
    cuisine: "อาหารอิตาเลียน",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    rating: 4.2,
    priceRange: "$$$",
    description: "พิซซ่าแป้งบางกรอบ วัตถุดิบนำเข้า"
  },
  {
    id: "3",
    name: "ร้านส้มตำป้าสมใส",
    cuisine: "อาหารไทย",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop",
    rating: 4.7,
    priceRange: "$",
    description: "ส้มตำแซ่บๆ สูตรต้นตำรับอีสาน"
  }
];

// API Routes
app.get('/api/restaurants', (req, res) => {
  console.log('GET /api/restaurants called');
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.json(restaurant);
});

app.post('/api/reviews', (req, res) => {
  console.log('POST /api/reviews called', req.body);
  res.json({ success: true, id: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/restaurants`);
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date() });
});