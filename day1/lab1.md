# การบ้าน LAB 1 (ขั้นสูง) - Portfolio Website Professional
## ENGSE611 - การพัฒนาเว็บด้วยเทคโนโลยีสมัยใหม่

> **📚 ระดับความยาก: ★★★★☆**  
> **⏰ เวลาทำ: 6-8 ชั่วโมง (ทำที่บ้าน)**  
> **🎯 เป้าหมาย: สร้าง Professional Portfolio Website ที่ใช้เทคนิคขั้นสูง**

---

## 🌟 ภาพรวมโปรเจค

### สิ่งที่จะสร้าง:
**เว็บไซต์ Portfolio แบบมืออาชีพ** ที่มีฟีเจอร์:
- **Landing Page** สวยงามด้วย Hero Section
- **Skills Progress Bars** แสดงความสามารถ
- **Project Gallery** แสดงผลงาน
- **Timeline Education** แสดงประวัติการศึกษา
- **Contact Form** ที่ใช้งานได้
- **Dark/Light Mode Toggle**
- **Smooth Animations** และ **Parallax Effects**

### ผลลัพธ์ที่คาดหวัง:
![Portfolio Preview](placeholder-for-portfolio-preview.png)
- เว็บไซต์ที่ดูเป็นมืออาชีพระดับนักพัฒนาจริง
- Responsive ทุกอุปกรณ์
- มี Animations และ Interactive Elements
- สามารถนำไปใช้จริงได้

---

## 📋 ส่วนที่ 1: HTML Structure ขั้นสูง
### ⏰ เวลาประมาณ: 2 ชั่วโมง

### 🎯 เป้าหมาย:
สร้างโครงสร้าง HTML ที่ซับซ้อนและมีองค์ประกอบครบครัน

### 🚀 โค้ดเริ่มต้น:

#### ไฟล์: `index.html`
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ชื่อของคุณ] - Full Stack Developer</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h3>&lt;[ชื่อย่อ]/&gt;</h3>
            </div>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#skills" class="nav-link">Skills</a></li>
                <li><a href="#projects" class="nav-link">Projects</a></li>
                <li><a href="#education" class="nav-link">Education</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="theme-switch-wrapper">
                <label class="theme-switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div class="slider round">
                        <i class="fas fa-sun"></i>
                        <i class="fas fa-moon"></i>
                    </div>
                </label>
            </div>
            <div class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">
                        สวัสดี, ฉันคือ <span class="highlight">[ชื่อเต็ม]</span>
                    </h1>
                    <h2 class="hero-subtitle">
                        <span class="typing-text">Software Engineering Student</span>
                    </h2>
                    <p class="hero-description">
                        ผมเป็นนักศึกษาวิศวกรรมซอฟต์แวร์ที่หลงใหลในการพัฒนาเว็บไซต์ 
                        และต้องการเป็นส่วนหนึ่งของการสร้างเทคโนโลยีที่เปลี่ยนโลก
                    </p>
                    <div class="hero-buttons">
                        <a href="#projects" class="btn btn-primary">
                            <i class="fas fa-code"></i> ดูผลงาน
                        </a>
                        <a href="#contact" class="btn btn-outline">
                            <i class="fas fa-envelope"></i> ติดต่อฉัน
                        </a>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="image-container">
                        <img src="images/profile-hero.jpg" alt="Profile Picture" class="profile-img">
                        <div class="floating-icons">
                            <i class="fab fa-html5"></i>
                            <i class="fab fa-css3-alt"></i>
                            <i class="fab fa-js-square"></i>
                            <i class="fab fa-react"></i>
                            <i class="fab fa-python"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-arrow">
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
    </section>

    <!-- ส่วนที่ต้องเพิ่มเอง: About Section -->
    <section id="about" class="about">
        <!-- TODO: สร้าง About Section ที่มี:
             - Personal Story (2-3 ย่อหน้า)
             - Fun Facts Cards (4-6 การ์ด)
             - Personal Values/Goals
        -->
    </section>

    <!-- ส่วนที่ต้องเพิ่มเอง: Skills Section -->
    <section id="skills" class="skills">
        <!-- TODO: สร้าง Skills Section ที่มี:
             - Programming Languages พร้อม Progress Bars
             - Web Technologies 
             - Tools & Frameworks
             - Soft Skills
        -->
    </section>

    <!-- ส่วนที่ต้องเพิ่มเอง: Projects Gallery -->
    <section id="projects" class="projects">
        <!-- TODO: สร้าง Projects Gallery ที่มี:
             - Project Cards (อย่างน้อย 4 โปรเจค)
             - Filter Buttons (Web, Mobile, Design)
             - Modal Popup สำหรับรายละเอียด
        -->
    </section>

    <!-- ส่วนที่ต้องเพิ่มเอง: Education Timeline -->
    <section id="education" class="education">
        <!-- TODO: สร้าง Education Timeline ที่มี:
             - Timeline Layout แนวตั้ง
             - การศึกษาตั้งแต่ มัธยม-ปัจจุบัน
             - Certifications/Courses ออนไลน์
        -->
    </section>

    <!-- ส่วนที่ต้องเพิ่มเอง: Contact Form -->
    <section id="contact" class="contact">
        <!-- TODO: สร้าง Contact Section ที่มี:
             - Contact Form ที่ใช้งานได้
             - Social Media Links
             - Contact Information Cards
        -->
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2024 [ชื่อของคุณ]. Crafted with ❤️ and lots of ☕</p>
            <div class="footer-social">
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### 📝 สิ่งที่ต้องทำ:

