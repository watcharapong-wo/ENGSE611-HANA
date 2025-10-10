import React, { useState } from "react";
export default function ReviewForm({ onSubmit }){
  const [name,setName] = useState(""); const [text,setText] = useState(""); const [rating,setRating] = useState(5);
  function submit(e){ e.preventDefault(); const n=name.trim(), t=text.trim(); if(!n||!t) return;
    onSubmit({ name:n, text:t, rating }); setName(""); setText(""); setRating(5); }
  return (
    <form onSubmit={submit}>
      <label>Your name</label>
      <input value={name} onChange={e=>setName(e.target.value)} />
      <label>Rating</label>
      <select value={rating} onChange={e=>setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(v=> <option key={v} value={v}>{v}</option>)}
      </select>
      <label>Review</label>
      <textarea value={text} onChange={e=>setText(e.target.value)} />
      <div className="row" style={{justifyContent:"flex-end"}}><button className="primary">Submit</button></div>
    </form>
  );
}
