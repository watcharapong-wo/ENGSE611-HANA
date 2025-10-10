

function FilterPanel({ onFilterChange, filters }) {
  const categories = ['ทั้งหมด', 'อาหารไทย', 'อาหารญี่ปุ่น', 'อาหารอิตาเลียน', 'อาหารจีน', 'ฟาสต์ฟู้ด'];

  const handleCategoryChange = (category) => {
    onFilterChange({ 
      category: category === 'ทั้งหมด' ? '' : category 
    });
  };


  // TODO: เพิ่มฟังก์ชัน handleRatingChange
  const handleRatingChange = (minRating) => {
    onFilterChange({ minRating });
  };

  // TODO: เพิ่มฟังก์ชัน handlePriceChange
  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>หมวดหมู่:</label>
        <select 
          value={filters.category || 'ทั้งหมด'}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* TODO: เพิ่ม filter สำหรับ minRating */}
      <div className="filter-group">
        <label>ช่วงราคา:</label>
        <select 
          value={filters.priceRange || ''}
          onChange={(e) => onFilterChange({ priceRange: e.target.value })}
        >
          <option value="">ทั้งหมด</option>
          <option value="1">ถูก (฿)</option>
          <option value="2">ปานกลาง (฿฿)</option>
          <option value="3">แพง (฿฿฿)</option>
        </select>
      </div>
      {/* TODO: เพิ่ม filter สำหรับ priceRange */}
      <div className="filter-group">
        <label>คะแนนเฉลี่ย:</label>
        <select 
          value={filters.minRating || ''}
          onChange={(e) => onFilterChange({ minRating: e.target.value })}
        >
          <option value="">ทั้งหมด</option>
          <option value="4">4 ดาวขึ้นไป</option>
          <option value="5">5 ดาว</option>
        </select>
      </div>
      
    </div>
  );
}

export default FilterPanel;