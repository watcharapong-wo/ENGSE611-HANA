import React, { useMemo, useState } from "react";

const uid = () => Math.random().toString(36).slice(2);
const DEFAULT_CATS = ["ทั่วไป", "เรียน", "งาน"];

export default function TodoList() {
  const [text, setText] = useState("");
  const [cat, setCat] = useState(DEFAULT_CATS[0]);
  const [todos, setTodos] = useState([
    { id: uid(), text: "เรียน useState", done: false, category: "เรียน" },
    { id: uid(), text: "ทำแบบฝึกหัด Day3", done: true, category: "เรียน" },
    { id: uid(), text: "อ่านหนังสือ", done: false, category: "ทั่วไป" },
  ]);
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [filter, setFilter] = useState("ทั้งหมด");
  const [newCat, setNewCat] = useState("");

  const left = useMemo(() => todos.filter(t => !t.done).length, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos(ts => [{ id: uid(), text: text.trim(), done: false, category: cat }, ...ts]);
    setText("");
  };
  const toggle = id => setTodos(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = id => setTodos(ts => ts.filter(t => t.id !== id));
  const clearDone = () => setTodos(ts => ts.filter(t => !t.done));

  const addCategory = () => {
    const c = newCat.trim();
    if (!c) return;
    if (!cats.includes(c)) setCats(cs => [...cs, c]);
    setNewCat("");
  };

  const display = todos.filter(t => filter === "ทั้งหมด" || t.category === filter);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">รายการงาน (มีหมวดหมู่)</h2>

      {/* เพิ่มงาน */}
      <div className="flex flex-wrap gap-2">
        <input
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
          placeholder="เพิ่มงาน..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
        />
        <select className="border rounded px-3 py-2" value={cat} onChange={e => setCat(e.target.value)}>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={addTodo}>เพิ่ม</button>
      </div>

      {/* เพิ่มหมวดหมู่ใหม่ */}
      <div className="mt-2 flex gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="เพิ่มหมวดหมู่ใหม่"
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addCategory()}
        />
        <button className="px-3 py-2 rounded bg-gray-100" onClick={addCategory}>เพิ่มหมวดหมู่</button>
      </div>

      {/* Filter */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-sm text-gray-600">กรอง:</span>
        <select className="border rounded px-3 py-2" value={filter} onChange={e => setFilter(e.target.value)}>
          <option>ทั้งหมด</option>
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
        <span className="ml-auto text-sm text-gray-500">เหลือทำ: <b>{left}</b></span>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={clearDone}>ลบงานที่ทำแล้ว</button>
      </div>

      {/* List */}
      <div className="mt-3 space-y-2">
        {display.map(t => (
          <div key={t.id} className="flex justify-between items-center border rounded px-3 py-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span className={t.done ? "line-through text-gray-400" : ""}>{t.text}</span>
              <span className="text-xs bg-gray-200 rounded px-2 py-0.5">{t.category}</span>
            </label>
            <button className="text-red-600" onClick={() => remove(t.id)}>ลบ</button>
          </div>
        ))}
      </div>
    </div>
  );
}
