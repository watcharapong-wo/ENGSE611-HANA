import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRestaurant,
  createReview,
  updateReview,
  deleteReview,
} from "../api/api";
import StarRating from "../components/StarRating";
import ReviewForm from "../components/ReviewForm";

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const fetch = async () => {
    const res = await getRestaurant(id);
    setRestaurant(res.data);
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (!restaurant) return <div className="p-4">Loading...</div>;

  const total = (restaurant.reviews || []).reduce((a, b) => a + (b.rating || 0), 0);
  const count = (restaurant.reviews || []).length;
  const avg = count > 0 ? total / count : 0;

  const handleAddReview = async (data) => {
    await createReview({ ...data, restaurantId: id });
    setAdding(false);
    fetch();
  };

  const handleUpdateReview = async (rid, data) => {
    await updateReview(rid, data);
    setEditingReview(null);
    fetch();
  };

  const handleDeleteReview = async (rid) => {
    await deleteReview(rid);
    fetch();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button className="text-indigo-600 hover:underline mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <div className="text-gray-600">
          {restaurant.cuisine} · {restaurant.price} · {restaurant.location}
        </div>
        <div className="mt-1">
          <StarRating value={avg} onChange={() => {}} />
          <div className="text-sm text-gray-500 mt-1">
            {avg.toFixed(1)} ({count} reviews)
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reviews</h3>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            + Add Review
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-4 border rounded-lg p-3">
          <ReviewForm onSubmit={handleAddReview} onCancel={() => setAdding(false)} />
        </div>
      )}

      <div className="space-y-3">
        {restaurant.reviews.map((rv) => (
          <div key={rv.id} className="border rounded-lg p-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{rv.author || "Anonymous"}</div>
                <div className="text-xs text-gray-500">
                  {new Date(rv.createdAt).toLocaleString()}
                </div>
              </div>
              <StarRating value={rv.rating} onChange={() => {}} />
            </div>
            <p className="mt-2 text-sm">{rv.comment}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setEditingReview(rv)}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteReview(rv.id)}
                className="rounded border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>

            {editingReview && editingReview.id === rv.id && (
              <div className="mt-3 border rounded-lg p-3">
                <ReviewForm
                  initial={rv}
                  onSubmit={(data) => handleUpdateReview(rv.id, data)}
                  onCancel={() => setEditingReview(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
