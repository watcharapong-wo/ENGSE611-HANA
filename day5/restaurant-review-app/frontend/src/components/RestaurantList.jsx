import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";
import Searchbar from "./Searchbar.jsx";       // ชื่อไฟล์คุณใช้ "S" เล็ก
import FilterPanel from "./FilterPanel.jsx";
import RestaurantCard from "./RestaurantCard.jsx";

export default function RestaurantList(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({ cuisine:"all", sort:"name_asc", onlyFav:false });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { setItems(await api.list()); }
      finally { setLoading(false); }
    })();
  }, []);

  const cuisines = useMemo(() => {
    const s = new Set(items.map(r=>r.cuisine).filter(Boolean));
    return Array.from(s).sort();
  }, [items]);

  const list = useMemo(() => {
    let arr = [...items];
    if(q.trim()){
      const qq = q.toLowerCase();
      arr = arr.filter(r => (r.name||"").toLowerCase().includes(qq) || (r.location||"").toLowerCase().includes(qq));
    }
    if(filters.cuisine !== "all") arr = arr.filter(r => r.cuisine === filters.cuisine);
    if(filters.onlyFav) arr = arr.filter(r => !!r.favorite);

    const sorters = {
      name_asc:     (a,b)=> (a.name||"").localeCompare(b.name||""),
      rating_desc:  (a,b)=> (b.avg||0)-(a.avg||0),
      reviews_desc: (a,b)=> (b.reviewsCount||0)-(a.reviewsCount||0),
      recent_desc:  (a,b)=> (b.updatedAt||0)-(a.updatedAt||0),
    };
    return arr.sort(sorters[filters.sort] || sorters.name_asc);
  }, [items, q, filters]);

  async function addQuick(){
    const name = prompt("Restaurant name?"); if(!name) return;
    const cuisine = prompt("Cuisine? (Thai/Italian/…)" ) || "Other";
    const created = await api.create({ name, cuisine });
    setItems(prev => [created, ...prev]);
  }
  async function toggleFav(r){
    const patched = await api.patch(r.id, { favorite: !r.favorite });
    setItems(prev => prev.map(x => x.id === r.id ? patched : x));
  }

  return (
    <>
      <div className="card" style={{marginBottom:16}}>
        <div className="row wrap" style={{gap:10}}>
          <Searchbar value={q} onChange={setQ} />
          <FilterPanel cuisines={cuisines} value={filters} onChange={setFilters} />
          <div className="right"><button onClick={addQuick}>+ Quick add</button></div>
        </div>
      </div>

      {loading ? <div className="small">Loading…</div> :
       list.length === 0 ? <div className="empty">No restaurants matched.</div> :
       <div className="grid">
         {list.map(r => (
           <RestaurantCard key={r.id} r={r} onToggleFav={toggleFav} />
         ))}
       </div>}
    </>
  );
}
