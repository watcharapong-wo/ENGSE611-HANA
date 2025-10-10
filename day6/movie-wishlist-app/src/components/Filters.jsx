import React from "react";

export default function Filters({ value, onChange }){
  const set = (patch) => onChange({ ...value, ...patch });
  return (
    <div className="row wrap" style={{gap:8}}>
      <select value={value.status} onChange={e=>set({status:e.target.value})}>
        <option value="all">All</option>
        <option value="wishlist">Wishlist only</option>
        <option value="watched">Watched only</option>
      </select>

      <select value={value.favorite ?? "any"} onChange={e=>set({favorite: e.target.value})}>
        <option value="any">All (fav & non-fav)</option>
        <option value="fav">Favorites only</option>
        <option value="nonfav">Non-favorites</option>
      </select>

      <select value={value.sort} onChange={e=>set({sort:e.target.value})}>
        <option value="added_desc">Sort: Recently added</option>
        <option value="title_asc">Sort: Title A→Z</option>
        <option value="year_desc">Sort: Year (newest)</option>
        <option value="rating_desc">Sort: Rating (high)</option>
      </select>

      <select value={value.minRating} onChange={e=>set({minRating: Number(e.target.value)})}>
        <option value={0}>Min Rating: 0</option>
        <option value={5}>Min Rating: 5</option>
        <option value={7}>Min Rating: 7</option>
        <option value={8}>Min Rating: 8</option>
        <option value={9}>Min Rating: 9</option>
      </select>
    </div>
  );
}
