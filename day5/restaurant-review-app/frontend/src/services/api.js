const BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

async function req(method, path, body){
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

export const api = {
  list: () => req("GET", "/api/restaurants"),
  get: (id) => req("GET", `/api/restaurants/${id}`),
  create: (data) => req("POST", "/api/restaurants", data),
  patch: (id, data) => req("PATCH", `/api/restaurants/${id}`, data),
  remove: (id) => req("DELETE", `/api/restaurants/${id}`),

  getReviews: (id) => req("GET", `/api/restaurants/${id}/reviews`),
  addReview: (id, rv) => req("POST", `/api/restaurants/${id}/reviews`, rv),
  patchReview: (rid, data) => req("PATCH", `/api/reviews/${rid}`, data),
  deleteReview: (rid) => req("DELETE", `/api/reviews/${rid}`)
};
