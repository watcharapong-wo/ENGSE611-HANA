import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import ReviewForm from "./ReviewForm.jsx";
import ReviewList from "./ReviewList.jsx";

export default function RestaurantDetail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [r, setR] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load(){
    setLoading(true);
    try{ setR(await api.get(id)); } finally{ setLoading(false); }
  }
  useEffect(() => { load(); }, [id]);

  const avg = useMemo(() => r?.reviews?.length ? (r.reviews.reduce((a,b)=>a+Number(b.rating||0),0)/r.reviews.length).toFixed(1) : "–", [r]);

  async function toggleFav(){ const up = await api.patch(id, { favorite: !r.favorite }); setR({...up, reviews: r.reviews}); }
  async function remove(){ if(!confirm("Delete this restaurant?")) return; await api.remove(id); nav("/"); }
  async function addReview(rv){ await api.addReview(id, rv); await load(); }
  async function editReview(rv){
    const text = prompt("Edit review:", rv.text); if(text===null) return;
    const rating = Number(prompt("Rating (1-5):", rv.rating)) || rv.rating;
    await api.patchReview(rv.id, { text, rating }); await load();
  }
  async function deleteReview(rv){ if(!confirm("Delete review?")) return; await api.deleteReview(rv.id); await load(); }

  if(loading) return <div className="container"><div className="card">Loading…</div></div>;
  if(!r) return <div className="container"><div className="card">Not found. <Link to="/">Go home</Link></div></div>;

  return (
    <div className="container">
      <div className="card">
        <div className="row wrap" style={{alignItems:"flex-start"}}>
          <img className="thumb" src={r.photo||""} alt="" onError={e=>{e.currentTarget.src=""}} />
          <div style={{flex:1}}>
            <h2 style={{margin:"0 0 6px"}}>{r.name}</h2>
            <div className="taglist">
              <span className="badge">{r.cuisine}</span>
              {r.location ? <span className="badge">{r.location}</span> : null}
              <span className="badge">Avg ⭐ {avg}</span>
            </div>
          </div>
          <div className="row">
            <button onClick={toggleFav}>{r.favorite ? "★ Unfavorite" : "☆ Favorite"}</button>
            <button className="danger" onClick={remove}>Delete</button>
          </div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
        <div className="card">
          <h3 style={{marginTop:0}}>Add a review</h3>
          <ReviewForm onSubmit={addReview} />
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Reviews ({r.reviews?.length||0})</h3>
          <ReviewList items={r.reviews||[]} onEdit={editReview} onDelete={deleteReview}/>
        </div>
      </div>
    </div>
  );
}
