import { useState, useEffect, useCallback } from 'react';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import { getRestaurants } from '../services/api';

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
  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRestaurants(filters);
      setRestaurants(result.data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRestaurants]);

  // ...existing code...

  // handleSearch
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  // handleFilterChange
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="restaurant-list-container">
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} />
      
      {loading && <div className="loading">กำลังโหลด...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <>
          {restaurants.length === 0 ? (
            <p className="no-results">ไม่พบร้านอาหารที่ค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ</p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={onSelectRestaurant}
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