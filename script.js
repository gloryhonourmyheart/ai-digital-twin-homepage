// ============ API 代理配置 ============
const PROXY_URL = "";
const API_ENDPOINT = PROXY_URL || "/api/chat";

// ============ 数字分身人设 ============
const BOT_PERSONA = `你是以琛的数字分身，性格亲切、自然、有点小幽默，像朋友一样聊天。
以下是关于以琛的信息，回答时可以灵活引用：

【基本信息】
- 名字：肖以琛
- 身份：03 年的全栈开发工程师
- 正在学习用 AI 做产品

【最近在做】
- 搭自己的个人主页
- 整理作品集和项目方向
- 寻找值得 5-10 年深耕的领域

【兴趣】
AI 应用、天文、音乐、哲学、放空、猫猫狗狗、写作、旅行

【擅长/关心的方向】
AI 应用、知识整理、内容表达

【性格特点】
喜欢天南海北、随心所欲地畅聊

【联系方式】
- 邮箱：3205553113@qq.com
- GitHub：https://github.com/gloryhonourmyheart

【回答风格】
- 用中文回答
- 语气亲切自然，像朋友聊天，不要太官方
- 适当使用 emoji，但不要过多
- 如果被问到作品集，老实说正在整理中
- 如果不确定的问题，坦诚说"这个我不太确定，不过你可以直接问以琛本人～"
- 回答要简洁有温度，不要太长`;

// ============ 本地知识库（降级方案） ============
const KNOWLEDGE = [
  {
    keys: ["在做什么", "现在", "最近", "忙", "在干", "在做啥"],
    answer: "最近在搭自己的个人主页，同时整理作品集和项目方向。更长远一点，想找一个值得 5-10 年深耕的领域，目前在 AI 应用方向上探索得比较多 🌱"
  },
  {
    keys: ["作品", "项目", "做了什么", "成果", "portfolio"],
    answer: "作品集正在整理中 🛠️ 方向上偏 AI 应用、知识整理和内容表达。你可以先看看他的 GitHub，或者直接联系他要最新的进展～"
  },
  {
    keys: ["联系", "怎么找", "邮箱", "微信", "方式", "找你", "email", "contact"],
    answer: "点击页面上的邮箱图标就可以复制他的邮箱啦，或者看看他的 GitHub 主页 github.com/gloryhonourmyheart 👋"
  },
  {
    keys: ["兴趣", "喜欢", "爱好", "业余", "hobby"],
    answer: "他的兴趣挺杂的：AI 应用、天文、音乐、哲学、放空、猫猫狗狗、写作、旅行。一个有意思的记忆点——他喜欢天南海北、随心所欲地畅聊 😄"
  },
  {
    keys: ["你是谁", "介绍", "自我", "你是", "以琛", "who"],
    answer: "我是以琛的数字分身 🤖 帮他回答一些常见问题。他是 03 年的全栈开发工程师，正在学习用 AI 做产品。问我任何关于他的事都行～"
  },
  {
    keys: ["技术", "栈", "会什么", "擅长", "技能", "skill"],
    answer: "他是全栈开发程序员，关心 AI 应用、知识整理和内容表达这几个方向。具体技术栈可以直接问他本人，这块他比我清楚 😄"
  },
  {
    keys: ["年龄", "多大", "几岁", "生日", "old"],
    answer: "03 年的，具体的就让他自己告诉你啦～ 😉"
  },
  {
    keys: ["你好", "hi", "hello", "嗨", "在吗", "hey"],
    answer: "你好呀 👋 我是以琛的数字分身。你可以问我他现在在做什么、有哪些作品、怎么联系他，或者他的兴趣爱好～"
  }
];

const FALLBACK_ANSWER =
  "这个问题我可能答得不够准 😅 你可以试试问我：他现在在做什么、有哪些作品、怎么联系他，或者他的兴趣。当然你也可以直接找他本人畅聊～";

const WELCOME =
  "嗨 👋 我是以琛的数字分身。有什么想了解的，尽管问吧～比如「你现在在做什么？」";

// ============ 邮箱复制到剪贴板 ============
const EMAIL = "3205553113@qq.com";

