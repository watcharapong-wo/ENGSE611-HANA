// src/components/TodoList.jsx
import React, { useEffect, useState } from "react";
let nextId = 1;

const LS_KEY = "lab_todos_v1";

export default function TodoList() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : [{ id: nextId++, text: "Learn React", completed: false }];
      // sync nextId
      if (parsed.length) nextId = Math.max(...parsed.map(t=>t.id)) + 1;
      return parsed;
    } catch { return [{ id: nextId++, text: "Learn React", completed: false }]; }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const t = text.trim();
    if (!t) return;
    setTodos(prev => [...prev, { id: nextId++, text: t, completed: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTodos(prev => prev.map(td => (td.id === id ? { ...td, completed: !td.completed } : td)));

  const removeTodo = (id) =>
    setTodos(prev => prev.filter(td => td.id !== id));

  return (
    <div>
      <div className="flex">
        <input
          placeholder="Add a todo…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
        />
        <button className="primary" onClick={addTodo}>Add</button>
      </div>
      <hr />
      <ul>
        {todos.map(td => (
          <li key={td.id}>
            <label className="flex">
              <input type="checkbox" checked={td.completed} onChange={() => toggle(td.id)} />
              <span style={{ textDecoration: td.completed ? "line-through" : "none" }}>{td.text}</span>
              <button className="danger" onClick={() => removeTodo(td.id)}>Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
