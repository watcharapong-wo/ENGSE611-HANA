const BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");
async function req(method, path, body){
  const res = await fetch(`${BASE}${path}`, {
    method, headers:{ "Content-Type":"application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if(!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.status===204 ? null : res.json();
}
export const api = {
  list: ()=>req("GET","/api/restaurants"),
  create: (data)=>req("POST","/api/restaurants", data),
  patch: (id,p)=>req("PATCH",`/api/restaurants/${id}`,p),
};
