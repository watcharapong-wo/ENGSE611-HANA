# 🚀 การส่ง Code ไปยัง GitHub

## 📋 วิธีการ Deploy (เลือก 1 วิธี)

### วิธีที่ 1: ใช้ Script อัตโนมัติ (แนะนำ)

#### สำหรับ Windows:
```cmd
# ดับเบิลคลิกไฟล์
deploy-to-github.bat
```

#### สำหรับ Linux/WSL:
```bash
# ใน WSL Terminal
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

### วิธีที่ 2: Manual Commands

#### ใน Command Prompt หรือ Git Terminal:
```bash
# ไปยัง root directory ของโปรเจค
cd "\\wsl.localhost\Ubuntu-24.04\home\labadmin\class\engse611-hana\engse611-hana"

# ตรวจสอบสถานะ
git status

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit พร้อมข้อความ
git commit -m "✨ Complete Restaurant Review App

Features:
- 🍽️ Restaurant listing with 6 restaurants
- 🔍 Search and filter functionality
- 🌙 Dark/Light mode toggle  
- 📱 Responsive design
- 🖼️ Unsplash images
- ⭐ Review system

Files:
- WORKING-APP.html (immediate use)
- React app with static API
- Complete documentation"

# Push ไปยัง GitHub
git push origin main
```

## 📂 ไฟล์ที่จะถูกส่งไป GitHub:

### 🎯 ไฟล์หลัก:
- `WORKING-APP.html` - เวอร์ชันใช้งานทันที
- `FINAL-SOLUTION.md` - คู่มือการใช้งาน
- `README.md` - เอกสารโปรเจค

### ⚛️ React App:
- `frontend/src/components/` - Components ทั้งหมด
- `frontend/src/services/api-static.js` - Static API
- `frontend/src/App.jsx` - Main app with theme
- `frontend/src/App.css` - Styles

### 🖥️ Backend:
- `backend/server.js` - Express server
- `backend/simple-server.js` - Lightweight server
- `backend/data/` - JSON data files

### 🔧 Utility Files:
- `deploy-to-github.sh` - Linux deployment script
- `deploy-to-github.bat` - Windows deployment script
- Various debugging and setup files

## ✅ หลังจาก Deploy สำเร็จ:

### 🌐 Repository URL:
```
https://github.com/watcharapong-wo/ENGSE611-HANA
```

### 📁 ไฟล์สำคัญใน GitHub:
```
engse611-hana/
└── day7/
    └── restaurant-review-app/
        ├── WORKING-APP.html          # 🎯 ใช้งานทันที
        ├── README.md                 # 📚 เอกสาร
        ├── FINAL-SOLUTION.md         # 🔧 คู่มือ
        ├── frontend/                 # ⚛️ React app
        └── backend/                  # 🖥️ Express server
```

## 🎉 วิธีการใช้งานหลัง Deploy:

### 1. สำหรับผู้ใช้ทั่วไป:
- เข้าไปยัง GitHub repository
- ดาวน์โหลดไฟล์ `WORKING-APP.html`
- เปิดในเบราว์เซอร์

### 2. สำหรับ Developer:
- Clone repository: `git clone https://github.com/watcharapong-wo/ENGSE611-HANA.git`
- ไปยัง: `cd ENGSE611-HANA/day7/restaurant-review-app/frontend`
- รัน: `npm install && npm run dev`

## 🚨 หากมีปัญหา:

### ปัญหา: Git command ไม่ทำงาน
**แก้ไข:** ใช้ Git Bash แทน PowerShell

### ปัญหา: Permission denied
**แก้ไข:** รัน terminal as Administrator

### ปัญหา: Authentication failed  
**แก้ไข:** Setup GitHub personal access token

## 📝 Commit Message Template:

```
✨ Complete Restaurant Review App

Features:
- [list key features]

Technical:
- [technical improvements]

Files:
- [important files added/modified]
```

**🎯 แนะนำ: ใช้ `deploy-to-github.bat` สำหรับความง่าย!**