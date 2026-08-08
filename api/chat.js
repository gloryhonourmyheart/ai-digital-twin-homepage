// Vercel Serverless Function
// 部署到 Vercel 后，此接口自动挂在 /api/chat
// 前端调用: POST /api/chat   body: { messages: [...] }
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持 POST 请求" });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "缺少 messages 参数" });
  }

  const endpoint =
    process.env.LLM_ENDPOINT ||
    "https://api.deepseek.com/v1/chat/completions";
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL || "deepseek-chat";

  if (!apiKey) {
    return res.status(500).json({
      error: "服务端未配置 LLM_API_KEY",
      hint: "请在 Vercel Dashboard → Project → Settings → Environment Variables 中添加"
    });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.85,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: `AI 服务返回 ${response.status}`,
        detail: data.error?.message || JSON.stringify(data).slice(0, 200)
      });
    }

    const reply = data.choices[0].message.content.trim();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(502).json({ error: "AI 服务请求失败" });
  }
}
