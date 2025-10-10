function FilterPanel({ filters, onFilterChange }) {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleMinRatingChange = (e) => {
    onFilterChange({ minRating: e.target.value });
  };

  const handlePriceRangeChange = (e) => {
    onFilterChange({ priceRange: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({ 
      category: '', 
      minRating: '', 
      priceRange: '' 
    });
  };

  return (
    <div className="filter-panel">
      <h3>ตัวกรอง</h3>
      
      <div className="filter-group">
        <label htmlFor="category">ประเภทอาหาร:</label>
        <select 
          id="category"
          value={filters.category || ''} 
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">ทั้งหมด</option>
          <option value="อาหารไทย">อาหารไทย</option>
          <option value="อาหารอิตาเลียน">อาหารอิตาเลียน</option>
          <option value="อาหารญี่ปุ่น">อาหารญี่ปุ่น</option>
          <option value="อาหารจีน">อาหารจีน</option>
          <option value="อาหารฝรั่งเศส">อาหารฝรั่งเศส</option>
          <option value="อาหารเกาหลี">อาหารเกาหลี</option>
          <option value="อาหารอเมริกัน">อาหารอเมริกัน</option>
          <option value="เบเกอรี่">เบเกอรี่</option>
          <option value="เครื่องดื่ม">เครื่องดื่ม</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minRating">คะแนนขั้นต่ำ:</label>
        <select 
          id="minRating"
          value={filters.minRating || ''} 
          onChange={handleMinRatingChange}
          className="filter-select"
        >
          <option value="">ทั้งหมด</option>
          <option value="1">1 ดาวขึ้นไป</option>
          <option value="2">2 ดาวขึ้นไป</option>
          <option value="3">3 ดาวขึ้นไป</option>
          <option value="4">4 ดาวขึ้นไป</option>
          <option value="5">5 ดาว</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priceRange">ช่วงราคา:</label>
        <select 
          id="priceRange"
          value={filters.priceRange || ''} 
          onChange={handlePriceRangeChange}
          className="filter-select"
        >
          <option value="">ทั้งหมด</option>
          <option value="$">$ (ราคาประหยัด)</option>
          <option value="$$">$$ (ราคาปานกลาง)</option>
          <option value="$$$">$$$ (ราคาแพง)</option>
          <option value="$$$$">$$$$ (ราคาแพงมาก)</option>
        </select>
      </div>

      <button 
        type="button"
        onClick={handleClearFilters}
        className="clear-filters-btn"
      >
        ล้างตัวกรอง
      </button>
    </div>
  );
}

export default FilterPanel;