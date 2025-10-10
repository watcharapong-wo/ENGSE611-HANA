import React, { useState, useEffect } from 'react';
import RestaurantMap from './RestaurantMap';
import RestaurantDetail from './RestaurantDetail';
import { getRestaurants } from '../services/api-static';
import './MapPage.css';

const MapPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map', 'detail'

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลร้านอาหารได้');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    // Don't automatically switch to detail view on mobile
    if (window.innerWidth > 768) {
      setViewMode('detail');
    }
  };

  const handleBackToMap = () => {
    setViewMode('map');
    setSelectedRestaurant(null);
  };

  const handleViewDetail = () => {
    if (selectedRestaurant) {
      setViewMode('detail');
    }
  };

  if (loading) {
    return (
      <div className="map-page loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>กำลังโหลดข้อมูลร้านอาหาร...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-page error">
        <div className="error-container">
          <h2>เกิดข้อผิดพลาด</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="map-page">
      <div className="map-page-header">
        <h1>🗺️ แผนที่ร้านอาหาร</h1>
        <p>ค้นหาร้านอาหารใกล้เคียงและดูตำแหน่งบนแผนที่</p>
        
        {/* View Toggle (Mobile) */}
        <div className="view-toggle mobile-only">
          <button
            className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            🗺️ แผนที่
          </button>
          <button
            className={`toggle-btn ${viewMode === 'detail' ? 'active' : ''}`}
            onClick={() => setViewMode('detail')}
            disabled={!selectedRestaurant}
          >
            📋 รายละเอียด
          </button>
        </div>
      </div>

      <div className="map-page-content">
        {/* Desktop Layout */}
        <div className="desktop-layout">
          <div className="map-section">
            <div className="map-header">
              <h3>แผนที่ร้านอาหาร</h3>
              <div className="map-stats">
                พบ {restaurants.length} ร้าน
                {selectedRestaurant && (
                  <span className="selected-indicator">
                    • เลือก: {selectedRestaurant.name}
                  </span>
                )}
              </div>
            </div>
            
            <RestaurantMap
              restaurants={restaurants}
              selectedRestaurant={selectedRestaurant}
              onRestaurantSelect={handleRestaurantSelect}
              height="600px"
              showControls={true}
              showSearch={true}
            />
          </div>

          <div className="detail-section">
            {selectedRestaurant ? (
              <div className="selected-restaurant">
                <div className="selected-header">
                  <h3>ร้านที่เลือก</h3>
                  <button 
                    onClick={handleViewDetail}
                    className="view-detail-btn"
                  >
                    ดูรายละเอียดเต็ม
                  </button>
                </div>
                
                <div className="restaurant-preview">
                  <div className="preview-image">
                    {selectedRestaurant.image ? (
                      <img 
                        src={selectedRestaurant.image} 
                        alt={selectedRestaurant.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="no-image-preview">
                        <span>🍽️</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="preview-info">
                    <h4>{selectedRestaurant.name}</h4>
                    <p className="preview-type">{selectedRestaurant.type}</p>
                    <p className="preview-address">📍 {selectedRestaurant.address}</p>
                    
                    {selectedRestaurant.rating && (
                      <div className="preview-rating">
                        <span className="stars">
                          {'⭐'.repeat(Math.floor(selectedRestaurant.rating))}
                        </span>
                        <span className="rating-number">
                          ({selectedRestaurant.rating.toFixed(1)})
                        </span>
                      </div>
                    )}
                    
                    {selectedRestaurant.priceRange && (
                      <div className="preview-price">
                        💰 {selectedRestaurant.priceRange}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <div className="no-selection-content">
                  <span className="no-selection-icon">📍</span>
                  <h3>เลือกร้านอาหารบนแผนที่</h3>
                  <p>คลิกที่หมุดบนแผนที่เพื่อดูข้อมูลร้านอาหาร</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="mobile-layout">
          {viewMode === 'map' ? (
            <div className="mobile-map">
              <RestaurantMap
                restaurants={restaurants}
                selectedRestaurant={selectedRestaurant}
                onRestaurantSelect={handleRestaurantSelect}
                height="70vh"
                showControls={true}
                showSearch={true}
              />
              
              {selectedRestaurant && (
                <div className="mobile-selected-banner">
                  <div className="banner-content">
                    <div className="banner-info">
                      <h4>{selectedRestaurant.name}</h4>
                      <p>{selectedRestaurant.type}</p>
                    </div>
                    <button 
                      onClick={handleViewDetail}
                      className="banner-detail-btn"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mobile-detail">
              {selectedRestaurant && (
                <RestaurantDetail 
                  restaurantId={selectedRestaurant.id}
                  onBack={handleBackToMap}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;