import { Ollama } from "ollama";
import { config } from "../config.js";

const ollama = new Ollama({ host: config.ollamaHost });
import { getDateContext } from "./date-context.js";
import { buildPrompt } from "./prompt.js";
import { loadRecentThemes } from "./history.js";

const READING_SCHEMA = {
  theme: "",
  quote: "",
  author: "",
  source: "",
  explanation: "",
  reflection: "",
  practice: "",
};

export async function generateReading(date = new Date()) {
  const ctx = getDateContext(date);
  const recentThemes = await loadRecentThemes();
  const { system, user } = buildPrompt(ctx, recentThemes);

  const response = await ollama.chat({
    host: config.ollamaHost,
    model: config.ollamaModel,
    format: "json",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  let parsed;
  try {
    parsed = JSON.parse(response.message.content);
  } catch {
    throw new Error("Ollama returned invalid JSON. Try running again.");
  }

  const reading = { ...READING_SCHEMA, ...parsed, date: ctx.displayDate };

  for (const key of Object.keys(READING_SCHEMA)) {
    if (!reading[key]?.trim()) {
      throw new Error(`Ollama response missing field: ${key}`);
    }
  }

  return reading;
}
