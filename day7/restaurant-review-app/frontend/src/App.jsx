import { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import './App.css';

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(id);
  };

  const handleBack = () => {
    setSelectedRestaurantId(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍜 Restaurant Review</h1>
        <p>ค้นหาและรีวิวร้านอาหารโปรดของคุณ</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <main className="app-main">
        {selectedRestaurantId ? (
          <RestaurantDetail 
            restaurantId={selectedRestaurantId}
            onBack={handleBack}
          />
        ) : (
          <RestaurantList 
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Restaurant Review App | สร้างด้วย React + Express</p>
      </footer>
    </div>
  );
}

export default App;