const http = require('http');
const url = require('url');

const PORT = 3000;

// ✅ ข้อมูลจำลองนักศึกษา
const students = [
  { id: 1, name: 'สมชาย', major: 'วิศวกรรม', year: 3 },
  { id: 2, name: 'สมหญิง', major: 'บริหารธุรกิจ', year: 2 },
  { id: 3, name: 'สมปอง', major: 'วิศวกรรม', year: 1 },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // ✅ GET /
  if (method === 'GET' && pathname === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '🌐 ยินดีต้อนรับสู่ HTTP Server',
      endpoints: [
        'GET /',
        'GET /students',
        'GET /students/:id',
        'GET /students/major/:major'
      ]
    }));
    return;
  }

  // ✅ GET /students
  if (method === 'GET' && pathname === '/students') {
    res.statusCode = 200;
    res.end(JSON.stringify(students));
    return;
  }

  // ✅ GET /students/:id
  if (method === 'GET' && pathname.startsWith('/students/')) {
    const parts = pathname.split('/').filter(Boolean); // [students, id] หรือ [students, major, majorName]

    // /students/major/:major
    if (parts.length === 3 && parts[1] === 'major') {
      const major = decodeURIComponent(parts[2]);
      const filtered = students.filter(s => s.major === major);
      res.statusCode = 200;
      res.end(JSON.stringify(filtered));
      return;
    }

    // /students/:id
    if (parts.length === 2) {
      const id = Number(parts[1]);
      const student = students.find(s => s.id === id);
      if (student) {
        res.statusCode = 200;
        res.end(JSON.stringify(student));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'ไม่พบนักศึกษาที่ระบุ' }));
      }
      return;
    }
  }

  // ✅ 404 Not Found
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'ไม่พบหน้าที่คุณร้องขอ' }));
});

server.listen(PORT, () => {
  console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /');
  console.log('  GET /students');
  console.log('  GET /students/:id');
  console.log('  GET /students/major/:major');
});
