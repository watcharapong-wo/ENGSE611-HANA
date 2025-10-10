// src/pages/RestaurantDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api.js";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewList from "../components/ReviewList.jsx";
import PhotoPicker from "../components/PhotoPicker.jsx";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await api.get(id);
      setRestaurant(r);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [id]);

  if (loading) return <div className="small">Loading…</div>;
  if (!restaurant) return <div className="empty">Not found</div>;

  const { name, cuisine, location, photo, favorite, reviews = [] } = restaurant;
  const avg = reviews.length
    ? (reviews.reduce((a, b) => a + (Number(b.rating) || 0), 0) / reviews.length).toFixed(2)
    : 0;

  // รูป fallback อัตโนมัติ
  const [imgSrc, setImgSrc] = useState(photo || "");
  useEffect(() => { setImgSrc(photo || ""); }, [photo]);

  return (
    <>
      <div className="row" style={{ gap: 10, marginBottom: 12 }}>
        <Link to="/"><button>← Back</button></Link>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="restaurant">
          <img
            className="thumb"
            src={imgSrc || `https://picsum.photos/seed/${encodeURIComponent(id)}/176/176`}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => {
              // ถ้ารูปเสีย ใช้ placeholder ในตัว
              setImgSrc(
                "data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='176' height='176'>
                       <rect width='100%' height='100%' fill='#e5e7eb'/>
                       <text x='50%' y='52%' font-family='sans-serif' font-size='14' text-anchor='middle' fill='#9ca3af'>No image</text>
                     </svg>`
                  )
              );
            }}
          />
          <div>
            <h2 style={{ margin: "0 0 6px" }}>{name}</h2>
            <div className="taglist" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span className="badge">{cuisine}</span>
              {location ? <span className="badge">{location}</span> : null}
              <span className="badge">Avg ⭐ {avg}</span>
              {favorite ? <span className="badge">★ Favorite</span> : null}
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* จัดการรูปของร้าน */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Restaurant Photo</h3>
          <PhotoPicker
            value={photo || ""}
            onSave={async (newUrl) => {
              await api.patch(id, { photo: newUrl || "" });
              await load();
            }}
          />
          <div className="sub" style={{ marginTop: 8 }}>
            แนะนำ: วางไฟล์ไว้ที่ <code>frontend/public/images</code> แล้วใช้ URL เช่น{" "}
            <code>/images/siam.jpg</code>
          </div>
        </div>

        {/* เพิ่มรีวิว */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Add Review</h3>
          <ReviewForm
            onSubmit={async (form) => {
              await api.addReview(id, form);
              await load();
            }}
          />
        </div>

        {/* รายการรีวิว */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <h3 style={{ marginTop: 0 }}>Reviews ({reviews.length})</h3>
          <ReviewList
            items={reviews}
            onEdit={async (rid, patch) => { await api.patchReview(rid, patch); await load(); }}
            onDelete={async (rid) => { await api.deleteReview(rid); await load(); }}
          />
        </div>
      </div>
    </>
  );
}
