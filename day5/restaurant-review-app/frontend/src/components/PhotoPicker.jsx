import React, { useRef } from "react";

export default function PhotoPicker({ value, onChange }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="h-20 w-20 overflow-hidden rounded border bg-gray-100">
        {value ? (
          <img src={value} alt="preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No photo
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          Upload
        </button>
        {value && (
          <button
            type="button"
            className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
            onClick={() => onChange(undefined)}
          >
            Remove
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
