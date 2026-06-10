function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildPlainText(reading) {
  return [
    `THE DAILY STOIC — ${reading.date}`,
    "",
    `Theme: ${reading.theme}`,
    "",
    `"${reading.quote}"`,
    `— ${reading.author}`,
    `${reading.source}`,
    "",
    "Meaning",
    reading.explanation,
    "",
    "Today's Question",
    reading.reflection,
    "",
    "Small Practice",
    reading.practice,
    "",
    "Live according to nature. Practice virtue.",
  ].join("\n");
}

export function buildHtml(reading) {
  const theme = escapeHtml(reading.theme);
  const quote = escapeHtml(reading.quote);
  const author = escapeHtml(reading.author);
  const source = escapeHtml(reading.source);
  const explanation = escapeHtml(reading.explanation);
  const reflection = escapeHtml(reading.reflection);
  const practice = escapeHtml(reading.practice);
  const date = escapeHtml(reading.date);
  const preheader = escapeHtml(`${reading.theme} — ${reading.reflection}`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>The Daily Stoic — ${theme}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .shell { padding: 20px 12px !important; }
      .card { border-radius: 0 !important; }
      .section { padding-left: 24px !important; padding-right: 24px !important; }
      .hero { padding: 28px 24px 24px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#0a0a0b;font-family:Georgia,'Times New Roman',serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="shell" style="background:#0a0a0b;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="max-width:600px;background:linear-gradient(180deg,#17171a 0%,#121214 100%);border:1px solid #2a2a30;border-radius:14px;overflow:hidden;">

          <tr>
            <td class="hero" style="padding:36px 40px 28px;border-bottom:1px solid #2a2a30;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#67e8f9;font-family:Arial,Helvetica,sans-serif;">The Daily Stoic</p>
              <h1 style="margin:0 0 10px;font-size:28px;line-height:1.2;font-weight:normal;color:#f8fafc;">${theme}</h1>
              <p style="margin:0;font-size:14px;color:#8b8b95;font-family:Arial,Helvetica,sans-serif;">${date}</p>
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:32px 40px 0;">
              <p style="margin:0 0 14px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d946ef;font-family:Arial,Helvetica,sans-serif;">Quote</p>
              <blockquote style="margin:0;padding:0 0 0 18px;border-left:3px solid #3b3b45;">
                <p style="margin:0 0 14px;font-size:19px;line-height:1.75;font-style:italic;color:#f1f5f9;">&ldquo;${quote}&rdquo;</p>
              </blockquote>
              <p style="margin:0;font-size:15px;color:#67e8f9;">&mdash; ${author}</p>
              <p style="margin:6px 0 0;font-size:13px;color:#73737d;font-family:Arial,Helvetica,sans-serif;">${source}</p>
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:28px 40px 0;">
              <hr style="border:none;border-top:1px solid #2a2a30;margin:0;">
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:28px 40px 0;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#4ade80;font-family:Arial,Helvetica,sans-serif;">Meaning</p>
              <p style="margin:0;font-size:16px;line-height:1.8;color:#d4d4d8;">${explanation}</p>
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:28px 40px 0;">
              <hr style="border:none;border-top:1px solid #2a2a30;margin:0;">
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:28px 40px 0;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#60a5fa;font-family:Arial,Helvetica,sans-serif;">Today&rsquo;s Question</p>
              <p style="margin:0;font-size:16px;line-height:1.8;font-style:italic;color:#e4e4e7;">${reflection}</p>
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:28px 40px 0;">
              <hr style="border:none;border-top:1px solid #2a2a30;margin:0;">
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:28px 40px 0;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#facc15;font-family:Arial,Helvetica,sans-serif;">Small Practice</p>
              <p style="margin:0;font-size:16px;line-height:1.8;color:#e4e4e7;">${practice}</p>
            </td>
          </tr>

          <tr>
            <td class="section" style="padding:36px 40px 32px;">
              <hr style="border:none;border-top:1px solid #2a2a30;margin:0 0 20px;">
              <p style="margin:0;font-size:12px;letter-spacing:1px;text-align:center;color:#5c5c66;font-family:Arial,Helvetica,sans-serif;">Live according to nature. Practice virtue.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
