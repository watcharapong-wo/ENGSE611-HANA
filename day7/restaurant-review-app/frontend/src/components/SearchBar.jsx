import { useState, useEffect } from 'react';

function SearchBar({ onSearch, placeholder = "ค้นหาร้านอาหาร..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]); // ลบ onSearch ออกจาก dependency เพื่อป้องกัน infinite loop

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="search-input"
      />
      {searchTerm && (
        <button 
          type="button" 
          onClick={handleClear}
          className="clear-button"
          title="ล้างการค้นหา"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;