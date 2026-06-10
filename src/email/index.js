import { generateReading } from "../reading/generate.js";
import { recordReading } from "../reading/history.js";
import { sendReadingEmail } from "./send.js";

console.log("Fetching today's Stoic reading...");

try {
  const reading = await generateReading();
  console.log("Sending email...");
  await sendReadingEmail(reading);
  await recordReading(reading);
  console.log(`Email sent — ${reading.theme}`);
} catch (err) {
  console.error(err.message);
  console.error("Make sure Ollama is running and .env is configured.");
  process.exit(1);
}
