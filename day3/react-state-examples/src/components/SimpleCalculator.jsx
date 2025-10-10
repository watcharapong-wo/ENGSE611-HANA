import React, { useState } from "react";

export default function SimpleCalculator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const div = b !== 0 ? (a / b) : null;
  const percentOfB = (a / 100) * b;    // a% ของ b
  const sqrtA = a >= 0 ? Math.sqrt(a) : NaN;
  const sqrtB = b >= 0 ? Math.sqrt(b) : NaN;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">เครื่องคิดเลข (% และ √)</h2>
      <div className="flex flex-wrap gap-3">
        <input className="border rounded px-3 py-2 w-32" type="number" value={a} onChange={e => setA(Number(e.target.value))} />
        <input className="border rounded px-3 py-2 w-32" type="number" value={b} onChange={e => setB(Number(e.target.value))} />
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="border rounded p-2">A + B: <b>{a + b}</b></div>
        <div className="border rounded p-2">A - B: <b>{a - b}</b></div>
        <div className="border rounded p-2">A × B: <b>{a * b}</b></div>
        <div className="border rounded p-2">A ÷ B: <b>{div !== null ? div.toFixed(2) : '∞'}</b></div>
        <div className="border rounded p-2">A% ของ B: <b>{percentOfB.toFixed(2)}</b></div>
        <div className="border rounded p-2">√A: <b>{isNaN(sqrtA) ? 'NaN' : sqrtA.toFixed(4)}</b></div>
        <div className="border rounded p-2">√B: <b>{isNaN(sqrtB) ? 'NaN' : sqrtB.toFixed(4)}</b></div>
      </div>
    </div>
  );
}
