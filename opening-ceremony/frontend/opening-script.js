// Opening Ceremony Frontend script (Form + Dashboard)

const CONFIG = window.OC_CONFIG || { BACKEND_URL: 'https://blockchain-lab-website-production.up.railway.app/' };
const BACKEND_URL = CONFIG.BACKEND_URL?.replace(/\/$/, '') || '';

function $(sel) { return document.querySelector(sel); }
function createEl(tag, cls) { const el = document.createElement(tag); if (cls) el.className = cls; return el; }

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
}

async function fetchCount() {
  if (!BACKEND_URL) return 0;
  try {
    const res = await fetch(`${BACKEND_URL}/api/wishes/count`);
    const data = await res.json();
    return data.count ?? 0;
  } catch { return 0; }
}

async function fetchLatest(limit = 30) {
  if (!BACKEND_URL) return [];
  try {
    const res = await fetch(`${BACKEND_URL}/api/wishes/latest?limit=${limit}`);
    return await res.json();
  } catch { return []; }
}

function mountDashboard() {
  // New bubble dashboard
  const heroEl = $('#heroNumber');
  const stageEl = $('#bubbleStage');
  if (!heroEl || !stageEl) return;

  // Initial fetch
  Promise.all([fetchCount(), fetchLatest(60)]).then(([count, items]) => {
    heroEl.textContent = String(count);
    renderBubbles(items);
  });

  // Socket.io live updates + polling fallback
  let socketConnected = false;
  let lastRenderedId = null;
  async function refreshLatest() {
    try {
      const items = await fetchLatest(30);
      if (!items || !items.length) return;
      // If first load, render and memorize latest id
      if (!lastRenderedId) {
        renderBubbles(items);
        lastRenderedId = items[0]?.id || items[0]?.ID || null;
        return;
      }
      // Prepend only new items that were not seen yet
      const newOnes = [];
      for (const it of items) {
        const id = it.id || it.ID;
        if (id === lastRenderedId) break;
        newOnes.push(it);
      }
      if (newOnes.length) {
        for (let i = newOnes.length - 1; i >= 0; i--) spawnBubble(newOnes[i]);
        lastRenderedId = items[0]?.id || items[0]?.ID || lastRenderedId;
        // Update count as well
        const count = await fetchCount();
        animateCount(heroEl, count);
      }
    } catch {}
  }

  // Try to connect socket first
  if (typeof io !== 'undefined' && BACKEND_URL) {
    try {
      const socket = io(BACKEND_URL, { transports: ['websocket'], reconnection: true });
      socket.on('connect', () => { socketConnected = true; });
      socket.on('disconnect', () => { socketConnected = false; });
      socket.on('wish:count', (data) => {
        if (!data || typeof data.count !== 'number') return;
        animateCount(heroEl, data.count);
      });
      socket.on('wish:new', (wish) => {
        spawnBubble(wish);
        lastRenderedId = lastRenderedId || wish.id;
      });
    } catch {}
  }

  // Polling fallback every 5s when socket isn't connected
  setInterval(() => {
    if (!socketConnected) refreshLatest();
  }, 5000);

  function renderBubbles(items) {
    stageEl.innerHTML = '';
    // Spawn limited initial bubbles
    const max = Math.min(items.length, 18);
    for (let i = 0; i < max; i++) {
      spawnBubble(items[i], false);
    }
  }

  function spawnBubble(item, animateIn = true) {
    const bubble = createEl('div', 'oc-bubble');
    const name = createEl('span', 'name');
    name.textContent = item.fullName || item.full_name || 'Guest';
    const msg = createEl('span', 'msg');
    msg.textContent = item.message || '';
    bubble.append(name, msg);

    const size = 160 + Math.random() * 120; // 160-280px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${Math.max(90, size * 0.55)}px`;

    stageEl.appendChild(bubble);

    // Simple orbital motion around stage center
    const rect = stageEl.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radiusX = (Math.min(rect.width, rect.height) / 3) + Math.random() * 80;
    const radiusY = radiusX * (0.6 + Math.random() * 0.4);
    let angle = Math.random() * Math.PI * 2;
    const speed = 0.0001 + Math.random() * 0.0002; // radians per ms (slow & smooth)
    let lastTs = performance.now();

    function frame(ts) {
      const dt = Math.min(50, ts - lastTs); // clamp to avoid large jumps
      lastTs = ts;
      angle += speed * dt;
      const x = cx + Math.cos(angle) * radiusX - size / 2;
      const y = cy + Math.sin(angle) * radiusY - Math.max(90, size * 0.55) / 2;
      bubble.style.transform = `translate(${x}px, ${y}px)`;
      bubble.style.opacity = '1';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
}

function animateCount(el, to) {
  const from = parseInt(el.textContent || '0', 10) || 0;
  if (from === to) return;
  const diff = to - from;
  const steps = 20;
  let i = 0;
  const tick = () => {
    i++;
    const val = Math.round(from + (diff * (i / steps)));
    el.textContent = String(val);
    if (i < steps) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function mountForm() {
  const form = document.getElementById('wishForm');
  if (!form) return;
  const statusEl = document.getElementById('status');
  const thanksEl = document.getElementById('thankYou');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!BACKEND_URL) {
      statusEl.textContent = 'Service temporarily unavailable. Please try again later.';
      return;
    }

    if (!fullName || !message) {
      statusEl.textContent = 'Please fill in full name and note.';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.style.opacity = '0.8';
    statusEl.textContent = 'Sending...';

    try {
      const res = await fetch(`${BACKEND_URL}/api/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка отправки');
      // Success UI: hide form, show thank-you, confetti
      form.classList.add('hidden');
      if (thanksEl) {
        thanksEl.classList.remove('hidden');
        launchConfetti();
      }
    } catch (err) {
      statusEl.textContent = 'Error. Please try again.';
    } finally {
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  });
}

// Mount
document.addEventListener('DOMContentLoaded', () => {
  mountDashboard();
  mountForm();
});

// Deployment notes:
// - Set window.OC_CONFIG.BACKEND_URL in HTML to your Railway backend URL
// - Ensure backend FRONTEND_ORIGIN matches your Vercel domain

// Minimal confetti burst without dependencies
function launchConfetti() {
  const durationMs = 1200;
  const count = 60;
  const container = document.body;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.style.position = 'fixed';
    p.style.top = '50%';
    p.style.left = '50%';
    p.style.width = '6px';
    p.style.height = '6px';
    p.style.borderRadius = '50%';
    p.style.background = i % 3 === 0 ? '#d2ff1e' : i % 3 === 1 ? '#7eff8a' : '#fff36e';
    p.style.pointerEvents = 'none';
    p.style.zIndex = '9999';
    const angle = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 8;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 6;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const start = performance.now();
    const step = (t) => {
      const dt = (t - start) / 16.7;
      x += vx;
      y += vy + dt * 0.6; // gravity
      p.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      if (t - start < durationMs) requestAnimationFrame(step);
      else p.remove();
    };
    container.appendChild(p);
    requestAnimationFrame(step);
  }
}


