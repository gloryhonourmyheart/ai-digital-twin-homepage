# 肖以琛 · 个人主页 🌱

> 一个带 AI 数字分身聊天的个人主页，简约清爽风格。

![preview](preview.png)

## ✨ 特性

- 🤖 **数字分身聊天**：基于 LLM，用专属人设回答访客问题
- 🎨 **简约设计**：玻璃质感卡片 + 柔和渐变光斑
- 📱 **手机适配**：响应式布局，移动端单列展示
- 🔒 **API Key 隐藏**：通过后端代理转发，Key 不暴露在前端
- 📁 **作品集卡片**：展示你的项目和作品
- ⚡ **开箱即用**：本地关键词降级 + 真实 LLM 一键切换

---

## 📁 项目结构

```
my-homepage/
├── index.html          # 主页结构
├── styles.css          # 样式
├── script.js           # 前端逻辑 + 聊天 UI
├── server.js           # Node.js 代理服务器（托管前端 + 转发 AI 请求）
├── package.json        # 后端依赖
├── .env.example        # 环境变量模板（复制为 .env 使用）
├── .gitignore          # Git 忽略规则
├── api/
│   └── chat.js         # Vercel Serverless 函数版本
└── vercel.json         # Vercel 配置（SPA 路由回退）
```

---

## 🚀 快速开始（推荐：Vercel 一键部署）

Vercel 是最推荐的方案，**一次部署同时搞定前端 + AI 代理**，而且有免费额度。

### 第 1 步：推送到 GitHub

```bash
cd my-homepage
git init
git add .
git commit -m "init: 个人主页 v1"
git remote add origin https://github.com/gloryhonourmyheart/my-homepage.git
git push -u origin main
```

### 第 2 步：Vercel 部署

1. 打开 [vercel.com](https://vercel.com/)，用 GitHub 账号登录
2. 点右上角 **「Add New Project」**
3. 选择你刚推的 `my-homepage` 仓库
4. Framework 选 **「Other」**
5. **关键一步**：在 **Environment Variables** 里添加：

   | Key | Value |
   |-----|-------|
   | `LLM_API_KEY` | 你的 DeepSeek API Key |
   | `LLM_ENDPOINT` | （可选）留空默认用 DeepSeek |
   | `LLM_MODEL` | （可选）留空默认用 deepseek-chat |

6. 点 **「Deploy」**，等 30 秒就部署好了

### 第 3 步：修改前端代理地址

部署完成后 Vercel 会给你一个域名，比如 `https://my-homepage-xxx.vercel.app`。

打开 `script.js` 第 15 行，把 `PROXY_URL` 改成你的 Vercel 域名：

```js
const PROXY_URL = "https://my-homepage-xxx.vercel.app/api/chat";
```

> 💡 Vercel 部署时前端和 serverless 同域，`PROXY_URL` 留空也能用（默认请求 `/api/chat`）

### 第 4 步：访问你的网站

打开 Vercel 给你的 URL，就能访问啦！

---

## 🧪 本地开发

### 环境要求
- Node.js 18+（如果没有，去 [nodejs.org](https://nodejs.org/) 下载）

### 启动步骤

```bash
# 1. 安装依赖
npm install

# 2. 配置 API Key
cp .env.example .env
# 然后编辑 .env，填入 LLM_API_KEY=你的key

# 3. 启动（后端会同时托管前端页面）
npm start
```

打开 http://localhost:3001 就能预览。

### 本地开发时的调用链路

```
浏览器  →  POST /api/chat  →  server.js  →  DeepSeek API
           (前端同域访问)      (读取 .env 中的 Key)
```

---

## 📦 方案二：GitHub Pages + 独立后端

如果你想用 GitHub Pages 托管前端，需要单独部署一个后端代理。

### 第 1 步：GitHub Pages 部署前端

1. 把项目推到 GitHub
2. 仓库 Settings → Pages → Branch 选 `main`，目录选 `/ (root)`
3. 等几分钟，访问 `https://gloryhonourmyheart.github.io/my-homepage/`

### 第 2 步：部署后端代理到 Render/Railway

**Render 方案**（render.com，有免费额度）：

1. 打开 render.com，用 GitHub 登录
2. 点 **「New +」** → **「Web Service」**
3. 选择你的仓库
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. 添加环境变量 `LLM_API_KEY` = 你的 Key
7. 点 Deploy

部署完成后 Render 会给你一个 URL，比如 `https://my-homepage-api.onrender.com`。

### 第 3 步：修改前端代理地址

打开 `script.js` 第 15 行：

```js
const PROXY_URL = "https://my-homepage-api.onrender.com/api/chat";
```

> ⚠️ Render 免费版会休眠，如果 API 偶尔慢是正常的。可以在 Render 里升级或加 keep-alive。

---

## ⚙️ 切换 AI 服务商

后端代理支持任意 OpenAI 兼容的 API。只需修改 `.env` 中的配置：

### 阿里云 DashScope（千问）
```
LLM_ENDPOINT=https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
LLM_MODEL=qwen-turbo
```

### 硅基流动 SiliconFlow
```
LLM_ENDPOINT=https://api.siliconflow.cn/v1/chat/completions
LLM_MODEL=deepseek-v3
```

### 百度千帆
```
LLM_ENDPOINT=https://qianfan.baidubce.com/v2/chat/completions
LLM_MODEL=ERNIE-Bot-turbo
```

---

## ✏️ 自定义内容

### 修改个人信息

编辑 `index.html`：
- 名字、介绍、兴趣标签：直接改对应文本
- 头像：替换 `<img class="avatar" src="...">` 的 URL
- 联系方式：改 `mailto:` 和 GitHub 链接

### 修改数字分军人设

编辑 `script.js` 中的 `BOT_PERSONA` 变量，按现有格式修改即可。

### 添加/修改作品集

编辑 `index.html` 中的 `.project-grid` 区块，复制一个 `<a class="project-card">` 块修改内容即可。

### 修改配色

编辑 `styles.css` 顶部的 CSS 变量：
```css
--mint: #a7f3d0;   /* 薄荷绿 */
--sky: #b0e2ff;    /* 天蓝 */
--lavender: #d8c7f0; /* 薰衣草紫 */
```

---

## 🔐 关于 API Key 安全

- **永远不要**把 API Key 直接写在前端代码里提交到 Git
- `.env` 文件已在 `.gitignore` 中，不会被提交
- Vercel/Render 的环境变量面板里配置的 Key 只在服务端可见
- 前端代码只能看到 `PROXY_URL`，看不到任何 Key

---

## 📄 License

MIT © 2026 肖以琛
