import React, { useState } from 'react'

function App() {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');

  const addMovie = () => {
    if (movieTitle.trim()) {
      const newMovie = {
        id: Date.now(),
        title: movieTitle,
        watched: false
      };
      setMovies([...movies, newMovie]);
      setMovieTitle('');
    }
  };

  const toggleWatched = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  };

  const removeMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Movie Wishlist</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title"
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={addMovie} style={{ padding: '8px 16px' }}>
          Add Movie
        </button>
      </div>

      <div>
        {movies.map(movie => (
          <div key={movie.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '5px',
            backgroundColor: movie.watched ? '#e8f5e8' : '#fff'
          }}>
            <span style={{ 
              flex: 1, 
              textDecoration: movie.watched ? 'line-through' : 'none' 
            }}>
              {movie.title}
            </span>
            <button 
              onClick={() => toggleWatched(movie.id)}
              style={{ marginRight: '10px', padding: '4px 8px' }}
            >
              {movie.watched ? 'Unwatch' : 'Watched'}
            </button>
            <button 
              onClick={() => removeMovie(movie.id)}
              style={{ padding: '4px 8px', backgroundColor: '#ff4444', color: 'white' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {movies.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No movies in your wishlist yet. Add some!
        </p>
      )}
    </div>
  )
}

export default App