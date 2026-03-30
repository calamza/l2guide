const mariadb = require('mariadb');

const gamePool = mariadb.createPool({
  host: process.env.GAME_DB_HOST || 'localhost',
  port: parseInt(process.env.GAME_DB_PORT) || 3306,
  user: process.env.GAME_DB_USER || 'l2juser',
  password: process.env.GAME_DB_PASSWORD || 'l2jpass2024',
  database: process.env.GAME_DB_NAME || 'l2jgs',
  connectionLimit: 5,
  acquireTimeout: 15000,
});

module.exports = gamePool;
