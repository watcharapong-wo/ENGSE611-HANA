import React, { useEffect, useState } from "react";

/**
 * OnlineSearch — ค้นหาผ่าน OMDb API
 * ต้องตั้งค่า Vite env: VITE_OMDB_KEY
 * สมัครฟรี: http://www.omdbapi.com/apikey.aspx
 */
const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

export default function OnlineSearch({ onPick }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ Search: [], totalResults: 0, Response: "True" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const canSearch = OMDB_KEY && (OMDB_KEY + "").trim().length > 0;

  useEffect(() => {
    if (!q.trim() || !canSearch) return;
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true); setErr("");
        const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(q)}&type=movie&page=${page}`;
        const res = await fetch(url, { signal: ctrl.signal });
        const json = await res.json();
        if (json.Response === "True") {
          setData(json);
        } else {
          setErr(json.Error || "No results");
          setData({ Search: [], totalResults: 0, Response: "False" });
        }
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [q, page, canSearch]);

  const total = Number(data.totalResults || 0);
  const totalPages = Math.max(1, Math.ceil(total / 10));

  return (
    <div>
      <div className="row wrap" style={{ gap: 8 }}>
        <input
          placeholder="Search online via OMDb (title)…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        {!canSearch && (
          <div className="small" style={{ color: "#dc2626" }}>
            Set <b>VITE_OMDB_KEY</b> to enable online search.
          </div>
        )}
      </div>

      {loading && <p className="small">Searching…</p>}
      {err && <p className="small" style={{ color: "#dc2626" }}>{err}</p>}

      {data.Search?.length > 0 && (
        <>
          <hr />
          <div className="list">
            {data.Search.map((m) => (
              <div key={m.imdbID} className="movie">
                <img className="poster" alt="" src={m.Poster !== "N/A" ? m.Poster : ""} />
                <div>
                  <h3>{m.Title} {m.Year ? <span className="badge">{m.Year}</span> : null}</h3>
                  <div className="small">IMDB: {m.imdbID}</div>
                </div>
                <div className="actions">
                  <button
                    className="primary"
                    type="button"
                    onClick={() =>
                      onPick({
                        title: m.Title,
                        year: Number(m.Year) || "",
                        poster: m.Poster !== "N/A" ? m.Poster : "",
                        rating: 0,
                        notes: "",
                        watched: false,
                        favorite: false,
                        source: "omdb",
                      })
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
            <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
            <div className="small">Page {page} / {totalPages}</div>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
