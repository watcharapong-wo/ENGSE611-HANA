import React from "react";

export default function RestaurantCard({ r, onToggleFav }){
  const avg = r.avg ?? (r.reviewsCount ? "—" : "–"); // ถ้ามี average จาก API จะแสดงเลย
  return (
    <div className="card">
      <div className="restaurant">
        <img className="thumb" src={r.photo||""} alt="" onError={e=>{e.currentTarget.src=""}} />
        <div>
          <h3 style={{margin:"0 0 6px"}}>{r.name}</h3>
          <div className="taglist">
            <span className="badge">{r.cuisine}</span>
            {r.location ? <span className="badge">{r.location}</span> : null}
            <span className="badge">Avg ⭐ {avg}</span>
            {r.favorite ? <span className="badge">★ Favorite</span> : null}
          </div>
        </div>
        <div className="row">
          <button onClick={()=>onToggleFav(r)}>{r.favorite ? "Unfav" : "Fav"}</button>
        </div>
      </div>
    </div>
  );
}