#### 1. About Section (30 นาที)
```html
<!-- ตัวอย่างโครงสร้างที่ต้องสร้าง -->
<div class="about-container">
    <div class="about-content">
        <div class="about-text">
            <h2>เกี่ยวกับฉัน</h2>
            <!-- Personal story 2-3 paragraphs -->
        </div>
        <div class="fun-facts">
            <!-- 4-6 fun fact cards with icons -->
        </div>
    </div>
</div>
```

#### 2. Skills Section (45 นาที)
```html
<!-- ตัวอย่างโครงสร้าง Skills -->
<div class="skills-container">
    <h2>ทักษะและความสามารถ</h2>
    <div class="skills-categories">
        <div class="skill-category">
            <h3>Programming Languages</h3>
            <div class="skill-item">
                <span>Python</span>
                <div class="progress-bar">
                    <div class="progress" data-width="75%"></div>
                </div>
            </div>
            <!-- เพิ่ม skills อื่นๆ -->
        </div>
    </div>
</div>
```

#### 3. Projects Section (45 นาที)
สร้าง Gallery ที่มี Filter และ Modal

#### 4. Education Timeline (30 นาที)
สร้าง Timeline แนวตั้งพร้อม Animation

#### 5. Contact Form (30 นาที)
สร้าง Form ที่มี Validation

### ✅ ผลลัพธ์ที่ต้องได้:
- HTML Structure ครบ 6 sections
- Semantic HTML ถูกต้อง
- Meta tags สำหรับ SEO
- Font Awesome Icons ทำงานได้
- Google Fonts โหลดได้

---

## 🎨 ส่วนที่ 2: Advanced CSS Styling
### ⏰ เวลาประมาณ: 3 ชั่วโมง

### 🎯 เป้าหมาย:
สร้าง CSS ที่ซับซ้อน มี Animations และ Professional Design

### 🚀 โค้ดเริ่มต้น:

