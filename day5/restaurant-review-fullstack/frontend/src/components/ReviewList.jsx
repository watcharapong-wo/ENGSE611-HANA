// src/components/ReviewList.jsx
import React, { useState } from "react";
import Star from "./Star.jsx";

export default function ReviewList({ items=[], onEdit, onDelete }){
  if(items.length === 0) return <div className="empty">No reviews yet.</div>;
  return (
    <div style={{display:"grid", gap:12}}>
      {items.map(rv => <ReviewItem key={rv.id} rv={rv} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}

function ReviewItem({ rv, onEdit, onDelete }){
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(rv.text);
  const [rating, setRating] = useState(rv.rating);

  async function save(){
    await onEdit(rv.id, { text, rating });
    setEditing(false);
  }

  return (
    <div className="card" style={{padding:"10px 12px"}}>
      <div className="row" style={{justifyContent:"space-between", alignItems:"flex-start"}}>
        <div>
          <div style={{fontWeight:600}}>{rv.name}</div>
          <div className="sub">{new Date(rv.date).toLocaleString()}</div>
        </div>
        <div className="row" style={{gap:8}}>
          {!editing ? (
            <>
              <button onClick={()=>setEditing(true)}>Edit</button>
              <button onClick={()=>onDelete(rv.id)} style={{borderColor:"#fecaca"}}>Delete</button>
            </>
          ) : (
            <>
              <button onClick={save}>Save</button>
              <button onClick={()=>{ setEditing(false); setText(rv.text); setRating(rv.rating); }}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {!editing ? (
        <>
          <div style={{margin:"8px 0"}}>
            {Array.from({length:5}).map((_,i)=><Star key={i} filled={i<rv.rating} />)}
          </div>
          <div>{rv.text}</div>
        </>
      ) : (
        <div className="row" style={{flexDirection:"column", gap:8, marginTop:8}}>
          <div className="row" style={{gap:8}}>
            {Array.from({length:5}).map((_,i)=>
              <button key={i} onClick={()=>setRating(i+1)} style={{background:"transparent"}}>
                <Star filled={i<rating} />
              </button>)}
          </div>
          <textarea rows={3} value={text} onChange={e=>setText(e.target.value)} />
        </div>
      )}
    </div>
  );
}
