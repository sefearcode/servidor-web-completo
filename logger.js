const fs = require('fs');

function logRequest(req, tiempo) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${tiempo}ms\n`;
  fs.appendFileSync('logs/access.log', log);
}

module.exports = { logRequest };
