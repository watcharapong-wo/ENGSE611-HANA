import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import './FavoriteButton.css';

const FavoriteButton = ({ restaurant, className = '', size = 'medium' }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(restaurant);
  };

  const isRestaurantFavorite = isFavorite(restaurant.id);

  return (
    <button
      className={`favorite-button ${className} ${size} ${isRestaurantFavorite ? 'favorited' : ''} ${!user ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={!user}
      title={
        !user 
          ? 'กรุณาเข้าสู่ระบบเพื่อบันทึกร้านโปรด'
          : isRestaurantFavorite 
            ? 'ลบจากรายการโปรด' 
            : 'เพิ่มในรายการโปรด'
      }
      aria-label={
        isRestaurantFavorite 
          ? `ลบ ${restaurant.name} จากรายการโปรด` 
          : `เพิ่ม ${restaurant.name} ในรายการโปรด`
      }
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="heart-icon"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={isRestaurantFavorite ? 'currentColor' : 'none'}
          className="heart-path"
        />
      </svg>
      {size === 'large' && (
        <span className="favorite-text">
          {isRestaurantFavorite ? 'ลบจากโปรด' : 'เพิ่มในโปรด'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;