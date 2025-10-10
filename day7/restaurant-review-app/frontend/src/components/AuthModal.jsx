// AuthModal.jsx - Modal สำหรับ Login และ Register
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();

  // รีเซ็ตฟอร์มเมื่อปิด modal
  const handleClose = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setMode('login');
    onClose();
  };

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // ล้าง error เมื่อผู้ใช้พิมพ์
  };

  // ตรวจสอบความถูกต้องของข้อมูล
  const validateForm = () => {
    if (mode === 'register') {
      if (!formData.name.trim()) {
        setError('กรุณาใส่ชื่อ');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('รหัสผ่านไม่ตรงกัน');
        return false;
      }
      if (formData.password.length < 6) {
        setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        return false;
      }
    }
    
    if (!formData.email.trim()) {
      setError('กรุณาใส่อีเมล');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('กรุณาใส่รหัสผ่าน');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง');
      return false;
    }

    return true;
  };

  // จัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        showSuccess(`ยินดีต้อนรับกลับ! 🎉`, { duration: 3000 });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        showSuccess(`ยินดีต้อนรับสู่ Restaurant Review! 🎊 ขอบคุณที่เข้าร่วมกับเรา`, { duration: 4000 });
      }
      handleClose();
    } catch (error) {
      setError(error.message);
      showError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // เปลี่ยนโหมดระหว่าง login และ register
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{mode === 'login' ? '🔐 เข้าสู่ระบบ' : '📝 สมัครสมาชิก'}</h2>
          <button className="auth-modal-close" onClick={handleClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="name">ชื่อ</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="กรุณาใส่ชื่อของคุณ"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="กรุณาใส่อีเมลของคุณ"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="กรุณาใส่รหัสผ่าน"
              required
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="กรุณาใส่รหัสผ่านอีกครั้ง"
                required
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? '⏳ กำลังดำเนินการ...' : (mode === 'login' ? '🚀 เข้าสู่ระบบ' : '✨ สมัครสมาชิก')}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? (
            <p>ยังไม่มีบัญชี? <button type="button" onClick={toggleMode} className="toggle-btn">สมัครสมาชิก</button></p>
          ) : (
            <p>มีบัญชีแล้ว? <button type="button" onClick={toggleMode} className="toggle-btn">เข้าสู่ระบบ</button></p>
          )}
        </div>

        <div className="auth-demo">
          <p>🧪 <strong>Demo Account:</strong></p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;