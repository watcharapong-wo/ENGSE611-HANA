// src/components/RestaurantCard.jsx  (เพิ่ม Link + ปุ่มดูรายละเอียด)
import React from "react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ r, onToggleFav }){
  const avg = r.avg ?? (r.reviewsCount ? "—" : "–");
  return (
    <div className="card">
      <div className="restaurant">
        <img
          className="thumb"
          src={r.photo && r.photo.startsWith('/images/') ? r.photo : "/images/default.png"}
          alt={r.name}
          onError={e => { 
            console.log('Image failed to load:', r.photo);
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/default.png";
          }}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
        />
        <div>
          <h3 style={{margin:"0 0 6px"}}>
            <Link to={`/restaurants/${r.id}`} style={{textDecoration:"none"}}>{r.name}</Link>
          </h3>
          <div className="taglist">
            <span className="badge">{r.cuisine}</span>
            {r.location ? <span className="badge">{r.location}</span> : null}
            <span className="badge">Avg ⭐ {avg}</span>
            {r.favorite ? <span className="badge">★ Favorite</span> : null}
          </div>
        </div>
        <div className="row" style={{gap:8}}>
          <Link to={`/restaurants/${r.id}`}><button>Details</button></Link>
          <button onClick={()=>onToggleFav(r)}>{r.favorite ? "Unfav" : "Fav"}</button>
        </div>
      </div>
    </div>
  );
}
