import FavoriteButton from './FavoriteButton';

function RestaurantCard({ restaurant, onSelect }) {
  const handleCardClick = (e) => {
    // ไม่ให้เปิดรายละเอียดเมื่อคลิกปุ่ม favorite
    if (e.target.closest('.favorite-button')) {
      return;
    }
    onSelect(restaurant);
  };

  return (
    <div className="restaurant-card" onClick={handleCardClick}>
      <div className="restaurant-image">
        {restaurant.image ? (
          <img src={restaurant.image} alt={restaurant.name} />
        ) : (
          <div className="no-image">
            <span>🍽️</span>
          </div>
        )}
        <FavoriteButton restaurant={restaurant} />
      </div>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-type">{restaurant.type}</p>
        <p className="restaurant-address">{restaurant.address}</p>
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
  );
}

export default RestaurantCard;