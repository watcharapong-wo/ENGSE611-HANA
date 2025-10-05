const path = require('path');

console.log(__dirname);           // โฟลเดอร์ปัจจุบัน
console.log(__filename);          // ไฟล์ปัจจุบัน

const filePath = path.join(__dirname, 'data', 'users.json');
console.log(filePath);            // /project/data/users.json

const extname = path.extname('photo.jpg');
console.log(extname);             // .jpg