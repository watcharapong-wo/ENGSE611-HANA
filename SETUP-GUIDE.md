# Setup Instructions for All Projects

## Day 1-2: HTML/CSS/JavaScript Projects
เปิดไฟล์ .html ในเบราว์เซอร์โดยตรง - ไม่ต้องติดตั้งอะไร

## Day 3: React Hello World
```bash
cd day3/experiment/hello-react
npm install
npm run dev
```
เปิดเบราว์เซอร์ไปที่ http://localhost:3000

## Day 4: Node.js Express Server
```bash
cd day4/experiment/my-first-node-project
npm install
npm run dev
```
เปิดเบราว์เซอร์ไปที่ http://localhost:3000

## Day 5: React Hooks Lab
```bash
cd day5/react-hooks-lab
npm install
npm run dev
```
เปิดเบราว์เซอร์ไปที่ http://localhost:3001

## Day 6: Movie Wishlist App
```bash
cd day6/movie-wishlist
npm install
npm run dev
```
เปิดเบราว์เซอร์ไปที่ http://localhost:3002

## Day 7: Restaurant Review App
### Option 1: HTML Version (ไม่ต้องติดตั้ง)
เปิดไฟล์ `day7/restaurant-review-app/WORKING-APP.html` ในเบราว์เซอร์

### Option 2: Full Stack Version
```bash
# Backend
cd day7/restaurant-review-app/backend
npm install
npm run dev

# Frontend (terminal ใหม่)
cd day7/restaurant-review-app/frontend
npm install
npm run dev
```

## Quick Setup All Projects (รันคำสั่งเดียว)
```bash
# ไปที่ root directory แล้วรัน:
chmod +x setup-all.sh
./setup-all.sh
```