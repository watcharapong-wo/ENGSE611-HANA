import React, { useState } from "react";

export default function MovieCard({ movie, onToggleWatched, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(movie);

  function startEdit(){ setDraft(movie); setEditing(true); }
  function save(){
    onUpdate({
      title: draft.title.trim() || movie.title,
      year: Number(draft.year)||"",
      poster: draft.poster,
      rating: Number(draft.rating)||0,
      notes: draft.notes,
    });
    setEditing(false);
  }

  const toggleFav = () => onUpdate({ favorite: !movie.favorite });

  if(editing){
    return (
      <div className="movie">
        <img className="poster" alt="" src={draft.poster || ""} onError={e=>{ e.currentTarget.src=""; }} />
        <div>
          <input value={draft.title} onChange={e=>setDraft({...draft, title:e.target.value})} />
          <div className="row wrap">
            <input style={{maxWidth:120}} placeholder="Year" value={draft.year} onChange={e=>setDraft({...draft, year:e.target.value})} />
            <input style={{flex:1}} placeholder="Poster URL" value={draft.poster} onChange={e=>setDraft({...draft, poster:e.target.value})} />
            <input style={{maxWidth:120}} type="number" min="0" max="10" value={draft.rating} onChange={e=>setDraft({...draft, rating:e.target.value})} />
          </div>
          <textarea placeholder="Notes" value={draft.notes} onChange={e=>setDraft({...draft, notes:e.target.value})} />
          <div className="row actions">
            <button className="success" onClick={save} type="button">Save</button>
            <button onClick={()=>setEditing(false)} type="button">Cancel</button>
          </div>
        </div>
        <div className="actions">
          <button onClick={toggleFav} type="button">{movie.favorite ? "⭐ Unfavorite" : "☆ Favorite"}</button>
          <button className="danger" onClick={onRemove} type="button">Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie">
      <img className="poster" alt="" src={movie.poster || ""} onError={e=>{ e.currentTarget.src=""; }} />
      <div>
        <h3>
          {movie.title} {movie.year ? <span className="badge">{movie.year}</span> : null}
          {" "} {movie.favorite ? <span className="badge">⭐ Favorite</span> : null}
        </h3>
        <div className="tags">
          {movie.watched ? <span className="badge">Watched</span> : <span className="badge">Wishlist</span>}
          <span className="badge">Rating: {movie.rating ?? 0}</span>
        </div>
        {movie.notes ? <p className="small" style={{marginTop:8, whiteSpace:"pre-wrap"}}>{movie.notes}</p> : null}
      </div>
      <div className="actions">
        <button className={movie.watched ? "" : "success"} onClick={onToggleWatched} type="button">
          {movie.watched ? "Unwatch" : "Mark watched"}
        </button>
        <button onClick={startEdit} type="button">Edit</button>
        <button onClick={toggleFav} type="button">{movie.favorite ? "⭐" : "☆"}</button>
        <button className="danger" onClick={onRemove} type="button">Delete</button>
      </div>
    </div>
  );
}
