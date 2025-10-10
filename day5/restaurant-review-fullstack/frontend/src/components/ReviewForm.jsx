// src/components/ReviewForm.jsx
import React, { useState } from "react";
import StarRating from "./StarRating.jsx";

export default function ReviewForm({ onSubmit }){
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  async function handle(e){
    e.preventDefault();
    if(!name.trim() || !text.trim()) return;
    await onSubmit({ name: name.trim(), text: text.trim(), rating });
    setName(""); setText(""); setRating(5);
  }

  return (
    <form onSubmit={handle} className="row" style={{flexDirection:"column", gap:10}}>
      <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      <textarea rows={4} placeholder="Write a review…" value={text} onChange={e=>setText(e.target.value)} />
      <div className="row" style={{gap:10}}>
        <div className="row" style={{gap:8, alignItems:"center"}}>
          <span className="sub">Rating</span>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <div className="right"><button type="submit">Submit</button></div>
      </div>
    </form>
  );
}
