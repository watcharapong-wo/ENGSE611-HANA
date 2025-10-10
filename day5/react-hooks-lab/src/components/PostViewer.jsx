// src/components/PostViewer.jsx
import React, { useEffect, useState } from "react";

export default function PostViewer() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { signal: ctrl.signal })
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setPost(data))
      .catch(err => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [postId]);

  return (
    <div>
      <label>Post ID</label>
      <input type="number" min="1" max="100" value={postId}
             onChange={e => setPostId(Number(e.target.value) || 1)} />
      <hr />
      {loading && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && post && (
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      )}
    </div>
  );
}
