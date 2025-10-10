import { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import FavoritesPage from './components/FavoritesPage';
import MapPage from './components/MapPage';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import './App.css';

// AppContent component ที่มี access ถึง Auth context
function AppContent() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'favorites', 'map'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  const { user, isAuthenticated } = useAuth();

  // ตรวจสอบ theme ที่บันทึกไว้ใน localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackToList = () => {
    setSelectedRestaurant(null);
    setCurrentView('home');
  };

  const handleNavigateToFavorites = () => {
    setCurrentView('favorites');
    setSelectedRestaurant(null);
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
    setSelectedRestaurant(null);
  };

  const handleNavigateToMap = () => {
    setCurrentView('map');
    setSelectedRestaurant(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1 
              className="app-title" 
              onClick={handleNavigateToHome}
              style={{ cursor: 'pointer' }}
            >
              🍜 Restaurant Review
            </h1>
            <p>เลือกดูร้านอาหาร และเขียนรีวิว</p>
          </div>
          
          <div className="header-actions">
            <nav className="nav-menu">
              <button
                className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
                onClick={handleNavigateToHome}
              >
                🏠 หน้าหลัก
              </button>
              <button
                className={`nav-button ${currentView === 'favorites' ? 'active' : ''}`}
                onClick={handleNavigateToFavorites}
                disabled={!isAuthenticated}
                title={!isAuthenticated ? 'กรุณาเข้าสู่ระบบเพื่อดูรายการโปรด' : 'ร้านอาหารโปรด'}
              >
                ❤️ ร้านโปรด
              </button>
              <button
                className={`nav-button ${currentView === 'map' ? 'active' : ''}`}
                onClick={handleNavigateToMap}
              >
                🗺️ แผนที่
              </button>
            </nav>
            
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <div className="user-section">
                <button 
                  className="user-avatar-btn"
                  onClick={() => setShowUserProfile(true)}
                  title="โปรไฟล์ของฉัน"
                >
                  <img src={user.avatar} alt={user.name} />
                  <span>สวัสดี, {user.name}</span>
                </button>
              </div>
            ) : (
              <button 
                className="login-btn"
                onClick={() => setShowAuthModal(true)}
              >
                🔐 เข้าสู่ระบบ
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        {selectedRestaurant ? (
          <RestaurantDetail 
            restaurantId={selectedRestaurant.id} 
            onBack={handleBackToList}
          />
        ) : currentView === 'favorites' ? (
          <FavoritesPage 
            onNavigateToHome={handleNavigateToHome}
            onSelectRestaurant={handleSelectRestaurant}
          />
        ) : currentView === 'map' ? (
          <MapPage />
        ) : (
          <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Restaurant Review App</p>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      
      <UserProfile 
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;