import React, { useEffect, useRef, useState } from "react";

const fmt = (ms) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const x = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(x).padStart(2,'0')}`;
};

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState([]);
  const tickRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      tickRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 10);
    }
    return () => tickRef.current && clearInterval(tickRef.current);
  }, [running]);

  const startStop = () => setRunning(r => !r);
  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); };
  const lap = () => setLaps(ls => [elapsed, ...ls]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">นาฬิกาจับเวลา</h2>
      <div className="text-4xl font-bold">{fmt(elapsed)}</div>
      <div className="mt-3 flex gap-2">
        <button className={`px-3 py-2 rounded ${running ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`} onClick={startStop}>
          {running ? 'หยุด' : 'เริ่ม'}
        </button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={lap} disabled={!running}>Lap</button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={reset}>Reset</button>
      </div>

      <div className="mt-4">
        <div className="font-semibold mb-1">Laps</div>
        <ol className="list-decimal pl-6 space-y-1">
          {laps.map((t, i) => <li key={i}>{fmt(t)}</li>)}
        </ol>
      </div>
    </div>
  );
}
