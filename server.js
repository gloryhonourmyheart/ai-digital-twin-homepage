require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// 托管静态文件（前端页面）
app.use(express.static(path.join(__dirname)));

// AI 代理接口
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

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
      hint: "请在 .env 文件或环境变量中设置 LLM_API_KEY"
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
    res.json({ reply });
  } catch (err) {
    console.error("[AI Proxy Error]", err);
    res.status(502).json({ error: "AI 服务请求失败，请稍后重试" });
  }
});

app.listen(PORT, () => {
  console.log(`\n  🌐 服务已启动: http://localhost:${PORT}`);
  console.log(`  🤖 AI 代理:   http://localhost:${PORT}/api/chat\n`);
});
