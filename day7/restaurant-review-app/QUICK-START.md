# วิธีการรัน Restaurant Review App แบบขั้นต่ำ

## ⚠️ ปัญหาที่พบ: Frontend แสดง "ไม่สามารถโหลดข้อมูลได้"

### 🔧 แก้ไขแล้ว:
1. ✅ เปลี่ยน Backend port จาก 5000 เป็น 3001
2. ✅ เพิ่มข้อมูล `cuisine` และ `description` ใน restaurants.json
3. ✅ เพิ่ม API filtering สำหรับ search, category, priceRange, rating

## 🚀 วิธีการรันที่อัปเดต

### วิธีที่ 1: ใช้ Script อัตโนมัติ (แนะนำ)
```bash
# เปิด Ubuntu Terminal (WSL)
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app
chmod +x start-app.sh
./start-app.sh
```

### วิธีที่ 2: รันแยกกัน (Manual)

#### 1. รัน Backend
```bash
# Terminal 1
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/backend
node server.js
```
ต้องเห็น: `Server running on port 3001`

#### 2. รัน Frontend  
```bash
# Terminal 2 (ใหม่)
cd /home/labadmin/class/engse611-hana/engse611-hana/day7/restaurant-review-app/frontend
npm run dev
```
ต้องเห็น: `Local: http://localhost:5173/`

#### 3. เปิดเบราว์เซอร์
- ไปที่ http://localhost:5173
- ควรเห็นข้อมูลร้านอาหาร 6 ร้าน

## � การทดสอบและ Debug

### ทดสอบ Backend ก่อน:
1. เปิด `debug-backend.html` ในเบราว์เซอร์
2. คลิก "ทดสอบการเชื่อมต่อ"
3. คลิก "ทดสอบดึงข้อมูลร้านอาหาร"

### ถ้า Backend ทำงาน แต่ Frontend ยังแสดงข้อผิดพลาด:
1. เปิด Developer Tools (F12)
2. ดู Console และ Network tabs
3. ตรวจสอบ CORS errors

## 📊 ข้อมูลที่อัปเดต

### ร้านอาหารทั้งหมด (6 ร้าน):
1. **ร้านก๋วยเตี๋ยวเรือ** - อาหารไทย ($$) ⭐4.5
2. **Pizza House** - อาหารอิตาเลียน ($$$) ⭐4.2  
3. **ร้านส้มตำป้าสมใส** - อาหารไทย ($) ⭐4.7
4. **Sushi Zen** - อาหารญี่ปุ่น ($$$$) ⭐4.8
5. **Burger Station** - อาหารอเมริกัน ($$) ⭐4.0
6. **ร้านข้าวแกงป้าแดง** - อาหารไทย ($) ⭐4.3

### API Endpoints ที่ใช้ได้:
- `GET /api/restaurants` - ดึงข้อมูลทั้งหมด
- `GET /api/restaurants?search=ก๋วยเตี๋ยว` - ค้นหา
- `GET /api/restaurants?category=อาหารไทย` - กรองหมวดหมู่
- `GET /api/restaurants?rating=4` - กรองคะแนน
- `POST /api/reviews` - เพิ่มรีวิว

## ✨ Features ที่ใช้งานได้:

1. **🔍 ค้นหา** - พิมพ์ชื่อร้าน ประเภทอาหาร หรือคำอธิบาย
2. **📋 กรอง** - เลือกประเภทอาหาร, ช่วงราคา, คะแนน
3. **🖼️ รูปภาพ** - แสดงรูปจาก Unsplash
4. **🌙 Dark/Light Mode** - คลิกไอคอนด้านบน  
5. **📝 รีวิว** - คลิกที่ร้านเพื่อดูรายละเอียดและเขียนรีวิว
6. **📱 Responsive** - ใช้งานได้บนมือถือ

## 🚨 หากยังไม่ได้:

1. ตรวจสอบว่า Backend รันอยู่ที่ port 3001
2. ตรวจสอบว่า Frontend รันอยู่ที่ port 5173  
3. ลองรีเฟรชหน้าเว็บ (Ctrl+F5)
4. ตรวจสอบ Firewall/Antivirus ที่อาจบล็อก port