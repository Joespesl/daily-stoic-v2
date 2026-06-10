const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  white: "\x1b[97m",
  gray: "\x1b[90m",
};

function wrap(text, width) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= width) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function printLines(text, color, indent = "  ", width = 56) {
  wrap(text, width).forEach((l) => console.log(color + indent + l + c.reset));
}

function divider(char = "─", width = 62) {
  console.log(c.gray + char.repeat(width) + c.reset);
}

function section(label, color) {
  console.log(c.bold + color + `  ${label}` + c.reset);
}

export function printReading(reading) {
  console.log();
  console.log(c.bold + c.cyan + "  ❆ THE DAILY STOIC" + c.reset);
  console.log(c.dim + c.gray + "  " + reading.date + c.reset);
  console.log();
  divider("═");
  console.log();

  section("THEME", c.yellow);
  console.log(c.bold + c.white + "  " + reading.theme + c.reset);
  console.log();

  section("QUOTE", c.magenta);
  printLines(`"${reading.quote}"`, c.italic + c.white);
  console.log();
  console.log(c.dim + c.cyan + "      — " + reading.author + c.reset);
  console.log(c.dim + c.gray + "        " + reading.source + c.reset);
  console.log();

  divider();
  console.log();

  section("MEANING", c.green);
  printLines(reading.explanation, c.white);
  console.log();

  divider();
  console.log();

  section("TODAY'S QUESTION", c.blue);
  printLines(reading.reflection, c.italic + c.white);
  console.log();

  divider();
  console.log();

  section("SMALL PRACTICE", c.yellow);
  printLines(reading.practice, c.white);
  console.log();

  divider("═");
  console.log();
  console.log(c.dim + c.gray + "  Live according to nature. Practice virtue." + c.reset);
  console.log();
}

export function printSpinner(message) {
  process.stdout.write(c.dim + c.gray + `  ${message}\r` + c.reset);
}

export function clearSpinner() {
  process.stdout.write("  " + " ".repeat(40) + "\r");
}