#### ไฟล์: `styles.css`
```css
/* ==================== CSS VARIABLES ==================== */
:root {
    /* Colors */
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --text-primary: #2d3748;
    --text-secondary: #4a5568;
    --text-light: #a0aec0;
    --bg-primary: #ffffff;
    --bg-secondary: #f7fafc;
    --bg-card: #ffffff;
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.07);
    --shadow-medium: 0 10px 25px rgba(0, 0, 0, 0.1);
    --shadow-heavy: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    /* Dark Mode Colors */
    --dark-bg-primary: #1a202c;
    --dark-bg-secondary: #2d3748;
    --dark-bg-card: #4a5568;
    --dark-text-primary: #f7fafc;
    --dark-text-secondary: #e2e8f0;
    
    /* Typography */
    --font-primary: 'Poppins', sans-serif;
    --font-size-xl: 3.5rem;
    --font-size-lg: 2.5rem;
    --font-size-md: 1.5rem;
    --font-size-sm: 1rem;
    
    /* Spacing */
    --section-padding: 100px 0;
    --container-padding: 0 5%;
    --border-radius: 12px;
    
    /* Animations */
    --transition-speed: 0.3s;
    --transition-curve: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==================== GLOBAL STYLES ==================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-primary);
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    transition: all var(--transition-speed) var(--transition-curve);
}

/* Dark Mode */
body.dark-mode {
    --bg-primary: var(--dark-bg-primary);
    --bg-secondary: var(--dark-bg-secondary);
    --bg-card: var(--dark-bg-card);
    --text-primary: var(--dark-text-primary);
    --text-secondary: var(--dark-text-secondary);
}

/* ==================== NAVIGATION ==================== */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
    transition: all var(--transition-speed) var(--transition-curve);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-medium);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.nav-logo h3 {
    color: var(--primary-color);
    font-weight: 700;
    font-size: 1.5rem;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
    position: relative;
    transition: all var(--transition-speed) var(--transition-curve);
}

.nav-link:hover,
.nav-link.active {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    transition: width var(--transition-speed) var(--transition-curve);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

/* ==================== THEME SWITCH ==================== */
.theme-switch-wrapper {
    display: flex;
    align-items: center;
}

.theme-switch {
    display: inline-block;
    height: 24px;
    position: relative;
    width: 50px;
}

.theme-switch input {
    display: none;
}

.slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
    border-radius: 24px;
}

.slider:before {
    background-color: #fff;
    bottom: 2px;
    content: "";
    height: 20px;
    left: 2px;
    position: absolute;
    transition: 0.4s;
    width: 20px;
    border-radius: 50%;
}

input:checked + .slider {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.slider i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    pointer-events: none;
}

.fa-sun {
    left: 6px;
    color: #f39c12;
}

.fa-moon {
    right: 6px;
    color: #f1c40f;
}

/* ==================== HERO SECTION ==================== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, 
        var(--bg-primary) 0%, 
        var(--bg-secondary) 100%);
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23667eea" fill-opacity="0.05" points="0,1000 1000,0 1000,1000"/></svg>');
    z-index: 0;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--container-padding);
    position: relative;
    z-index: 1;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.highlight {
    position: relative;
}

.highlight::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
    animation: highlightGrow 2s ease-in-out infinite alternate;
}

@keyframes highlightGrow {
    0% { transform: scaleX(0.8); }
    100% { transform: scaleX(1); }
}

.hero-subtitle {
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.typing-text {
    border-right: 2px solid var(--primary-color);
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { border-color: var(--primary-color); }
    51%, 100% { border-color: transparent; }
}

/* ==================== BUTTONS ==================== */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 12px 24px;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-speed) var(--transition-curve);
    border: 2px solid transparent;
    cursor: pointer;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);
}

.btn-outline {
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    background: transparent;
}

.btn-outline:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

/* ส่วนที่ต้องเพิ่มเอง: Skills Progress Bars */
/* TODO: สร้าง CSS สำหรับ:
   - .skills section
   - .progress-bar animations
   - .skill-category cards
   - Hover effects
*/

/* ส่วนที่ต้องเพิ่มเอง: Projects Gallery */
/* TODO: สร้าง CSS สำหรับ:
   - .projects grid layout
   - .project-card hover effects
   - .filter-buttons active states
   - Modal popup styles
*/

/* ส่วนที่ต้องเพิ่มเอง: Education Timeline */
/* TODO: สร้าง CSS สำหรับ:
   - .timeline vertical layout
   - .timeline-item animations
   - Timeline line และ dots
   - Content positioning
*/

/* ส่วนที่ต้องเพิ่มเอง: Contact Form */
/* TODO: สร้าง CSS สำหรับ:
   - .contact-form styling
   - Input field animations
   - Form validation states
   - Submit button effects
*/

/* ==================== RESPONSIVE DESIGN ==================== */
@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .nav-menu {
        display: none;
    }
    
    /* TODO: เพิ่ม responsive rules สำหรับ sections อื่นๆ */
}
```

