import React, { useState } from "react";
import PhotoPicker from "./PhotoPicker";

export default function RestaurantForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [cuisine, setCuisine] = useState(initial?.cuisine || "Thai");
  const [price, setPrice] = useState(initial?.price || "฿฿");
  const [location, setLocation] = useState(initial?.location || "");
  const [photo, setPhoto] = useState(initial?.photo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, cuisine, price, location, photo });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <label className="block text-sm">
        <span className="text-gray-600">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="text-gray-600">Cuisine</span>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="text-gray-600">Price</span>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="text-gray-600">Location</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </label>
      <div className="md:col-span-2">
        <span className="text-gray-600 text-sm">Photo</span>
        <PhotoPicker value={photo} onChange={setPhoto} />
      </div>
      <div className="md:col-span-2 flex gap-2 mt-2">
        <button
          type="submit"
          className="rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
