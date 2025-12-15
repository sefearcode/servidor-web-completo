const http = require('http');
const router = require('./router');
const { logRequest } = require('./logger');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const inicio = Date.now();
  router(req, res);
  res.on('finish', () => {
    logRequest(req, Date.now() - inicio);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