### 📝 สิ่งที่ต้องทำ:

#### 1. Skills Progress Bars (45 นาที)
```css
/* ตัวอย่างที่ต้องสร้าง */
.progress-bar {
    background: #e2e8f0;
    border-radius: 10px;
    height: 8px;
    overflow: hidden;
}

.progress {
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    height: 100%;
    width: 0;
    transition: width 2s ease-in-out;
    border-radius: 10px;
}

.progress.animate {
    width: attr(data-width); /* ใช้ JavaScript ตั้งค่า */
}
```

#### 2. Project Cards พร้อม Hover Effects (60 นาที)
สร้าง Grid Layout และ Card Animations

#### 3. Timeline Animation (45 นาที)
สร้าง Timeline แนวตั้งพร้อม Scroll Animations

#### 4. Contact Form Styling (30 นาที)
สร้าง Form ที่สวยงามพร้อม Validation States

#### 5. Dark Mode Variables (30 นาที)
ปรับ CSS Variables ให้รองรับ Dark Mode

### ✅ ผลลัพธ์ที่ต้องได้:
- Dark/Light Mode ทำงานได้
- Smooth Animations ทุก Section
- Professional Color Scheme
- Responsive Design ครบทุกอุปกรณ์
- Hover Effects ที่น่าประทับใจ

---

## 📱 ส่วนที่ 3: Advanced Responsive & Animations
### ⏰ เวลาประมาณ: 2 ชั่วโมง

### 🎯 เป้าหมาย:
สร้าง JavaScript Interactions และ Advanced Responsive Design

### 🚀 โค้ดเริ่มต้น:

#### ไฟล์: `script.js`
```javascript
// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('checkbox');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.checked = savedTheme === 'dark-mode';
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
const textArray = [
    'Software Engineering Student',
    'Web Developer',
    'Problem Solver',
    'Tech Enthusiast'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', typeWriter);

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate progress bars
            if (entry.target.classList.contains('skills')) {
                animateProgressBars();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== สิ่งที่ต้องเพิ่มเอง ====================

// TODO 1: สร้าง animateProgressBars() function
function animateProgressBars() {
    // เขียน code ให้ progress bars เคลื่อนไหว
    // ใช้ data-width attribute ใน HTML
}

// TODO 2: สร้าง Project Filter System
function initProjectFilter() {
    // สร้างระบบกรองโปรเจคตาม category
    // ให้มี buttons: All, Web, Mobile, Design
}

// TODO 3: สร้าง Contact Form Validation
function initContactForm() {
    // สร้าง form validation
    // ตรวจสอบ: name, email, message
    // แสดง success/error messages
}

// TODO 4: สร้าง Mobile Menu Toggle
function initMobileMenu() {
    // สร้างเมนูมือถือที่เปิด/ปิดได้
    // ใช้ hamburger button
}

// TODO 5: สร้าง Smooth Scroll to Top
function initScrollToTop() {
    // สร้างปุ่ม scroll to top
    // แสดงเมื่อ scroll ลงมาเกิน 500px
}

// TODO 6: สร้าง Parallax Effect
function initParallaxEffect() {
    // สร้าง parallax effect สำหรับ hero section
    // หรือ background elements
}
```

