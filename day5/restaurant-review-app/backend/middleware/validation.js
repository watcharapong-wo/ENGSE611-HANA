// ตัวอย่าง middleware ตรวจ request body อย่างง่าย
export function validateRestaurant(req, res, next) {
  const { name, cuisine } = req.body || {};
  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push("name is required (>=2 chars)");
  if (cuisine && String(cuisine).trim().length > 30) errors.push("cuisine too long");
  if (errors.length) return res.status(400).json({ errors });
  next();
}
