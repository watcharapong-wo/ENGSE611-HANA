import React from "react";
import Star from "./Star.jsx";

export default function StarRating({ value=0, onChange }){
  return (
    <div className="row" style={{ gap: 6 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          style={{ background: "transparent" }}
          aria-label={`rate ${i+1}`}
        >
          <Star filled={i < value} />
        </button>
      ))}
    </div>
  );
}
