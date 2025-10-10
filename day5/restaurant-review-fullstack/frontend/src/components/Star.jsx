import React from "react";

export default function Star({ filled=false, size=18 }){
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#f59e0b" : "none"}
      stroke="#f59e0b"
      strokeWidth="2"
      style={{ verticalAlign: "middle" }}
    >
      <path d="M12 17.3l-6.16 3.73 1.77-7.14L2 8.9l7.19-.62L12 1.5l2.81 6.78L22 8.9l-5.61 4.99 1.77 7.14z" />
    </svg>
  );
}
