import express from 'express';
import path from 'node:path';
import crypto from 'node:crypto';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

app.disable('x-powered-by');
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false);

const allowedOrigin = process.env.APP_ORIGIN || '';
const wpUrl = process.env.WORDPRESS_URL?.replace(/\/+$/, '');

if (IS_PRODUCTION && !allowedOrigin) {
  throw new Error('APP_ORIGIN must be configured in production.');
}

if (IS_PRODUCTION && !wpUrl) {
  console.warn('[Security] WORDPRESS_URL is not configured; WordPress sync is disabled.');
}

app.use(helmet({
  contentSecurityPolicy: IS_PRODUCTION ? {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      formAction: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'https:'],
      fontSrc: ["'self'", 'https:', 'data:']
    }
  } : false,
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

app.use((req, res, next) => {
  if (allowedOrigin && req.headers.origin && req.headers.origin !== allowedOrigin) {
    return res.status(403).json({ success: false, message: 'Origin not allowed.' });
  }
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

app.use(express.json({ limit: '32kb', strict: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again later.' }
});

app.use('/api', apiLimiter);

function cleanString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value: string): boolean {
  return value === '' || /^[+()\d\s.-]{5,30}$/.test(value);
}

function timingSafeEqualString(a: string, b: string): boolean {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const expected = process.env.ADMIN_API_KEY;
  const supplied = req.header('x-admin-api-key') || '';
  if (!expected || !supplied || !timingSafeEqualString(supplied, expected)) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  next();
}

function isAllowedWordPressUrl(url: string): boolean {
  if (!wpUrl) return false;
  try {
    const configured = new URL(wpUrl);
    const candidate = new URL(url);
    return candidate.protocol === 'https:' &&
      candidate.origin === configured.origin &&
      candidate.hostname === configured.hostname;
  } catch {
    return false;
  }
}

function wpAuthHeaders(): Record<string, string> {
  const username = process.env.WORDPRESS_USERNAME;
  const password = process.env.WORDPRESS_APPLICATION_PASSWORD;
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (username && password) {
    headers.Authorization = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
  }
  return headers;
}

const EVENTS = new Set([
  'dr-ronald-robin-2026',
  'barbara-oneill-2026',
  'health-retreat-2027'
]);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', ministry: 'Balm of Gilead' });
});

// Never expose the complete prayer/ticket registry publicly.
app.get('/api/prayer-requests', requireAdmin, (_req, res) => {
  res.status(410).json({ success: false, message: 'Use the secured administration system.' });
});

app.post('/api/prayer-requests', submissionLimiter, async (req, res) => {
  const name = cleanString(req.body?.name, 100);
  const email = cleanString(req.body?.email, 254);
  const phone = cleanString(req.body?.phone, 30);
  const message = cleanString(req.body?.message, 3000);
  const isPrivate = req.body?.isPrivate !== false;

  if (!name || !message) return res.status(400).json({ success: false, message: 'Name and prayer message are required.' });
  if (email && !validEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email address.' });
  if (!validPhone(phone)) return res.status(400).json({ success: false, message: 'Invalid phone number.' });

  const prayer = {
    name, email, phone, message, isPrivate,
    createdAt: new Date().toISOString()
  };

  // The server is the only component allowed to forward prayer data to WordPress.
  if (wpUrl && process.env.WORDPRESS_USERNAME && process.env.WORDPRESS_APPLICATION_PASSWORD) {
    try {
      const response = await fetch(`${wpUrl}/wp-json/balm/v1/prayer-requests`, {
        method: 'POST',
        headers: wpAuthHeaders(),
        body: JSON.stringify(prayer),
        signal: AbortSignal.timeout(10000)
      });
      if (!response.ok) {
        console.error('[WordPress] Prayer sync failed with status', response.status);
        return res.status(502).json({ success: false, message: 'Prayer request could not be delivered securely. Please try again.' });
      }
    } catch (error) {
      console.error('[WordPress] Prayer sync error', error);
      return res.status(502).json({ success: false, message: 'Prayer request could not be delivered securely. Please try again.' });
    }
  } else {
    console.warn('[Security] Prayer received but WordPress server credentials are not configured.');
  }

  return res.status(201).json({
    success: true,
    message: 'Your prayer request has been received. Our ministry team will lift you up in prayer.'
  });
});

app.get('/api/tickets', requireAdmin, (_req, res) => {
  res.status(410).json({ success: false, message: 'Use the secured administration system.' });
});

app.post('/api/tickets', submissionLimiter, (req, res) => {
  const eventId = cleanString(req.body?.eventId, 100);
  const eventTitle = cleanString(req.body?.eventTitle, 200);
  const eventDate = cleanString(req.body?.eventDate, 100);
  const attendeeName = cleanString(req.body?.attendeeName, 100);
  const attendeeEmail = cleanString(req.body?.attendeeEmail, 254);
  const attendeePhone = cleanString(req.body?.attendeePhone, 30);
  const ticketsCount = Number(req.body?.ticketsCount);

  if (!EVENTS.has(eventId)) return res.status(400).json({ success: false, message: 'Invalid event.' });
  if (!attendeeName || !validEmail(attendeeEmail)) return res.status(400).json({ success: false, message: 'Valid attendee name and email are required.' });
  if (!validPhone(attendeePhone)) return res.status(400).json({ success: false, message: 'Invalid phone number.' });
  if (!Number.isInteger(ticketsCount) || ticketsCount < 1 || ticketsCount > 20) {
    return res.status(400).json({ success: false, message: 'Invalid ticket quantity.' });
  }

  const ticketCode = `BOG-${crypto.randomBytes(9).toString('base64url').toUpperCase()}`;
  const booking = {
    eventId, eventTitle, eventDate, attendeeName, attendeeEmail, attendeePhone,
    ticketsCount, ticketCode, bookingDate: new Date().toISOString()
  };

  // TODO: persist booking in a managed database before production launch.
  // Do not rely on in-memory storage for real ticket inventory or audit records.
  return res.status(201).json({ success: true, message: 'Tickets reserved successfully.', booking });
});

app.post('/api/wordpress/test-connection', requireAdmin, async (_req, res) => {
  if (!wpUrl || !process.env.WORDPRESS_USERNAME || !process.env.WORDPRESS_APPLICATION_PASSWORD) {
    return res.status(503).json({ success: false, message: 'WordPress server integration is not configured.' });
  }
  try {
    const response = await fetch(`${wpUrl}/wp-json`, {
      headers: wpAuthHeaders(),
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return res.status(502).json({ success: false, message: 'WordPress API connection failed.' });
    const data = await response.json();
    return res.json({ success: true, siteName: cleanString(data.name, 200) });
  } catch {
    return res.status(502).json({ success: false, message: 'WordPress API connection failed.' });
  }
});

app.post('/api/wordpress/sync-prayer', requireAdmin, async (req, res) => {
  return res.status(410).json({ success: false, message: 'Prayer sync is now automatic and server-controlled.' });
});

async function startServer() {
  if (!IS_PRODUCTION) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: 'index.html', maxAge: '1h' }));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Balm of Gilead server listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Fatal server startup error:', error);
  process.exit(1);
});
