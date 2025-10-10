import React from "react";

export default function Star({ filled, size = 24, onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className="cursor-pointer"
      style={{ width: size, height: size }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.5c.3-.92 1.74-.92 2.04 0l1.27 3.9c.14.43.54.73.99.73h4.1c.95 0 1.35 1.22.58 1.78l-3.32 2.41c-.37.27-.52.75-.38 1.19l1.27 3.91c.3.92-.76 1.68-1.54 1.12l-3.33-2.42a1.16 1.16 0 0 0-1.36 0l-3.33 2.42c-.78.56-1.84-.2-1.54-1.12l1.27-3.9c.14-.44-.01-.92-.38-1.19L3.54 9.91c-.77-.56-.37-1.78.58-1.78h4.1c.45 0 .85-.3.99-.73l1.27-3.9Z"
      />
    </svg>
  );
}
