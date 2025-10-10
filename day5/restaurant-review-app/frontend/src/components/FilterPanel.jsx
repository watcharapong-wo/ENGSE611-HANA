import React from "react";
export default function FilterPanel({ cuisines=[], value, onChange }){
  const set = (p)=>onChange({ ...value, ...p });
  return (
    <div className="row wrap" style={{gap:8}}>
      <select value={value.cuisine} onChange={e=>set({cuisine:e.target.value})}>
        <option value="all">All cuisines</option>
        {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={value.sort} onChange={e=>set({sort:e.target.value})}>
        <option value="name_asc">Sort: Name A→Z</option>
        <option value="rating_desc">Sort: Rating (high)</option>
        <option value="reviews_desc">Sort: Reviews (many)</option>
        <option value="recent_desc">Sort: Recently updated</option>
      </select>
      <label className="row" style={{gap:6}}>
        <input type="checkbox" checked={value.onlyFav} onChange={e=>set({onlyFav:e.target.checked})}/>
        Favorites
      </label>
    </div>
  );
}
