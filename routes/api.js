/**
 * API Routes — Endpoints del microservicio L2 Guide Bot
 */
const express = require('express');
const kb = require('../services/knowledgeBase');
const chatEngine = require('../services/chatEngine');

const router = express.Router();

/* ═══════════ CHAT ═══════════ */

router.post('/chat', async (req, res) => {
  const { sessionId, message, playerContext } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'El mensaje es demasiado largo (máx 1000 caracteres).' });
  }

  const sid = sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    const result = await chatEngine.chat(sid, message.trim(), playerContext || null);
    res.json({
      sessionId: sid,
      response: result.response,
      engine: result.engine,
    });
  } catch (err) {
    console.error('[API] Chat error:', err);
    res.status(500).json({ error: 'Error procesando el mensaje.' });
  }
});

/* ═══════════ KB REBUILD ═══════════ */

router.post('/rebuild', (req, res) => {
  const datapackPath = process.env.DATAPACK_PATH || '/datapack';

  try {
    const status = kb.getRebuildStatus();
    if (status.running) {
      return res.status(409).json({
        error: 'Ya hay un rebuild en curso.',
        status,
      });
    }

    kb.rebuild(datapackPath);
    res.json({
      message: 'Rebuild iniciado en background.',
      status: kb.getRebuildStatus(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/rebuild-status', (req, res) => {
  res.json(kb.getRebuildStatus());
});

/* ═══════════ KB STATS ═══════════ */

router.get('/kb-stats', (req, res) => {
  res.json(kb.getStats());
});

/* ═══════════ CLEAR SESSION ═══════════ */

router.post('/clear-session', (req, res) => {
  const { sessionId } = req.body;
  if (sessionId) chatEngine.clearSession(sessionId);
  res.json({ ok: true });
});

module.exports = router;
