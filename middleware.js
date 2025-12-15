const crypto = require('crypto');

const sesiones = {};
const cache = new Map();

function crearSesion(usuario) {
  const id = crypto.randomUUID();
  sesiones[id] = { usuario };
  return id;
}

function obtenerSesion(req) {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const match = cookie.match(/sessionId=([^;]+)/);
  return match ? sesiones[match[1]] : null;
}

function cacheResponse(key, data, ttl = 10000) {
  cache.set(key, { data, expira: Date.now() + ttl });
}

function getCache(key) {
  const item = cache.get(key);
  if (!item || Date.now() > item.expira) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

module.exports = { crearSesion, obtenerSesion, cacheResponse, getCache };
