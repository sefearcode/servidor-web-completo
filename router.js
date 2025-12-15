const fs = require('fs');
const { render } = require('./templates');
const { servirArchivoEstatico } = require('./static-server');

function generarProductosHTML(productos) {
  return productos.map(p => `
    <div class="producto-card">
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio}</p>
      <span class="categoria">${p.categoria}</span>
      <a href="/productos/${p.id}" class="btn-primary">Ver Detalles</a>
    </div>
  `).join('');
}

function router(req, res) {

  if (req.url.startsWith('/static')) {
    return servirArchivoEstatico(req, res);
  }

  if (req.url === '/') {
    const productos = JSON.parse(fs.readFileSync('data/productos.json', 'utf8'));
    return render(res, 'home', {
      titulo: 'Inicio',
      fecha: new Date().toLocaleDateString(),
      productosHTML: generarProductosHTML(productos)
    });
  }

  if (req.url === '/productos') {
    const productos = JSON.parse(fs.readFileSync('data/productos.json', 'utf8'));
    return render(res, 'productos', {
      titulo: 'Productos',
      productosHTML: generarProductosHTML(productos),
      total: productos.length
    });
  }

  if (req.url.startsWith('/productos/')) {
    const id = parseInt(req.url.split('/')[2]);
    const productos = JSON.parse(fs.readFileSync('data/productos.json', 'utf8'));
    const producto = productos.find(p => p.id === id);

    if (!producto) {
      return render(res, '404', {
        titulo: 'Producto no encontrado'
      });
    }

    return render(res, 'producto-detalle', producto);
  }

  render(res, '404', { titulo: 'Página no encontrada' });
}

module.exports = router;
