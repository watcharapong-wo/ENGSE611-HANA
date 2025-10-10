import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (user && favorites.length >= 0) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = (restaurant) => {
    if (!user) {
      showError('กรุณาเข้าสู่ระบบเพื่อบันทึกร้านโปรด');
      return false;
    }

    if (isFavorite(restaurant.id)) {
      showError('ร้านนี้อยู่ในรายการโปรดแล้ว');
      return false;
    }

    const favoriteItem = {
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      priceRange: restaurant.priceRange,
      image: restaurant.image,
      addedAt: new Date().toISOString()
    };

    setFavorites(prev => [...prev, favoriteItem]);
    showSuccess(`เพิ่ม "${restaurant.name}" ในรายการโปรดแล้ว`);
    return true;
  };

  const removeFromFavorites = (restaurantId) => {
    if (!user) {
      showError('กรุณาเข้าสู่ระบบ');
      return false;
    }

    const restaurant = favorites.find(fav => fav.id === restaurantId);
    setFavorites(prev => prev.filter(fav => fav.id !== restaurantId));
    
    if (restaurant) {
      showSuccess(`ลบ "${restaurant.name}" จากรายการโปรดแล้ว`);
    }
    return true;
  };

  const toggleFavorite = (restaurant) => {
    if (!user) {
      showError('กรุณาเข้าสู่ระบบเพื่อบันทึกร้านโปรด');
      return false;
    }

    if (isFavorite(restaurant.id)) {
      return removeFromFavorites(restaurant.id);
    } else {
      return addToFavorites(restaurant);
    }
  };

  const isFavorite = (restaurantId) => {
    return favorites.some(fav => fav.id === restaurantId);
  };

  const getFavoriteCount = () => {
    return favorites.length;
  };

  const clearAllFavorites = () => {
    if (!user) {
      showError('กรุณาเข้าสู่ระบบ');
      return false;
    }

    setFavorites([]);
    showSuccess('ล้างรายการโปรดทั้งหมดแล้ว');
    return true;
  };

  const getFavoritesByDate = () => {
    return [...favorites].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  };

  const getFavoritesByCuisine = (cuisine) => {
    return favorites.filter(fav => fav.cuisine === cuisine);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    clearAllFavorites,
    getFavoritesByDate,
    getFavoritesByCuisine
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;