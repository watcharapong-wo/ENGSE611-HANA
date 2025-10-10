import { useState } from 'react';
import { addReview } from '../services/api-static.js';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import ImageUploader from './ImageUploader';

function ReviewForm({ restaurantId, onReviewSubmitted }) {
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError, showWarning } = useNotification();
  const [formData, setFormData] = useState({
    userName: user?.name || '',
    rating: 5,
    comment: '',
    images: [] // เพิ่มรองรับรูปภาพ
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ฟังก์ชันจัดการรูปภาพ
  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showWarning('กรุณาเข้าสู่ระบบก่อนเขียนรีวิว');
      return;
    }
    
    if (formData.userName.length < 2 || formData.userName.length > 50) {
      showError('ชื่อผู้ใช้ต้องมีความยาว 2-50 ตัวอักษร');
      return;
    }
    
    if (formData.comment.length < 10 || formData.comment.length > 500) {
      showError('ความคิดเห็นต้องมีความยาว 10-500 ตัวอักษร');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const reviewData = {
        restaurantId,
        userName: formData.userName.trim(),
        rating: parseInt(formData.rating),
        comment: formData.comment.trim(),
        images: formData.images, // เพิ่มรูปภาพ
        userId: user?.id || null
      };

      await addReview(reviewData);
      
      // แสดงการแจ้งเตือนสำเร็จ
      showSuccess(
        `ขอบคุณสำหรับรีวิว ${formData.rating} ดาว! รีวิวของคุณจะช่วยให้ผู้อื่นตัดสินใจได้ดีขึ้น`,
        { duration: 5000 }
      );
      
      setFormData({
        userName: user?.name || '',
        rating: 5,
        comment: '',
        images: [] // รีเซ็ตรูปภาพ
      });
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
    } catch (err) {
      const errorMessage = err.message || 'เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองอีกครั้ง';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      {!isAuthenticated && (
        <div className="auth-warning">
          <p>⚠️ กรุณาเข้าสู่ระบบเพื่อเขียนรีวิว</p>
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="userName">ชื่อผู้รีวิว</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          placeholder="กรุณากรอกชื่อของคุณ"
          className="form-input"
          required
          disabled={loading || !isAuthenticated}
          readOnly={isAuthenticated} // ถ้า login แล้วให้ใช้ชื่อจาก profile
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">คะแนน</label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          className="form-select"
          disabled={loading || !isAuthenticated}
        >
          <option value={1}>⭐ 1 ดาว</option>
          <option value={2}>⭐⭐ 2 ดาว</option>
          <option value={3}>⭐⭐⭐ 3 ดาว</option>
          <option value={4}>⭐⭐⭐⭐ 4 ดาว</option>
          <option value={5}>⭐⭐⭐⭐⭐ 5 ดาว</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="comment">ความคิดเห็น</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          placeholder="บอกเล่าประสบการณ์การรับประทานอาหารของคุณ..."
          className="form-textarea"
          rows="4"
          required
          disabled={loading || !isAuthenticated}
        />
      </div>

      {/* Image Uploader Section */}
      <div className="form-group">
        <label>📸 รูปภาพประกอบรีวิว (ไม่บังคับ)</label>
        <ImageUploader 
          images={formData.images}
          onChange={handleImagesChange}
          disabled={loading || !isAuthenticated}
          maxImages={3}
        />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading || !isAuthenticated}
      >
        {loading ? 'กำลังส่งรีวิว...' : isAuthenticated ? 'ส่งรีวิว' : 'กรุณาเข้าสู่ระบบ'}
      </button>
    </form>
  );
}

export default ReviewForm;