const QUOTE_STYLES = [
  "Choose a lesser-known passage or idea, not the most famous line everyone has heard.",
  "Draw from a specific letter, meditation, or lecture rather than a generic summary.",
  "Let the quote be concrete and vivid — an image, a command, or a sharp observation.",
  "Prefer a quote that challenges comfort or complacency without being harsh.",
  "Find a quote that connects inner character to outward action.",
];

const MODERN_LENSES = [
  "work, focus, and doing your duty without applause",
  "relationships, patience, and seeing others with fairness",
  "anxiety, uncertainty, and what you cannot control",
  "habits, discipline, and small daily choices",
  "adversity, setback, and turning obstacles into practice",
  "ego, reputation, and the desire for approval",
];

export function buildPrompt(ctx, recentThemes = []) {
  const quoteStyle = QUOTE_STYLES[ctx.varietySeed % QUOTE_STYLES.length];
  const modernLens = MODERN_LENSES[(ctx.varietySeed >> 2) % MODERN_LENSES.length];
  const avoidList = recentThemes.length
    ? `Avoid repeating these recent themes: ${recentThemes.join(", ")}.`
    : "Choose a fresh theme not exhausted by cliché.";

  const system = `You are a scholar of Stoic philosophy writing a daily reading.
Respond ONLY with valid JSON matching this schema:
{
  "theme": "string — one Stoic virtue or concept, 2-5 words",
  "quote": "string — 1-3 sentences; authentic when possible, otherwise clearly inspired in the philosopher's voice",
  "author": "string — philosopher name and approximate dates",
  "source": "string — work or tradition, e.g. Meditations 4.3 or Letter 71",
  "explanation": "string — 2-3 sentences connecting the quote to modern life",
  "reflection": "string — one thoughtful question to carry through the day",
  "practice": "string — one small, concrete action for today"
}

Rules:
- Vary philosophers across days; today feature ${ctx.featuredPhilosopher.name} (${ctx.featuredPhilosopher.era}), known for ${ctx.featuredPhilosopher.works}.
- ${quoteStyle}
- ${avoidList}
- Do not repeat famous quotes like "You have power over your mind" unless reframed unusually.
- Keep language clear, warm, and practical — not academic or preachy.`;

  const user = `Daily Stoic reading for ${ctx.displayDate}.
Context: ${ctx.season} season, ${ctx.weekday} — ${ctx.weekdayAngle}.
Modern lens for the explanation: ${modernLens}.
Make today's theme distinct and specific.`;

  return { system, user };
}
