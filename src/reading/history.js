import { readFile, writeFile } from "node:fs/promises";
import { config } from "../config.js";

export async function loadRecentThemes() {
  try {
    const raw = await readFile(config.historyFile, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data.themes) ? data.themes : [];
  } catch {
    return [];
  }
}

export async function recordReading(reading) {
  const themes = await loadRecentThemes();
  const next = [reading.theme, ...themes.filter((t) => t !== reading.theme)]
    .slice(0, config.historyLimit);

  await writeFile(
    config.historyFile,
    JSON.stringify({ themes: next, lastSent: new Date().toISOString() }, null, 2),
    "utf8",
  );
}
