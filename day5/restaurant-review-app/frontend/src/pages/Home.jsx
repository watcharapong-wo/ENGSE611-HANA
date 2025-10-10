import React, { useEffect, useState } from "react";
import {
  getRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
} from "../api/api";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantForm from "../components/RestaurantForm";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterQ, setFilterQ] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterMinRating, setFilterMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  const [isFormOpen, setFormOpen] = useState(false);
  const [editingRest, setEditingRest] = useState(null);

  const fetchAll = async () => {
    const res = await getRestaurants();
    let arr = res.data; // assume backend returns array
    // add averageRating & totalReviews to each item
    arr = arr.map((r) => {
      const total = (r.reviews || []).reduce((a, b) => a + (b.rating || 0), 0);
      const count = (r.reviews || []).length;
      return {
        ...r,
        totalReviews: count,
        averageRating: count > 0 ? total / count : 0,
      };
    });
    setRestaurants(arr);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = async (data) => {
    await createRestaurant(data);
    setFormOpen(false);
    fetchAll();
  };

  const handleEdit = async (data) => {
    if (editingRest) {
      await updateRestaurant(editingRest.id, data);
      setEditingRest(null);
      setFormOpen(false);
      fetchAll();
    }
  };

  const handleDelete = async (id) => {
    await deleteRestaurant(id);
    fetchAll();
  };

  // filtering & sorting logic
  const processed = restaurants
    .filter((r) => {
      const q = filterQ.trim().toLowerCase();
      const okQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);
      const okCuisine =
        filterCuisine === "All" || r.cuisine === filterCuisine;
      const okPrice = filterPrice === "All" || r.price === filterPrice;
      const okRating = r.averageRating >= filterMinRating;
      return okQ && okCuisine && okPrice && okRating;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.averageRating - a.averageRating;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        // newest — assuming r.createdAt exists
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const cuisines = Array.from(new Set(["All", ...restaurants.map((r) => r.cuisine)]));
  const prices = Array.from(new Set(["All", ...restaurants.map((r) => r.price)]));

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-6">
        <input
          type="text"
          placeholder="Search by name, cuisine, location"
          className="md:col-span-2 rounded border px-3 py-2"
          value={filterQ}
          onChange={(e) => setFilterQ(e.target.value)}
        />
        <select
          className="rounded border px-3 py-2"
          value={filterCuisine}
          onChange={(e) => setFilterCuisine(e.target.value)}
        >
          {cuisines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded border px-3 py-2"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        >
          {prices.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            className="w-full"
            value={filterMinRating}
            onChange={(e) => setFilterMinRating(Number(e.target.value))}
          />
          <div className="text-xs text-gray-600">{filterMinRating.toFixed(1)}</div>
        </div>
        <select
          className="rounded border px-3 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          onClick={() => {
            setEditingRest(null);
            setFormOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Restaurant
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {processed.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            onDetails={(r) => {
              // you can navigate or set a modal
            }}
            onEdit={(r) => {
              setEditingRest(r);
              setFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <RestaurantForm
              initial={editingRest}
              onSubmit={editingRest ? handleEdit : handleAdd}
              onCancel={() => {
                setFormOpen(false);
                setEditingRest(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
