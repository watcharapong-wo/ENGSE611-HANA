import React, { useRef } from "react";

export default function ImportExport({ data, onImport, onClear }){
  const fileRef = useRef();

  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "movie-wishlist.json";
    document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const json = JSON.parse(reader.result);
        if(Array.isArray(json)){ onImport(json); }
        else alert("Invalid JSON format");
      }catch(err){ alert("Failed to parse JSON"); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="row wrap">
      <button onClick={download} type="button">Export JSON</button>
      <button onClick={()=>fileRef.current?.click()} type="button">Import JSON</button>
      <input type="file" accept="application/json" ref={fileRef} style={{display:"none"}} onChange={handleFile} />
      <button className="danger" onClick={onClear} type="button">Clear All</button>
    </div>
  );
}
