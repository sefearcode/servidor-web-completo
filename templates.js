const fs = require('fs');

function render(res, view, data = {}) {
  let layout = fs.readFileSync('views/layout.html', 'utf8');
  let content = fs.readFileSync(`views/${view}.html`, 'utf8');

  for (const key in data) {
    content = content.replaceAll(`{{${key}}}`, data[key]);
    layout = layout.replaceAll(`{{${key}}}`, data[key]);
  }

  const html = layout.replace('{{{content}}}', content);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

module.exports = { render };
