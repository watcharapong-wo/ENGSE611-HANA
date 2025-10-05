// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' },
    { id: 'home', name: 'ของใช้ในบ้าน' }
];

export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 49900,
        discount: 8,
        image: 'iphone15pro.jpg',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้าฝ้าย',
        category: 'clothing',
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: 'https://via.placeholder.com/300x300/ffc107/000000?text=T-Shirt',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 4.2
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=React+Book',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    // ✅ เพิ่มสินค้าใหม่
    {
        id: 4,
        name: 'หูฟังไร้สาย Bluetooth',
        category: 'electronics',
        price: 1990,
        originalPrice: 2590,
        discount: 23,
        image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Headphones',
        description: 'หูฟังไร้สายคุณภาพสูง พร้อมระบบตัดเสียงรบกวน',
        inStock: true,
        rating: 4.5
    },
    {
        id: 5,
        name: 'กาต้มน้ำไฟฟ้า',
        category: 'home',
        price: 890,
        originalPrice: 1200,
        discount: 26,
        image: 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Kettle',
        description: 'กาต้มน้ำไฟฟ้า ความจุ 1.5 ลิตร ปลอดภัยด้วยระบบตัดไฟอัตโนมัติ',
        inStock: true,
        rating: 4.1
    },
    {
        id: 6,
        name: 'เสื้อเชิ้ตลำลอง',
        category: 'clothing',
        price: 599,
        originalPrice: 799,
        discount: 25,
        image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Shirt',
        description: 'เสื้อเชิ้ตผ้าฝ้าย ใส่สบายทุกโอกาส',
        inStock: true,
        rating: 4.0
    }
];
