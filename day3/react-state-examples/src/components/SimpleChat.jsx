import React, { useState } from "react";

export default function SimpleChat() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([
    { id: 1, role: "bot", text: "สวัสดี! ลองพิมพ์คุยดูได้เลยนะครับ 🤖" }
  ]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const id = Date.now();
    setMsgs(m => [...m, { id, role: "you", text: t }]);
    setText("");
    // bot ตอบกลับแบบง่าย ๆ
    setTimeout(() => {
      setMsgs(m => [...m, { id: id + 1, role: "bot", text: `คุณพิมพ์ว่า: "${t}"` }]);
    }, 500);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Simple Chat</h2>
      <div className="border rounded p-3 h-64 overflow-auto bg-gray-50">
        {msgs.map(m => (
          <div key={m.id} className={`my-2 flex ${m.role === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded max-w-[70%] ${m.role === 'you' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="border rounded px-3 py-2 flex-1" placeholder="พิมพ์ข้อความ..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={send}>ส่ง</button>
      </div>
    </div>
  );
}
