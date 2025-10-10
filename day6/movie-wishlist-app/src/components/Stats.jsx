import React, { useMemo } from "react";

export default function Stats({ movies }) {
  const s = useMemo(() => {
    const total = movies.length;
    const watched = movies.filter(m => m.watched).length;
    const wishlist = total - watched;
    const avg = movies.length
      ? (movies.reduce((a, m) => a + (Number(m.rating) || 0), 0) / movies.length).toFixed(2)
      : "0.00";
    const favs = movies.filter(m => m.favorite).length;
    return { total, watched, wishlist, avg, favs };
  }, [movies]);

  return (
    <div className="row wrap" style={{ gap: 10 }}>
      <span className="badge">All: {s.total}</span>
      <span className="badge">Watched: {s.watched}</span>
      <span className="badge">Wishlist: {s.wishlist}</span>
      <span className="badge">Avg Rating: {s.avg}</span>
      <span className="badge">Favorites: {s.favs}</span>
    </div>
  );
}
