require('dotenv').config();

const server = require('./api/server.js');

const DB_ENV = process.env.DB_ENV || development;

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT}, the DB Env: ${DB_ENV} ===\n`);
});