### 📝 สิ่งที่ต้องทำ:

#### 1. Progress Bars Animation (30 นาที)
```javascript
// ตัวอย่างที่ต้องเขียนเอง
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}
```

#### 2. Project Filter System (45 นาที)
สร้างระบบกรองโปรเจคแบบ Interactive

#### 3. Contact Form Validation (30 นาที)
สร้าง Real-time Validation

#### 4. Mobile Menu (15 นาที)
สร้าง Hamburger Menu สำหรับมือถือ

#### 5. Advanced Animations (30 นาที)
เพิ่ม Parallax หรือ Scroll Effects

### ✅ ผลลัพธ์ที่ต้องได้:
- Dark/Light Mode Toggle ทำงานได้
- Typing Animation ใน Hero
- Progress Bars เคลื่อนไหวเมื่อ Scroll
- Project Filter ทำงานได้
- Contact Form มี Validation
- Mobile Menu ใช้งานได้
- Smooth Animations ทุก Section

---

## 🎯 ผลลัพธ์สุดท้ายที่คาดหวัง

### 📸 หน้าตาเว็บไซต์ที่ต้องได้:

#### 1. **Hero Section**
```
+------------------------------------------+
|  [LOGO]     [MENU]     [DARK/LIGHT]    |
+------------------------------------------+
|                                          |
|  สวัสดี, ฉันคือ [ชื่อ]                     |
|  [TYPING ANIMATION]                      |
|  [คำอธิบาย]                               |
|  [ปุ่ม: ดูผลงาน] [ปุ่ม: ติดต่อ]           |
|                           [รูปโปรไฟล์]    |
+------------------------------------------+
```

#### 2. **Skills Section พร้อม Progress Bars**
```
+------------------------------------------+
|             ทักษะและความสามารถ            |
|                                          |
| Programming Languages:                   |
| Python     ████████░░ 75%               |
| JavaScript ██████░░░░ 60%               |
| Java       █████░░░░░ 50%               |
|                                          |
| Web Technologies:                        |
| HTML/CSS   ██████████ 90%               |
| React      ████░░░░░░ 40%               |
+------------------------------------------+
```

#### 3. **Project Gallery พร้อม Filter**
```
+------------------------------------------+
|                 ผลงานของฉัน              |
|                                          |
| [All] [Web] [Mobile] [Design]           |
|                                          |
| +-------+ +-------+ +-------+ +-------+ |
| |Project| |Project| |Project| |Project| |
| |   1   | |   2   | |   3   | |   4   | |
| +-------+ +-------+ +-------+ +-------+ |
+------------------------------------------+
```

#### 4. **Education Timeline**
```
+------------------------------------------+
|               ประวัติการศึกษา             |
|                                          |
|  2024 ● ปัจจุบัน                         |
|       | มหาวิทยาลัย...                   |
|       |                                  |
|  2021 ● มัธยมศึกษาตอนปลาย                |
|       | โรงเรียน...                     |
|       |                                  |
|  2018 ● มัธยมศึกษาตอนต้น                 |
+------------------------------------------+
```

#### 5. **Contact Form**
```
+------------------------------------------+
|                ติดต่อฉัน                  |
|                                          |
| [ชื่อ: _________________]                |
| [อีเมล: _______________]                |
| [ข้อความ: _____________]                |
| [      _____________    ]                |
| [      _____________    ]                |
|                                          |
|           [ส่งข้อความ]                   |
+------------------------------------------+
```

### 🌟 ฟีเจอร์พิเศษที่ต้องมี:

#### 1. **Animations & Effects:**
- Hero text typing animation
- Progress bars เคลื่อนไหวเมื่อ scroll เข้า section
- Cards hover effects
- Smooth page transitions
- Parallax background (ถ้าทำได้)

