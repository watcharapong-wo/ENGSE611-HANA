import { Router } from "express";
import { join } from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/fileManager.js";
import { customAlphabet } from "nanoid";

const router = Router();
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.substring(0, __filename.lastIndexOf("/"));
const DB_DIR = join(__dirname, "..", "data");
const REST_PATH = join(DB_DIR, "restaurants.json");
const REV_PATH = join(DB_DIR, "reviews.json");

async function getDB() {
  return {
    restaurants: (await readJSON(REST_PATH, [])) ?? [],
    reviews: (await readJSON(REV_PATH, [])) ?? []
  };
}

/* GET /api/restaurants/:id/reviews */
router.get("/restaurants/:id/reviews", async (req, res) => {
  const { restaurants, reviews } = await getDB();
  if (!restaurants.find(r => r.id === req.params.id)) return res.status(404).json({ error: "Restaurant not found" });
  const list = reviews.filter(v => v.restaurantId === req.params.id).sort((a, b) => b.date - a.date);
  res.json(list);
});

/* POST /api/restaurants/:id/reviews */
router.post("/restaurants/:id/reviews", async (req, res) => {
  const { restaurants, reviews } = await getDB();
  if (!restaurants.find(r => r.id === req.params.id)) return res.status(404).json({ error: "Restaurant not found" });

  const { name, text, rating = 0 } = req.body || {};
  if (!name || !text) return res.status(400).json({ error: "name & text are required" });

  const review = { id: nanoid(), restaurantId: req.params.id, name, text, rating: Number(rating) || 0, date: Date.now() };
  await writeJSON(REV_PATH, [review, ...reviews]);

  // อัปเดต updatedAt ของร้าน
  const copy = [...restaurants];
  const idx = copy.findIndex(r => r.id === req.params.id);
  copy[idx] = { ...copy[idx], updatedAt: Date.now() };
  await writeJSON(REST_PATH, copy);

  res.status(201).json(review);
});

/* PATCH /api/reviews/:rid */
router.patch("/reviews/:rid", async (req, res) => {
  const { reviews } = await getDB();
  const idx = reviews.findIndex(v => v.id === req.params.rid);
  if (idx === -1) return res.status(404).json({ error: "Review not found" });
  reviews[idx] = { ...reviews[idx], ...req.body, date: Date.now() };
  await writeJSON(REV_PATH, reviews);
  res.json(reviews[idx]);
});

/* DELETE /api/reviews/:rid */
router.delete("/reviews/:rid", async (req, res) => {
  const { reviews } = await getDB();
  const before = reviews.length;
  const after = reviews.filter(v => v.id !== req.params.rid);
  if (after.length === before) return res.status(404).json({ error: "Review not found" });
  await writeJSON(REV_PATH, after);
  res.json({ ok: true });
});

export default router;
