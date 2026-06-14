# Daily Stoic Agent V2

An automated daily Stoic philosophy agent that generates a personalised reflection and delivers it to your Gmail inbox every morning at 6PM.

Built with Node.js, Ollama (Llama 3.2), and the Gmail API. Automated via Windows Task Scheduler.

---

## What It Does

- Runs daily at a scheduled time via Windows Task Scheduler  
- Rotates between three Stoic philosophers: Marcus Aurelius, Seneca, and Epictetus  
- Applies seasonal and weekday context to the prompt for relevance  
- Tracks a 14-day theme history to avoid repeating recent topics  
- Generates a quote, reflection, daily question, and small practice via Ollama (local LLM — no API cost)  
- Builds a responsive dark-themed HTML email with plain-text fallback  
- Sends directly to Gmail via the Gmail API

---

## Architecture

Task Scheduler (daily trigger)

        ↓

run-daily-stoic.bat

        ↓

index.js (orchestrator)

        ↓

src/cli/        → philosopher rotation, theme history, context builder

src/reading/    → Ollama prompt engine (Llama 3.2 local)

src/email/      → HTML email builder \+ Gmail API sender

---

## Stack

| Tool | Role |
| :---- | :---- |
| Node.js | Runtime |
| Ollama \+ Llama 3.2 | Local LLM — generates the Stoic reading |
| Gmail API | Email delivery |
| Windows Task Scheduler | Daily automation |

---

## Setup

### Prerequisites

- Node.js installed  
- Ollama installed and running locally (`ollama run llama3.2`)  
- A Google Cloud project with Gmail API enabled  
- OAuth credentials (`credentials.json`) from Google Cloud Console

### Install

git clone https://github.com/Joespesl/daily-stoic-v2.git

cd daily-stoic-v2

npm install

### Configure

Copy `.env.example` to `.env` and fill in your values:

GMAIL\_USER=your@gmail.com

GMAIL\_TO=your@gmail.com

OLLAMA\_MODEL=llama3.2

OLLAMA\_HOST=http://127.0.0.1:11434

GMAIL\_CREDENTIALS\_PATH=./credentials.json

GMAIL\_TOKEN\_PATH=./token.json

### Authenticate Gmail

Place your `credentials.json` from Google Cloud Console in the project root, then run:

node auth-gmail.js

Follow the OAuth flow in your browser. This generates `token.json` and only needs to be done once.

### Run manually

npm start

### Automate via Task Scheduler

1. Open Windows Task Scheduler  
2. Create Basic Task → Daily at your chosen time  
3. Action: Start a program  
4. Program: `C:\path\to\daily-stoic-v2\run-daily-stoic.bat`  
5. Start in: `C:\path\to\daily-stoic-v2`

---

## Design Decisions

**Local LLM only.** Ollama runs Llama 3.2 locally — no API costs, no data sent externally, runs indefinitely.

**Theme history tracker.** A 14-day rolling log prevents the agent from repeating Stoic themes. Each run logs the theme used and checks against recent history before generating.

**Philosopher rotation.** Marcus Aurelius, Seneca, and Epictetus rotate based on weekday and seasonal context — keeping the tone varied and relevant.

**Defensive .bat file.** `run-daily-stoic.bat` checks that Ollama is running before firing the agent, preventing silent failures.

**Separation of concerns.** CLI logic, reading generation, and email delivery are in separate modules — each does one thing.

---

## Project Context

This is part of a 30-day AI mastery sprint building a portfolio of real agent projects.

**V1** was built with Python and Gmail App Scripts — first end-to-end solo agent.  
**V2** is a full rebuild in Node.js with Cursor — improved architecture, prompt engineering, and automation.

Part of a larger agent portfolio: [github.com/Joespesl](https://github.com/Joespesl)

---

## Author

Joe Suchanek · Bratislava, Slovakia  
Senior Claims Advisor, Dell Technologies  
[github.com/Joespesl](https://github.com/Joespesl)  