#### 2. **Interactive Elements:**
- Dark/Light mode toggle
- Mobile hamburger menu
- Project filter buttons
- Contact form validation
- Scroll to top button
- Active navigation highlighting

#### 3. **Responsive Design:**
- Mobile: 1 column layout
- Tablet: 2 column layout  
- Desktop: 3+ column layout
- Navigation แปลงเป็น hamburger บนมือถือ

---

## 📊 เกณฑ์การให้คะแนน (100 คะแนน)

### HTML Structure (25 คะแนน)
- [ ] โครงสร้าง Semantic HTML5 ถูกต้อง (5 คะแนน)
- [ ] Hero Section สมบูรณ์ (5 คะแนน)
- [ ] About Section ครบถ้วน (3 คะแนน)
- [ ] Skills Section พร้อม Progress Bars (4 คะแนน)
- [ ] Projects Gallery (4 คะแนน)
- [ ] Education Timeline (2 คะแนน)
- [ ] Contact Form (2 คะแนน)

### CSS Styling (35 คะแนน)
- [ ] CSS Variables และ Dark Mode (8 คะแนน)
- [ ] Navigation Design และ Effects (7 คะแนน)
- [ ] Hero Section Styling (6 คะแนน)
- [ ] Skills Progress Bars Design (5 คะแนน)
- [ ] Project Cards Design (4 คะแนน)
- [ ] Timeline Design (3 คะแนน)
- [ ] Contact Form Styling (2 คะแนน)

### JavaScript Functionality (25 คะแนน)
- [ ] Dark/Light Mode Toggle (6 คะแนน)
- [ ] Typing Animation (5 คะแนน)
- [ ] Progress Bars Animation (4 คะแนน)
- [ ] Project Filter System (4 คะแนน)
- [ ] Contact Form Validation (3 คะแนน)
- [ ] Mobile Menu Toggle (2 คะแนน)
- [ ] Scroll Effects (1 คะแนน)

### Responsive Design (10 คะแนน)
- [ ] Mobile Design (4 คะแนน)
- [ ] Tablet Design (3 คะแนน)
- [ ] Desktop Design (2 คะแนน)
- [ ] Cross-browser Compatibility (1 คะแนน)

### Bonus Points (5 คะแนน)
- [ ] เพิ่มฟีเจอร์พิเศษ (Parallax, Advanced Animations) (2 คะแนน)
- [ ] ความคิดสร้างสรรค์ในการออกแบบ (2 คะแนน)
- [ ] Code Quality และ Organization (1 คะแนน)

---

## 🚀 การส่งงาน

### ขั้นตอนการส่งงาน:

#### 1. สร้าง GitHub Repository
```bash
# สร้าง repo ใหม่ชื่อ "advanced-portfolio"
git init
git add .
git commit -m "Complete Advanced Portfolio Website"
git remote add origin https://github.com/[username]/advanced-portfolio.git
git push -u origin main
```

#### 2. เปิดใช้ GitHub Pages
- Settings → Pages → Source: "Deploy from a branch"
- Branch: "main" → Save

#### 3. สร้าง README.md
```markdown
# My Advanced Portfolio Website

## ✨ Features
- Dark/Light Mode Toggle
- Responsive Design
- Typing Animation
- Skills Progress Bars
- Project Gallery with Filter
- Contact Form with Validation

## 🛠️ Technologies Used
- HTML5
- CSS3 (Variables, Flexbox, Grid, Animations)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

## 📱 Live Demo
[View Live Website](https://[username].github.io/advanced-portfolio)

## 📸 Screenshots
[เพิ่มรูปภาพหน้าเว็บ]
```

### 📋 สิ่งที่ต้องส่ง:
1. **GitHub Repository URL:** `https://github.com/[username]/advanced-portfolio`
2. **Live Website URL:** `https://[username].github.io/advanced-portfolio`
3. **Video Demo (1-2 นาที):** แสดงฟีเจอร์ต่างๆ ของเว็บไซต์
4. **สกรีนช็อต:** หน้าเว็บบนมือถือ, แท็บเล็ต, และคอมพิวเตอร์

