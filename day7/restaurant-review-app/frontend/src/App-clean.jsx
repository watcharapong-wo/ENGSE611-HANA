import { useState } from 'react';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import './App.css';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackToList = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍜 Restaurant Review</h1>
        <p>เลือกดูร้านอาหาร และเขียนรีวิว</p>
      </header>

      <main className="app-main">
        {selectedRestaurant ? (
          <RestaurantDetail 
            restaurantId={selectedRestaurant.id} 
            onBack={handleBackToList}
          />
        ) : (
          <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Restaurant Review App</p>
      </footer>
    </div>
  );
}

export default App;