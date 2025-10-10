// src/components/DebouncedSearch.jsx
import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function DebouncedSearch() {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 500);
  const [display, setDisplay] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debounced.trim()) { setDisplay(""); return; }
    setLoading(true);
    // mock API
    const id = setTimeout(() => {
      setDisplay(`Results for "${debounced}"`);
      setLoading(false);
    }, 300);
    return () => clearTimeout(id);
  }, [debounced]);

  return (
    <div>
      <input placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
      <hr />
      {loading ? <p>Searching…</p> : display && <p>{display}</p>}
    </div>
  );
}
