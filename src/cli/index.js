import { generateReading } from "../reading/generate.js";
import { clearSpinner, printReading, printSpinner } from "./format.js";

printSpinner("Consulting the Stoics...");

try {
  const reading = await generateReading();
  clearSpinner();
  printReading(reading);
} catch (err) {
  clearSpinner();
  console.error("\n" + err.message);
  console.error("Make sure Ollama is running and the model is installed.");
  console.error("Run: ollama pull llama3.1:8b");
  process.exit(1);
}
