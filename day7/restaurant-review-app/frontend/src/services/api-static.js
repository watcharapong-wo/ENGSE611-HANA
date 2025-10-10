// Static data - ไม่ต้องพึ่ง Backend Server
const STATIC_RESTAURANTS = [
  {
    id: "1",
    name: "ร้านก๋วยเตี๋ยวเรือ",
    cuisine: "อาหารไทย",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
    rating: 4.5,
    priceRange: "$$",
    description: "ก๋วยเตี๋ยวเรือแท้ๆ รสชาติเข้มข้น เครื่องแกงหอม เส้นเหนียวนุ่ม"
  },
  {
    id: "2", 
    name: "Pizza House",
    cuisine: "อาหารอิตาเลียน",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    rating: 4.2,
    priceRange: "$$$",
    description: "พิซซ่าแป้งบางกรอบ วัตถุดิบนำเข้าจากอิตาลี ชีสแท้ๆ"
  },
  {
    id: "3",
    name: "ร้านส้มตำป้าสมใส",
    cuisine: "อาหารไทย",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop",
    rating: 4.7,
    priceRange: "$",
    description: "ส้มตำแซ่บๆ สูตรต้นตำรับอีสาน เครื่องเคียงครบครัน"
  },
  {
    id: "4",
    name: "Sushi Zen",
    cuisine: "อาหารญี่ปุ่น",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.8,
    priceRange: "$$$$",
    description: "ซูชิพรีเมียม ปลาสดนำเข้าจากซึกิจิ โตเกียว บรรยากาศหรูหรา"
  },
  {
    id: "5",
    name: "Burger Station",
    cuisine: "อาหารอเมริกัน",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.0,
    priceRange: "$$",
    description: "เบอร์เกอร์เนื้อแท้ หนาใหญ่ พร้อมเฟรนช์ฟรายส์กรอบ"
  },
  {
    id: "6",
    name: "ร้านข้าวแกงป้าแดง",
    cuisine: "อาหารไทย",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    rating: 4.3,
    priceRange: "$",
    description: "ข้าวแกงตามสั่ง แกงจืด แกงเผ็ด กับข้าวสวยร้อนๆ"
  }
];

// Mock reviews data
let STATIC_REVIEWS = [
  {
    id: "1",
    restaurantId: "1",
    userName: "คุณสมใจ",
    rating: 5,
    comment: "อร่อยมาก! ก๋วยเตี๋ยวเรือรสชาติแท้",
    images: [],
    createdAt: "2024-01-15T10:30:00.000Z"
  },
  {
    id: "2",
    restaurantId: "1",
    userName: "คุณมาลี",
    rating: 4,
    comment: "ดีครับ แต่รอนานหน่อย",
    images: [],
    createdAt: "2024-01-18T14:20:00.000Z"
  }
];

// โหลดรีวิวเพิ่มเติมจาก localStorage
const loadSavedReviews = () => {
  try {
    const savedReviews = JSON.parse(localStorage.getItem('restaurant_reviews') || '[]');
    STATIC_REVIEWS = [...STATIC_REVIEWS, ...savedReviews];
  } catch (error) {
    console.warn('ไม่สามารถโหลดรีวิวที่บันทึกไว้ได้:', error);
  }
};

// เรียกใช้เมื่อโหลดครั้งแรก
loadSavedReviews();

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getRestaurants = async (filters = {}) => {
  await delay(500); // Simulate network delay
  
  let restaurants = [...STATIC_RESTAURANTS];
  
  // Apply filters
  if (filters.search) {
    restaurants = restaurants.filter(r => 
      r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.description.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  if (filters.category) {
    restaurants = restaurants.filter(r => r.cuisine === filters.category);
  }
  
  if (filters.priceRange) {
    restaurants = restaurants.filter(r => r.priceRange === filters.priceRange);
  }
  
  if (filters.rating) {
    const minRating = parseFloat(filters.rating);
    restaurants = restaurants.filter(r => r.rating >= minRating);
  }
  
  return restaurants;
};

export const getRestaurantById = async (id) => {
  await delay(300);
  
  const restaurant = STATIC_RESTAURANTS.find(r => r.id === id);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  return restaurant;
};

export const getRestaurantReviews = async (restaurantId) => {
  await delay(300);
  
  return STATIC_REVIEWS.filter(r => r.restaurantId === restaurantId);
};

export const addReview = async (reviewData) => {
  await delay(500);
  
  const newReview = {
    id: String(Date.now()),
    restaurantId: String(reviewData.restaurantId),
    userName: reviewData.userName || reviewData.name,
    rating: Number(reviewData.rating),
    comment: reviewData.comment,
    images: reviewData.images || [], // เพิ่มรองรับรูปภาพ
    userId: reviewData.userId || null, // เพิ่ม user ID
    createdAt: new Date().toISOString()
  };
  
  STATIC_REVIEWS.push(newReview);
  
  // บันทึกรีวิวลงใน localStorage เพื่อให้คงอยู่
  const savedReviews = JSON.parse(localStorage.getItem('restaurant_reviews') || '[]');
  savedReviews.push(newReview);
  localStorage.setItem('restaurant_reviews', JSON.stringify(savedReviews));
  
  return newReview;
};

export const getAllReviews = async () => {
  await delay(300);
  return [...STATIC_REVIEWS];
};