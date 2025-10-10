import React, { useState, useEffect, useRef } from 'react';
import './RestaurantMap.css';

const RestaurantMap = ({ 
  restaurants = [], 
  selectedRestaurant = null, 
  onRestaurantSelect = () => {},
  height = '400px',
  showControls = true,
  showSearch = false
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Default center (Bangkok)
  const defaultCenter = { lat: 13.7563, lng: 100.5018 };

  // Initialize Google Maps
  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps script if not already loaded
    const existingScript = document.getElementById('google-maps-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Create global callback
      window.initMap = () => {
        setIsMapLoaded(true);
        initializeMap();
      };

      script.onerror = () => {
        setMapError('ไม่สามารถโหลด Google Maps ได้');
      };

      document.head.appendChild(script);
    }
  }, []);

  // Initialize map instance
  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'poi.medical',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: showControls,
        streetViewControl: showControls,
        fullscreenControl: showControls
      });

      mapInstanceRef.current = map;
      setIsMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('เกิดข้อผิดพลาดในการโหลดแผนที่');
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setMapError('เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter(location);
          mapInstanceRef.current.setZoom(14);

          // Add user location marker
          new window.google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            title: 'ตำแหน่งของคุณ',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%234285f4"%3E%3Ccircle cx="12" cy="12" r="8"/%3E%3Ccircle cx="12" cy="12" r="3" fill="white"/%3E%3C/svg%3E',
              scaledSize: new window.google.maps.Size(24, 24)
            }
          });
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setMapError('ไม่สามารถเข้าถึงตำแหน่งของคุณได้');
      }
    );
  };

  // Create restaurant markers
  useEffect(() => {
    if (!mapInstanceRef.current || !restaurants.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Filter restaurants by search query
    const filteredRestaurants = restaurants.filter(restaurant =>
      !searchQuery || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Create new markers
    const bounds = new window.google.maps.LatLngBounds();
    
    filteredRestaurants.forEach((restaurant, index) => {
      // Generate location if not provided (for demo purposes)
      const position = restaurant.location || generateDemoLocation(index);

      const marker = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        icon: {
          url: selectedRestaurant?.id === restaurant.id 
            ? 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23ef4444"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E'
            : 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23dc2626"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E',
          scaledSize: new window.google.maps.Size(
            selectedRestaurant?.id === restaurant.id ? 32 : 24, 
            selectedRestaurant?.id === restaurant.id ? 32 : 24
          )
        }
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(restaurant)
      });

      // Add click listener
      marker.addListener('click', () => {
        // Close all other info windows
        markersRef.current.forEach(({ infoWindow: iw }) => iw.close());
        
        infoWindow.open(mapInstanceRef.current, marker);
        onRestaurantSelect(restaurant);
      });

      markersRef.current.push({ marker, infoWindow, restaurant });
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (filteredRestaurants.length > 0) {
      mapInstanceRef.current.fitBounds(bounds);
      
      // Don't zoom in too much for single marker
      if (filteredRestaurants.length === 1) {
        setTimeout(() => {
          if (mapInstanceRef.current.getZoom() > 16) {
            mapInstanceRef.current.setZoom(16);
          }
        }, 100);
      }
    }
  }, [restaurants, selectedRestaurant, searchQuery, onRestaurantSelect]);

  // Generate demo locations around Bangkok
  const generateDemoLocation = (index) => {
    const baseLocations = [
      { lat: 13.7563, lng: 100.5018 }, // Siam
      { lat: 13.7472, lng: 100.5345 }, // Asok
      { lat: 13.7650, lng: 100.5385 }, // Chitlom
      { lat: 13.7294, lng: 100.5214 }, // Silom
      { lat: 13.7797, lng: 100.5238 }, // Victory Monument
      { lat: 13.7458, lng: 100.5339 }, // Ploenchit
      { lat: 13.7367, lng: 100.5604 }, // Ekkamai
      { lat: 13.7147, lng: 100.5266 }, // Lumpini
    ];
    
    const base = baseLocations[index % baseLocations.length];
    
    // Add some random offset
    const offset = 0.01;
    return {
      lat: base.lat + (Math.random() - 0.5) * offset,
      lng: base.lng + (Math.random() - 0.5) * offset
    };
  };

  // Create info window content
  const createInfoWindowContent = (restaurant) => {
    return `
      <div class="map-info-window">
        <h3>${restaurant.name}</h3>
        <p class="info-type">${restaurant.type}</p>
        <p class="info-address">📍 ${restaurant.address}</p>
        ${restaurant.rating ? `
          <div class="info-rating">
            <span class="stars">${'⭐'.repeat(Math.floor(restaurant.rating))}</span>
            <span class="rating-number">(${restaurant.rating.toFixed(1)})</span>
          </div>
        ` : ''}
        ${restaurant.priceRange ? `
          <p class="info-price">💰 ${restaurant.priceRange}</p>
        ` : ''}
        <button class="info-view-btn" onclick="window.selectRestaurantFromMap('${restaurant.id}')">
          ดูรายละเอียด
        </button>
      </div>
    `;
  };

  // Set up global function for info window button
  useEffect(() => {
    window.selectRestaurantFromMap = (restaurantId) => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        onRestaurantSelect(restaurant);
      }
    };

    return () => {
      delete window.selectRestaurantFromMap;
    };
  }, [restaurants, onRestaurantSelect]);

  // Fallback map using OpenStreetMap
  const renderFallbackMap = () => (
    <div className="fallback-map">
      <div className="fallback-content">
        <h3>แผนที่ไม่พร้อมใช้งาน</h3>
        <p>กรุณาตั้งค่า Google Maps API Key ในไฟล์ .env</p>
        <div className="restaurants-list">
          <h4>รายชื่อร้านอาหาร:</h4>
          {restaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className={`restaurant-item ${selectedRestaurant?.id === restaurant.id ? 'selected' : ''}`}
              onClick={() => onRestaurantSelect(restaurant)}
            >
              <h5>{restaurant.name}</h5>
              <p>{restaurant.address}</p>
              <p>{restaurant.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (mapError || !process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return renderFallbackMap();
  }

  return (
    <div className="restaurant-map-container" style={{ height }}>
      {showSearch && (
        <div className="map-search">
          <input
            type="text"
            placeholder="ค้นหาร้านอาหาร..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="map-search-input"
          />
          <button 
            onClick={getUserLocation}
            className="location-btn"
            title="หาตำแหน่งของฉัน"
          >
            📍
          </button>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="google-map"
        style={{ height: showSearch ? 'calc(100% - 60px)' : '100%' }}
      />
      
      {!isMapLoaded && !mapError && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>กำลังโหลดแผนที่...</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMap;