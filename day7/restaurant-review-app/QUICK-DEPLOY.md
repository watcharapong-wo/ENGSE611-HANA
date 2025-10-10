# 🚀 ขั้นตอนการส่ง Code ไปยัง GitHub

## 1️⃣ เตรียมความพร้อม
✅ Code ทำงานได้เรียบร้อย  
✅ ไฟล์ทั้งหมดถูกบันทึก  
✅ มี Git repository setup แล้ว  

## 2️⃣ วิธีที่ง่ายที่สุด (Windows)

### **ดับเบิลคลิก `deploy-to-github.bat`**

หรือเปิด Command Prompt และรัน:
```cmd
deploy-to-github.bat
```

## 3️⃣ สำหรับ WSL/Linux

```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

## 4️⃣ Manual Deploy

```bash
# เข้าไปยัง project directory
cd "\\wsl.localhost\Ubuntu-24.04\home\labadmin\class\engse611-hana\engse611-hana"

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Complete Restaurant Review App with all features"

# Push to GitHub
git push origin main
```

## 5️⃣ ตรวจสอบผลลัพธ์

ไปที่: `https://github.com/watcharapong-wo/ENGSE611-HANA`

ควรเห็นไฟล์เหล่านี้:
- `day7/restaurant-review-app/WORKING-APP.html`
- `day7/restaurant-review-app/README.md`
- `day7/restaurant-review-app/frontend/`
- `day7/restaurant-review-app/backend/`

## 🎯 ไฟล์สำคัญที่จะถูกส่งไป:

```
day7/restaurant-review-app/
├── WORKING-APP.html              # 🎯 พร้อมใช้ทันที
├── FINAL-SOLUTION.md             # 📚 คู่มือใช้งาน
├── README.md                     # 📖 เอกสารโปรเจค
├── DEPLOY-GUIDE.md               # 🚀 คู่มือ deploy
├── deploy-to-github.bat          # 🔧 Windows script
├── deploy-to-github.sh           # 🐧 Linux script
├── frontend/                     # ⚛️ React application
│   ├── src/components/           # UI components
│   ├── src/services/api-static.js # Static data API
│   └── src/App.jsx               # Main app
└── backend/                      # 🖥️ Express server
    ├── server.js                 # Full API server
    └── data/restaurants.json     # Restaurant data
```

**🌟 พร้อมแล้ว! ใช้คำสั่งด้านบนเพื่อส่ง code ไปยัง GitHub**