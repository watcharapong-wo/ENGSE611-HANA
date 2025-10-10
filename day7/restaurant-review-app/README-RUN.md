# Restaurant Review App - คู่มือการใช้งาน

## 🎯 สถานะโปรเจค
✅ Backend API - พร้อมใช้งาน  
✅ Frontend Components - พร้อมใช้งาน  
✅ Dark/Light Mode - พร้อมใช้งาน  
✅ รูปภาพร้านอาหาร - พร้อมใช้งาน  

## 🚀 วิธีการรัน

### 1. เริ่ม Backend Server
```bash
# เปิด Terminal ใหม่
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/backend
node server.js
```
Server จะรันที่ http://localhost:3001

### 2. เริ่ม Frontend Development Server
```bash
# เปิด Terminal ใหม่อีกตัว
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/frontend
npm run dev
```
Frontend จะรันที่ http://localhost:5173

### 3. เปิดเว็บไซต์
ไปที่ http://localhost:5173

## 🔧 การแก้ปัญหา

### ปัญหา 1: Import Error ของ SearchBar
**อาการ:** `Failed to resolve import "./SearchBar"`
**วิธีแก้:** 
- ตรวจสอบไฟล์ `SearchBar.jsx` มีอยู่ใน `/components/`
- Import ใช้ extension เต็ม: `import SearchBar from './SearchBar.jsx'`

### ปัญหา 2: Backend API ไม่ตอบสนอง
**อาการ:** Cannot connect to backend
**วิธีแก้:**
1. ตรวจสอบ backend server รันอยู่ที่ port 3001
2. ทดสอบ API โดยเปิด http://localhost:3001/api/restaurants

### ปัญหา 3: PowerShell Encoding Issues
**อาการ:** คำสั่งขึ้นต้นด้วย `แ` เช่น `แcd`
**วิธีแก้:** ใช้ WSL Terminal แทน PowerShell

## 📁 โครงสร้างไฟล์

```
restaurant-review-app/
├── backend/
│   ├── server.js          # Express server
│   ├── data/
│   │   ├── restaurants.json
│   │   └── reviews.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app with theme
│   │   ├── App.css        # CSS with dark/light mode
│   │   ├── components/
│   │   │   ├── SearchBar.jsx      ✅
│   │   │   ├── RestaurantList.jsx ✅
│   │   │   ├── RestaurantCard.jsx ✅
│   │   │   ├── FilterPanel.jsx    ✅
│   │   │   ├── RestaurantDetail.jsx ✅
│   │   │   └── ReviewForm.jsx     ✅
│   │   └── services/
│   │       └── api-simple.js      ✅ (แทน api.js ที่เสียหาย)
│   └── package.json
└── test.html              # Static test page
```

## ✨ Features

1. **ค้นหาร้านอาหาร** - SearchBar with debounced input
2. **กรองข้อมูล** - Filter by category, price, rating
3. **แสดงรูปภาพ** - Unsplash restaurant images
4. **Dark/Light Mode** - Theme toggle with localStorage
5. **เขียนรีวิว** - Add reviews for restaurants
6. **Responsive Design** - Mobile-friendly

## 🌐 API Endpoints

- `GET /api/restaurants` - ดึงรายการร้านอาหาร
- `GET /api/restaurants/:id` - ดึงข้อมูลร้านเฉพาะ
- `GET /api/restaurants/:id/reviews` - ดึงรีวิวของร้าน
- `POST /api/reviews` - เพิ่มรีวิวใหม่

## 🎨 Theme System

CSS Variables สำหรับ Dark/Light mode:
```css
:root[data-theme="light"] {
  --bg-color: #ffffff;
  --text-color: #333333;
}

:root[data-theme="dark"] {
  --bg-color: #2d3436;
  --text-color: #ddd;
}
```

## 📝 Notes

- ไฟล์ `api.js` เดิมมีปัญหา corruption ใช้ `api-simple.js` แทน
- ถ้ามี PowerShell encoding issues ให้ใช้ WSL Terminal
- Backend และ Frontend ต้องรันพร้อมกัน
- CORS ได้ตั้งค่าแล้วสำหรับ localhost:5173