const express = require('express');
const app = express();
const PORT = 3001;

// ✅ ข้อมูลจำลองนักศึกษา (ใช้ชุดเดียวกับ http-server.js)
const students = [
  { id: 1, name: 'สมชาย', major: 'วิศวกรรม', year: 3 },
  { id: 2, name: 'สมหญิง', major: 'บริหารธุรกิจ', year: 2 },
  { id: 3, name: 'สมปอง', major: 'วิศวกรรม', year: 1 },
];

// Middleware
app.use(express.json());

// ✅ GET /
app.get('/', (req, res) => {
  res.json({
    message: '🚀 ยินดีต้อนรับสู่ Express Server',
    endpoints: [
      'GET /',
      'GET /students',
      'GET /students/:id',
      'GET /students/major/:major',
      'GET /stats'
    ]
  });
});

// ✅ GET /students
app.get('/students', (req, res) => {
  res.json(students);
});

// ✅ GET /students/:id
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ error: 'ไม่พบนักศึกษา' });
  }
  res.json(student);
});

// ✅ GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
  const major = req.params.major;
  const filtered = students.filter(s => s.major === major);
  res.json(filtered);
});

// ✅ GET /stats
app.get('/stats', (req, res) => {
  const total = students.length;
  const byMajor = students.reduce((acc, s) => {
    acc[s.major] = (acc[s.major] || 0) + 1;
    return acc;
  }, {});
  res.json({
    totalStudents: total,
    byMajor
  });
});

// ✅ 404 Middleware
app.use((req, res) => {
  res.status(404).json({ error: 'ไม่พบหน้าที่คุณร้องขอ' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /');
  console.log('  GET /students'); 
  console.log('  GET /students/:id');
  console.log('  GET /students/major/:major');
  console.log('  GET /stats');
});
