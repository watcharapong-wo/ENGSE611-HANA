import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api.js";
import Searchbar from "./Searchbar.jsx";
import FilterPanel from "./FilterPanel.jsx";
import RestaurantCard from "./RestaurantCard.jsx";

export default function RestaurantList(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({ cuisine:"all", sort:"name_asc", onlyFav:false });

  useEffect(() => { (async () => {
    // ใช้ข้อมูลตัวอย่างแทน api.list() เพื่อให้แสดงผลได้โดยไม่ต้องรอ backend
    const sampleData = [
      {
        id: 1,
        name: "ลามอำแดง",
        cuisine: "thai cuisine",
        location: "Bangkok",
        avg: 0,
        reviewsCount: 0,
        favorite: false,
        photo: "/images/pad-thai.jpg"
      },
      {
        id: 2,
        name: "Napoli Slice",
        cuisine: "Italian",
        location: "Bangkok",
        avg: 0,
        reviewsCount: 0,
        favorite: false,
        photo: "/images/pizza.jpg"
      },
      {
        id: 3,
        name: "Siam Garden",
        cuisine: "Thai",
        location: "Chang Mai",
        avg: 0,
        reviewsCount: 0,
        favorite: true,
        photo: "/images/pad-thai.jpg"
      }
    ];
    setLoading(true);
    try {
      // ลองเรียก API ก่อน ถ้าไม่ได้ใช้ sample data
      const apiData = await api.list();
      setItems(apiData);
    } catch (error) {
      console.log('API not available, using sample data');
      setItems(sampleData);
    }
    setLoading(false);
  })(); }, []);

  const cuisines = useMemo(()=> Array.from(new Set(items.map(r=>r.cuisine).filter(Boolean))).sort(), [items]);

  const list = useMemo(() => {
    let arr = [...items];
    if(q.trim()){
      const qq = q.toLowerCase();
      arr = arr.filter(r => (r.name||"").toLowerCase().includes(qq) || (r.location||"").toLowerCase().includes(qq));
    }
    if(filters.cuisine!=="all") arr = arr.filter(r => r.cuisine===filters.cuisine);
    if(filters.onlyFav) arr = arr.filter(r => !!r.favorite);
    const sorters = {
      name_asc:(a,b)=>(a.name||"").localeCompare(b.name||""),
      recent_desc:(a,b)=>(b.updatedAt||0)-(a.updatedAt||0),
    };
    return arr.sort(sorters[filters.sort]||sorters.name_asc);
  }, [items,q,filters]);

  async function addQuick(){
    const name = prompt("Restaurant name?"); if(!name) return;
    const cuisine = prompt("Cuisine?") || "Other";
    const created = await api.create({ name, cuisine });
    setItems(prev=>[created,...prev]);
  }
  async function toggleFav(r){
    const patched = await api.patch(r.id, { favorite: !r.favorite });
    setItems(prev=>prev.map(x=>x.id===r.id?patched:x));
  }

  return (
    <>
      <div className="card" style={{marginBottom:16}}>
        <div className="row wrap" style={{gap:10}}>
          <Searchbar value={q} onChange={setQ}/>
          <FilterPanel cuisines={cuisines} value={filters} onChange={setFilters}/>
          <div className="right"><button onClick={addQuick}>+ Quick add</button></div>
        </div>
      </div>

      {loading ? <div className="small">Loading…</div> :
       list.length===0 ? <div className="empty">No restaurants matched.</div> :
       <div className="grid">{list.map(r => <RestaurantCard key={r.id} r={r} onToggleFav={toggleFav}/>)}</div>}
    </>
  );
}
