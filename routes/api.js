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
      flagged: result.flagged || false,
      flagReason: result.flagReason || null,
      flagDetail: result.flagDetail || null,
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

/* ═══════════ GUIDES ═══════════ */

router.get('/guides', (req, res) => {
  try {
    const guides = kb.getAllGuides();
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/guides/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const guide = kb.getGuideById(id);
  if (!guide) return res.status(404).json({ error: 'Guía no encontrada' });
  res.json(guide);
});

router.post('/guides', (req, res) => {
  const { category, tags, title, content } = req.body;
  if (!category || !title || !content) {
    return res.status(400).json({ error: 'category, title y content son requeridos.' });
  }
  try {
    const id = kb.addGuide(category, tags || '', title, content);
    res.json({ id, message: 'Guía creada.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/guides/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const { category, tags, title, content } = req.body;
  if (!category || !title || !content) {
    return res.status(400).json({ error: 'category, title y content son requeridos.' });
  }
  try {
    kb.updateGuide(id, category, tags || '', title, content);
    res.json({ message: 'Guía actualizada.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/guides/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    kb.deleteGuide(id);
    res.json({ message: 'Guía eliminada.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/guides/import-defaults', (req, res) => {
  try {
    const count = kb.importBuiltinGuides();
    res.json({ message: `Se importaron ${count} guías predefinidas.`, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
