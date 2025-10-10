import { readFile, writeFile, mkdir } from "fs/promises";
export async function readJSON(absPath, fallback = null) {
  try { const buf = await readFile(absPath, "utf-8"); return JSON.parse(buf || "null") ?? fallback; }
  catch { return fallback; }
}
export async function writeJSON(absPath, data) {
  const dir = absPath.replace(/\\/g, "/").split("/").slice(0, -1).join("/");
  await mkdir(dir, { recursive: true }); await writeFile(absPath, JSON.stringify(data, null, 2), "utf-8");
}
