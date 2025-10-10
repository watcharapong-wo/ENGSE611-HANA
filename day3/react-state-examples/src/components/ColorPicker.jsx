import React, { useState } from "react";

const DEFAULT_SWATCHES = ["#4f46e5", "#22c55e", "#ef4444", "#eab308", "#06b6d4"];

export default function ColorPicker() {
  const [color, setColor] = useState("#4f46e5");
  const [swatches, setSwatches] = useState(DEFAULT_SWATCHES);

  const addSwatch = () => {
    if (!swatches.includes(color)) setSwatches(s => [color, ...s].slice(0, 12));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">เปลี่ยนสีพื้นหลัง + พาเลต</h2>
      <div className="flex items-center gap-3">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <span className="text-gray-600">{color}</span>
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={addSwatch}>เพิ่มสีนี้ในพาเลต</button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {swatches.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            title={c}
            className="w-8 h-8 rounded-full border"
            style={{ background: c }}
          />
        ))}
      </div>

      <div className="mt-4 h-24 rounded-lg border" style={{ background: color }} />
    </div>
  );
}
