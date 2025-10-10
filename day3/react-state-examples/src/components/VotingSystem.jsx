import React, { useMemo, useState } from "react";

const uid = () => Math.random().toString(36).slice(2);

export default function VotingSystem() {
  const [candidates, setCandidates] = useState([
    { id: uid(), name: "ตัวเลือก A", votes: 0 },
    { id: uid(), name: "ตัวเลือก B", votes: 0 },
    { id: uid(), name: "ตัวเลือก C", votes: 0 },
  ]);
  const [name, setName] = useState("");

  const total = candidates.reduce((s, c) => s + c.votes, 0);
  const leader = useMemo(() => {
    if (!candidates.length) return null;
    return [...candidates].sort((a, b) => b.votes - a.votes)[0];
  }, [candidates]);

  const vote = (id) => setCandidates(cs => cs.map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c));
  const addCandidate = () => {
    const n = name.trim();
    if (!n) return;
    setCandidates(cs => [...cs, { id: uid(), name: n, votes: 0 }]);
    setName("");
  };
  const reset = () => setCandidates(cs => cs.map(c => ({ ...c, votes: 0 })));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">ระบบโหวต</h2>

      <div className="flex gap-2">
        <input className="border rounded px-3 py-2" placeholder="เพิ่มผู้สมัคร…" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCandidate()} />
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={addCandidate}>เพิ่ม</button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={reset}>รีเซ็ตคะแนน</button>
      </div>

      <div className="mt-3 space-y-2">
        {candidates.map(c => (
          <div key={c.id} className="flex items-center justify-between border rounded px-3 py-2">
            <div>{c.name}</div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">คะแนน: <b>{c.votes}</b> {total ? `(${Math.round((c.votes/total)*100)}%)` : ''}</div>
              <button className="px-3 py-1 rounded bg-gray-100" onClick={() => vote(c.id)}>โหวต</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-gray-600">คะแนนรวม: <b>{total}</b></div>
      {leader && <div className="mt-1 text-sm">ผู้นำปัจจุบัน: <b>{leader.name}</b></div>}
    </div>
  );
}
