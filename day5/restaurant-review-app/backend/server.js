import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import restaurants from "./routes/restaurants.js";
import reviews from "./routes/reviews.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.use("/api/restaurants", restaurants);      // /api/restaurants/*
app.use("/api", reviews);                       // /api/restaurants/:id/reviews, /api/reviews/:rid

app.use((_, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  console.log(`API ready at http://localhost:${PORT}`);
});
