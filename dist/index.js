import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { resolveBayesianNextAction } from './engine/bayesian.js';
import { DecideRequestSchema } from './types/index.js';
const app = new Hono();
app.use('*', cors());
// API: POST /v1/decide and /api/v1/decide
const handleDecide = async (c) => {
    try {
        const body = await c.req.json();
        const validated = DecideRequestSchema.parse(body);
        const result = resolveBayesianNextAction(validated);
        return c.json(result, 200);
    }
    catch (err) {
        return c.json({ error: 'Invalid decision payload', details: err.message }, 400);
    }
};
app.post('/v1/decide', handleDecide);
app.post('/api/v1/decide', handleDecide);
// API: GET /r/:clickId (1st-Party S2S Cloaking Bridge)
app.get('/r/:clickId', (c) => {
    const dest = c.req.query('dest') || 'https://quitegoodproject.com';
    return c.redirect(dest, 302);
});
// Protocol Spec & Health
app.on(['GET', 'HEAD'], '/spec.json', (c) => {
    return c.json({
        protocol: 'RFC-001',
        standard: 'Next-Action & Value Routing Engine (NAVRE)',
        version: '1.0.0',
        hostYieldRatio: 0.75,
        governance: 'Quite Good Project'
    });
});
app.on(['GET', 'HEAD'], '/health', (c) => c.json({ status: 'ok', protocol: 'RFC-001', uptime: process.uptime() }));
app.on(['GET', 'HEAD'], '/api/health', (c) => c.json({ status: 'ok', protocol: 'RFC-001', uptime: process.uptime() }));
// Serve Swiss-grade static UI
app.get('/', (c) => {
    return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NAVRE.ai — The Next-Action & Value Routing Protocol (RFC-001)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #09090b;
      --card-bg: #121215;
      --border: #27272a;
      --text: #f4f4f5;
      --muted: #a1a1aa;
      --accent: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding: 40px 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    .badge { display: inline-flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--accent); padding: 4px 12px; border-radius: 9999px; margin-bottom: 24px; }
    h1 { font-size: 38px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 16px; }
    p.lead { font-size: 18px; color: var(--muted); margin-bottom: 32px; }
    .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    .code-block { background: #000; border: 1px solid var(--border); border-radius: 8px; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #34d399; overflow-x: auto; margin: 16px 0; }
    .footer { margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--border); font-size: 13px; font-family: 'JetBrains Mono', monospace; color: var(--muted); display: flex; justify-content: space-between; align-items: center; }
    .footer a { color: var(--text); text-decoration: underline; }
    .btn { display: inline-block; background: var(--accent); color: #000; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge"><span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981;"></span> RFC-001 SPECIFICATION</div>
    <h1>The Next-Action & Value Routing Protocol</h1>
    <p class="lead">Sub-20ms Bayesian Expected Value Decision Engine & 1st-Party S2S Cloaking for Modern Web Apps & AI Agents.</p>

    <div class="card">
      <h3 style="margin-bottom: 12px;">⚡ Live Protocol Evaluation (POST /v1/decide)</h3>
      <p style="color: var(--muted); font-size: 14px;">Query the decision engine to dynamically pair an action state with the highest expected value sister asset.</p>
      <div class="code-block">curl -X POST "https://navre.ai/v1/decide" \
  -H "Content-Type: application/json" \
  -d '{"cluster": "b2b_saas", "intentScore": 85}'</div>
      <a href="/spec.json" class="btn">View Machine Wire Spec &rarr;</a>
    </div>

    <div class="footer">
      <div>&copy; 2026 NAVRE.ai · RFC-001 Protocol</div>
      <div>Maintained by <a href="https://quitegoodproject.com" target="_blank" rel="noopener">The Quite Good Project</a></div>
    </div>
  </div>
</body>
</html>`);
});
const PORT = Number(process.env.PORT) || 3009;
serve({ fetch: app.fetch, port: PORT }, (info) => {
    console.log(`⚡ NAVRE.ai RFC-001 Decision Engine running on http://localhost:${info.port}`);
});
