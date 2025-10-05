// middleware/validation.js

// ✅ Regular Expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{9,10}$/;

// ✅ Contact Form Validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    // 🟡 Name
    if (!name || typeof name !== 'string') {
        errors.push('กรุณากรอกชื่อให้ถูกต้อง (ต้องเป็นตัวอักษร)');
    } else if (name.trim().length < 2) {
        errors.push('ชื่อ ต้องมีความยาวอย่างน้อย 2 ตัวอักษร');
    } else if (name.trim().length > 100) {
        errors.push('ชื่อ ต้องไม่เกิน 100 ตัวอักษร');
    }

    // 🟡 Email
    if (!email) {
        errors.push('กรุณากรอกอีเมล');
    } else if (!emailRegex.test(email)) {
        errors.push('รูปแบบอีเมลไม่ถูกต้อง เช่น example@email.com');
    }

    // 🟡 Subject
    if (!subject) {
        errors.push('กรุณากรอกหัวเรื่อง');
    } else if (subject.trim().length < 5) {
        errors.push('หัวเรื่อง ต้องมีความยาวอย่างน้อย 5 ตัวอักษร');
    } else if (subject.trim().length > 200) {
        errors.push('หัวเรื่อง ต้องไม่เกิน 200 ตัวอักษร');
    }

    // 🟡 Message
    if (!message) {
        errors.push('กรุณากรอกข้อความ');
    } else if (message.trim().length < 10) {
        errors.push('ข้อความ ต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
    } else if (message.trim().length > 1000) {
        errors.push('ข้อความ ต้องไม่เกิน 1000 ตัวอักษร');
    }

    // 🟡 Phone (optional)
    if (phone && !phoneRegex.test(phone)) {
        errors.push('เบอร์โทรศัพท์ต้องเป็นตัวเลข 9 หรือ 10 หลัก เช่น 0812345678');
    }

    // 🟡 Company (optional)
    if (company && company.length > 100) {
        errors.push('ชื่อบริษัทต้องไม่เกิน 100 ตัวอักษร');
    }

    // ✅ ถ้ามี error ให้ตอบกลับทันที
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบข้อผิดพลาด',
            errors
        });
    }

    // ✅ sanitize
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.subject = subject.trim();
    req.body.message = message.trim();

    next();
};

// ✅ Feedback Validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    // 🟡 Rating
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum)) {
        errors.push('กรุณาให้คะแนนเป็นตัวเลข');
    } else if (ratingNum < 1 || ratingNum > 5) {
        errors.push('คะแนนต้องอยู่ระหว่าง 1 ถึง 5 ดาว');
    }

    // 🟡 Comment
    if (!comment) {
        errors.push('กรุณากรอกความคิดเห็น');
    } else if (comment.trim().length < 5) {
        errors.push('ความคิดเห็นต้องมีความยาวอย่างน้อย 5 ตัวอักษร');
    } else if (comment.trim().length > 500) {
        errors.push('ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร');
    }

    // 🟡 Email (optional)
    if (email && !emailRegex.test(email)) {
        errors.push('รูปแบบอีเมลไม่ถูกต้อง เช่น example@email.com');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบข้อผิดพลาด',
            errors
        });
    }

    next();
};

module.exports = {
    validateContact,
    validateFeedback
};
