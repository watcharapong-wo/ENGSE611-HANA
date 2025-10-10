import { useState, useEffect } from 'react';
import { getRestaurantById, getRestaurantReviews } from '../services/api-static.js';
import ReviewForm from './ReviewForm';

function RestaurantDetail({ restaurantId, onBack }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getRestaurantById(restaurantId);
        setRestaurant(result);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลร้านอาหารได้');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurant();
    }
  }, [restaurantId]);

  const handleReviewSubmitted = () => {
    const fetchRestaurant = async () => {
      try {
        const result = await getRestaurantById(restaurantId);
        setRestaurant(result);
      } catch (err) {
        console.error('Error refreshing restaurant data:', err);
      }
    };
    fetchRestaurant();
  };

  if (loading) {
    return (
      <div className="loading">
        <p>กำลังโหลดข้อมูลร้านอาหาร...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={onBack} className="back-btn">กลับ</button>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="error">
        <p>ไม่พบข้อมูลร้านอาหาร</p>
        <button onClick={onBack} className="back-btn">กลับ</button>
      </div>
    );
  }

  return (
    <div className="restaurant-detail">
      <button onClick={onBack} className="back-btn">← กลับ</button>
      
      <div className="restaurant-info-detail">
        <div className="restaurant-image">
          {restaurant.image ? (
            <img src={restaurant.image} alt={restaurant.name} />
          ) : (
            <div className="no-image">
              <span>🍽️</span>
            </div>
          )}
        </div>
        
        <div className="restaurant-details">
          <h1>{restaurant.name}</h1>
          <p className="restaurant-type">{restaurant.type}</p>
          <p className="restaurant-address">📍 {restaurant.address}</p>
          {restaurant.rating && (
            <div className="restaurant-rating">
              <span className="stars">
                {'⭐'.repeat(Math.floor(restaurant.rating))}
              </span>
              <span className="rating-number">({restaurant.rating.toFixed(1)})</span>
            </div>
          )}
          {restaurant.priceRange && (
            <div className="price-range">
              <span>ราคา: {restaurant.priceRange}</span>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h2>รีวิว</h2>
        {restaurant.reviews && restaurant.reviews.length > 0 ? (
          <div className="reviews-list">
            {restaurant.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <strong>{review.userName}</strong>
                  <span className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <small className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('th-TH')}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p>ยังไม่มีรีวิว</p>
        )}

        <div className="add-review-section">
          <h3>เพิ่มรีวิว</h3>
          <ReviewForm 
            restaurantId={restaurantId} 
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;