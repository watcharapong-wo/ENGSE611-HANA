// middleware/fileManager.js
const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// ✅ สร้างโฟลเดอร์ data ถ้ายังไม่มี
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch (error) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// ✅ อ่านข้อมูลจากไฟล์ JSON
const readJsonFile = async (filename) => {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // ❗ ถ้าไฟล์ไม่มีหรืออ่านไม่ได้ ให้คืนค่าเป็น []
    return [];
  }
};

// ✅ เขียนข้อมูลลงไฟล์ JSON
const writeJsonFile = async (filename, data) => {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
};

// ✅ เพิ่มข้อมูลใหม่ลงไฟล์ พร้อมเพิ่ม id และ timestamp
const appendToJsonFile = async (filename, newData) => {
  try {
    const existingData = await readJsonFile(filename);

    // เพิ่ม ID และ timestamp
    const dataWithId = {
      id: Date.now(), // ใช้ timestamp เป็น ID
      ...newData,
      createdAt: new Date().toISOString()
    };

    existingData.push(dataWithId);
    await writeJsonFile(filename, existingData);
    return dataWithId;
  } catch (error) {
    console.error('Error appending to file:', error);
    return null;
  }
};

// ✅ สร้างฟังก์ชัน getFileStats สำหรับแสดงจำนวนข้อมูลในแต่ละไฟล์
const getFileStats = async () => {
  try {
    const contacts = await readJsonFile('contacts.json');
    const feedback = await readJsonFile('feedback.json');

    return {
      contactsCount: contacts.length,
      feedbackCount: feedback.length,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting file stats:', error);
    return {
      contactsCount: 0,
      feedbackCount: 0,
      lastUpdated: new Date().toISOString()
    };
  }
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  appendToJsonFile,
  getFileStats
};
