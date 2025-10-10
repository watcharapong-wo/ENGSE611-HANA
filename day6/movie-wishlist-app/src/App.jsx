import React, { useMemo, useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import MovieForm from "./components/MovieForm.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Filters from "./components/Filters.jsx";
import ImportExport from "./components/ImportExport.jsx";
import OnlineSearch from "./components/OnlineSearch.jsx";
import Stats from "./components/Stats.jsx";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function App() {
  const [movies, setMovies] = useLocalStorage("movie_wishlist_v1", []);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ status: "all", sort: "added_desc", minRating: 0, favorite: "any" });

  const addMovie = (m) => setMovies(prev => [{ id: uid(), addedAt: Date.now(), favorite:false, ...m }, ...prev]);
  const updateMovie = (id, patch) => setMovies(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m));
  const removeMovie = (id) => setMovies(prev => prev.filter(m => m.id !== id));
  const clearAll = () => confirm("Delete ALL movies?") && setMovies([]);

  const filtered = useMemo(() => {
    let list = movies;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(m => (m.title||"").toLowerCase().includes(q) || (m.year||"").toString().includes(q));
    }
    if (filters.status !== "all") {
      list = list.filter(m => (filters.status === "watched") ? !!m.watched : !m.watched);
    }
    if (filters.favorite === "fav") {
      list = list.filter(m => !!m.favorite);
    } else if (filters.favorite === "nonfav") {
      list = list.filter(m => !m.favorite);
    }
    if (filters.minRating > 0) {
      list = list.filter(m => (m.rating||0) >= filters.minRating);
    }
    const sorters = {
      added_desc: (a,b)=> b.addedAt - a.addedAt,
      title_asc: (a,b)=> (a.title||'').localeCompare(b.title||''),
      year_desc: (a,b)=> (b.year||0) - (a.year||0),
      rating_desc: (a,b)=> (b.rating||0) - (a.rating||0),
    };
    list = [...list].sort(sorters[filters.sort] || sorters.added_desc);
    return list;
  }, [movies, query, filters]);

  return (
    <>
      <header>
        <div className="container">
          <h1>🎬 Movie Wishlist</h1>
          <div className="sub">Offline-first wishlist with online search (OMDb), favorites, filters & stats.</div>
        </div>
      </header>

      <div className="container">
        <div className="grid">
          <div className="card">
            <h2>Add Movie</h2>
            <MovieForm onAdd={addMovie} />
            <hr />
            <h2>Online Search</h2>
            <OnlineSearch onPick={addMovie} />
            <hr />
            <ImportExport data={movies} onImport={setMovies} onClear={clearAll} />
          </div>

          <div className="card">
            <h2>Wishlist</h2>
            <div className="row wrap" style={{marginBottom: 8}}>
              <input placeholder="Search in your list (title/year)..." value={query} onChange={e=>setQuery(e.target.value)} />
              <Filters value={filters} onChange={setFilters} />
            </div>
            <div className="row" style={{justifyContent:"space-between", marginBottom: 8}}>
              <Stats movies={movies} />
            </div>
            <hr />
            {filtered.length === 0 ? (
              <div className="empty">No movies. Add some from the left or via online search.</div>
            ) : (
              <div className="list">
                {filtered.map(m => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onToggleWatched={()=>updateMovie(m.id, { watched: !m.watched })}
                    onUpdate={(patch)=>updateMovie(m.id, patch)}
                    onRemove={()=>removeMovie(m.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
