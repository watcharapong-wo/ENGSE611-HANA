import { Router } from "express";
import { join } from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/fileManager.js";
import { validateRestaurant } from "../middleware/validation.js";
import { customAlphabet } from "nanoid";

const router = Router();
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);
const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.substring(0, __filename.lastIndexOf("/"));
const DB_DIR = join(__dirname, "..", "data");
const REST_PATH = join(DB_DIR, "restaurants.json");
const REV_PATH = join(DB_DIR, "reviews.json");

async function getDB() {
  const restaurants = (await readJSON(REST_PATH, [])) ?? [];
  const reviews = (await readJSON(REV_PATH, [])) ?? [];
  return { restaurants, reviews };
}

/* GET /api/restaurants */
router.get("/", async (req, res) => {
  const { restaurants, reviews } = await getDB();
  // แนบ average rating (คำนวณฝั่งเซิร์ฟเวอร์ให้เลย)
  const withAvg = restaurants.map(r => {
    const rs = reviews.filter(v => v.restaurantId === r.id);
    const avg = rs.length ? rs.reduce((a, b) => a + (b.rating || 0), 0) / rs.length : 0;
    return { ...r, avg: Number(avg.toFixed(2)), reviewsCount: rs.length };
  });
  res.json(withAvg);
});

/* GET /api/restaurants/:id */
router.get("/:id", async (req, res) => {
  const { restaurants, reviews } = await getDB();
  const r = restaurants.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: "Not found" });
  const rs = reviews.filter(v => v.restaurantId === r.id).sort((a, b) => b.date - a.date);
  res.json({ ...r, reviews: rs });
});

/* POST /api/restaurants */
router.post("/", validateRestaurant, async (req, res) => {
  const { restaurants } = await getDB();
  const { name, cuisine = "Other", location = "", photo = "" } = req.body;
  const item = {
    id: nanoid(),
    name: String(name).trim(),
    cuisine,
    location,
    photo,
    favorite: false,
    updatedAt: Date.now()
  };
  await writeJSON(REST_PATH, [item, ...restaurants]);
  res.status(201).json(item);
});

/* PATCH /api/restaurants/:id */
router.patch("/:id", async (req, res) => {
  const { restaurants } = await getDB();
  const idx = restaurants.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const patch = { ...req.body, updatedAt: Date.now() };
  restaurants[idx] = { ...restaurants[idx], ...patch };
  await writeJSON(REST_PATH, restaurants);
  res.json(restaurants[idx]);
});

/* DELETE /api/restaurants/:id */
router.delete("/:id", async (req, res) => {
  const { restaurants, reviews } = await getDB();
  const before = restaurants.length;
  const after = restaurants.filter(x => x.id !== req.params.id);
  if (after.length === before) return res.status(404).json({ error: "Not found" });
  await writeJSON(REST_PATH, after);
  // ลบรีวิวที่เกี่ยวข้องด้วย
  await writeJSON(REV_PATH, reviews.filter(v => v.restaurantId !== req.params.id));
  res.json({ ok: true });
});

export default router;
