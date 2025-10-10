import React, { useMemo, useState } from "react";

export default function NameChanger() {
  const [name, setName] = useState("");

  const wordCount = useMemo(() => {
    const trimmed = name.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [name]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">การเปลี่ยนชื่อ + นับจำนวนคำ</h2>
      <input
        className="border rounded px-3 py-2 w-full max-w-sm"
        placeholder="พิมพ์ชื่อ/ข้อความ"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p className="text-gray-600 mt-2">สวัสดี <b>{name || "..."}</b></p>
      <p className="text-sm text-gray-500">จำนวนคำ: <b>{wordCount}</b></p>
    </div>
  );
}
