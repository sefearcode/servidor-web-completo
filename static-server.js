const fs = require('fs');
const path = require('path');

function servirArchivoEstatico(req, res) {
  const rutaArchivo = req.url.replace('/static', '');
  const filePath = path.join(__dirname, 'public', rutaArchivo);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Archivo no encontrado');
  }

  const ext = path.extname(filePath);
  const tipos = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
  };

  res.writeHead(200, {
    'Content-Type': tipos[ext] || 'text/plain'
  });

  fs.createReadStream(filePath).pipe(res);
}

module.exports = { servirArchivoEstatico };