---

## 💡 เคล็ดลับความสำเร็จ

### 🎯 การวางแผน:
1. **อ่านโจทย์ทั้งหมดก่อน** ทำความเข้าใจภาพรวม
2. **ทำทีละส่วน** เริ่มจาก HTML → CSS → JavaScript
3. **ทดสอบบ่อยๆ** ใช้ Live Server ตลอดเวลา
4. **Commit บ่อยๆ** เพื่อ backup โค้ด

### 🔧 การแก้ปัญหา:
1. **ใช้ Developer Tools** ตรวจสอบ Console errors
2. **ทดสอบทีละฟีเจอร์** ไม่ควรทำหลายอย่างพร้อมกัน
3. **อ่าน Documentation** MDN, W3Schools
4. **ถามเมื่อติดขัด** อย่าใช้เวลามากกับปัญหาเดียว

### 🎨 การออกแบบ:
1. **ดูตัวอย่าง** จากเว็บไซต์ Portfolio อื่นๆ
2. **เลือกสีที่เข้ากัน** ใช้ Color Palette Tools
3. **ใช้ฟอนต์ที่อ่านง่าย** Google Fonts
4. **เว้นระยะห่างที่เหมาะสม** whitespace สำคัญ

### 📱 Responsive Design:
1. **ทดสอบทุกขนาด** Mobile, Tablet, Desktop
2. **ใช้ relative units** %, em, rem, vw, vh
3. **ทดสอบบนอุปกรณ์จริง** ไม่เพียงแค่ Dev Tools

---

## 🏆 เป้าหมายการเรียนรู้

หลังจากทำการบ้านนี้เสร็จ คุณจะได้:

### 🎓 ทักษะที่ได้รับ:
- **HTML5 Semantic Elements** การใช้ tags ที่มีความหมาย
- **Advanced CSS** Variables, Animations, Flexbox, Grid
- **JavaScript DOM Manipulation** การควบคุม elements
- **Responsive Design** การทำเว็บให้รองรับทุกอุปกรณ์
- **Git/GitHub Workflow** การใช้ version control
- **Web Design Principles** หลักการออกแบบที่ดี

### 💼 Portfolio Piece:
- เว็บไซต์ Portfolio ที่ใช้งานได้จริง
- ผลงานที่ใส่ใน Resume ได้
- ประสบการณ์การพัฒนาเว็บแบบครบวงจร

### 🚀 ความพร้อมสำหรับ:
- วันที่ 2: JavaScript เพิ่มเติม
- วันที่ 3: React.js Framework
- การสมัครงาน Internship
- โปรเจคส่วนตัวในอนาคต

---

## 📅 Timeline แนะนำ

### วันที่ 1-2: HTML & Basic CSS (3-4 ชั่วโมง)
- สร้างโครงสร้าง HTML ทั้งหมด
- เขียน CSS พื้นฐาน Navigation และ Hero

### วันที่ 3-4: Advanced CSS (3-4 ชั่วโมง)  
- Skills Section พร้อม Progress Bars
- Projects Gallery และ Timeline
- Dark Mode และ Responsive Design

### วันที่ 5-6: JavaScript & Polish (2-3 ชั่วโมง)
- เพิ่ม Animations และ Interactions
- Contact Form Validation
- Testing และ Bug fixes

### วันที่ 7: Deployment & Documentation
- GitHub Pages setup
- README.md
- Video Demo และ Screenshots

**รวมเวลา: 8-12 ชั่วโมง (แบ่งทำ 7 วัน)**

---

**✨ ขอให้สนุกกับการสร้างเว็บไซต์ Professional Portfolio แรกของคุณ!**

**🎯 เป้าหมาย: สร้างเว็บไซต์ที่คุณภูมิใจแสดงให้คนอื่นดู!**