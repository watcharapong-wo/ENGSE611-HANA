import React, { useState } from "react";

export default function BasicCounter() {
  const [count, setCount] = useState(0);
  const add = (n) => setCount(c => c + n);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">ตัวนับพื้นฐาน</h2>
      <div className="flex flex-wrap items-center gap-2">
        <button className="px-3 py-2 rounded bg-gray-100" onClick={() => add(-1)}>-1</button>
        <div className="min-w-[60px] text-center text-2xl font-bold">{count}</div>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={() => add(1)}>+1</button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={() => add(5)}>+5</button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={() => add(10)}>+10</button>
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}
