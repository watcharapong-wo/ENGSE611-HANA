import React, { useState } from "react";

export default function CounterGame() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  // Power-ups: Double Next & Boost +3
  const [aDouble, setADouble] = useState(false);
  const [bDouble, setBDouble] = useState(false);

  const winner =
    scoreA === scoreB ? "เสมอ" : (scoreA > scoreB ? "ทีม A นำ" : "ทีม B นำ");

  const inc = (team) => {
    if (team === 'A') {
      setScoreA(s => s + (aDouble ? 2 : 1));
      if (aDouble) setADouble(false);
    } else {
      setScoreB(s => s + (bDouble ? 2 : 1));
      if (bDouble) setBDouble(false);
    }
  };

  const dec = (team) => {
    if (team === 'A') setScoreA(s => Math.max(0, s - 1));
    else setScoreB(s => Math.max(0, s - 1));
  };

  const boost = (team) => {
    if (team === 'A') setScoreA(s => s + 3);
    else setScoreB(s => s + 3);
  };

  const steal = (from) => {
    if (from === 'A') {
      setScoreA(s => Math.max(0, s - 1));
      setScoreB(s => s + 1);
    } else {
      setScoreB(s => Math.max(0, s - 1));
      setScoreA(s => s + 1);
    }
  };

  const reset = () => { setScoreA(0); setScoreB(0); setADouble(false); setBDouble(false); };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">เกมนับคะแนน (Power-ups)</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* ทีม A */}
        <div className="border rounded p-3 text-center">
          <div className="text-sm text-gray-500 mb-1">ทีม A</div>
          <div className="text-4xl font-bold mb-2">{scoreA}</div>
          <div className="flex justify-center gap-2">
            <button className="px-3 py-2 rounded bg-gray-100" onClick={() => dec('A')}>-1</button>
            <button className="px-3 py-2 rounded bg-gray-100" onClick={() => inc('A')}>+1{aDouble ? ' (x2)' : ''}</button>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <button className={`px-3 py-1 rounded ${aDouble ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`} onClick={() => setADouble(d => !d)}>Double Next</button>
            <button className="px-3 py-1 rounded bg-gray-100" onClick={() => boost('A')}>Boost +3</button>
            <button className="px-3 py-1 rounded bg-gray-100" onClick={() => steal('B')}>Steal 1 (จาก B)</button>
          </div>
        </div>

        {/* ทีม B */}
        <div className="border rounded p-3 text-center">
          <div className="text-sm text-gray-500 mb-1">ทีม B</div>
          <div className="text-4xl font-bold mb-2">{scoreB}</div>
          <div className="flex justify-center gap-2">
            <button className="px-3 py-2 rounded bg-gray-100" onClick={() => dec('B')}>-1</button>
            <button className="px-3 py-2 rounded bg-gray-100" onClick={() => inc('B')}>+1{bDouble ? ' (x2)' : ''}</button>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <button className={`px-3 py-1 rounded ${bDouble ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`} onClick={() => setBDouble(d => !d)}>Double Next</button>
            <button className="px-3 py-1 rounded bg-gray-100" onClick={() => boost('B')}>Boost +3</button>
            <button className="px-3 py-1 rounded bg-gray-100" onClick={() => steal('A')}>Steal 1 (จาก A)</button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded bg-indigo-50 border text-indigo-800 text-center">
        สถานะเกม: <b>{winner}</b>
      </div>

      <div className="mt-3">
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={reset}>เริ่มใหม่</button>
      </div>
    </div>
  );
}
