import { useState } from 'react';
import { addReview } from '../services/api-static.js';

function ReviewForm({ restaurantId, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    userName: '',
    rating: 5,
    comment: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.userName.length < 2 || formData.userName.length > 50) {
      setError('ชื่อผู้ใช้ต้องมีความยาว 2-50 ตัวอักษร');
      return;
    }
    
    if (formData.comment.length < 10 || formData.comment.length > 500) {
      setError('ความคิดเห็นต้องมีความยาว 10-500 ตัวอักษร');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const reviewData = {
        restaurantId,
        userName: formData.userName.trim(),
        rating: parseInt(formData.rating),
        comment: formData.comment.trim()
      };

      await addReview(reviewData);
      
      setFormData({
        userName: '',
        rating: 5,
        comment: ''
      });
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งรีวิว');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'กำลังส่งรีวิว...' : 'ส่งรีวิว'}
      </button>
    </form>
  );
}

export default ReviewForm;