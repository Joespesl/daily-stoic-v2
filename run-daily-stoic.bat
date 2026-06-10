@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo ERROR: Node.js is not installed or not on PATH.
  exit /b 1
)

where ollama >nul 2>&1
if errorlevel 1 (
  echo ERROR: Ollama is not installed or not on PATH.
  exit /b 1
)

curl -s http://127.0.0.1:11434/api/tags >nul 2>&1
if errorlevel 1 (
  echo Starting Ollama...
  start "" /B ollama serve
  timeout /t 12 /nobreak >nul
)

curl -s http://127.0.0.1:11434/api/tags >nul 2>&1
if errorlevel 1 (
  echo ERROR: Ollama did not become ready on port 11434.
  exit /b 1
)

node src/email/index.js
exit /b %ERRORLEVEL%