function copyEmail() {
  navigator.clipboard.writeText(EMAIL).then(() => {
    showToast("邮箱已复制 ✨");
  }).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = EMAIL;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); showToast("邮箱已复制 ✨"); }
    catch { showToast("复制失败，请手动添加：" + EMAIL); }
    document.body.removeChild(ta);
  });
}

function showToast(text) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 1800);
}

// ============ 音乐播放器 ============
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const iconPlay = playBtn?.querySelector(".icon-play");
const iconPause = playBtn?.querySelector(".icon-pause");
const musicArt = document.getElementById("music-art");
const progressFill = document.getElementById("progress-fill");
const progressBar = document.getElementById("progress-bar");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");

function formatTime(s) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function togglePlay() {
  if (!audio) return;
  if (audio.paused) {
    audio.play().then(() => {
      iconPlay.style.display = "none";
      iconPause.style.display = "";
      musicArt.classList.add("playing");
    }).catch(() => showToast("音频加载中…"));
  } else {
    audio.pause();
    iconPlay.style.display = "";
    iconPause.style.display = "none";
    musicArt.classList.remove("playing");
  }
}

function updateProgress() {
  if (!audio) return;
  const pct = (audio.currentTime / audio.duration) * 100 || 0;
  progressFill.style.width = pct + "%";
  timeCurrent.textContent = formatTime(audio.currentTime);
}

