const API_URL = 'http://localhost:3001/api';

export const getRestaurants = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.search) {
    queryParams.append('search', filters.search);
  }
  if (filters.category) {
    queryParams.append('category', filters.category);
  }
  if (filters.priceRange) {
    queryParams.append('priceRange', filters.priceRange);
  }
  if (filters.rating) {
    queryParams.append('rating', filters.rating);
  }

  const url = queryParams.toString() 
    ? `${API_URL}/restaurants?${queryParams.toString()}`
    : `${API_URL}/restaurants`;

  const response = await fetch(url);
  return response.json();
};

export const getRestaurantById = async (id) => {
  const response = await fetch(`${API_URL}/restaurants/${id}`);
  return response.json();
};

export const addReview = async (reviewData) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  return response.json();
};