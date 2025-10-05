const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    if (req.url === '/') {
        res.end('<h1>หน้าแรก - HTTP Module</h1>');
    } else if (req.url === '/about') {
        res.end('<h1>เกี่ยวกับเรา - HTTP Module</h1>');
    } else {
        res.writeHead(404);
        res.end('<h1>ไม่พบหน้า 404</h1>');
    }
});

server.listen(3000, () => {
    console.log('HTTP Server: http://localhost:3000');
});