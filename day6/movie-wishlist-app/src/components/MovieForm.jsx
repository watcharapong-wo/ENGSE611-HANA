import React, { useState } from "react";

const initial = { title: "", year: "", poster: "", rating: 0, notes: "", watched: false };

export default function MovieForm({ onAdd }) {
  const [form, setForm] = useState(initial);

  function handleChange(e){
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }
  function handleSubmit(e){
    e.preventDefault();
    const t = form.title.trim();
    if(!t) return;
    onAdd({ ...form, title: t, year: Number(form.year)||"", rating: Number(form.rating)||0 });
    setForm(initial);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Movie title" autoFocus />
      <label>Year</label>
      <input name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2023" />
      <label>Poster URL <span className="small">(optional)</span></label>
      <input name="poster" value={form.poster} onChange={handleChange} placeholder="https://..." />
      <div className="row">
        <div style={{flex:1}}>
          <label>Rating <span className="small">(0–10)</span></label>
          <input name="rating" type="number" min="0" max="10" step="1" value={form.rating} onChange={handleChange} />
        </div>
        <div className="row" style={{alignItems:"center"}}>
          <input id="watched" name="watched" type="checkbox" checked={form.watched} onChange={handleChange} />
          <label htmlFor="watched" style={{margin:0, marginLeft:8}}>Watched</label>
        </div>
      </div>
      <label>Notes</label>
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Why do you want to watch this? Where is it streaming?..." />
      <div className="row" style={{justifyContent:"flex-end"}}>
        <button className="primary" type="submit">Add Movie</button>
      </div>
    </form>
  );
}
