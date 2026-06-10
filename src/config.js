import "dotenv/config";

export const config = {
  ollamaModel: process.env.OLLAMA_MODEL ?? "llama3.1:8b",
  ollamaHost: process.env.OLLAMA_HOST ?? "http://127.0.0.1:11434",
  gmailUser: process.env.GMAIL_USER,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
  historyFile: new URL("../.reading-history.json", import.meta.url),
  historyLimit: 14,
};

export function requireEmailConfig() {
  if (!config.gmailUser || !config.gmailAppPassword) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env");
    console.error("Copy .env.example to .env and add your Gmail app password.");
    process.exit(1);
  }
}
