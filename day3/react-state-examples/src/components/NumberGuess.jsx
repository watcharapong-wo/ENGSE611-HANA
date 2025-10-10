import React, { useMemo, useState } from "react";

export default function NumberGuess() {
  const answer = useMemo(() => Math.floor(Math.random() * 100) + 1, []); // 1–100
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("เริ่มทายได้เลย (1-100)");

  const submit = () => {
    const g = Number(guess);
    if (!g || g < 1 || g > 100) { setStatus("กรอกเลข 1-100"); return; }
    if (g === answer) {
      setStatus(`ถูกต้อง! เฉลยคือ ${answer} ✅`);
      setHistory(h => [`${g} ✓`, ...h]);
    } else if (g < answer) {
      setStatus("น้อยไป ⬆️");
      setHistory(h => [`${g} ↑`, ...h]);
    } else {
      setStatus("มากไป ⬇️");
      setHistory(h => [`${g} ↓`, ...h]);
    }
    setGuess("");
  };

  const reset = () => {
    window.location.reload(); // ง่ายสุดเพื่อสุ่มเลขใหม่
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">เกมทายตัวเลข (1–100)</h2>
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2 w-40" type="number" value={guess} onChange={e => setGuess(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={submit}>ทาย</button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={reset}>เริ่มใหม่</button>
      </div>
      <p className="mt-2">{status}</p>
      <div className="mt-3 text-sm text-gray-600">ประวัติ:</div>
      <ul className="mt-1 list-disc pl-6 space-y-1">
        {history.map((h, i) => <li key={i}>{h}</li>)}
      </ul>
    </div>
  );
}
