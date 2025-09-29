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
  const countEl = $('#wishCount');
  const listEl = $('#wishList');
  if (!countEl || !listEl) return;

  // Initial fetch
  Promise.all([fetchCount(), fetchLatest(60)]).then(([count, items]) => {
    countEl.textContent = String(count);
    renderList(items);
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
        renderList(items);
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
        for (let i = newOnes.length - 1; i >= 0; i--) prependWish(newOnes[i]);
        lastRenderedId = items[0]?.id || items[0]?.ID || lastRenderedId;
        // Update count as well
        const count = await fetchCount();
        animateCount(countEl, count);
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
        animateCount(countEl, data.count);
      });
      socket.on('wish:new', (wish) => {
        prependWish(wish);
        lastRenderedId = lastRenderedId || wish.id;
      });
    } catch {}
  }

  // Polling fallback every 5s when socket isn't connected
  setInterval(() => {
    if (!socketConnected) refreshLatest();
  }, 5000);

  function renderList(items) {
    listEl.innerHTML = '';
    for (const item of items) prependWish(item, false);
  }

  function prependWish(item, useAnimation = true) {
    const li = createEl('li', 'oc-wish-item');
    if (!useAnimation) li.style.animation = 'none';
    const name = createEl('div', 'oc-wish-name');
    name.textContent = item.fullName || item.full_name || 'Гость';
    const msg = createEl('div', 'oc-wish-msg');
    msg.textContent = item.message || '';
    const time = createEl('div', 'oc-wish-time');
    time.textContent = formatTime(item.createdAt || item.created_at);
    li.append(name, msg, time);
    listEl.prepend(li);
    // Keep last 100
    const children = listEl.children;
    if (children.length > 100) listEl.removeChild(children[children.length - 1]);
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!BACKEND_URL) {
      statusEl.textContent = 'Сервис временно недоступен. Повторите позже.';
      return;
    }

    if (!fullName || !message) {
      statusEl.textContent = 'Пожалуйста, заполните ФИО и пожелание.';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.style.opacity = '0.8';
    statusEl.textContent = 'Отправка...';

    try {
      const res = await fetch(`${BACKEND_URL}/api/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка отправки');
      statusEl.textContent = 'Спасибо! Ваше пожелание отправлено.';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Ошибка. Пожалуйста, попробуйте снова.';
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