function seek(e) {
  if (!audio || !audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
}

// ============ 日历 ============
(function initCalendar() {
  const grid = document.getElementById("cal-grid");
  const title = document.getElementById("cal-title");
  const prev = document.getElementById("cal-prev");
  const next = document.getElementById("cal-next");
  const todayBtn = document.getElementById("cal-today");
  if (!grid) return;

  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth(); // 0-indexed

  const weekdaysCN = ["日", "一", "二", "三", "四", "五", "六"];

  function renderCalendar() {
    grid.innerHTML = "";
    const firstDay = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    // 周一为一周开始
    let startDay = firstDay.getDay(); // 0=Sun
    startDay = startDay === 0 ? 6 : startDay - 1;

    title.textContent = `${viewYear} 年 ${viewMonth + 1} 月`;

    // 上月剩余
    for (let i = startDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const cell = makeDayCell(d, true, startDay - 1 - i);
      grid.appendChild(cell);
    }

    // 本月
    const todayStr = today.toDateString();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(viewYear, viewMonth, i);
      const cell = makeDayCell(i, false, date.getDay(), date.toDateString() === todayStr);
      grid.appendChild(cell);
    }

    // 下月补齐
    const totalCells = grid.children.length;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const cell = makeDayCell(i, true, new Date(viewYear, viewMonth + 1, i).getDay());
      grid.appendChild(cell);
    }
  }

  function makeDayCell(num, other, dow, isToday) {
    const el = document.createElement("div");
    el.className = "cal-day";
    if (other) el.classList.add("other");
    if (isToday) el.classList.add("today");
    if ((dow === 0 || dow === 6) && !isToday) el.classList.add("weekend");
    el.textContent = num;
    if (!isToday && !other) {
      el.title = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(num).padStart(2, "0")}`;
    }
    return el;
  }

  prev.addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  });
  next.addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  });
  todayBtn?.addEventListener("click", () => {
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    renderCalendar();
  });

  renderCalendar();
})();

// ============ 时钟 + 问候语 ============
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const el = document.getElementById("clock");
  if (el) el.textContent = `${hh}:${mm}`;

  const greet = document.getElementById("greeting");
  if (greet) {
    const h = now.getHours();
    let text;
    if (h < 6) text = "Good Night 🌙";
    else if (h < 11) text = "Good Morning ☀️";
    else if (h < 14) text = "Good Noon 🍚";
    else if (h < 18) text = "Good Afternoon ☕";
    else if (h < 22) text = "Good Evening ✨";
    else text = "Good Night 🌙";
    greet.textContent = text;
  }
}

// ============ DOM ============
const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// ============ 渲染消息 ============
function addMessage(text, who = "bot") {
  const wrap = document.createElement("div");
  wrap.className = `msg ${who}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  chatBox.appendChild(wrap);
  chatBox.scrollTop = chatBox.scrollHeight;
  return bubble;
}

function addTyping() {
  const wrap = document.createElement("div");
  wrap.className = "msg bot typing";
  wrap.id = "typing-indicator";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = "<span></span><span></span><span></span>";
  wrap.appendChild(bubble);
  chatBox.appendChild(wrap);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function typeWriter(text) {
  return new Promise((resolve) => {
    addTyping();
    setTimeout(() => {
      removeTyping();
      const bubble = addMessage("", "bot");
      let i = 0;
      const step = Math.max(1, Math.round(text.length / 80));
      const timer = setInterval(() => {
        bubble.textContent = text.slice(0, i);
        chatBox.scrollTop = chatBox.scrollHeight;
        i += step;
        if (i >= text.length) {
          bubble.textContent = text;
          clearInterval(timer);
          resolve();
        }
      }, 18);
    }, 500 + Math.random() * 400);
  });
}

// ============ 本地匹配（降级） ============
function localAnswer(question) {
  const q = question.toLowerCase().trim();
  if (!q) return null;
  for (const item of KNOWLEDGE) {
    if (item.keys.some((k) => q.includes(k.toLowerCase()))) {
      return item.answer;
    }
  }
  return FALLBACK_ANSWER;
}

// ============ LLM 调用 ============
function isLLMConfigured() { return !!API_ENDPOINT; }

async function callLLM(question, history) {
  const messages = [
    { role: "system", content: BOT_PERSONA },
    ...history,
    { role: "user", content: question }
  ];

  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    let detail = `服务返回 ${res.status}`;
    try {
      const d = JSON.parse(errText);
      if (d.error) detail = d.error;
    } catch {}
    throw new Error(detail);
  }

  const data = await res.json();
  if (!data.reply) throw new Error("服务响应格式异常");
  return data.reply;
}

// ============ 对话历史 ============
const conversationHistory = [];
const MAX_HISTORY = 10;

function pushHistory(role, content) {
  conversationHistory.push({ role, content });
  if (conversationHistory.length > MAX_HISTORY) {
    conversationHistory.shift();
  }
}

// ============ 交互 ============
let isReplying = false;

async function handleAsk(question) {
  if (isReplying || !question.trim()) return;
  isReplying = true;
  setSendDisabled(true);

  addMessage(question, "user");
  input.value = "";

  let answer;
  if (isLLMConfigured()) {
    try {
      answer = await callLLM(question, [...conversationHistory]);
      pushHistory("user", question);
      pushHistory("assistant", answer);
    } catch (err) {
      console.warn("LLM 调用失败，降级到本地匹配：", err);
      answer = localAnswer(question) || FALLBACK_ANSWER;
    }
  } else {
    answer = localAnswer(question) || FALLBACK_ANSWER;
  }

  await typeWriter(answer);
  isReplying = false;
  setSendDisabled(false);
}

function setSendDisabled(disabled) {
  if (!sendBtn) return;
  sendBtn.disabled = disabled;
  const span = sendBtn.querySelector("span");
  if (span) span.textContent = disabled ? "…" : "发送";
}

// ============ 事件绑定 ============
document.getElementById("copy-email")?.addEventListener("click", copyEmail);
document.getElementById("foot-email")?.addEventListener("click", copyEmail);

playBtn?.addEventListener("click", togglePlay);
audio?.addEventListener("timeupdate", updateProgress);
audio?.addEventListener("loadedmetadata", () => {
  timeTotal.textContent = formatTime(audio.duration);
});
audio?.addEventListener("ended", () => {
  iconPlay.style.display = "";
  iconPause.style.display = "none";
  musicArt.classList.remove("playing");
});
progressBar?.addEventListener("click", seek);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleAsk(input.value);
});

document.getElementById("quick-asks").addEventListener("click", (e) => {
  const btn = e.target.closest(".quick");
  if (btn) handleAsk(btn.dataset.q);
});

// ============ 初始化 ============
window.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(updateClock, 30_000);
  setTimeout(() => typeWriter(WELCOME), 400);
});