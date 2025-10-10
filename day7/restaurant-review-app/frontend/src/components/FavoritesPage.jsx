import React, { useState, useMemo } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import FavoriteButton from './FavoriteButton';
import './FavoritesPage.css';

const FavoritesPage = ({ onNavigateToHome, onSelectRestaurant }) => {
  const { favorites, getFavoritesByDate, clearAllFavorites } = useFavorites();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState('date'); // 'date', 'name', 'rating', 'cuisine'
  const [filterByCuisine, setFilterByCuisine] = useState('all');

  // Get unique cuisines from favorites
  const cuisines = useMemo(() => {
    const uniqueCuisines = [...new Set(favorites.map(fav => fav.cuisine))];
    return uniqueCuisines.sort();
  }, [favorites]);

  // Sort and filter favorites
  const sortedAndFilteredFavorites = useMemo(() => {
    let filtered = favorites;

    // Filter by cuisine
    if (filterByCuisine !== 'all') {
      filtered = filtered.filter(fav => fav.cuisine === filterByCuisine);
    }

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'th');
        case 'rating':
          return b.rating - a.rating;
        case 'cuisine':
          return a.cuisine.localeCompare(b.cuisine, 'th');
        case 'date':
        default:
          return new Date(b.addedAt) - new Date(a.addedAt);
      }
    });
  }, [favorites, sortBy, filterByCuisine]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  if (!user) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="not-logged-in">
            <div className="not-logged-in-content">
              <h2>เข้าสู่ระบบเพื่อดูร้านโปรด</h2>
              <p>กรุณาเข้าสู่ระบบเพื่อบันทึกและดูรายการร้านอาหารโปรดของคุณ</p>
              <button 
                onClick={onNavigateToHome} 
                className="btn btn-primary"
              >
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1>ร้านอาหารโปรด</h1>
          <p className="favorites-count">
            คุณมีร้านโปรด {favorites.length} ร้าน
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-favorites-content">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="empty-heart-icon"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2>ยังไม่มีร้านโปรด</h2>
              <p>เริ่มสำรวจและเพิ่มร้านอาหารที่ชื่นชอบในรายการโปรดของคุณ</p>
              <button 
                onClick={onNavigateToHome} 
                className="btn btn-primary"
              >
                สำรวจร้านอาหาร
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="favorites-controls">
              <div className="filter-sort-controls">
                <div className="control-group">
                  <label htmlFor="cuisine-filter">กรองตามประเภท:</label>
                  <select
                    id="cuisine-filter"
                    value={filterByCuisine}
                    onChange={(e) => setFilterByCuisine(e.target.value)}
                    className="form-select"
                  >
                    <option value="all">ทุกประเภท</option>
                    {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="sort-by">เรียงตาม:</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select"
                  >
                    <option value="date">วันที่เพิ่ม (ล่าสุด)</option>
                    <option value="name">ชื่อร้าน (ก-ฮ)</option>
                    <option value="rating">คะแนน (สูง-ต่ำ)</option>
                    <option value="cuisine">ประเภทอาหาร</option>
                  </select>
                </div>
              </div>

              {favorites.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className="btn btn-outline-danger btn-sm"
                  title="ล้างรายการโปรดทั้งหมด"
                >
                  ล้างทั้งหมด
                </button>
              )}
            </div>

            {/* Results Info */}
            <div className="results-info">
              แสดงผล {sortedAndFilteredFavorites.length} จาก {favorites.length} ร้าน
            </div>

            {/* Favorites Grid */}
            <div className="favorites-grid">
              {sortedAndFilteredFavorites.map((favorite) => (
                <div key={favorite.id} className="favorite-card">
                <div 
                  className="favorite-card-link"
                  onClick={() => onSelectRestaurant && onSelectRestaurant(favorite)}
                  style={{ cursor: 'pointer' }}
                >
                    <div className="favorite-card-image">
                      {favorite.image ? (
                        <img 
                          src={favorite.image} 
                          alt={favorite.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="no-image-placeholder">
                          <span>ไม่มีรูปภาพ</span>
                        </div>
                      )}
                      <div className="favorite-card-overlay">
                        <FavoriteButton 
                          restaurant={favorite} 
                          className="overlay-favorite-btn"
                        />
                      </div>
                    </div>

                    <div className="favorite-card-content">
                      <h3 className="favorite-card-title">{favorite.name}</h3>
                      
                      <div className="favorite-card-info">
                        <div className="rating">
                          {renderStars(favorite.rating)}
                          <span className="rating-number">({favorite.rating})</span>
                        </div>
                        
                        <div className="cuisine-price">
                          <span className="cuisine">{favorite.cuisine}</span>
                          <span className="price-range">{favorite.priceRange}</span>
                        </div>
                      </div>

                      <div className="added-date">
                        เพิ่มเมื่อ: {formatDate(favorite.addedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;