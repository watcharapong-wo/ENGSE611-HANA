// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');
const statusMessages = document.getElementById('statusMessages');
const apiResults = document.getElementById('apiResults');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
    setupEventListeners();
});

function initializeForms() {
    // Update rating display
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
    });
}

function setupEventListeners() {
    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitContactForm();
    });

    // Feedback form submission
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitFeedbackForm();
    });

    // ✅ Real-time validation
    const fields = ['name', 'email', 'subject', 'message', 'phone', 'company'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('input', () => {
                const { isValid, message } = validateField(fieldName, field.value);
                const errorDiv = document.getElementById(`${fieldName}Error`);
                if (isValid) {
                    field.classList.remove('invalid');
                    field.classList.add('valid');
                    if (errorDiv) errorDiv.textContent = '';
                } else {
                    field.classList.remove('valid');
                    field.classList.add('invalid');
                    if (errorDiv) errorDiv.textContent = message;
                }
            });
        }
    });
}

// ✅ Client-side validation logic
function validateField(fieldName, value) {
    value = value.trim();
    switch (fieldName) {
        case 'name':
            if (value.length < 2) return { isValid: false, message: 'ชื่ออย่างน้อย 2 ตัวอักษร' };
            if (value.length > 100) return { isValid: false, message: 'ชื่อยาวเกิน 100 ตัวอักษร' };
            return { isValid: true, message: '' };
        case 'email':
            if (!value) return { isValid: false, message: 'กรุณากรอกอีเมล' };
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? { isValid: true, message: '' } : { isValid: false, message: 'อีเมลไม่ถูกต้อง' };
        case 'subject':
            if (value.length < 5) return { isValid: false, message: 'หัวเรื่องอย่างน้อย 5 ตัวอักษร' };
            if (value.length > 200) return { isValid: false, message: 'หัวเรื่องยาวเกิน 200 ตัวอักษร' };
            return { isValid: true, message: '' };
        case 'message':
            if (value.length < 10) return { isValid: false, message: 'ข้อความอย่างน้อย 10 ตัวอักษร' };
            if (value.length > 1000) return { isValid: false, message: 'ข้อความยาวเกิน 1000 ตัวอักษร' };
            return { isValid: true, message: '' };
        case 'phone':
            if (!value) return { isValid: true, message: '' };
            const phoneRegex = /^[0-9]{9,10}$/;
            return phoneRegex.test(value) ? { isValid: true, message: '' } : { isValid: false, message: 'เบอร์โทรไม่ถูกต้อง' };
        case 'company':
            if (value.length > 100) return { isValid: false, message: 'ชื่อบริษัทไม่เกิน 100 ตัวอักษร' };
            return { isValid: true, message: '' };
        default:
            return { isValid: true, message: '' };
    }
}

// ✅ ส่งฟอร์ม Contact
async function submitContactForm() {
    if (isSubmitting) return;

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
        isSubmitting = true;
        updateSubmitButton('contactSubmit', 'กำลังส่ง...', true);

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            showStatusMessage('✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
            contactForm.reset();
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) displayValidationErrors(result.errors);
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('contactSubmit', 'ส่งข้อความ', false);
    }
}

// ✅ ส่งฟอร์ม Feedback
async function submitFeedbackForm() {
    if (isSubmitting) return;

    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);

    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);

        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            showStatusMessage('✅ ส่งความคิดเห็นสำเร็จ!', 'success');
            feedbackForm.reset();
            ratingValue.textContent = 3; // reset slider display
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) displayValidationErrors(result.errors);
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

function showStatusMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;

    statusMessages.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
    const button = document.getElementById(buttonId);
    button.textContent = text;
    button.disabled = disabled;
}

function displayValidationErrors(errors) {
    errors.forEach(error => {
        showStatusMessage(`🔸 ${error}`, 'error');
    });
}

// ✅ โหลดข้อมูล contact จาก API
async function loadContacts() {
    try {
        apiResults.textContent = 'Loading contacts...';
        const response = await fetch('/api/contact');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading contacts: ' + error.message;
    }
}

// ✅ โหลด feedback stats จาก API
async function loadFeedbackStats() {
    try {
        apiResults.textContent = 'Loading feedback stats...';
        const response = await fetch('/api/feedback/stats');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading feedback stats: ' + error.message;
    }
}

// ✅ โหลดสถานะ API จาก /api/status
async function loadAPIStatus() {
    try {
        apiResults.textContent = 'Loading API status...';
        const response = await fetch('/api/status');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API status: ' + error.message;
    }
}
