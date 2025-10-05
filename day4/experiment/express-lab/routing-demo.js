const express = require('express');
const app = express();

// หน้าแรก
app.get('/', (req, res) => {
    res.send('<h1>🏠 หน้าแรก</h1><a href="/products">ดูสินค้า</a>');
});

// รายการสินค้า
app.get('/products', (req, res) => {
    res.send(`
        <h1>📦 รายการสินค้า</h1>
        <ul>
            <li><a href="/products/1">iPhone</a></li>
            <li><a href="/products/2">Samsung</a></li>
            <li><a href="/products/3">Xiaomi</a></li>
            <li><a href="/products/4">Huawei</a></li>
        </ul>
    `);
});

// สินค้าแต่ละชิ้น
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const products = {
        '1': 'iPhone 15 Pro',
        '2': 'Samsung Galaxy S24',
        '3': 'Xiaomi 14',
        '4': 'Huawei pro'
    };
    
    
    const productName = products[productId] || 'ไม่พบสินค้า';
    res.send(`<h1>📱 ${productName}</h1><p>รหัสสินค้า: ${productId}</p>`);
});


//https://localhost:3000/search;
//https://localhost:3000/search?q=phone;


// ค้นหาสินค้า
app.get('/search', (req, res) => {
    const query = req.query.q;
    const category = req.query.category;
    
    res.send(`
        <h1>🔍 ผลการค้นหา</h1>
        <p>คำค้นหา: <strong>${query || 'ไม่ได้ระบุ'}</strong></p>
        <p>หมวดหมู่: <strong>${category || 'ทั้งหมด'}</strong></p>
        <a href="/search?q=phone&category=electronics">ลองค้นหา phone</a>
    `);
});