const express = require('express');
const cors = require('cors');
const compression = require('compression');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  const kb = require('./services/knowledgeBase');
  const stats = kb.getStats();
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    kbReady: stats.items > 0,
    kbStats: stats,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[L2Guide-Bot] Microservicio iniciado en http://0.0.0.0:${PORT}`);
});
