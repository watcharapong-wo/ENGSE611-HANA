// src/components/Counter.js
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked <strong>{count}</strong> times</p>
      <div className="flex">
        <button onClick={() => setCount(c => c - 1)}>-1</button>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        <button className="x" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}
