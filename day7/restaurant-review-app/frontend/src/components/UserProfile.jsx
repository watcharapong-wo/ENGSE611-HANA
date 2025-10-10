// UserProfile.jsx - Component แสดงโปรไฟล์ผู้ใช้
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import './UserProfile.css';

const UserProfile = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useAuth();
  const { showSuccess, showInfo } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
    showSuccess('โปรไฟล์ได้รับการอัพเดทเรียบร้อยแล้ว! ✨');
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
    showInfo('ออกจากระบบเรียบร้อยแล้ว แล้วพบกันใหม่! 👋');
  };

  if (!isOpen || !user) return null;

  return (
    <div className="user-profile-overlay" onClick={onClose}>
      <div className="user-profile-content" onClick={e => e.stopPropagation()}>
        <div className="user-profile-header">
          <h2>👤 โปรไฟล์ของฉัน</h2>
          <button className="profile-close" onClick={onClose}>×</button>
        </div>

        <div className="user-profile-body">
          <div className="user-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>

          <div className="user-info">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>ชื่อ</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>อีเมล</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    💾 บันทึก
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    ❌ ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <div className="user-details">
                <h3>{user.name}</h3>
                <p className="user-email">{user.email}</p>
                <p className="user-joined">
                  📅 เข้าร่วมเมื่อ: {new Date(user.createdAt).toLocaleDateString('th-TH')}
                </p>
                
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-number">{user.reviews?.length || 0}</span>
                    <span className="stat-label">รีวิว</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{user.favoriteRestaurants?.length || 0}</span>
                    <span className="stat-label">ร้านโปรด</span>
                  </div>
                </div>

                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ แก้ไขโปรไฟล์
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="user-profile-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;