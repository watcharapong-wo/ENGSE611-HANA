// server.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');
const { getFileStats } = require('./middleware/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 10,
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
});

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', limiter);

// ✅ Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ ใช้ contactRoutes สำหรับ /api/contact
app.use('/api/contact', contactRoutes);

// ✅ ใช้ feedbackRoutes สำหรับ /api/feedback
app.use('/api/feedback', feedbackRoutes);

// ✅ API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Contact Form API Documentation',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': {
                description: 'Submit contact form',
                requiredFields: ['name', 'email', 'subject', 'message'],
                optionalFields: ['phone', 'company']
            },
            'GET /api/contact': {
                description: 'Get all contact submissions (admin)',
                parameters: {
                    page: 'Page number (default: 1)',
                    limit: 'Items per page (default: 10)'
                }
            },
            'POST /api/feedback': {
                description: 'Submit feedback',
                requiredFields: ['rating', 'comment'],
                optionalFields: ['email']
            },
            'GET /api/feedback/stats': {
                description: 'Get feedback statistics'
            },
            'GET /api/status': {
                description: 'Get API status and data counts'
            }
        }
    });
});

// ✅ GET /api/status - ส่งสถานะระบบและจำนวนข้อมูล
app.get('/api/status', async (req, res) => {
    try {
        const stats = await getFileStats();
        res.json({
            success: true,
            serverTime: new Date().toISOString(),
            ...stats
        });
    } catch (error) {
        console.error('Error fetching API status:', error);
        res.status(500).json({
            success: false,
            message: 'ไม่สามารถดึงสถานะ API ได้'
        });
    }
});

// ✅ 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// ✅ Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Contact Form API running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});
