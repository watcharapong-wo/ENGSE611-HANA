// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";

import Counter from "./components/Counter.jsx";
import NameForm from "./components/NameForm.jsx";
import ProfileEditor from "./components/ProfileEditor.jsx";
import PostViewer from "./components/PostViewer.jsx";
import Clock from "./components/Clock.jsx";
import DebouncedSearch from "./components/DebouncedSearch.jsx";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    document.title = "React Hooks Lab — useState & useEffect";
  }, []);

  return (
    <>
      <header>
        <h1>React Hooks Lab — useState &amp; useEffect</h1>
        <div className="sub">Hands-on with useState, useEffect, cleanup &amp; debounce</div>
      </header>

      <div className="container">
        <div className="grid">
          <div className="card">
            <h2>Lab 1.1 — Simple Counter</h2>
            <Counter />
          </div>

          <div className="card">
            <h2>Lab 1.2 — Input Form</h2>
            <NameForm />
          </div>

          <div className="card">
            <h2>Lab 1.3 — Object State</h2>
            <ProfileEditor />
          </div>

          <div className="card">
            <h2>Lab 2.1 — Fetching Data</h2>
            <PostViewer />
          </div>

          <div className="card">
            <h2>Lab 2.2 — Cleanup with Timer</h2>
            <button className="primary" onClick={() => setShowClock(v => !v)}>
              {showClock ? "Hide" : "Show"} Clock
            </button>
            <hr />
            {showClock ? <Clock /> : <p>Clock hidden. Toggle to mount again.</p>}
          </div>

          <div className="card">
            <h2>Lab 3.1 — Debounced Search</h2>
            <DebouncedSearch />
          </div>

          <div className="card">
            <h2>Challenge — Todo List</h2>
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}
