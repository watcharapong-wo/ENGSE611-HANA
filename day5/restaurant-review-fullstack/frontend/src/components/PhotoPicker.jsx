import React, { useState } from "react";

export default function PhotoPicker({ value="", onSave }) {
  const [url, setUrl] = useState(value);
  const [preview, setPreview] = useState(value);

  return (
    <div className="row" style={{gap:10, alignItems:"flex-start"}}>
      <img
        src={preview || "data:image/svg+xml;utf8,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88'><rect width='100%' height='100%' fill='#e5e7eb'/></svg>")}
        alt=""
        width={88} height={88}
        style={{borderRadius:12, objectFit:"cover", background:"#e5e7eb"}}
        onError={()=>setPreview("")}
      />
      <div style={{flex:1}}>
        <input
          placeholder="Photo URL (เช่น /images/siam.jpg หรือ https://…)"
          value={url}
          onChange={e=>{ setUrl(e.target.value); setPreview(e.target.value); }}
        />
        <div className="row" style={{marginTop:8, gap:8}}>
          <button type="button" onClick={()=>onSave(url)}>Save</button>
          <button type="button" onClick={()=>{ setUrl(""); setPreview(""); }}>Clear</button>
        </div>
      </div>
    </div>
  );
}
