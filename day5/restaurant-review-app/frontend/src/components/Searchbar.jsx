import React from "react";
export default function Searchbar({ value, onChange }){
  return <input placeholder="Search by name or location…" value={value} onChange={e=>onChange(e.target.value)} />;
}
