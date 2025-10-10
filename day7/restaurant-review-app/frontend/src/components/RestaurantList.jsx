import { useState, useEffect, useCallback } from 'react';
import RestaurantCard from './RestaurantCard.jsx';
import SearchBar from './SearchBar.jsx';
import FilterPanel from './FilterPanel.jsx';
import { getRestaurants } from '../services/api-static.js';

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: '',
    priceRange: ''
  });

  // useEffect เพื่อ fetch ข้อมูลเมื่อ filters เปลี่ยน
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getRestaurants(filters);
        setRestaurants(result);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [filters.search, filters.category, filters.minRating, filters.priceRange]);

  // ...existing code...

  // handleSearch
  const handleSearch = useCallback((searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, []);

  // handleFilterChange
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return (
    <div className="restaurant-list">
      <div className="search-and-filters">
        <SearchBar onSearch={handleSearch} />
        <FilterPanel onFilterChange={handleFilterChange} filters={filters} />
      </div>
      
      {loading && <div className="loading">กำลังโหลด...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <>
          {restaurants.length === 0 ? (
            <p className="no-results">ไม่พบร้านอาหารที่ค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ</p>
          ) : (
            <div className="restaurants-grid">
              {restaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={onSelectRestaurant}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantList;