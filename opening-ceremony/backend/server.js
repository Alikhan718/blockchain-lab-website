import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pkg from 'pg';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const { Pool } = pkg;

const PORT = process.env.PORT || 8080;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Please configure env.');
}

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: FRONTEND_ORIGIN === '*' ? true : FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('trust proxy', 1);
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (FRONTEND_ORIGIN === '*' || origin === FRONTEND_ORIGIN) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

const pool = new Pool({ connectionString: DATABASE_URL, ssl: getPgSsl() });

function getPgSsl() {
  // Railway Postgres usually requires SSL disabled verification but enabled ssl
  // If you use local Postgres, set PGSSLMODE=disable or adjust accordingly
  if (process.env.PGSSLMODE === 'disable') return false;
  return { rejectUnauthorized: false };
}

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wishes (
      id UUID PRIMARY KEY,
      full_name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_hash TEXT
    );
    CREATE INDEX IF NOT EXISTS wishes_created_at_idx ON wishes (created_at DESC);
  `);
}

function hashIp(ip) {
  // simple non-cryptographic hash to avoid storing raw IP
  if (!ip) return null;
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const chr = ip.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // convert to 32-bit int
  }
  return `ip_${Math.abs(hash)}`;
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/wishes/count', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM wishes');
    res.json({ count: rows[0].count });
  } catch (err) {
    console.error('count error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/wishes/latest', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  try {
    const { rows } = await pool.query(
      'SELECT id, full_name, message, created_at FROM wishes ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    res.json(rows);
  } catch (err) {
    console.error('latest error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/wishes', async (req, res) => {
  try {
    const { fullName, message } = req.body || {};
    if (typeof fullName !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    const trimmedName = fullName.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    if (trimmedName.length > 120) {
      return res.status(400).json({ error: 'Name is too long' });
    }
    if (trimmedMessage.length > 1000) {
      return res.status(400).json({ error: 'Message is too long' });
    }
    const id = uuidv4();
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || '';
    const ipHash = hashIp(ip);
    const insert = 'INSERT INTO wishes (id, full_name, message, ip_hash) VALUES ($1,$2,$3,$4) RETURNING id, full_name, message, created_at';
    const { rows } = await pool.query(insert, [id, trimmedName, trimmedMessage, ipHash]);
    const newWish = rows[0];

    io.emit('wish:new', { 
      id: newWish.id, 
      fullName: newWish.full_name, 
      message: newWish.message, 
      createdAt: newWish.created_at 
    });

    // Also emit updated count
    const countRes = await pool.query('SELECT COUNT(*)::int AS count FROM wishes');
    io.emit('wish:count', { count: countRes.rows[0].count });

    res.status(201).json({ success: true, wish: newWish });
  } catch (err) {
    console.error('create error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

io.on('connection', async (socket) => {
  try {
    const countRes = await pool.query('SELECT COUNT(*)::int AS count FROM wishes');
    socket.emit('wish:count', { count: countRes.rows[0].count });
  } catch (err) {
    console.error('socket init error', err);
  }
});

server.listen(PORT, async () => {
  try {
    await ensureSchema();
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    console.error('schema error', err);
    process.exit(1);
  }
});

// Deployment notes:
// - Set env vars in Railway: DATABASE_URL, FRONTEND_ORIGIN (e.g., https://your-vercel-domain.vercel.app)
// - If you test locally, use FRONTEND_ORIGIN=http://localhost:5173 (or your dev server) and PGSSLMODE=disable


