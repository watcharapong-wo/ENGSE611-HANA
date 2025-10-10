// src/components/NameForm.js
import React, { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  return (
    <div>
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        placeholder="Type your name..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <hr />
      {name ? <p>Hello, <strong>{name}</strong>!</p> : <p>Start typing above…</p>}
    </div>
  );
}
