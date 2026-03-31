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

  // Diagnóstico del datapack
  const fs = require('fs');
  const dp = process.env.DATAPACK_PATH || '/datapack';
  console.log(`[L2Guide-Bot] DATAPACK_PATH = ${dp}`);
  console.log(`[L2Guide-Bot] Existe ${dp}: ${fs.existsSync(dp)}`);
  if (fs.existsSync(dp)) {
    console.log(`[L2Guide-Bot] Contenido de ${dp}:`, fs.readdirSync(dp));
    const dataDir = dp + '/data';
    if (fs.existsSync(dataDir)) {
      console.log(`[L2Guide-Bot] Contenido de ${dataDir}:`, fs.readdirSync(dataDir).slice(0, 20));
      const statsDir = dataDir + '/stats';
      if (fs.existsSync(statsDir)) {
        console.log(`[L2Guide-Bot] Contenido de ${statsDir}:`, fs.readdirSync(statsDir));
        const itemsDir = statsDir + '/items';
        if (fs.existsSync(itemsDir)) {
          const xmlCount = fs.readdirSync(itemsDir).filter(f => f.endsWith('.xml')).length;
          console.log(`[L2Guide-Bot] Items XMLs encontrados: ${xmlCount}`);
        } else {
          console.warn(`[L2Guide-Bot] ⚠ NO existe: ${itemsDir}`);
        }
      } else {
        console.warn(`[L2Guide-Bot] ⚠ NO existe: ${statsDir}`);
      }
    } else {
      console.warn(`[L2Guide-Bot] ⚠ NO existe: ${dataDir}`);
    }
  } else {
    console.warn(`[L2Guide-Bot] ⚠ DATAPACK_PATH no existe! Verificá el volumen en docker-compose.`);
  }
});
